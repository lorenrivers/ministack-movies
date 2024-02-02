const form = document.getElementById("form");
const movieContainer = document.getElementById("movieContainer");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form); //will look at form in HTML and create an object with key:value pairs
  const movieData = Object.fromEntries(formData); //turn it into object

  //saving the response from the server
  const response = await fetch("http://localhost:2000/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" }, //so it knows the data is json
    body: JSON.stringify(movieData), //turns the data into json
  });
  // if the request was successful
  if (response.ok) {
    displayMovies(); //redisplays the movies (including newly created movies)
  } else {
    console.error("Failed to add movie", response.status);
  }
});

// fetches all movies and returns that.
async function fetchMovies() {
  const movies = await fetch("http://localhost:2000/movies");
  // parsed into an array instead of being json.
  let result = await movies.json(); //turning result back into an object of movies
  return result; //return result to be used
}

async function displayMovies() {
  // movies is an array of all movies in the db
  let movies = await fetchMovies();

  movieContainer.innerHTML = ""; //stops creating duplicate entries
  //loops through each movie to create elements to be displayed
  movies.forEach((movie) => {
    let h3Tag = document.createElement("h3");
    let pTag = document.createElement("p");
    let imgTag = document.createElement("img");
    let delbutton = document.createElement("p");

    h3Tag.textContent = movie.movie;
    pTag.textContent = movie.year;
    imgTag.src = movie.imgURL;
    delbutton.textContent = "X";

    delbutton.addEventListener("click", (event) => {
      event.preventDefault();
      handleDelete(movie.id);
    });

    movieContainer.appendChild(h3Tag);
    movieContainer.appendChild(pTag);
    movieContainer.appendChild(imgTag);
    movieContainer.appendChild(delbutton);
  });
}

displayMovies();

//this is async as we are making a fetch request. Fetch is GET method by default, have to specify if other request.
async function handleDelete(id) {
  const result = await fetch("http://localhost:2000/movies/:id", {
    method: "DELETE",
  });
  if (result.ok) {
    displayMovies();
  }
}
