import jwt from 'jsonwebtoken';


export default function(req, res, next){
  const { session } = req.cookies;
  const payload = jwt.verify(session, process.env.APP_SECRET);
  console.log(payload);
  req.user = payload;
  next();
}
