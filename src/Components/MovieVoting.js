import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import "./MovieVoting.css"
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const socket = io('https://movie-night-backend.vercel.app'); // Adjust the URL based on your backend server

const MovieVoting = () => {
  const [movies, setMovies] = useState([
    { id: '1', name: 'last Night in Soho', genre: 'Mystery/Horror', image: '/images/1ea8df40-afbe-4237-88fd-bba449a6122f.jpeg', votes: 0, summary: 'Eloise, an aspiring fashion designer, is fascinated with the fashion of the 60s. But her life spirals out of control when she dreams of being transported back to that time period.' },
    { id: '2', name: 'Monkey Man', genre: 'Action', image: '/images/5 I found first-pages.jpg', votes: 0,  summary: 'A young man ekes out a meager living in an underground fight club where, night after night, wearing a gorilla mask, he is beaten bloody by more popular fighters for cash. After years of suppressed rage' },
    { id: '3', name: 'The Beekeeper', genre: 'Action/Thriller', image: '/images/THE BEEKEEPER.jfif', votes: 0,  summary: 'One mans brutal campaign for vengeance takes on national stakes after it is revealed he is a former operative of a powerful and clandestine organization known as Beekeepers.' },
    { id: '4', name: 'Dave Made a Maze', genre: 'Comedy/Thriller/Horror', image: '/images/dave made a maze.jfif', votes: 0,  summary: 'Dave, a struggling artist, decides to build a fort in his living room using cardboard boxes. However, he gets trapped in his own creation and his girlfriend teams up with some people to rescue him.' },
    { id: '5', name: 'Bodies Bodies Bodies', genre: 'Thriller/Horror', image: '/images/bodies bodies bodies.jfif', votes: 0,  summary: 'When a group of 20-somethings gets stuck at a remote mansion during a hurricane, a party game gone very, very wrong ends with a dead body on the ground and fake friends at every turn as they try to fi' },
    { id: '6', name: 'Operation Ruse', genre: 'Thriller/Comedy', image: '/images/operation ruse.jpg', votes: 0,  summary: 'Elite spy Orson Fortune must track down and stop the sale of a deadly new weapons technology wielded by billionaire arms broker Greg Simmonds. Reluctantly teamed up with some of the worlds best operatives, Fortune and his crew recruit Hollywoods biggest movie star, Danny Francesco, to help them on their globe-trotting mission to save the world.' },
    { id: '7', name: '2 Guns', genre: 'Action/Comedy', image: '/images/R 2013 ‧ Action_Thriller_Comedy_Crime ‧ 1h 49m.jpeg', votes: 0,  summary: 'Two undercover agents, Robert and Michael, aim to expose Manny Papi Greco, a drug lord. However, they are unaware of each others true identities. They soon get into trouble when they meet Papi.'},
    { id: '8', name: 'Saltburn', genre: 'Thriller', image: '/images/Saltburn (2023).jpeg', votes: 0,  summary: 'Troubled by his classmates unfortunate living situation, wealthy Oxford student Felix invites Oliver to stay at his estate, but a series of horrifying events soon engulf his eccentric family.' },
    { id: '9', name: 'Killer', genre: 'Action/Thriller', image: '/images/Убийца _ Killer 2023.jpeg', votes: 0,  summary: 'Solitary, cold, methodical and unencumbered by scruples or regrets, a killer waits in the shadows, watching for his next target. Yet, the longer he waits, the more he thinks he Is losing his mind, if not his cool.' },
    { id: '10', name: 'The Outlaws', genre: 'Thriller', image: '/images/The OUTLAWS.jpeg', votes: 0,  summary: 'The Outlaws is a crime thriller comedy television series created by Elgin James and Stephen Merchant, and directed by Merchant and John Butler. It is shown on BBC One and iPlayer in the UK and Amazon Prime Video in some international territories.' },
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
    axios.post('https://movie-night-backend.vercel.app/vote', { movieId }, { withCredentials: true })
      .then(response => {
        console.log('Vote successful:', response.data);
      })
      .catch(error => console.error('Error voting:', error));
  };
  

  return (
    <div className="movie-voting">
      <h1>Vote for Your Favorite Movie</h1>
      <p>Click any of the movies below to vote, you can only vote one, for more info about each movie <a href='#movie_info'> click me</a></p> 
      <iframe id='vote' src="https://pollev-embeds.com/multiple_choice_polls/BIB2BGdv1chYejYI2tFJW/respond" width="500px" height="600px"></iframe>
      <div id='movie_info' className="movies-list">
        {movies.map(movie => (
          <div key={movie._id} className="movie-item">
            <img src={movie.image} alt={movie.name} />
           <div className='movie_info'>
           <h2>{movie.name}</h2>
            <p>
              {movie.genre}
            </p>
            <p>
              {movie.summary}
            </p>
          
           </div>
         
          </div>
          
        ))}
      </div>
     <a href='#vote'> <FontAwesomeIcon icon={faArrowUp} size="2x" className="icon_white icon_bounce" /></a>
     <p>if you've made your choice, click me to go make your vote</p>
    </div>
  );
};

export default MovieVoting;
