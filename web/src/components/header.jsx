import React, { useState } from 'react';
import gameflixLogo from '../img/gameflix-logo.png';

export default function Header() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search:', searchValue);
  };

  return (
    <header className="text-white py-4 bg-[#220447]">
      <div className="mx-auto px-14 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-14">
            <a href="/" className="flex items-center">
              <img src={gameflixLogo} alt="GameFlix Logo" className="h-12" />
            </a>
            <button className="hover:text-secondary transition-colors duration-300 font-medium text-base">
              Buscar videojuegos
            </button>
          </div>
          
          <div className="flex-grow mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-[250px] mx-auto">
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Estoy buscando..."
                className="w-full bg-primary text-white rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-secondary text-sm font-medium"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary"
                aria-label="Search"
              >
                <svg
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
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-14">
            <a href='/signUp' className="bg-secondary text-[#220447] rounded-full px-4 py-2 hover:bg-opacity-80 transition-colors duration-300 text-sm font-medium">
              Registrarse
            </a>
            <a href='/login' className="flex items-center space-x-2 text-white hover:text-secondary transition-colors duration-300 font-medium text-base">
              <span>Iniciar sesión</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#C93DEC]"
              >
                <path
                  d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15M10 17L15 12M15 12L10 7M15 12H3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}