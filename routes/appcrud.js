const express = require("express");
const router = express.Router();
const controllers = require('../controller/appcrud')

/**
 * @swagger
 *  components:
 *      schemas:
 *          appcrud:
 *              type: object
 *              properties:
 *                  name: 
 *                      type: string 
 *                  email: 
 *                      type: string
 *                  password: 
 *                      type: string
 */



/** 
 *@swagger
 * /api/getallapps: 
 *  get:
 *      summary: This api used to get all the appcrud
 *      description: This api used to get all the appcrud
 *      responses:
 *          200:
 *              description: to test get method
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/appcrud'
*/
router.get("/getallapps",controllers.getapps)

/** 
 *@swagger
 * /api/getapp/{id}: 
 *  get:
 *      summary: This api used to get a single appcrud
 *      description: This api used to get a single appcrud
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Object ID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: to test get method
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/appcrud' 
*/
router.get("/getapp/:id",controllers.redis_cache,controllers.getoneapp)
router.get("/try",controllers.redis_cache)

/** 
 *@swagger
 * /api/create: 
 *  post:
 *      summary: This used to create a new appcrud.
 *      description: This used to create a new appcrud.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#components/schemas/appcrud' 
 *      responses:
 *          200:
 *              description: successfully submitted
*/
router.post("/create",controllers.createapp)

/** 
 *@swagger
 * /api/updateapp/{id}: 
 *  put:
 *      summary: This used to update a appcrud.
 *      description: This used to update a appcrud.
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Object ID required
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#components/schemas/appcrud' 
 *      responses:
 *          200:
 *              description: update successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/appcrud'
*/
router.put("/updateapp/:id",controllers.updateapp)

/** 
 *@swagger
 * /api/deleteapp/{id}: 
 *  delete:
 *      summary: This used to delete a appcrud.
 *      description: This used to delete a appcrud.
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Object ID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: delete successfully
*/
router.delete("/deleteapp/:id",controllers.deleteapp)
module.exports = router;