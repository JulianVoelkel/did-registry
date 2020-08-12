const express = require('express');
const router = express.Router();
const registrationService = require('../services').registration;
const config = require('../config/config');


/**
 * @swagger
 *
 * '/api/v1/registration/{aktdid}':
 *   post:
 *     tags:
 *       - Register Device-DID
 *     summary: Registers a new Device-DID
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
router.post('/:aktdid', registrationService.registerDID);


module.exports = router;
