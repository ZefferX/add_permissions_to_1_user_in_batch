const fs = require('fs');
const { Client } = require('pg');

// Función para generar permisos de la forma permiso_1, permiso_2, ..., permiso_x
function generatePermissions(count) {
    const permissions = [];
    for (let i = 1; i <= count; i++) {
        permissions.push(`permiso_${i}`);
    }
    return permissions;
}

// Configura los detalles de la conexión de la base de datos
const client = new Client({
    host: '3.95.15.231',
    port: 5432,
    user: 'zefferx',
    password: 'example',
    database: 'basic_db',
    ssl: false
});

// Función para insertar permisos en la base de datos
// Función para insertar o actualizar permisos
async function updatePermissions(permissions, userEmail) {
    try {
        await client.connect();
        console.log('Conectado a la base de datos.');

        const query = `
            UPDATE users
            SET permissions = $1
            WHERE email = $2;
        `;

        const res = await client.query(query, [permissions, userEmail]);

        if (res.rowCount === 0) {
            console.log(`No se encontró el usuario con email ${userEmail}.`);
        } else {
            console.log(`Permisos actualizados para el usuario ${userEmail}:`, permissions);
        }
    } catch (error) {
        console.error('Error actualizando permisos:', error);
    } finally {
        await client.end();
    }
}

// Número de permisos y correo del usuario
const count = 100; // Cambia este valor para la cantidad de permisos
const userEmail = 'julio@example.com'; // Cambia este valor al correo del usuario

// Generar los permisos y llamar a la función de actualización
const permissions = generatePermissions(count);
updatePermissions(permissions, userEmail);