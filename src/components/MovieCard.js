import React from 'react'
const MovieCard = ({ movie, selectMovie }) => {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w500"

    return (
        // <Link to="/book" className='iyaa' >
        <div className='movie-card' onClick={() => selectMovie(movie).then(console.log({ woiiii: movie.id }))}>
            {movie.poster_path ? <img className='movie-cover' src={`${IMAGE_PATH}${movie.poster_path}`} alt="" />
                :
                <div className='movie-placeholder'>No Image found</div>
            }
            <h5 className='movie-title'>{movie.title}</h5>
        </div>
        // </Link>
    )
}

export default MovieCard
