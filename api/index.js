const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const user = require('./models/User');
const admin = require('./models/Admin');
const event = require('./models/Event');
const Booking = require('./models/Booking');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const multer = require('multer');
const path = require('path');
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const PORT = process.env.PORT || 4000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Middleware to handle JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    credentials: true,
    origin: true,
}));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/generate-description', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ description: text });
  } catch (err) {
    console.error('Error generating description:', err); // Show full error
    res.status(500).json({ error: 'Failed to generate description' });
  }
});


// Feedback model
const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    rating: Number,
    comments: String
}, { collection: 'Feedback' });

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Feedback Route
app.post('/feedback', async (req, res) => {
    const { name, email, rating, comments } = req.body;

    try {
        const feedbackDoc = await Feedback.create({
            name,
            email,
            rating,
            comments
        });
        res.json(feedbackDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

// user Register Route
app.post('/UserRegister', async (req, res) => {
    const { name, email, password, address, phone_no } = req.body;

    try {
        const userDoc = await user.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
            address,
            phone_no,
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

// admin Register Route
app.post('/AdminRegister', async (req, res) => {
    const { name, email, password, address, phone_no } = req.body;

    try {
        const adminDoc = await admin.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
            address,
            phone_no,
        });
        res.json(adminDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password, userType } = req.body;
    try {
        let foundUser;
        if (userType === 'User') {
            foundUser = await user.findOne({ email });
        } else if (userType === 'Admin') {
            foundUser = await admin.findOne({ email });
        }

        if (!foundUser) {
            return res.status(404).send('User not found');
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(422).send('Incorrect password');
        }

        res.status(200).send(foundUser);
    } catch (error) {
        res.status(500).send('Login failed. Please try again later.');
    }
});

// Events Route
app.get('/events', async (req, res) => {
    try {
        const { sort, limit } = req.query;

        let query = {};

        let properties = await event.find(query)
            .sort(sort ? { [sort]: -1 } : {})
            .limit(limit ? parseInt(limit) : 0)
            .lean();

        const safeProperties = properties.map(prop => ({
            image: prop.image,
            description: prop.description,
            address: prop.address,
            price: prop.price,
            rooms: prop.rooms,
            name: prop.name,
            _id: prop._id.toString(),
            date_added: prop.date_added // Ensure date_added is included if you need it on the frontend
        }));

        res.json(safeProperties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).send('Server Error');
    }
});


// Fetch a single event by user ID
app.get('/events/:id', async (req, res) => {
    try {
        const foundEvent = await event.findById(req.params.id).lean();
        if (!foundEvent) {
            return res.status(404).send('event not found');
        }
        const safeEvent = {
            image: foundEvent.image,
            description: foundEvent.description,
            address: foundEvent.address,
            price: foundEvent.price,
            rooms: foundEvent.rooms,
            name: foundEvent.name,
            date_added: foundEvent.date_added,
            _id: foundEvent._id.toString()
        };
        res.json(safeEvent);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).send('Server Error');
    }
});

// Fetch a single event by event ID (with bookings count)
app.get('/a_event/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const evt = await event.findById(eventId);
        if (!evt) {
            return res.status(404).send('Event not found');
        }
        const bookingsCount = await Booking.countDocuments({ event: evt._id });
        res.json({
            _id: evt._id,
            image: evt.image,
            name: evt.name,
            address: evt.address,
            price: evt.price,
            rooms: evt.rooms,
            description: evt.description,
            date_added: evt.date_added,
            bookingsCount
        });
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).send('Server Error');
    }
});

// Fetch a single event by admin ID
app.get('/a_events/:adminId', async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const events = await event.find({ adminId });
        
        const safeEvents = await Promise.all(events.map(async (evt) => {
        const bookingCount = await Booking.countDocuments({ event: evt._id });

        return {
            _id: evt._id,
            image: evt.image,
            name: evt.name,
            address: evt.address,
            price: evt.price,
            rooms: evt.rooms,
            description: evt.description,
            date_added: evt.date_added,
            participants: bookingCount
        };
        }));
        res.json(safeEvents);
    } catch (error) {
        console.error('Error fetching admin events:', error);
        res.status(500).send('Server Error');
    }
});


// Add event route
app.post('/events/add', async (req, res) => {
    try {
        const { name, amenities, rooms, resources, area, address, price, landl_name, description, adminId, image } = req.body;

        const newEvent = new event({
            image, // This is base64
            name,
            amenities,
            rooms,
            resources,
            description,
            area,
            address,
            price,
            landl_name,
            adminId,
            date_added: new Date(),
            featured: false
        });

        await newEvent.save();
        res.status(201).json({ message: 'Event added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.put('/events/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  console.log('Update request received for event ID:', id);
  console.log('Update data:', updateData);

  try {
    const updatedEvent = await event.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      console.log('Event not found');
      return res.status(404).send('Event not found');
    }

    console.log('Updated event:', updatedEvent);
    res.json(updatedEvent); // Respond with the updated event details
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).send('Server error');
  }
});


// Delete event by ID
app.delete('/events/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await event.findByIdAndDelete(id);
        res.status(200).send('event deleted successfully');
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// GET /bookings/user/:userId
app.get('/bookings/user/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userId });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.use(express.static(path.join(__dirname, 'public')));

const payment=require('./routs/paymentroute.js');
const { useDeferredValue } = require('react');
app.use('/payment',payment);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});