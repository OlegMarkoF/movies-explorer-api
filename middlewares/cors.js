const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://markov.nomoredomains.xyz',
  'https://markov.nomoredomains.xyz',
];

const defaultAllowedMethods = [
  'GET',
  'HEAD',
  'PUT',
  'PATCH',
  'POST',
  'DELETE',
];

function cors(req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', defaultAllowedMethods.join(','));
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
}

module.exports = cors;
