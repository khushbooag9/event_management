import { Link } from 'react-router-dom';
import { useTenant } from '../tenantContext';

export default function ProfileMenu() {
    const {tenant}= useTenant();
    return (
        <div className="relative inline-block text-left">
            <div className="origin-top-right absolute right-0 mt-5 mr-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <div className='px-4 py-2'>
                        <h3>{tenant ? tenant.name : 'Guest'}</h3>
                    </div>
                    <Link to="/UserProfile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        Profile
                    </Link>
                    <Link to="/BookedEvents" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        Booked Events
                    </Link>
                    <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        Log Out
                    </Link>
                </div>
            </div>
        </div>
    );
}
