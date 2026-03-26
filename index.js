const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// ✅ Function: check if prime (optimized)
function isPrime(num) {
  if (num < 2) return false;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }

  return true;
}

// =====================================
// ✅ ROOT
// =====================================
app.get('/', (req, res) => {
  res.send('Prime API is running 🚀');
});

// =====================================
// ✅ GET API: return FIRST N prime numbers
// Example: /api/getprime/5 → [2,3,5,7,11]
// =====================================
app.get('/api/getprime/:number', (req, res) => {
  const count = parseInt(req.params.number);

  if (isNaN(count) || count <= 0) {
    return res.status(400).json({
      error: 'Invalid number'
    });
  }

  let primes = [];
  let num = 2;

  while (primes.length < count) {
    if (isPrime(num)) {
      primes.push(num);
    }
    num++;
  }

  res.json({
    input: count,
    primes: primes
  });
});

// =====================================
// ✅ POST API: readable prime check
// =====================================
app.post('/api/checkprime', (req, res) => {
  const { number } = req.body;

  if (number === undefined) {
    return res.status(400).json({
      error: 'Number is required'
    });
  }

  if (isNaN(number)) {
    return res.status(400).json({
      error: 'Invalid number'
    });
  }

  const num = Number(number);

  if (isPrime(num)) {
    return res.send(`${num} is a prime number`);
  } else {
    return res.send(`${num} is not a prime number`);
  }
});

// =====================================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});