import React, { useState, useEffect } from 'react';
import Favorite from '../assets/Favorite.png';
import Play from '../assets/Play.png';
import { Link } from 'react-router-dom';
const TMDB_API_KEY = import.meta.env.VITE_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  useEffect(() => {
    if (TMDB_API_KEY) {
      const fetchMovies = async () => {
        try {
          const response = await fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`);
          const data = await response.json();
          if (data && Array.isArray(data.results)) {
            setMovies(data.results);
          } else {
            console.warn('No movies found or data format is incorrect.');
          }
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };

      fetchMovies();
    } else {
      console.error('TMDB API key is missing');
    }
  }, []);

  const nextSlide = () => {
    if (movies.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }
  };

  const prevSlide = () => {
    if (movies.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
    }
  };

  useEffect(() => {
    if (!isPaused && movies.length > 0) {
      const autoSlide = setInterval(nextSlide, 3000);
      return () => clearInterval(autoSlide);
    }
  }, [isPaused, movies.length]);

  const handleTouchStart = (e) => setTouchStartX(e.targetTouches[0].clientX);
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) nextSlide();
    if (touchEndX - touchStartX > 50) prevSlide();
  };

  return (
    <div className="overflow-hidden">
      <div
        className="relative w-full rounded-2xl shadow-2xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex rounded-2xl transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-full h-[15rem] relative">
              <Link to={`/Moviedetails/${movie.id}`}>
                {movie.backdrop_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                    alt={movie.title}
                    className="object-cover w-full h-full opacity-100 rounded-2xl"
                  />
                )}
                <div className="absolute inset-0 items-center justify-center p-3 hidden md:flex">
                  <div className="text-white text-center space-y-2">
                    {movie.popularity > 50 && (
                      <span className="absolute top-3 left-3 backdrop-blur-3xl bg-black/20 font-lighter text-xs px-2 py-1 rounded-full shadow-md">
                        🔥 Popular
                      </span>
                    )}
                    <div className='absolute bottom-5 left-5 text-left backdrop:filter backdrop-blur-3xl p-4 rounded-2xl border border-white/20 bg-black/20 mr-5 shadow-2xl'>
                      <h2 className="text-lg font-bold">{movie.title}</h2>
                      <p className="text-xs font-extralight">
                        {movie.overview.slice(0, 95) + (movie.overview.length > 95 ? '...' : '')}
                      </p>
                      <div className="flex gap-2 mt-2">

                        <button className="text-xs hover:bg-blue-500 focus:scale-105 border-white/20 border hover:border-blue-500 transition-all duration-300 px-2 py-1 rounded-full flex items-center space-x-1" aria-label="Watch Now">
                          <img src={Play} alt="Play" className="w-4 h-4" /> <span className='-mb-1'>Watch Now</span>
                        </button>

                        <button className="text-xs hover:bg-blue-500 focus:scale-105 border-white/20 border hover:border-blue-500 transition-all duration-300 px-2 py-1 rounded-full flex items-center space-x-1" aria-label="Like">
                          <img src={Favorite} alt="Favorite" className="w-4 h-4" /> <span className='-mb-1'>Like</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 h-[30%] bg-black/40 w-full flex flex-col justify-center p-4 md:hidden backdrop-blur-xl rounded-2xl border border-white/20 rounded-t-none text-white transition-opacity duration-300 ">
                  <h2 className="font-semibold text-nowrap text-lg">{movie.title}</h2>
                  <div className="flex gap-4">
                    <button className="text-sm border border-white/20 px-2 py-[0.15rem] rounded-full flex items-center space-x-1" aria-label="Watch Now">
                      <img src={Play} alt="Play" className="w-4 h-4" /> <span>Watch Now</span>
                    </button>
                    <button className="text-sm border border-white/20 px-2 rounded-full flex items-center space-x-1" aria-label="Like">
                      <img src={Favorite} alt="Favorite" className="w-4 h-4" /> <span>Like</span>
                    </button>
                  </div>
                </div>
              </Link>
            </div>

          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-center space-x-1">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 w-1.5 md:w-2 md:h-2 rounded-full transition duration-300 ${currentIndex === index ? 'bg-white' : 'bg-gray-600'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
