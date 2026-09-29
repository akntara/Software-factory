require('dotenv').config({ path: '.env.test' });

const request = require('supertest');
const app = require('../app');
const prisma = require('../lib/prisma');
const { loadConfig } = require('../config');

describe('API integration', () => {
  const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const emails = [`first-${suffix}@example.com`, `second-${suffix}@example.com`];
  const userIds = [];
  let firstToken;
  let firstTask;

  beforeAll(() => {
    loadConfig();
  });

  afterAll(async () => {
    if (userIds.length > 0) {
      await prisma.task.deleteMany({ where: { user_id: { in: userIds } } });
      await prisma.user.deleteMany({ where: { id: { in: userIds } } });
    }
    await prisma.$disconnect();
  });

  test('serves health and returns standard validation errors', async () => {
    const health = await request(app).get('/health').expect(200);
    expect(health.body).toEqual({ success: true, data: { status: 'ok' } });

    const invalidRegistration = await request(app)
      .post('/api/users/register')
      .send({ email: 'not-an-email', password: 'short' })
      .expect(400);
    expect(invalidRegistration.body.success).toBe(false);
    expect(invalidRegistration.body.error.message).toMatch(/email/);

    const malformedJson = await request(app)
      .post('/api/users/register')
      .set('Content-Type', 'application/json')
      .send('{"email":')
      .expect(400);
    expect(malformedJson.body).toHaveProperty('success', false);
    expect(malformedJson.body).toHaveProperty('error.message');

    await request(app).get('/api/tasks').expect(401);
  });

  test('registers and logs in users, then enforces task ownership through CRUD', async () => {
    const firstRegistration = await request(app)
      .post('/api/users/register')
      .send({ email: emails[0], password: ' correct-password ' })
      .expect(201);
    expect(firstRegistration.body.success).toBe(true);
    expect(firstRegistration.body.data.user).not.toHaveProperty('password_hash');
    expect(firstRegistration.body.data.token).toEqual(expect.any(String));
    userIds.push(firstRegistration.body.data.user.id);
    firstToken = firstRegistration.body.data.token;

    await request(app)
      .post('/api/users/register')
      .send({ email: emails[0], password: ' correct-password ' })
      .expect(409);

    const login = await request(app)
      .post('/api/users/login')
      .send({ email: emails[0], password: ' correct-password ' })
      .expect(200);
    expect(login.body.data.token).toEqual(expect.any(String));

    await request(app)
      .post('/api/users/login')
      .send({ email: emails[0], password: 'correct-password' })
      .expect(401);

    const secondRegistration = await request(app)
      .post('/api/users/register')
      .send({ email: emails[1], password: 'another-password' })
      .expect(201);
    userIds.push(secondRegistration.body.data.user.id);
    const secondToken = secondRegistration.body.data.token;

    const invalidTask = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${firstToken}`)
      .send({ title: 'Missing fields' })
      .expect(400);
    expect(invalidTask.body.success).toBe(false);

    const created = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${firstToken}`)
      .send({
        title: 'First task',
        description: 'Initial description',
        due_date: '2030-01-01T12:00:00.000Z'
      })
      .expect(201);
    firstTask = created.body.data;
    expect(firstTask.status).toBe('pending');
    expect(firstTask.user_id).toBe(userIds[0]);

    const listed = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${firstToken}`)
      .expect(200);
    expect(listed.body.data.map((task) => task.id)).toContain(firstTask.id);

    await request(app)
      .get(`/api/tasks/${firstTask.id}`)
      .set('Authorization', `Bearer ${secondToken}`)
      .expect(404);
    await request(app)
      .delete(`/api/tasks/${firstTask.id}`)
      .set('Authorization', `Bearer ${secondToken}`)
      .expect(404);

    const patched = await request(app)
      .patch(`/api/tasks/${firstTask.id}`)
      .set('Authorization', `Bearer ${firstToken}`)
      .send({ title: 'Updated title', status: 'in_progress' })
      .expect(200);
    expect(patched.body.data.title).toBe('Updated title');
    expect(patched.body.data.status).toBe('in_progress');

    const replaced = await request(app)
      .put(`/api/tasks/${firstTask.id}`)
      .set('Authorization', `Bearer ${firstToken}`)
      .send({
        title: 'Replaced title',
        description: 'Replacement description',
        status: 'done',
        due_date: '2031-02-03T04:05:06.000Z'
      })
      .expect(200);
    expect(replaced.body.data.title).toBe('Replaced title');

    const deleted = await request(app)
      .delete(`/api/tasks/${firstTask.id}`)
      .set('Authorization', `Bearer ${firstToken}`)
      .expect(200);
    expect(deleted.body.data.id).toBe(firstTask.id);

    await request(app)
      .get(`/api/tasks/${firstTask.id}`)
      .set('Authorization', `Bearer ${firstToken}`)
      .expect(404);

    await request(app)
      .get('/api/tasks/not-a-uuid')
      .set('Authorization', `Bearer ${firstToken}`)
      .expect(400);
  });
});
