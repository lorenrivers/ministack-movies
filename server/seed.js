import Database from "better-sqlite3";

//connecting to our database.db to get SQL methods.
const db = new Database("database.db");

//.exec executes an SQL query. HAVE to use BACKTICKS. Shouldn't use for anything that will have any user input in it.
//inside the ()'s is where we put the columns that we want
//PRIMARY KEY - flagging our id as a record's unique identifier
//AUTOINCREMENT - means start at 1 and keep adding 1 to each record after that.
//if wanted to add an image as a field, would use imgURL TEXT.
db.exec(`CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie TEXT,
    year INTEGER,
    imgURL TEXT
)`);

//insert values into the created table. Can write this all in one line, or separate to read easier.
//single quote marks for string.
//if wanted to add an image as a field, include the url to the image in single quote marks.
db.exec(`
INSERT into movies (movie, year, imgURL)
VALUES
('Oppenheimer', 2023, 'https://xl.movieposterdb.com/23_06/2023/15398776/xl_oppenheimer-movie-poster_a83f1cbb.jpg?v=2024-01-29%2022:57:46'),
('Barbie', 2023, 'https://xl.movieposterdb.com/23_06/2023/1517268/xl_barbie-movie-poster_780f2c78.jpg?v=2024-01-26%2020:15:37')
`);
