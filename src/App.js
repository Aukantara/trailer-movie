import { useEffect, useState } from 'react';
import './App.css';
import tmdb from './tmdb';
import MovieCard from './components/MovieCard';
import YouTube from 'react-youtube';
import axios from 'axios';
import Coba from './components/Coba';
import IsiCoba from './components/IsiCoba';

function App() {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280"
  const [movies, setMovies] = useState([])
  const [ngambil, setNgambil] = useState([])
  const [selectedMovie, setSelectedMovie] = useState({})
  const [searchKey, setSearchKey] = useState("")
  const [playTrailer, setPlayTrailer] = useState(false)

  const fetchMovies = async () => {
    const type = searchKey ? "search" : "discover"
    const { data } = await tmdb.get(`${type}/movie`, {
      params: {
        query: searchKey
      }
    })
    setMovies(data.results)
    await selectMovie(data.results[0])
  }

  const ngefetch = async () => {
    const dirandomin = Math.floor(Math.random() * 19);

    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=835cc50e0595c2ad056788e5105335d9&append_to_response=videos`
      // , {
      //   params: {
      //     append_to_response: 'videos',
      //     query: searchKey
      //   }
      // }
    )
    // console.log({ random: data })
  }

  const fetchMovie = async (id) => {
    const { data } = await tmdb.get(`movie/${id}`, {
      params: {
        append_to_response: 'videos'
      }
    })
    return data
  }

  const selectMovie = async (movie) => {
    setPlayTrailer(false)
    const data = await fetchMovie(movie.id)
    setSelectedMovie(data)
    console.log(data)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const renderMovie = () => (
    movies.map(movie => (
      <MovieCard
        key={movie.id}
        movie={movie}
        selectMovie={selectMovie}
        play={playTrailer}
      />
    ))
  )

  const searchMovies = (e) => {
    e.preventDefault()
    fetchMovies()
  }

  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(vid => vid.name === 'Official Trailer')
    const key = trailer ? trailer.key : selectedMovie.videos.results[0].key

    return (
      <YouTube
        videoId={key}
        className={"youtube-container"}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            controls: 0
          }
        }
        }
      />
    )
  }

  return (
    <div className="App">
      <header className='header'>
        <div className='header-content max-center'>
          <span>Hallo Cui</span>
          <form onSubmit={searchMovies}>
            <input type="text" onChange={e => setSearchKey(e.target.value)} />
            <button type="submit">Search!</button>
          </form>
        </div>
      </header>
      {/* <Coba /> */}
      <div>halo</div>
      <div className='hero' style={{ backgroundImage: `url(${IMAGE_PATH}${selectedMovie.backdrop_path})` }}>
        <div className='hero-content max-center'>
          {playTrailer ? <button className='button button--close' onClick={() => setPlayTrailer(false)}>Close</button> : null}
          {selectedMovie.videos && playTrailer ? renderTrailer() : null}
          <button className='button' onClick={() => setPlayTrailer(true)} >Play Trailer</button>
          <h1 className='hero-title'>{selectedMovie.title}</h1>
          {selectedMovie.overview ? <p className='hero-overview'>{selectedMovie.overview}</p> : null}
        </div>
      </div>
      <div className="container max-center">
        {renderMovie()}
      </div>
    </div>
  );
}

export default App;
