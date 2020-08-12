const express = require('express');
const router = express.Router();
const didService = require('../services').did;
const config = require('../config/config');


/**
 * @swagger
 *
 * '/api/v1/dids/{did}/document':
 *   get:
 *     tags:
 *       - DID Document
 *     summary: Get the DID-Document of a registered DID
 *     consumes: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: did
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/did'
 */
router.get('/:did/document', didService.getDIDDocument);

/**
 * @swagger
 *
 * '/api/v1/dids/attribute/{did}':
 *   post:
 *     tags:
 *       - DID Attribute
 *     summary: Set an attribute of a did
 *     consumes: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: did
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: OK
 */
router.post('/attribute/:did', didService.setAttribute);

module.exports = router;
