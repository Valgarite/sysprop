import { Controller, Get, Post, Res } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
import { BackupService } from './backup.service';
import * as moment from 'moment'
import { Response } from 'express'
import * as path from 'path'

@Controller('backup')
export class BackupController {
    constructor( private backupService: BackupService ,
        //private readFile = util.promisify(fs.readFile),
      
    ){}

    @Get('/export')
    async export(@Res() res: Response): Promise<any> {
      const currentDate = moment().format('DD-MM-YYYY')
      const fileName = currentDate + '.sql'
      const backupDir = path.resolve(__dirname, fileName)

      await this.backupService.exportMySQLData(backupDir)

      try {
        res.set('Content-Disposition', `attachment; filename=${fileName}`);
        await res.sendFile(backupDir);
      } catch (error) {
        console.log(error);
      }
    }

    
    readFile = util.promisify(fs.readFile)
  }