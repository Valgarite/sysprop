import { Controller, Get, Post } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
import { BackupService } from './backup.service';
import * as moment from 'moment'

@Controller('backup')
export class BackupController {
    constructor( private backupService: BackupService ,
        //private readFile = util.promisify(fs.readFile),
      
    ){}

    
    

    @Get('export')
    async export(): Promise<any> {
      const currentDate = moment().format('DD-MM-YYYY')

      const backupDir = `./${currentDate.toLocaleString()}.sql`
      await this.backupService.exportMySQLData(backupDir)
    }

    readFile = util.promisify(fs.readFile)
  }