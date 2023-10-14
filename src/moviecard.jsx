import React from 'react';
import { useState } from 'react';

const MovieCard = ({ movie }) => {

    const URL2 = "https://api.themoviedb.org/3/movie";

    const [videoKey, setVideoKey]= useState(null);

        const searchTrailer = async (movieId) =>{

        try{
            const response = await fetch(`${URL2}/${movie.id}/videos?api_key=0e9a66f6cc0cd5043641b3a6f97726d2&language=en-US`);
            const data = await response.json();
            
            setVideoKey(data.results[0].key);

        }catch(error){
            alert("Trailer is not available");
        }

    }  

    function handleclick(){

        return searchTrailer(movie.id);
    }

  return (
    <div className='moviesdiv'>
      {movie.backdrop_path ? (
        <><div>
                  <img
                      className='myimg'
                      src={`https://www.themoviedb.org/t/p/original/${movie.backdrop_path}`}
                      onClick={handleclick}
                      alt={movie.title}
                      style={{cursor: 'pointer' }} />
                  <div className="movie-details">
                      <p className="title">{movie.title}</p>
                      <p className='year'>{movie.release_date}</p>
                  </div>
              </div><><br></br><br></br></></>
      ) : (
        <div className="no-image">
          
        </div>
      )}
      {videoKey && (
        <div className="modal">
          <iframe className='myframe'
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button className='mybtn' onClick={() => setVideoKey('')}>X</button>
        </div>
      )}
    </div>
  );
};

export default MovieCard;