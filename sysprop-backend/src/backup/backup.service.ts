import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
import * as mysql from 'mysql2';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from 'src/config';
import mysqldump from 'mysqldump';

@Injectable()
export class BackupService {

  private readonly dbConfig: any = {
    host: DB_HOST,
    port: parseInt(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
  };

  async exportMySQLData(filePath: string) {
    // Configuración de las opciones de mysqldump
    const options={
      host: this.dbConfig.host,
      user: this.dbConfig.user,
      password: this.dbConfig.password,
      database : this.dbConfig.database,
      insertIgnore : true
    }
    // Ejecutar mysqldump y guardar la salida en un archivo
    await mysqldump({
      connection: {
        host: this.dbConfig.host,
      user: this.dbConfig.user,
      password: this.dbConfig.password,
      database : this.dbConfig.database,
      },
      dumpToFile: filePath,
    });
  }

  

  async importMySQLData(filePath: string) {

    
    // Conectarse a la base de datos
    const connection = mysql.createConnection({
      host: this.dbConfig.host,
      user: this.dbConfig.user,
      password: this.dbConfig.password,
      database: this.dbConfig.database,
    });
  
    // Leer el archivo MySQL
    const data = fs.readFileSync(filePath).toString();
   
    // Ejecutar el archivo en la base de datos
    connection.query(data);
  
    // Cerrar la conexión
    connection.end();
  }
  
  

  // async importData() {
  //   // Establecer conexión con la base de datos
  //   const connection = mysql.createConnection(this.dbConfig);

  //   // Leer archivo de respaldo
  //   const readFile = util.promisify(fs.readFile);
  //   const data = await readFile('./backup.sql', 'utf8');

  //   // Vaciar todas las tablas
  //   await this.truncateTables(connection);

  //   // Importar respaldo
  //   await this.importBackup(connection, data);

  //   // Cerrar conexión
  //   connection.end();
  // }

  // async truncateTables(connection: any) {
  //   const query = 'SET FOREIGN_KEY_CHECKS = 0; ';
  //   await connection.query(query);

  //   const tables = await this.getTables(connection);
  //   for (const table of tables) {
  //     const truncateQuery = `TRUNCATE TABLE ${table}; `;
  //     await connection.query(truncateQuery);
  //   }

  //   const query2 = 'SET FOREIGN_KEY_CHECKS = 1; ';
  //   await connection.query(query2);
  // }

  // async getTables(connection: any) {
    
  //   const query = 'SHOW TABLES;';
  //   console.log(await connection.query(query))
  //   const [rows] = await connection.query(query);
  //   console.log (rows);
  //   if (!Array.isArray(rows)) {
  //       throw new Error('Invalid rows result');
  //     }
  //   return rows.map(row => Object.values(row)[0]);
  // }

  // async importBackup(connection: any, data: string) {
  //   const queries = data.split(';');

  //   for (const query of queries) {
  //     await connection.query(query);
  //   }
  // }
}
