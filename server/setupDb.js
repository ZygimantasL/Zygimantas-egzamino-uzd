import mysql from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASS, DB_USER } from './api/env.js';
import { hash } from './lib/hash.js';

const DATABASE_RESET = true;

async function setupDb() {
    let connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
    });

    if (DATABASE_RESET) {
        await connection.execute(`DROP DATABASE IF EXISTS \`${DB_DATABASE}\``);
    }
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\``);
    connection.query(`USE \`${DB_DATABASE}\``);

    if (DATABASE_RESET) {
    //lentelės
    await rolesTable(connection);
    await usersTable(connection);
    await tokensTable(connection);
    await specializationsTable(connection);

    // random info 
    await generateRoles(connection);
    await generateUsers(connection);
    await generateSpecializations(connection);
    }
    return connection;
}

async function usersTable(db) {
    try {
        const sql = `CREATE TABLE users (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        fullname varchar(30) NOT NULL,
                        email varchar(40) NOT NULL,
                        password_hash varchar(128) NOT NULL,
                        role_id int(10) NOT NULL DEFAULT 2,
                        created timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY role_id (role_id),
                        CONSTRAINT users_ibfk_1 FOREIGN KEY (role_id) REFERENCES roles (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "users" lenteles');
        console.log(error);
        throw error;
    }
}
async function tokensTable(db) {
    try {
        const sql = `CREATE TABLE tokens (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        user_id int(10) NOT NULL,
                        token varchar(36) NOT NULL,
                        created timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY user_id (user_id),
                        CONSTRAINT tokens_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "tokens" lenteles');
        console.log(error);
        throw error;
    }
}
async function rolesTable(db) {
    try {
        const sql = `CREATE TABLE roles (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        role varchar(10) NOT NULL,
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "roles" lenteles');
        console.log(error);
        throw error;
    }
}
async function specializationsTable(db) {
    try {
        const sql = `CREATE TABLE \`specializations\` (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        title varchar(20) NOT NULL,
                        city varchar(20) NOT NULL,
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "specializations" lenteles');
        console.log(error);
        throw error;
    }
}
async function generateRoles(db) {
    try {
        const sql = `INSERT INTO roles (role) VALUES ('admin'), ('worker'), ('public');`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sugeneruoti "roles" lenteles turinio');
        console.log(error);
        throw error;
    }
}
async function generateUsers(db) {
    try {  const sql = `INSERT INTO users (fullname, email, password_hash, role_id) 
                    VALUES ('Ignas Ignauskas', 'ignas@ignas.com', '${hash('ignas@ignas.com')}', 1),
                        ('Linas Adomaitis', 'linas@adomaitis.lt', '${hash('linas@adomaitis.lt')}', 2),
                        ('Ona Onaityte', 'ona@one.lt', '${hash('ona@one.lt')}', 2);`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sugeneruoti "users" lenteles turinio');
        console.log(error);
        throw error;
    }
}
async function generateSpecializations(db) {
    const specializations = ['Elektrikas', 'Diagnostikas', 'Šaltkalvis'];
    const cities =['Vilnius', 'Kaunas', 'Laukuva']
    try {
        const values = specializations.map((title, index) => `("${title}", "${cities[index]}")`).join(', ');
        const sql = `INSERT INTO \`specializations\` (title, city) VALUES ${values};`
    
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sugeneruoti "specializations" lenteles turinio');
        console.log(error);
        throw error;
}
}
export const connection = await setupDb();