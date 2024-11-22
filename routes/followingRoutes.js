const express = require("express");
const router = express.Router();
const followingController = require("../controllers/followingControllers");
const auth = require("../middlewares/authmiddleware");

/**
 * @swagger
 * /following/follow:
 *   post:
 *     tags: [Following]
 *     summary: seguir a un usuarios.
 *     security:
 *       - ApiTokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario_seguido:
 *                 type: integer
 *                        
 *     responses:
 *       201:
 *         description: has empezado a seguir al usuario.                     
 *       400:
 *         description: No puedes seguirte a ti mismo.
 *       401:
 *         description: ya sigues a este usuario.
 *       500:
 *         description: Internal server error
 */

router.post("/follow",auth, followingController.follow);

/**
 * @swagger
 * /following/unFollow:
 *   delete:
 *     tags: [Following]
 *     summary: dejar de seguir a un usuarios.
 *     security:
 *       - ApiTokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario_seguido:
 *                 type: integer
 *                        
 *     responses:
 *       201:
 *         description: se dejo de seguir al usuario.                     
 *       404:
 *         description: No se encontro relacion de seguimiento.
 *       500:
 *         description: Internal server error
 */

router.delete("/unFollow",auth, followingController.unFollow);

/**
 * @swagger
 * /following/following:
 *   get:
 *     tags: [Following]
 *     summary: Lista de personas seguidas.
 *     security:
 *       - ApiTokenAuth: []                        
 *     responses:
 *       200:
 *         description: Lista de usuarios seguidos.
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nombre:
 *                  type: string
 *                nickname:
 *                  type: string
 *                id:
 *                  type:integer                              
 *       404:
 *         description: usuario no encontrado.
 *       500:
 *         description: Internal server error
 */


router.get("/following",auth,followingController.following);


/**
 * @swagger
 * /following/followers:
 *   get:
 *     tags: [Following]
 *     summary: Lista de personas que me siguen.
 *     security:
 *       - ApiTokenAuth: []                        
 *     responses:
 *       200:
 *         description: Lista de usuarios que me siguen.
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nombre:
 *                  type: string
 *                nickname:
 *                  type: string
 *                id:
 *                  type:integer                              
 *       404:
 *         description: usuario no encontrado.
 *       500:
 *         description: Internal server error
 */

router.get("/followers",auth, followingController.followers);

/**
 * @swagger
 * /following/mutual:
 *   get:
 *     tags: [Following]
 *     summary: seguidor mutuo.
 *     security:
 *       - ApiTokenAuth: []                        
 *     responses:
 *       200:
 *         description: seguidor mutuo.
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nombre:
 *                  type: string
 *                nickname:
 *                  type: string
 *                id:
 *                  type:integer                              
 *       404:
 *         description: usuario no encontrado.
 *       500:
 *         description: Internal server error
 */


router.get("/mutual",auth, followingController.mutual);


module.exports = router;