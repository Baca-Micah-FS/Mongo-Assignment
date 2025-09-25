import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [form, setForm] = useState({});

  // Create functions for GET and DELETE
  async function postMovie(e) {
    e.preventDefault();
    console.log(e.target.genre.value);
    try {
      const movie = await axios.post("http://localhost:3000/api/v1/movies", {
        title: e.target.title.value,
        rating: e.target.rating.value,
        releaseDate: e.target.releaseDate.value,
        genre: e.target.genre.value,
        directors: "68d42e9cb35f64377c5aa776",
      });
      console.log(movie);
    } catch (error) {
      console.log("movei", error);
    }
  }

  return (
    <form onSubmit={postMovie}>
      <article>
        <input type="text" name="title" />
        <input type="text" name="releaseDate" />
        <select id="select" type="text" name="genre">
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Horror">Horror</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Other">Other</option>
        </select>
        <input type="text" name="rating" />

        {/* Create for Diretors as well */}
        <button type="submit">Create</button>
      </article>
    </form>
  );
}

export default App;
