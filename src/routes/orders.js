const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/auth');

// Rutas protegidas
router.post('/', authenticateToken, orderController.createOrder);
router.get('/', authenticateToken, orderController.getUserOrders);
router.get('/:id', authenticateToken, orderController.getOrderDetails);

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: integer
 *           description: ID del producto
 *         quantity:
 *           type: integer
 *           description: Cantidad del producto
 *           minimum: 1
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la orden
 *         userId:
 *           type: integer
 *           description: ID del usuario que realizó la orden
 *         status:
 *           type: string
 *           enum: [PENDING, COMPLETED, CANCELED, PAYMENT_FAILED]
 *           description: Estado de la orden
 *         totalAmount:
 *           type: number
 *           format: float
 *           description: Monto total de la orden
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         OrderItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         User:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             fullName:
 *               type: string
 *             email:
 *               type: string
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear una orden con procesamiento de pago (operación transaccional atómica)
 *     description: |
 *       Crea una nueva orden procesando el pago de manera atómica. Si cualquier paso falla (stock insuficiente, pago rechazado),
 *       toda la transacción se revierte completamente.
 *
 *       **Pasos de la transacción:**
 *       1. Verificación de stock disponible
 *       2. Cálculo del precio total
 *       3. Procesamiento del pago via API externa
 *       4. Actualización del stock de productos
 *       5. Creación de la orden y sus items
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - paymentMethod
 *               - paymentDetails
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/OrderItem'
 *                 description: Lista de productos a ordenar
 *               paymentMethod:
 *                 type: string
 *                 enum: [CreditCard]
 *                 description: Método de pago a utilizar
 *               paymentDetails:
 *                 type: object
 *                 required:
 *                   - cardToken
 *                   - currency
 *                 properties:
 *                   cardToken:
 *                     type: string
 *                     description: Token de la tarjeta de crédito
 *                   currency:
 *                     type: string
 *                     description: Moneda del pago (ej. USD, EUR)
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       $ref: '#/components/schemas/Order'
 *       400:
 *         description: Datos inválidos o stock insuficiente
 *       402:
 *         description: Pago rechazado
 *       401:
 *         description: No autorizado
 */


module.exports = router;
