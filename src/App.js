import { useEffect, useState } from 'react';
import SearchIcon from './search.svg';
import './App.css';
import MovieCard from './moviecard';

//0e9a66f6cc0cd5043641b3a6f97726d2&language=en-US
const API_URL = "https://api.themoviedb.org/3/search/movie?query=";
const api = "&api_key=feb6f0eeaa0a72662967d77079850353";

function App() {

  const [movies, setMovie] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
 
  const searchMovies = async (title) =>{
    const response =  await fetch(`${API_URL}/${title}${api}`);
    const data = await response.json();
   setMovie(data.results);
  }


  useEffect(()=>{

    searchMovies("Avengers");

  },[]);

  return (
    <div className='app'>

      <h1>Search Movies</h1>

    <div className='search'>
    <input 
        type="text"
        placeholder='Search for movies'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            searchMovies(searchTerm);
          }
        }}
    />

      <img src={SearchIcon}
      alt="search"
      onClick={()=>{searchMovies(searchTerm)}}
      />
    </div>

      {movies.length > 0 ?(

      <div className="movie-container">
        {movies.map((movie)=>(

        <><div><MovieCard movie={movie} /></div><br></br></>

        ))}
        </div>  
        ):(

          <div>
            <h1>No movie was found</h1>
          </div>
        
      )}

    </div>
  );
}

export default App;
