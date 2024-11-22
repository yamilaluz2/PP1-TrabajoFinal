const db = require('../models');
const Following = db.Following;

const follow = async (req, res) => {
    const id_usuario = req.user.id;
    const { id_usuario_seguido } = req.body;    

    if (id_usuario == id_usuario_seguido) {
        return res.status(400).send({ message: "No puedes seguirte a ti mismo" });
    }

    try {
        await Following.create({ id_usuario, id_usuario_seguido });
        res.status(201).send({ message: "Has comenzado a seguir al usuario" });
    } catch (error) {
        if(error.name === "SequelizeUniqueConstraintError"){
            res.status(401).send({message: "Ya sigues a este usuario"});
        }
        else{
            res.status(500).send({ 
                error: error.message,
                tipo: error.name 
            });
        }
    }
        
};

const unFollow = async (req, res) => {
    const id_usuario = req.user.id;
    const { id_usuario_seguido } = req.body;

    try {
        
        const unFollows = await db.Following.destroy({
            where: {
                id_usuario: id_usuario,
                id_usuario_seguido: id_usuario_seguido
            }
        });

        if (unFollows === 0) {
            return res.status(404).send({ error: 'Relación de seguimiento no encontrada' });
        }

        res.status(200).send({ message: 'Relación de seguimiento eliminada' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};



const following = async(req, res) => {
    const id_usuario = req.user.id;

    try {
        const usuario = await db.Usuario.findByPk(id_usuario, {
            include: [{
                model: db.Usuario,
                as: 'seguidos', 
                attributes: ['id', 'nombre', 'nickname'],
                through: { attributes: [] }
            }, ],
        });

        if (!usuario) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }
        

        res.status(200).send(usuario.seguidos); 
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


const followers = async (req,res)=>{
    const id_usuario = req.user.id;

    try {
        const usuario = await db.Usuario.findByPk(id_usuario, {
            include: [{
                model: db.Usuario,
                as: 'seguidores', 
                attributes: ['id', 'nombre', 'nickname'],
                through: { attributes: [] }
            }, ],
        });

        if (!usuario) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }
        if (usuario.seguidores.length === 0){
            return res.status(200).send({error:'No hay seguidores que mostrar'})
        }

        res.status(200).send(usuario.seguidores); 
    } catch (error) {
        res.status(500).send({ error: error.message });
    }


    
}



const mutual = async (req, res) => {
    const id_usuario = req.user.id;

    try {
        
        const usuario = await db.Usuario.findByPk(id_usuario, {
            include: [{
                model: db.Usuario,
                as: 'seguidos',
                attributes: ['id', 'nombre', 'nickname'],
                through: { attributes: [] } 
            }, {
                model: db.Usuario,
                as: 'seguidores',
                attributes: ['id', 'nombre', 'nickname'],
                through: { attributes: [] } 
            }]
        });

        if (!usuario) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }
        
        const seguidoresMap = new Map(usuario.seguidores.map(seguido => [seguido.id, seguido]));
        const mutuals = usuario.seguidos.filter(seguidor => seguidoresMap.has(seguidor.id));

        
        if (mutuals.length=== 0){
            return res.status(200).send({error: "No hay seguidores mutuos"})
        }
        res.status(200).send(mutuals);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


    



module.exports = {
    follow, unFollow, following , followers, mutual 
};