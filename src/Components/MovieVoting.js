import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import "./MovieVoting.css"

const socket = io('http://localhost:5000'); // Adjust the URL based on your backend server

const MovieVoting = () => {
  const [movies, setMovies] = useState([
    { id: '1', name: 'last Night in Soho', genre: 'Mystery/Horror', image: '/images/1ea8df40-afbe-4237-88fd-bba449a6122f.jpeg', votes: 0 },
    { id: '2', name: 'Monkey Man', genre: 'Action', image: '/images/5 I found first-pages.jpg', votes: 0 },
    { id: '3', name: 'Beverly Hills', genre: 'Adventure', image: '/images/Beverly hills cop axelf.jpg', votes: 0 },
    { id: '4', name: 'Fail Guy', genre: 'Action/Thriller', image: '/images/fail guy.jpg', votes: 0 },
    { id: '5', name: 'Hit Man', genre: 'Action/Thriller', image: '/images/hitman.jpg', votes: 0 },
    { id: '6', name: 'Operation Ruse', genre: 'Thriller/Comedy', image: '/images/operation ruse.jpg', votes: 0 },
    { id: '7', name: '2 Guns', genre: 'Action/Comedy', image: '/images/R 2013 ‧ Action_Thriller_Comedy_Crime ‧ 1h 49m.jpeg', votes: 0 },
    { id: '8', name: 'Saltburn', genre: 'Thriller', image: '/images/Saltburn (2023).jpeg', votes: 0 },
  ]);

  useEffect(() => {
    socket.on('movieVoteUpdate', (updatedMovies) => {
      setMovies(updatedMovies);
    });

    return () => {
      socket.off('movieVoteUpdate');
    };
  }, []);

  const handleVote = (movieId) => {
    axios.post('http://localhost:5000/vote', { movieId }, { withCredentials: true })
      .then(response => {
        console.log('Vote successful:', response.data);
      })
      .catch(error => console.error('Error voting:', error));
  };

  return (
    <div className="movie-voting">
      <h1>Vote for Your Favorite Movie</h1>
      <div className="movies-list">
        {movies.map(movie => (
          <div key={movie._id} className="movie-item">
            <img src={movie.image} alt={movie.name} />
            <h2>{movie.name}</h2>
            <p>Votes: {movie.votes}</p>
            <button onClick={() => handleVote(movie._id)}>
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieVoting;
