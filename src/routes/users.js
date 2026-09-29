const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const prisma = require('../lib/prisma');
const { loadConfig } = require('../config');
const { AppError } = require('../errors');
const asyncHandler = require('../middleware/async-handler');
const { validateBody, parseRegistration, parseLogin } = require('../middleware/validate');

const router = express.Router();
const publicUserFields = {
  id: true,
  email: true,
  created_at: true
};

function createToken(userId) {
  return jwt.sign({}, loadConfig().jwtSecret, {
    subject: userId,
    expiresIn: '1d'
  });
}

router.post(
  '/register',
  validateBody(parseRegistration),
  asyncHandler(async (req, res) => {
    const { email, password } = req.validatedBody;
    const password_hash = await bcrypt.hash(password, 12);
    let user;
    try {
      user = await prisma.user.create({
        data: { email, password_hash },
        select: publicUserFields
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new AppError(409, 'An account with this email already exists');
      }
      throw error;
    }

    res.status(201).json({
      success: true,
      data: { user, token: createToken(user.id) }
    });
  })
);

router.post(
  '/login',
  validateBody(parseLogin),
  asyncHandler(async (req, res) => {
    const { email, password } = req.validatedBody;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw new AppError(401, 'Invalid email or password');
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at
        },
        token: createToken(user.id)
      }
    });
  })
);

module.exports = router;
