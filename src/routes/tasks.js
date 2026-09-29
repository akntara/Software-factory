const express = require('express');
const prisma = require('../lib/prisma');
const { AppError } = require('../errors');
const asyncHandler = require('../middleware/async-handler');
const authenticate = require('../middleware/authenticate');
const { validateBody, parseTaskCreate, parseTaskUpdate } = require('../middleware/validate');

const router = express.Router();

function taskId(req) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(req.params.id)) {
    throw new AppError(400, 'id must be a valid UUID');
  }
  return req.params.id;
}

async function findOwnedTask(id, userId) {
  const task = await prisma.task.findFirst({ where: { id, user_id: userId } });
  if (!task) {
    throw new AppError(404, 'Task not found');
  }
  return task;
}

router.use(authenticate);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const tasks = await prisma.task.findMany({
      where: { user_id: req.user.id },
      orderBy: { due_date: 'asc' }
    });
    res.json({ success: true, data: tasks });
  })
);

router.post(
  '/',
  validateBody(parseTaskCreate),
  asyncHandler(async (req, res) => {
    const task = await prisma.task.create({
      data: { ...req.validatedBody, user_id: req.user.id }
    });
    res.status(201).json({ success: true, data: task });
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const task = await findOwnedTask(taskId(req), req.user.id);
    res.json({ success: true, data: task });
  })
);

router.put(
  '/:id',
  validateBody((body) => parseTaskUpdate(body, true)),
  asyncHandler(async (req, res) => {
    const id = taskId(req);
    await findOwnedTask(id, req.user.id);
    const task = await prisma.task.update({
      where: { id },
      data: req.validatedBody
    });
    res.json({ success: true, data: task });
  })
);

router.patch(
  '/:id',
  validateBody(parseTaskUpdate),
  asyncHandler(async (req, res) => {
    const id = taskId(req);
    await findOwnedTask(id, req.user.id);
    const task = await prisma.task.update({
      where: { id },
      data: req.validatedBody
    });
    res.json({ success: true, data: task });
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = taskId(req);
    await findOwnedTask(id, req.user.id);
    const task = await prisma.task.delete({ where: { id } });
    res.json({ success: true, data: task });
  })
);

module.exports = router;
