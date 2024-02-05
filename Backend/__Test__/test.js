const mongoose = require('mongoose');
const app = require('../server'); // Import de l'application Express
const request = require('supertest');

describe('Tests unitaires pour le backend', () => {
  // Cas limite
  it('devrait retourner une réponse OK pour la page d\'accueil', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  // Cas complexes
  it('devrait créer une nouvelle tâche', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'Nouvelle tâche', description: 'Description de la tâche' });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('title', 'Nouvelle tâche');
  });

  it('devrait récupérer toutes les tâches', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  
});
