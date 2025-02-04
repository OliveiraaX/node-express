import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const auth = (req, res, next) => {
  // autorizar acesso
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Acesso não permitido" });
  }
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    console.log(decoded);
    req.userId = decoded.id;
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Token Invalido" });
  }
  next();
};

export default auth;
