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
                {movies.map((movie, index) => (
                    <div
                        key={movie.id}
                        className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
                    >
                        <img src={movie.image} alt={movie.name} className="carousel-image" />
                        <h2>{movie.name}</h2>
                        <p>{movie.genre}</p>
                        <button onClick={() => onVote(movie.id)}>Vote</button>
                        <p>Votes: {movie.votes}</p>
                    </div>
                ))}
            </div>
            <button onClick={nextSlide} className="carousel-control right">›</button>
        </div>
    );
};

export default MovieCarousel;
