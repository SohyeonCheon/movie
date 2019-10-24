import React from "react";
import PropTypes from "prop-types";
import './Movie.css';

//state가 필요하지 않기때문에 여기서는 function 사용
function Movie({ year, title, summary, poster, genres }) {
    return (
    <div className="movie">
        <img src={poster} alt={title} title={title} />
        <div className="movie_data">
            <h3 className="movie_title">{title}</h3>
            <h5 className="movie_year">{year}</h5>
            <ul className="genres">{genres.map((genre, index) => <li key={index}>{genre}</li>)}</ul>
            <p className="movie_summary">{summary.slice(0, 140)}...</p>
        </div>
    </div>);
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Movie;