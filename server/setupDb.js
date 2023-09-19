import mysql from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASS, DB_USER } from './api/env.js';

async function setupDb() {
    // Susikuriame DB, jei nera
    let connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
    });
    //await connection.execute(`DROP DATABASE IF EXISTS \`${DB_DATABASE}\``);
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\``);
    connection.query(`USE \`${DB_DATABASE}\``);

    // Susikuriame lenteles
    await usersTable(connection);

    return connection;
}


export const connection = await setupDb();