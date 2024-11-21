const db = require('../models');
const Post = db.Post;
const Following = db.Following

const createPost = async (req,res)=>{
    const id_usuario = req.user.id;
    const {titulo,contenido}= req.body;
    if (!id_usuario || !titulo || !contenido){
        return res.status(400).send({ message: "Faltan datos de completar" });
    }
    try{
        const post = await Post.create({id_usuario, titulo, contenido});
        return res.status(201).send(post);
    } catch (error) {
        return res.status(500).send({
        message: error.message,
        nombre: error.name
        });
    }

};

const listPost = async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        if (page < 1 || limit < 1) {
            return res.status(400).send({
                message: "Page and limit must be positive"
            })
        }

        const offset = (page - 1) * limit;

        const { count, rows } = await Post.findAndCountAll({
            where: {
                id_usuario: req.user.id  
            },
            limit: limit,
            offset: offset
        });

        return res.status(200).send({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            itemsPerPage: limit,
            data: rows
        })

    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const editPost = async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.id;
    
    try {
        const post = await Post.findByPk(postId);
        
        if (!post) {
            return res.status(404).send({ message: "No se encontró el post." });
        }

        
        if (post.id_usuario === userId) {

            
            const update = await Post.update(req.body, {
                where: { id: postId }
            });

            
            if (update[0]) {
                const postUpdated = await Post.findByPk(postId);
                res.status(200).send({
                    message: "Post actualizado correctamente.",
                    post: postUpdated
                });
            } else {
                res.status(404).send({ message: "No se pudo actualizar el post." });
            }
        } else {
            return res.status(403).send({ message: "Solo el creador puede modificar el post." });
        }
    } catch (error) {
        res.status(500).send({ message: "Error interno del servidor." });
    }
};

        

const deletePost = async (req,res)=>{
    const userId = req.user.id;
    const postId = req.params.id;
    try{
        const post = await Post.findByPk(postId);
        if (!post){
            return res.status(404).send({message:"Post no existe"})
        };
        if (post.id_usuario !== userId){
            return res.status(403).send({message:"No tienes permisos para eliminar el post"})
        };

        const postDelete = await Post.destroy({
            where:{id: postId}
        });
        if (postDelete > 0){
            return res.status(200).send({message: "eliminado"});
        
        }else {
            return res.status(404).send({message:"Not found"})};
    }catch(error){
        return res.status(500).send({message:"Error interno del servidor"});
    }     
    

}


const viewPost = async(req, res) => {
    
    const postId = req.params.id;
    try {
        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).send({ message: "Post no encontrado" });
        }
        if (post.id_usuario === req.user.id) {
            
            return res.status(200).send(post);
        }
        const isFollower = await Following.findOne({
            where: {
                id_usuario: req.user.id ,
                id_usuario_seguido:post.id_usuario,    
            }
        });
        if (isFollower) {
            
            return res.status(200).send(post);
        } else {
            
            return res.status(404).send({ message: "Solo pueden verlo mis seguidores" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error interno del servidor" });
    }
};




const userPost = async (req,res)=>{
    
    const userId= req.params.id;
    try{
        
        const isFollower= await Following.findOne({
            where:{
                id_usuario: req.user.id,
                id_usuario_seguido: userId
            }
        });
        if (!isFollower){
            return res.status(403).send({message:"Post solo para seguidores."})

        };   
        const post = await Post.findAll({where:{
            id_usuario:userId}});

        if (post.length === 0){
            return res.status(404).send({message:"No hay post que mostrar."})

        };
        return res.status(200).send(post);

   } catch(error){
    return res.status(500).send({message:"error interno del servidor"})
   };

};    
   

module.exports = { createPost, listPost, editPost, deletePost, viewPost, userPost};