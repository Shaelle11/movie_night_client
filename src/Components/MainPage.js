import React, { useState, useEffect } from 'react';
import MovieCarousel from './MovieCarousel';
import io from 'socket.io-client';

const socket = io('http://localhost:4568');

const MainPage = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4568/movies')
            .then(response => response.json())
            .then(data => setMovies(data));

        socket.on('voteUpdate', (updatedMovie) => {
            setMovies(prevMovies =>
                prevMovies.map(movie => movie._id === updatedMovie._id ? updatedMovie : movie)
            );
        });

        return () => socket.disconnect();
    }, []);

    const handleVote = (movieId) => {
        fetch('http://localhost:4568/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movieId })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.error || 'An error occurred');
                });
            }
            return response.json();
        })
        .then(data => {
            setError(null);
        })
        .catch(error => setError(error.message));
    };

    return (
        <div>
            <h1>Vote for Your Favorite Movie</h1>
            {error && <p className="error">{error}</p>}
            <MovieCarousel movies={movies} onVote={handleVote} />
        </div>
    );
};

export default MainPage;
