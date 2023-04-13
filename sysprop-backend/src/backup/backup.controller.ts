import { Controller, Get, Post } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
import * as mysql from 'mysql';
import * as mysql2 from 'mysql2';
import * as mysqldump from 'mysqldump';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from 'src/config';
import { BackupService } from './backup.service';

@Controller('backup')
export class BackupController {
    constructor( private backupService: BackupService ,
        //private readFile = util.promisify(fs.readFile),
      
    ){}

    private backupDir = './backup.sql'

    @Get('export')
    async export(): Promise<any> {
      const result = await mysqldump.default({
        connection: {
            host: DB_HOST,
            //port: DB_PORT,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
        },
        dumpToFile: this.backupDir,
      });
  
      return { message: 'Backup exported successfully' };
    }

    readFile = util.promisify(fs.readFile)

    @Post('import')
    async importar() {
      return await this.backupService.importMySQLData(this.backupDir)
}
}