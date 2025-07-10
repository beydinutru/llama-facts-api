const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Our precious llama facts collection
const llamaFacts = [
  "Llamas can carry about 25 to 30 percent of their body weight for 8 to 13 km.",
  "A baby llama is called a cria and can walk within an hour of birth.",
  "Llamas have been used as pack animals for over 4,000 years in South America.",
  "A group of llamas is called a herd, and they're very social animals.",
  "Llamas can live up to 20-25 years with proper care.",
  "Llamas are excellent swimmers and enjoy cooling off in water.",
  "They communicate through humming sounds when they're content.",
  "Llamas have split upper lips that help them grab food precisely.",
  "They can spit up to 10 feet when annoyed (but mostly at other llamas).",
  "Llamas have excellent eyesight and can spot a predator from miles away.",
  "Their soft padded feet make them excellent for mountain terrain.",
  "Llamas are intelligent and can learn simple tasks quickly.",
  "They have a natural instinct to protect smaller animals like sheep.",
  "Llamas come in over 20 different colors and patterns.",
  "A llama's normal body temperature is slightly higher than humans at 99.9°F."
];

// Routes
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to the Llama Facts API! 🦙",
    endpoints: {
      llamaFact: "/api/llama-fact",
      randomFact: "/api/llama-fact/random",
      health: "/health"
    },
    llamaWisdom: "Life is like a llama - sometimes you spit, sometimes you hum."
  });
});

app.get('/api/llama-fact', (req, res) => {
  const randomIndex = Math.floor(Math.random() * llamaFacts.length);
  const fact = llamaFacts[randomIndex];
  
  res.json({
    fact: fact,
    factId: randomIndex + 1,
    llamaEmoji: "🦙",
    confidence: "very high",
    timestamp: new Date().toISOString()
  });
});

app.get('/api/llama-fact/random', (req, res) => {
  // This endpoint does the same thing but with extra steps for fun
  const llamaHappiness = Math.random();
  const factIndex = Math.floor(llamaHappiness * llamaFacts.length);
  
  res.json({
    fact: llamaFacts[factIndex],
    factId: factIndex + 1,
    llamaEmoji: "🦙",
    confidence: llamaHappiness > 0.8 ? "extremely high" : "very high",
    randomness: Math.round(llamaHappiness * 100) + "%",
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    llamaCount: llamaFacts.length,
    message: "All llamas are happy and healthy! 🦙✨"
  });
});

// 404 handler with llama wisdom
app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    message: "This endpoint doesn't exist, but here's a llama fact anyway!",
    consolationFact: llamaFacts[Math.floor(Math.random() * llamaFacts.length)],
    llamaEmoji: "🦙❓"
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong",
    message: "Even llamas have bad days sometimes 🦙😔",
    llamaAdvice: "Try taking a deep breath and humming softly"
  });
});

app.listen(PORT, () => {
  console.log(`🦙 Llama Facts API is running on port ${PORT}`);
  console.log(`📖 Ready to serve ${llamaFacts.length} amazing llama facts!`);
  console.log(`🌟 Visit http://localhost:${PORT} to get started`);
});

module.exports = app; 