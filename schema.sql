 DROP TABLE IF EXISTS books;

CREATE TABLE IF NOT EXISTS ingredients ( 
  id SERIAL PRIMARY KEY, 
  author VARCHAR(255),
  title VARCHAR(255),  
  isbn BIGINT,
  image_url TEXT,
  book_description TEXT,
  bookshelf VARCHAR(255)
);

-- Table to Store Inventory input 
CREATE TABLE IF NOT EXISTS products ( 
  id SERIAL PRIMARY KEY, 
  upc BIGINT
  title VARCHAR(255)
);


-- Table to Store different types of recipes based on the product selection by user 
CREATE TABLE IF NOT EXISTS recipes ( 
  id SERIAL PRIMARY KEY, 
  title VARCHAR(255), 
  price DECIMAL(10,2),
  serving-size DECIMAL(10,2)
);

-- Table to render recipe based on the selection by user 
CREATE TABLE IF NOT EXISTS recipes ( 
  id SERIAL PRIMARY KEY, 
  title VARCHAR(255), 
  price FLOAT,
  serving-size FLOAT
);