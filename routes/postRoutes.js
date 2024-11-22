const express = require("express");
const router = express.Router();
const postController = require("../controllers/postControllers");
const auth = require("../middlewares/authmiddleware");

/**
 * @swagger
 * /Posts/createPost:
 *   post:
 *     tags: [Posts]
 *     summary: Creation of new Post
 *     security:
 *       - ApiTokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *                      
 *     responses:
 *       201:
 *         description: Post creado satifactoriamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 titulo:
 *                   type: string
 *                 contenido:
 *                   type: string
 *                 
 *       400:
 *         description: Faltan datos de completar
 *       500:
 *         description: Internal server error
 */ 

router.post("/createPost",auth, postController.createPost);

/**
 * @swagger
 * /Posts/listPost:
 *   get:
 *     tags: [Posts]
 *     summary: List post with pagination
 *     security:
 *       - ApiTokenAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number for pagination
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of Post per page
 *     responses:
 *       200:
 *         description: A paginated list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 itemsPerPage:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       id_usuarios:
 *                         type: integer
 *                       titulo:
 *                         type: string
 *                       contenido:
 *                         type: string
 *                         
 *       400:
 *         description: Bad request - page or limit must be positive
 *       500:
 *         description: Internal server error
 */


router.get("/listPost",auth, postController.listPost);

/**
 * @swagger
 * /Posts/editPost/{id}:
 *   put:
 *     tags: [Posts]
 *     summary: edit a post
 *     security:
 *       - ApiTokenAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: True
 *         schema:
 *           type: integer       
 *         description: id de post
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *               
 *     responses:
 *       200:
 *         description: post actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     id_usuario:
 *                       type: integer
 *                     titulo:
 *                       type: string
 *                     contenido:
 *                       type: string
 *       400:
 *         description: Faltan datos de completar.
 *       403:
 *         description: error de acceso.
 *       404:
 *         description: No se encontro el post
 *       500:
 *         description: Error interno del servidor.
 */

router.put("/editPost/:id",auth,postController.editPost);

/**
 * @swagger
 * /Posts/deletePost/{id}:
 *   delete:
 *     tags: [Posts]
 *     summary: delete a post
 *     security:
 *       - ApiTokenAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: True
 *         schema:
 *           type: integer       
 *         description: id de post                   
 *     responses:
 *       200:
 *         description: post eliminado correctamente.
 *       400:
 *         description: Faltan datos de completar.
 *       403:
 *         description: error de acceso.
 *       404:
 *         description: No se encontro el post.
 *       500:
 *         description: Error interno del servidor.
 */

router.delete("/deletePost/:id",auth, postController.deletePost);

/**
 * @swagger
 * /Posts/viewPost/{id}:
 *   get:
 *     tags: [Posts]
 *     summary: post especifico
 *     security:
 *       - ApiTokenAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: True
 *         schema:
 *           type: integer
 *          
 *     responses:
 *       200:
 *         description: operacion exitosa!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     id_usuario:
 *                       type: integer
 *                     titulo:
 *                       type: string
 *                     contenido:
 *                       type: string
 *                         
 *       403:
 *         description: No tienes permisos.
 *       404:
 *         description: No se encontro el post
 *       500:
 *         description: Internal server error
 */


router.get("/viewPost/:id",auth, postController.viewPost);

/**
 * @swagger
 * /Posts/userPost/{id}:
 *   get:
 *     tags: [Posts]
 *     summary: post de usuarios.
 *     security:
 *       - ApiTokenAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: True
 *         schema:
 *           type: integer
 *          
 *     responses:
 *       200:
 *         description: operacion exitosa!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     id_usuario:
 *                       type: integer
 *                     titulo:
 *                       type: string
 *                     contenido:
 *                       type: string
 *                         
 *       403:
 *         description: No tienes permisos.
 *       404:
 *         description: No se encontro el post
 *       500:
 *         description: Internal server error
 */

router.get("/userpost/:id",auth , postController.userPost);



module.exports = router;