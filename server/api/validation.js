const express = require('express');
const router = express.Router();
const validationService = require('../services').validation;
const config = require('../config/config');


/**
 * @swagger
 *
 * '/api/v1/validation/register/{aktdid}':
 *   post:
 *     tags:
 *       - Register PID
 *     summary: Registers a new phyisicalID
 *     consumes: []
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: path
 *          name: aktdid
 *          required: true
 *          type: string
 *        - in: body
 *          name: pid
 *          description: The PID to register.
 *          schema:
 *            type: object
 *            required:
 *              - pid
 *            properties:
 *              pid:
 *                type: string
 *     responses:
 *       '200':
 *         description: OK
 */
router.post('/register/:aktdid', validationService.registerPID);

/**
 * @swagger
 *
 * '/api/v1/validation/bulk/{aktdid}':
 *   post:
 *     tags:
 *       - Register multiple PIDs
 *     summary: Bulk registers new phyisicalIDs
 *     consumes: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: aktdid
 *         in: path
 *         required: true
 *         type: string
 *       - name: pids
 *         in: body
 *         required: true
 *         type: array
 *         items: 
 *           type: integer 
 *     responses:
 *       '200':
 *         description: OK
 */
router.post('/bulk/:aktdid', validationService.registerMultiple);

/**
 * @swagger
 *
 * '/api/v1/validation':
 *   get:
 *     tags:
 *       - Create AktDID
 *     summary: Create a new Activation Device DID
 *     consumes: []
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/', validationService.createAktDID);

module.exports = router;
