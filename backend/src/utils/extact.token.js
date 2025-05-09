const extractToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error("Authorization header is missing");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Token is missing");
  }

  return token;
};

export default extractToken;
