SELECT 
caption,
COUNT(comments.comment) as comments
 FROM posts
INNER JOIN comments ON comments.post_id = posts.id
GROUP BY posts.caption
ORDER BY comments DESC
LIMIT 10