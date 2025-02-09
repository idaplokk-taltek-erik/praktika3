-- Insert sample data for 20 books into the `book` table

INSERT INTO book (name, isbn, author_name, genre_name, released_at)
VALUES
  ('The Adventures of Tom', '9780000000001', 'Mark Twain', 'Adventure', '1876-01-01T00:00:00Z'),
  ('Journey Through Time', '9780000000002', 'H.G. Wells', 'Science Fiction', '1895-06-15T00:00:00Z'),
  ('Mystery of the Old House', '9780000000003', 'Agatha Christie', 'Mystery', '1920-09-10T00:00:00Z'),
  ('Learning SQL', '9780000000004', 'John Doe', 'Educational', '2022-01-15T00:00:00Z'),
  ('The Great Escape', '9780000000005', 'Paul Smith', 'Thriller', '2018-04-20T00:00:00Z'),
  ('Fantasy World', '9780000000006', 'J.R.R. Tolkien', 'Fantasy', '1954-07-29T00:00:00Z'),
  ('Modern Cooking', '9780000000007', 'Gordon Ramsay', 'Cooking', '2015-11-05T00:00:00Z'),
  ('Art of War', '9780000000008', 'Sun Tzu', 'Strategy', '0500-01-01T00:00:00Z'),
  ('Space Odyssey', '9780000000009', 'Arthur C. Clarke', 'Science Fiction', '1968-07-01T00:00:00Z'),
  ('Poetic Dreams', '9780000000010', 'Emily Dickinson', 'Poetry', '1890-01-01T00:00:00Z'),
  ('Deep Sea Mystery', '9780000000011', 'Jacques Cousteau', 'Documentary', '1975-08-20T00:00:00Z'),
  ('Urban Life', '9780000000012', 'Jane Austen', 'Drama', '1813-01-28T00:00:00Z'),
  ('Coding for Beginners', '9780000000013', 'Ada Lovelace', 'Educational', '1843-01-01T00:00:00Z'),
  ('Mystic River', '9780000000014', 'Dennis Lehane', 'Thriller', '2001-02-20T00:00:00Z'),
  ('The Silent Patient', '9780000000015', 'Alex Michaelides', 'Psychological Thriller', '2019-02-05T00:00:00Z'),
  ('Infinite Jest', '9780000000016', 'David Foster Wallace', 'Literary Fiction', '1996-02-01T00:00:00Z'),
  ('Brave New World', '9780000000017', 'Aldous Huxley', 'Dystopian', '1932-09-01T00:00:00Z'),
  ('1984', '9780000000018', 'George Orwell', 'Dystopian', '1949-06-08T00:00:00Z'),
  ('To Kill a Mockingbird', '9780000000019', 'Harper Lee', 'Classic', '1960-07-11T00:00:00Z'),
  ('The Catcher in the Rye', '9780000000020', 'J.D. Salinger', 'Classic', '1951-07-16T00:00:00Z');
