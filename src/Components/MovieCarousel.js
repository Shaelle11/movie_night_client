import React, { useState } from 'react';
import './MovieCarousel.css';

const MovieCarousel = ({ movies, onVote }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
    };

    return (
        <div className="carousel">
            <button onClick={prevSlide} className="carousel-control left">‹</button>
            <div className="carousel-slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {movies.map((movie) => (
                    <div
                        key={movie._id} // Ensure using '_id'
                        className={`carousel-slide ${movie._id === movies[currentIndex]._id ? 'active' : ''}`}
                    >
                        <img src={movie.image} alt={movie.name} className="carousel-image" />
                        <h2>{movie.name}</h2>
                        <p className='genre'>{movie.genre}</p>
                        <button onClick={() => onVote(movie._id)}>Vote</button>
                        <p className='votes'>Votes: {movie.votes}</p>
                    </div>
                ))}
            </div>
            <button onClick={nextSlide} className="carousel-control right">›</button>
        </div>
    );
};

export default MovieCarousel;
