UPDATE posts 
SET caption = 'ASDF'
WHERE id = '1' AND user_id = '2'
RETURNING *
-- SELECT * FROM posts

