import { NavLink } from 'react-router-dom';


const NavItem = ({ to, label }) => (
    <li>
        <NavLink
            to={to}
            className={({ isActive }) =>
                [
                    'px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center',
                    isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'text-gray-300 hover:bg-blue-800/50'
                ].join(' ')
            }
        >
            {label}
        </NavLink>
    </li>
);

export default NavItem;