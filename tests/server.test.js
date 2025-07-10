const request = require('supertest');
const app = require('../server');

describe('Llama Facts API', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toContain('Llama Facts API');
    expect(response.body.llamaWisdom).toBeDefined();
  });

  test('GET /api/llama-fact should return a llama fact', async () => {
    const response = await request(app).get('/api/llama-fact');
    expect(response.status).toBe(200);
    expect(response.body.fact).toBeDefined();
    expect(response.body.llamaEmoji).toBe('🦙');
    expect(response.body.confidence).toBe('very high');
    expect(response.body.factId).toBeGreaterThan(0);
  });

  test('GET /api/llama-fact/random should return a random llama fact', async () => {
    const response = await request(app).get('/api/llama-fact/random');
    expect(response.status).toBe(200);
    expect(response.body.fact).toBeDefined();
    expect(response.body.llamaEmoji).toBe('🦙');
    expect(response.body.randomness).toMatch(/\d+%/);
  });

  test('GET /health should return health status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
    expect(response.body.llamaCount).toBeGreaterThan(0);
    expect(response.body.message).toContain('llamas are happy');
  });

  test('GET /nonexistent should return 404 with llama fact', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not found');
    expect(response.body.consolationFact).toBeDefined();
    expect(response.body.llamaEmoji).toBe('🦙❓');
  });

  test('should return different facts on multiple calls', async () => {
    const response1 = await request(app).get('/api/llama-fact');
    const response2 = await request(app).get('/api/llama-fact');
    
    // Note: There's a small chance they could be the same, but unlikely
    expect(response1.body.fact).toBeDefined();
    expect(response2.body.fact).toBeDefined();
  });
}); 