const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { validate } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');
const { registerSchema, loginSchema } = require('../validators/usuarioValidator');

// Rotas de autenticação
router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.get('/profile', authenticate, AuthController.getProfile);
router.get('/verify', authenticate, AuthController.verifyToken);
router.post('/logout', authenticate, AuthController.logout);

module.exports = router;
