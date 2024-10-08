import React, { useState } from 'react';
import gameflixLogo from '../img/gameflix-logo.png'

const Navbar = () => {
const [searchValue, setSearchValue] = useState('');

const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    };

const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search:', searchValue); // Aquí puedes integrar tu lógica de búsqueda
    };

    return (
    <nav className="bg-background p-4 flex justify-between items-center">
        <div className="flex items-center">
        <img src={gameflixLogo} alt="GameFlix Logo" className="h-8 mr-2" />
        <span className="text-secondary text-2xl font-display font-bold">FLIX</span>
        </div>
        <div className="flex-grow mx-4">
        <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
            <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Estoy buscando..."
            className="w-full bg-primary text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
            </svg>
        </form>
        </div>
        <div className="flex items-center space-x-4">
        <button className="bg-secondary text-white rounded-full px-4 py-2 text-sm font-bold hover:bg-opacity-80 transition-colors duration-300">
            Registrarse
        </button>
        <button className="text-white" aria-label="Logout">
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15M10 17L15 12M15 12L10 7M15 12H3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
        </button>
        </div>
    </nav>
    );
};

export default Navbar;
