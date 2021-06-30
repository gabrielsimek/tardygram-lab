SELECT 
posts.id, 
posts.photo_url,
posts.caption,
posts.tags,
users.username,
users.profile_photo_url
FROM posts
INNER JOIN users ON users.id = posts.user_id
WHERE posts.id = '1'