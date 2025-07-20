const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const user = require('./models/User');
const admin = require('./models/Admin');
const event = require('./models/Event');
const Booking = require('./models/Booking');
const multer = require('multer');
const path = require('path');
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const PORT = process.env.PORT || 4000;


// Middleware to handle JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    credentials: true,
    origin: true,
}));

mongoose.connect('mongodb://localhost:27017/event_management');

app.get('/test', (req, res) => {
    res.json('test ok');
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

// Fetch a single event by admin ID
app.get('/a_events/:id', async (req, res) => {
    try {
        const foundEvent = await event.findById(req.params.id).lean();
        if (!foundEvent) {
            return res.status(404).send('event not found');
        }
        const bookingsCount = await Booking.countDocuments({ event: foundEvent._id });
        const safeProperty = {
            image: foundEvent.image,
            description: foundEvent.description,
            address: foundEvent.address,
            price: foundEvent.price,
            rooms: foundEvent.rooms,
            name: foundEvent.name,
            date_added: foundEvent.date_added,
            _id: foundEvent._id.toString(),
            bookingsCount
        };
        res.json(safeProperty);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).send('Server Error');
    }
});

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

// File filter function to accept only .png and .jpg files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Only .png, .jpg, or .jpeg files are allowed!'), false);
    }
};

const upload = multer({
    fileFilter: fileFilter,
    storage: storage
});

module.exports = upload;

// Add event route
app.post('/events/add', upload.single('image'), async (req, res) => {
    try {
        const { name, amenities, rooms, resources, area, address, price, landl_name,description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';

        const newProperty = new event({
            image,
            name,
            amenities,
            rooms,
            resources,
            description,
            area,
            address,
            price,
            landl_name,
            date_added: new Date(),
            featured: false
        });

        await newProperty.save();
        res.status(201).json({ message: 'event added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Middleware to serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.put('/events/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }

  console.log('Update request received for event ID:', id);
  console.log('Update data:', updateData);

  try {
    const updatedProperty = await event.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      console.log('event not found');
      return res.status(404).send('event not found');
    }

    console.log('Updated event:', updatedProperty);
    res.json(updatedProperty); // Respond with the updated event details
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