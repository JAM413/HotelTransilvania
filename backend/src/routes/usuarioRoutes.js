const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');
const { validate } = require('../middleware/validation');
const { authenticate, authorize } = require('../middleware/auth');
const { updateSchema, changePasswordSchema } = require('../validators/usuarioValidator');

// Rotas de usuários
router.get('/', authenticate, UsuarioController.listar);
router.get('/:id', authenticate, UsuarioController.buscarPorId);
router.put('/:id', authenticate, authorize, validate(updateSchema), UsuarioController.atualizar);
router.put('/:id/change-password', authenticate, authorize, validate(changePasswordSchema), UsuarioController.alterarSenha);
router.delete('/:id', authenticate, authorize, UsuarioController.desativar);
router.put('/:id/activate', authenticate, UsuarioController.ativar);

module.exports = router;
