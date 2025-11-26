DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS review_responses;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE item (
  id serial PRIMARY KEY,
  title text NOT NULL REQUIRED,
  description text NOT NULL REQUIRED,
  category text NOT NULL REQUIRED,
  url text NOT NULL
);

CREATE TABLE reviews (
  id serial PRIMARY KEY,
  item_id integer NOT NULL REFERENCES item(id) ON DELETE CASCADE REQUIRED,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE REQUIRED,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5) REQUIRED,
  comment text NOT NULL
);

CREATE TABLE review_responses (
  id serial PRIMARY KEY,
  owner_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE REQUIRED,
  review_id integer NOT NULL REFERENCES reviews(id) ON DELETE CASCADE REQUIRED,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5) REQUIRED,
  comment text NOT NULL
);

CREATE TABLE comments (
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE REQUIRED,
  review_id integer NOT NULL REFERENCES reviews(id) ON DELETE CASCADE REQUIRED,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5) REQUIRED,
  date date NOT NULL,
  comment text NOT NULL
);