import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [movie, setMovie] = useState([]);
  const [director, setDirector] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, directorsRes] = await Promise.all([
          getMovies(),
          getDirectors(),
        ]);

        setDirector(directorsRes.data.directors);
        setMovie(moviesRes.data.movies);
        console.log(moviesRes);
        console.log(movie);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  async function postMovie(e) {
    console.log(e);
    e.preventDefault();
    try {
      const movie = await axios.post("http://localhost:3000/api/v1/movies", {
        title: e.target.title.value,
        rating: e.target.rating.value,
        releaseDate: e.target.releaseDate.value,
        genre: e.target.genre.value,
        directors: e.target.director.value,
      });

      const [moviesRes] = await Promise.all([getMovies()]);
      setMovie(moviesRes.data.movies);
    } catch (error) {}
  }

  async function getMovies() {
    return axios.get("http://localhost:3000/api/v1/movies");
  }

  async function getDirectors() {
    return axios.get("http://localhost:3000/api/v1/directors");
  }

  async function postDirector(e) {
    e.preventDefault();
    try {
      const f = e.target;
      console.log(f.retired.value);
      const director = await axios.post(
        "http://localhost:3000/api/v1/directors",
        {
          name: f.directorName.value,
          birthDate: f.birthDate.value,
          moviesDirected: Number(f.moviesDirected.value),
          retired: f.retired.value,
        }
      );
      const [directorsRes] = await Promise.all([getDirectors()]);
      setDirector(directorsRes.data.directors);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMovie(id) {
    const deleteMovie = await axios.delete(
      `http://localhost:3000/api/v1/movies/${id}`
    );
    const [moviesRes] = await Promise.all([getMovies()]);
    setMovie(moviesRes.data.movies);
  }

  async function deleteDirector(id) {
    const deleteDirector = await axios.delete(
      `http://localhost:3000/api/v1/directors/${id}`
    );

    const [moviesRes, directorsRes] = await Promise.all([
      getMovies(),
      getDirectors(),
    ]);

    setDirector(directorsRes.data.directors);
    setMovie(moviesRes.data.movies);
  }

  return (
    <>
      {/*****  Directors Section *****/}
      <div style={styles.container}>
        <form onSubmit={postDirector}>
          <h2>Add New Director</h2>
          <article style={styles.form}>
            <label htmlFor="directorName">Name</label>
            <input style={styles.input} type="text" name="directorName" />
            <label htmlFor="birthDate">Birth Date</label>
            <input style={styles.input} type="date" name="birthDate" />
            <label htmlFor="moviesDirected">Movies Directed</label>
            <input style={styles.input} type="text" name="moviesDirected" />
            <label htmlFor="retired">Retired</label>
            <select style={styles.input} type="text" name="retired">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button style={styles.button} type="submit">
                Create
              </button>
            </div>
          </article>
        </form>
        <div>
          <h2>Directors</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <td>Name</td>
                <td>Birthdate</td>
                <td>Movies Directed</td>
                <td>Retired?</td>
                <td>Delete</td>
              </tr>
            </thead>

            {director && (
              <tbody>
                {director.map((d) => (
                  <tr key={d._id}>
                    <td>{d.name}</td>
                    <td>{new Date(d.birthDate).toLocaleDateString()}</td>
                    <td>{d.moviesDirected}</td>
                    {d.retired ? <td>Retired</td> : <td>Not retired</td>}
                    <td>
                      <button
                        type="button"
                        onClick={() => deleteDirector(d._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          <small>
            * Deleting a director will delete all associated movies.
          </small>
        </div>
      </div>
      {/*****  Movies Section *****/}
      <div style={styles.container}>
        <form onSubmit={postMovie}>
          <h2>Add New Movie</h2>
          <article style={styles.form}>
            <label htmlFor="title">Title</label>
            <input style={styles.input} id="title" type="text" name="title" />
            <label htmlFor="release-date">Release Date</label>
            <input
              style={styles.input}
              id="release-date"
              type="date"
              name="releaseDate"
            />
            <label htmlFor="rating">Rating</label>
            <select style={styles.input} id="rating" type="text" name="rating">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label htmlFor="genre">Genre</label>
            <select style={styles.input} id="select" type="text" name="genre">
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Horror">Horror</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Other">Other</option>
            </select>
            <label htmlFor="director">Director</label>
            <select
              style={styles.input}
              id="select"
              type="text"
              name="director"
            >
              <option></option>
              {director && (
                <>
                  {director.map((d) => (
                    <option value={d._id} key={d._id}>
                      {d.name}
                    </option>
                  ))}
                </>
              )}
            </select>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button style={styles.button} type="submit">
                Create
              </button>
            </div>
          </article>
        </form>
        <div>
          <h2>Movies</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <td>Title</td>
                <td>Release Date</td>
                <td>Rating</td>
                <td>Genre</td>
                <td>Director</td>
                <td>Delete</td>
              </tr>
            </thead>
            {movie && (
              <tbody>
                {movie.map((movie) => {
                  return (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>
                        {new Date(movie.releaseDate).toLocaleDateString()}
                      </td>
                      <td>{movie.rating}</td>
                      <td>{movie.genre}</td>
                      <td>{movie.directors.name}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => deleteMovie(movie._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

export default App;

const styles = {
  form: {
    backgroundColor: "#d1d1d1",
    boxShadow: "4px 4px 4px #363636",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "400px",
    textAlign: "left",
    fontSize: "18px",
    padding: "10px",
  },

  input: {
    width: "75%",
    fontSize: "1.2em",
  },

  container: {
    backgroundColor: "#ededed",
    width: "1200px",
    display: "flex",
    flexDirection: "row",
    padding: "12px",
    marginBottom: "24px",
    marginTop: "12px",
    alignItems: "flex-start",
  },

  table: {
    padding: "12px",
    margin: "12px",
    width: "776px",
    borderCollapse: "collapse",
  },

  button: {
    width: "25%",
    margin: "8px 8px 8px 0px",
  },
};
