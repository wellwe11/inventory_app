import { Client } from "pg";
import "dotenv/config";

// Seed tables-query
const SQL = `
CREATE TABLE IF NOT EXISTS directors (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR( 255 ) NOT NULL,
        born INTEGER,
        deceased INTEGER,
        country VARCHAR ( 400 )
    );


CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        director_id INTEGER REFERENCES directors(id),
        title VARCHAR ( 500 ),
        src VARCHAR ( 500 ),
        year INTEGER
    );

CREATE TABLE IF NOT EXISTS genres (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR( 100 ) UNIQUE NOT NULL
    );

CREATE TABLE IF NOT EXISTS movie_genres (
        movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
        genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
        PRIMARY KEY (movie_id, genre_id)
    );
`;

// Initial data that will exist once data-base starts
const init_PostSQL = `
INSERT INTO directors (name, born, deceased, country)
    VALUES 
        ('alfred hitchcock', 1899, 1980, 'england'),
        ('ingmar bergman', 1918, 2007, 'sweden'),
        ('andrei tarkovsky', 1932, 1986, 'russia'),
        ('stanley kubrick', 1928, 1999, 'united states of america'),
        ('wong kar-wai', 1952, null, 'china'),
        ('terry gilliam', 1940, null, 'united states of america');

INSERT INTO movies (director_id, title, src, year)
VALUES 
    (1, 'psycho', './movie_images/psycho.jpg', 1960),
    (1, 'vertigo', './movie_images/vertigo.jpg', 1958),
    (1, 'suspicion', './movie_images/suspicion.jpg', 1941),
    (2, 'smultronstället', './movie_images/smultronstället.jpg', 1957),
    (2, 'fanny och alexander', './movie_images/fanny_och_alexander.jpg', 1982),
    (2, 'det sjunde inseglet', './movie_images/det_sjunde_inseglet.jpg', 1957),
    (3, 'stalker', './movie_images/stalker.jpg', 1979),
    (3, 'offret', './movie_images/offret.jpg', 1986),
    (3, 'nostalghia', './movie_images/nostalghia.jpg', 1983),
    (4, 'the shining', './movie_images/the_shining.jpg', 1980),
    (4, '2001: a space oddyssey', './movie_images/2001:_a_space_oddyssey.jpg', 1968),
    (4, 'lolita', './movie_images/lolita.jpg', 1962),
    (5, 'do lok tin si', './movie_images/do_lok_tin_si.jpg', 1995),
    (5, '2046', './movie_images/2046.jpg', 2004),
    (5, 'chung hing sam lam', './movie_images/chung_hing_sam_lam.jpg', 1994),
    (6, 'brazil', './movie_images/brazil.jpg', 1985),
    (6, 'monty python and the holy grail', './movie_images/monty_python_and_the_holy_grail.jpg', 1975),
    (6, 'the meaning of life', './movie_images/the_meaning_of_life.jpg', 1983);


INSERT INTO genres (name)
    VALUES ('comedy'), ('horror'), ('thriller'), ('romance'), ('drama'), ('sci-fi'), ('adventure'), ('crime')
    ON CONFLICK (name) DO NOTHING;

`;

// Populate list of directors from the director-query. We can later retrieve the directors id to associate it to the movie
const seedDirectors = async (directorList, client) => {
  for (const director of directorList) {
    const q = `
                INSERT INTO directors (name, born, deceased, country)
                VALUES ($1, $2, $3, $4)`;
    await client.query(q, [
      director.name,
      director.born,
      director.deceased,
      director.country,
    ]);
  }
};

// Same goes here. We create a list for each genre, so we can later associate it to a specific movie
const seedGenres = async (genreList, client) => {
  for (const genre of genreList) {
    const q = `
        INSERT INTO genres (name)
        VALUES ($1)`;
    await client.query(q, [genre.name]);
  }
};

// const seedMovies = async (movieList) => {
//     for (const movie of movieList) {
//         try {

//         }
//     }
// }

async function main() {
  console.log("seeing...");
  const client = new Client({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
