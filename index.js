const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;

// ✅ Function: check if prime
function isPrime(num) {
  if (num < 2) return false;

  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }

  return true;
}

// =====================================
// ✅ GET API: get primes based on number
// Example: /api/getprime/5 → [1,2,3,5,7]
// =====================================
app.get('/api/getprime/:number', (req, res) => {
  const number = parseInt(req.params.number);

  if (isNaN(number)) {
    return res.status(400).json({
      error: 'Invalid number'
    });
  }

  let primes = [];

  for (let i = 1; i <= number + 2; i++) {
    if (i === 1 || isPrime(i)) {
      primes.push(i);
    }
  }

  res.json({
    input: number,
    primes: primes
  });
});

// =====================================
// ✅ POST API: check if prime
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

  const result = isPrime(Number(number));

  res.json({
    number: number,
    isPrime: result
  });
});

// =====================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});