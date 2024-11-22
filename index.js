const express = require ("express");
const bodyParser = require ("body-parser");
const PORT = 3000
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swaggerConfig");
const path = require("path");
const UsuarioRouter= require ("./routes/usuarioRoutes");
const PostRouter= require ("./routes/postRoutes");
const FollowingRoutes = require ("./routes/followingRoutes")

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/usuarios", UsuarioRouter);
app.use("/api/posts", PostRouter );
app.use("/api/following",FollowingRoutes);

app.listen (PORT, ()=> {
    console.log(`aplicacion corriendo en puerto ${PORT}`)
})