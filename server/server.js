import express from "express";
import cors from "cors";

import Database from "better-sqlite3";

const app = express();
const PORT = "2000";
//connecting to our database.db to get methods.
const db = new Database("database.db");

app.use(express.json()); // parses incoming json request
app.use(cors()); // tell server to accept requests from domains outside itself

app.get("/", (req, res) => {
  res.send("You've received info from the server!");
});

//.all() executes the statement and retrieve any result that matches (gives back all results).
//.prepare() says this is what I want to do but do it later. Different from async as still does it sequentially. Just optimises before .all() runs.
// * means select all from movies in the database (is separate to the .all.)
//below means if there is a query parameter, show user that movie. Otherwise show all movies.
app.get("/movies", (req, res) => {
  try {
    //find a record by it's id (query parameter http://localhost:2000/movies?id=1)
    if (req.query.id) {
      let movie = db
        .prepare(`SELECT * FROM movies WHERE id = ?`)
        .all(req.query.id);
      res.status(200).json(movie);
      return;
    }

    let movies = db.prepare(`SELECT * FROM movies`).all();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post new data to the table
app.post("/movies", (req, res) => {
  try {
    const movie = req.body.movie;
    const year = req.body.year;
    const imageURL = req.body.imgURL;

    //run SQL statement - ???'s are replaced by the values in .run()
    const newMovie = db
      .prepare(`INSERT INTO movies (movie, year, imgURL) VALUES (?, ?, ?)`)
      .run(movie, year, imageURL);
    res.status(200).json(newMovie);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//DELETE route
//e.g. movies/1 -> will delete movie with ID of 1 (or whatever is passed after the final /). The colon tells it to target wherever the colon is in the end point.
app.delete("/movies/:id", (req, res) => {
  try {
    const id = req.params.id;
    const deletedMovie = db.prepare(`DELETE FROM movies WHERE id = ? `).run(id);
    res.status(200).json({ recordDeleted: deletedMovie });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//PUT route
app.put("/movies/:id", (req, res) => {
  try {
    const id = req.params.id;
    const movie = req.movie.body;
    const year = req.movie.year;
    const imgURL = req.body.imgURL;

    const updateMovies = db
      .prepare(`UPDATE movies SET movie = ?, year = ?, imgURL = ? WHERE id = ?`)
      .run(movie, year, imgURL, id);
    res.status(202).json({ message: updatedMovie });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
