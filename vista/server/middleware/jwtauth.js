const authenticate = require('../config/jwtConfig');

exports.login = (req, res) => {
  const token = authenticate.getToken({ email: req.user.email });
  res
    .json({ success: true, token: token, msg: 'Logged In', details: req.user })
    .cookie('access_token', token, { httpOnly: true, sameSite: true });
};

exports.ologin = (req, res) => {
  const token = authenticate.getToken({ email: req.user.email });
  res
    .cookie('access_token', token, { httpOnly: true, sameSite: true })
    .redirect('http://localhost:3000/dashboard');
};

const { verifyUser } = authenticate;
exports.verify = verifyUser;
