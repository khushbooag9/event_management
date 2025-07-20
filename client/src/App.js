import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/Login.js';
import UserRegister from './pages/UserRegister.js';
import AdminRegister from './pages/AdminRegister.js';
import Layout from './Layout.js';
import { TenantProvider } from './tenantContext.js';
import axios from 'axios';
import UserPage from './pages/UserPage.js';
import UserProfile from './pages/UserProfile.js';
import Payment from './pages/Payment.js';
import Feedback from './pages/Feedback.js';
import Contact from './pages/Contact.js';
import About from './pages/About.js';
import EventDetails from './pages/EventDetails.js';
import A_EventDetails from './pages/A_EventDetails.js';
import AdminPage from './pages/AdminPage.js';
import Feature from './pages/Feature.js';
import AddEvent from './pages/AddEvent.js';
import UpdateEvent from './pages/UpdateEvent.js';
import BookedEvents from './pages/BookedEvents.js';
import { LandlordProvider } from './landlordContext.js';

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <TenantProvider>
      <LandlordProvider>
        <Routes>
          <Route>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="UserRegister" element={<UserRegister />} />
              <Route path="AdminRegister" element={<AdminRegister />} />
            </Route>

            <Route path="/UserPage" element={<UserPage />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/booking" element={<Payment />} />
            <Route path="/BookedEvents" element={<BookedEvents />} />
            <Route path="/Feedback" element={<Feedback />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/About" element={<About />} />
            <Route path="/Feature" element={<Feature />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/a_event/:id" element={<A_EventDetails />} />
            <Route path="/payment/:id" element={<Payment />} />


            <Route path="/AdminPage" element={<AdminPage />} />
            <Route path="/AddEvent" element={<AddEvent />} />
            <Route path="/UpdateEvent/:id" element={<UpdateEvent />} />

          </Route>
        </Routes>
      </LandlordProvider>
    </TenantProvider>
  );
}

export default App;