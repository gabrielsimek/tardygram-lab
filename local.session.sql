SELECT 
caption, posts.photo_url as photoUrl, posts.tags, posts.user_id, 
COUNT(comments.comment) as comments
 FROM posts
INNER JOIN comments ON comments.post_id = posts.id
GROUP BY posts.id
ORDER BY comments DESC
LIMIT 10