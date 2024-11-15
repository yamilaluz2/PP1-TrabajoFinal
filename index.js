const express = require ("express");
const bodyParser = require ("body-parser");
const PORT = 3000
const UsuarioRouter= require ("./routes/usuarioRoutes");
const PostRouter= require ("./routes/postRoutes");
const FollowingRoutes = require ("./routes/followingRoutes")

const app = express();

app.use(bodyParser.json());
app.use("/api/usuarios", UsuarioRouter);
app.use("/api/posts", PostRouter );
app.use("/api/following",FollowingRoutes);

app.listen (PORT, ()=> {
    console.log(`aplicacion corriendo en puerto ${PORT}`)
})