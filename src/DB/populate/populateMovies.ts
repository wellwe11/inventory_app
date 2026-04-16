import { Client } from "pg";
import "dotenv/config";

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
