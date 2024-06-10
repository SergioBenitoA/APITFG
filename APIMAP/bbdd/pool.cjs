const { db } = require('./conex.cjs')
const scheme = 'musicplayerdb'

async function getUserByIdSergio(id) {
    const connection = await db.oneOrNone(`SELECT * FROM ${scheme}.usuarios WHERE id_usuario = $1`, [id])
    return connection
}

async function getUserByCorreoSergio(correo) {
    const connection = await db.oneOrNone(`SELECT * FROM ${scheme}.usuarios WHERE correo = $1`, [correo])
    return connection
}

async function getUsersSergio() {
    const connection = await db.any(`SELECT * FROM ${scheme}.usuarios`)
    return connection
}

async function createUserSergio(nombre, correo, telefono, password) {
    const query = `INSERT INTO ${scheme}.usuarios (nombre, correo, telefono, contrasena) VALUES ($1,$2,$3,$4)`
    const values = [nombre, correo, telefono, password]
    const result = await db.result(query, values)

    return result.rowCount > 0 ? { response: 'ok' } : { response: 'bad' }
}

async function createReservaSergio(codigo, dni, matricula, npersonas, fechaentrada, fechasalida, idusuario, alojamiento) {
    const query = `INSERT INTO ${scheme}.reservas (codigo_reserva,dni,matricula_vehiculo,numero_personas,fecha_entrada,fecha_salida,id_usuario,alojamiento) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`
    const values = [codigo, dni, matricula, npersonas, fechaentrada, fechasalida, idusuario, alojamiento]
    const result = await db.result(query, values)
    return result.rowCount > 0 ? { response: 'ok' } : { response: 'bad' }
}

async function DeleteUsuarioSergio(correo) {
    const query = `DELETE FROM ${scheme}.usuarios WHERE correo = $1`
    const values = [correo]
    
    console.log(query)
    try {
        const result = await db.result(query, values)
        console.log(result)
        return result.rowCount > 0 ? { response: 'ok' } : { response: 'bad' }
    } catch (error) {
        console.error('Error al ejecutar la consulta DELETE:', error)
        return { response: 'bad', message: 'Error al ejecutar la consulta DELETE' }
    }
}


async function UpdateUsuarioSergio(email, pwd) {
    const query = `UPDATE ${scheme}.usuarios SET contrasena = $1 WHERE correo = $2`
    const values = [pwd, email]
    const result = await db.result(query, values)

    return result.rowCount > 0 ? { response: 'ok' } : { response: 'bad' }
}

module.exports = {
    getUsersSergio,
    createUserSergio,
    createReservaSergio,
    getUserByIdSergio,
    getUserByCorreoSergio,
    DeleteUsuarioSergio,
    UpdateUsuarioSergio
}