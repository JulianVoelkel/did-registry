const express = require('express');
const router = express.Router();
const validationService = require('../services').validation;
const config = require('../config/config');


/**
 * @swagger
 *
 * '/api/v1/validation/{aktdid}/{pid}':
 *   post:
 *     tags:
 *       - Register PID
 *     summary: Registers a new phyisicalID
 *     consumes: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: aktdid
 *         in: path
 *         required: true
 *         type: string
 *       - name: pid
 *         in: path
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/aktdid'
 *     responses:
 *       '200':
 *         description: OK
 */
router.post('/:aktdid/:pid', validationService.registerPID);

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
