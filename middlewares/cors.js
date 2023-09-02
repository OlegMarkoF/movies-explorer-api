const allowedCors = [
  'http://markov.project.nomoredomainsicu.ru',
  'http://markov.nomoredomains.xyz',
  'https://markov.project.nomoredomainsicu.ru',
  'https://markov.nomoredomains.xyz',
  'http://localhost:3000',
  'http://localhost:3001',
];

const defaultAllowedMethods = 'GET, HEAD, PUT, PATCH, POST, DELETE';

function cors(req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', defaultAllowedMethods);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
}

module.exports = cors;
