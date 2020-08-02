const express = require('express');
const router = express.Router();
const registrationService = require('../services').registration;
const config = require('../config/config');


/**
 * @swagger
 *
 * '/api/v1/registration/{pid}/{aktdid}':
 *   post:
 *     tags:
 *       - Register Device-DID
 *     summary: Registers a new Device-DID
 *     consumes: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         type: string
 *       - name: aktdid
 *         in: path
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/devicedid'
 *     responses:
 *       '200':
 *         description: OK
 */
router.post('/:pid/:aktdid', registrationService.registerDID);


module.exports = router;
