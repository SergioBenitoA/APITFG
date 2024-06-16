const express = require('express')
const encript = require('../../events/encrypt.cjs')
const pool = require('../../bbdd/pool.cjs')
const router = express.Router()


//All users Sergio
router.get('/userssergio', async (req, res) => {
    const ArrayUsers = await pool.getUsersSergio()
    res.status(200).json(ArrayUsers)
})

// Get one user Sergio by ID
router.get('/userssergio/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await pool.getUserByIdSergio(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({Message: 'Error'})
    }
})

// Obtener un usuario por su correo
router.get('/obtenerusuario/:correo', async (req, res) => {
    try {
        const { correo } = req.params
        const user = await pool.getUserByCorreoSergio(correo)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({Message: 'Error'})
    }
})

//Crear el login Sergio

router.post('/loginsergio', async (req,res) => {
    try {
        if(req.body){
            const { email, password } = req.body

            const user = await pool.getUserByCorreoSergio(email)
            
            if (await encript.compare(password, user.contrasena)){
                res.status(202).json({Message: true})
            }
            else {
                res.status(404).json({Message: false})
            }
        }
        else {
            res.status(406).json({Message: 'Necesitas un cuerpo'})
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

// Crear usuario Sergio

router.post('/userssergio', async (req, res) => {
    try {
        const {nombre, correo, telefono, contrasena_nc} = req.body
        const password = await encript.encrypt(contrasena_nc)
        
        const createuser = await pool.createUserSergio(nombre, correo, telefono, password)
        if(createuser.response === 'ok'){
            res.status(201).json(createuser)
        } else {
            
            res.status(404).send('No se ha podido crear el usuario.')
        }
        
    } catch (error) {
        console.error('Error al crear usuario:', error)
        res.status(404).send('No se ha podido crear el usuario.')
    }

})

// Crear reservas Sergio

router.post('/reservas', async (req, res) => {
    try {
        const { codigo, dni, matricula, npersonas, fechaentrada, fechasalida, idusuario, alojamiento } = req.body
        
        const createuser = await pool.createReservaSergio(codigo, dni, matricula, npersonas, fechaentrada, fechasalida, idusuario, alojamiento)
        res.status(201).json({Message: true})
    } catch (error) {
        res.status(404).json({Message: false})
    }

})

// Actualizar contraseña

router.put('/actualizarContrasena', async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const hashedPassword = await encript.encrypt(newPassword);

        const user = await pool.UpdateUsuarioSergio(email, hashedPassword)
        if(user.response === 'ok'){
            res.status(200).json({Message: true})
        } else{
            res.status(404).json({Message: false})
        }
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        res.status(500).json({Message: false})
    }
});

// Eliminar usuario Sergio
router.delete('/usuariossergio/:correo', async (req, res) => {
    try {
        const { correo } = req.params
        console.log(correo)
        await pool.DeleteUsuarioSergio(correo)
        res.status(200).json({Message: true})
    } catch (error) {
        res.status(404).json({Message: false})
    }

})

// Obtener las reservas de un usuario
router.get('/obtenerreservas/:id', async (req, res) => {
    try {
        const { id } = req.params
        const reservas = await pool.getReservasByUser(id)
        res.status(200).json(reservas)
    } catch (error) {
        res.status(404).json({Message: 'Error'})
    }
})

module.exports = router