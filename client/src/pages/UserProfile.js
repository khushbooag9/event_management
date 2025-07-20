import React, { useState } from 'react';
import './UserProfile.css'

function UserProfile() {
    const [activeSection, setActiveSection] = useState('general');
    return (
        <div className="tenant-profile-page">
            <h1>YOUR PROFILE</h1>
            <div className="profile-container">
                <aside className="sidebar">
                    <ul>
                        <li className={activeSection === 'general' ? 'active' : ''} onClick={() => setActiveSection('general')}>General</li>
                        <div className='border border-gray-200'></div>
                        <li className={activeSection === 'password' ? 'active' : ''} onClick={() => setActiveSection('password')}>Change Password</li>
                        <div className='border border-gray-200'></div>
                        <li className={activeSection === 'info' ? 'active' : ''} onClick={() => setActiveSection('info')}>Info</li>
                        <div className='border border-gray-200'></div>
                        <li className={activeSection === 'notifications' ? 'active' : ''} onClick={() => setActiveSection('notifications')}>Notifications</li>
                    </ul>
                </aside>
                <div className="content">
                    {activeSection === 'general' && <GeneralSection />}
                    {activeSection === 'password' && <ChangePasswordSection />}
                    {activeSection === 'info' && <InfoSection />}
                    {activeSection === 'notifications' && <NotificationsSection />}
                </div>
            </div>
        </div>
    );
}

function GeneralSection() {
    return (
        <div className="section">
            <h2>General</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="photo">Photo</label>
                    <input type="file" id="photo" name="photo" />
                    <button type="button">Delete</button>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div className="button-group">
                    <button type="submit">Save Changes</button>
                    <button type="button">Cancel</button>
                </div>
            </form>
        </div>
    );
}

function ChangePasswordSection() {
    return (
        <div className="section">
            <h2>Change Password</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="current-password">Current Password</label>
                    <input type="password" id="current-password" name="current-password" />
                </div>
                <div className="form-group">
                    <label htmlFor="new-password">New Password</label>
                    <input type="password" id="new-password" name="new-password" />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" name="confirm-password" />
                </div>
                <div className="button-group">
                    <button type="submit">Save Changes</button>
                    <button type="button">Cancel</button>
                </div>
            </form>
        </div>
    );
}

function InfoSection() {
    return (
        <div className="section">
            <h2>Info</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea id="bio" name="bio"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="birthday">Birthday</label>
                    <input type="date" id="birthday" name="birthday" />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" name="country" />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" name="state" />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone No.</label>
                    <input type="tel" id="phone" name="phone" />
                </div>
                <div className="button-group">
                    <button type="submit">Save Changes</button>
                    <button type="button">Cancel</button>
                </div>
            </form>
        </div>
    );
}

function NotificationsSection() {
    return (
        <div className="section notifications-section">
            <h2>Notifications</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="weekly-updates">New Property Updates</label>
                    <input type="checkbox" id="weekly-updates" name="notifications" />
                </div>
                <div className="form-group">
                    <label htmlFor="new-property">Weekly Property Updates</label>
                    <input type="checkbox" id="new-property" name="notifications" />
                </div>
                <div className="form-group">
                    <label htmlFor="reviews-feedbacks">Feedbck & Reviews Updates</label>
                    <input type="checkbox" id="reviews-feedbacks" name="notifications" />
                </div>
                <div className="button-group">
                    <button type="submit">Save Changes</button>
                    <button type="button">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default UserProfile;