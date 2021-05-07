const jwt = require("jsonwebtoken");
const db = require("./db/index");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);

const SIGNIN_ID = "test"
const PASSWORD = "test"
const KEY = "mjmf2i0j20j"

const TOKEN = jwt.sign(
  {
    signin_id: SIGNIN_ID,
    role_id: 1,
    merchant_id: 1,
    exp: Math.round(new Date(2040, 12, 31).getTime()/1000)
  },
  KEY
);

server.post("/auth/signin", (req, res) => {
  const { signin_id, password } = req.body;
  if (signin_id !== SIGNIN_ID || password !== PASSWORD) {
    return res.status(401).json({ code: 1234, message: `signin_id: ${PASSWORD} password: ${PASSWORD}` });
  }

  res.json({access_token: TOKEN});
});

server.post("/auth/reset-password", (req, res) => {
  const { old_password } = req.body;
  if (old_password !== PASSWORD) {
    return res.status(401).json({ code: 131, message: `password: ${PASSWORD}` });
  }

  res.json({access_token: TOKEN});
});

server.use(router);
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
