import {Component, OnInit} from '@angular/core';
import {EtatImageService} from 'src/app/controller/service/EtatImage.service';
import {EtatImageVo} from 'src/app/controller/model/EtatImage.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-etat-image-view-admin',
  templateUrl: './etat-image-view-admin.component.html',
  styleUrls: ['./etat-image-view-admin.component.css']
})
export class EtatImageViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatImageService: EtatImageService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatImageDialog  = false;
}

// getters and setters

get etatImages(): Array<EtatImageVo> {
    return this.etatImageService.etatImages;
       }
set etatImages(value: Array<EtatImageVo>) {
        this.etatImageService.etatImages = value;
       }

 get selectedEtatImage(): EtatImageVo {
           return this.etatImageService.selectedEtatImage;
       }
    set selectedEtatImage(value: EtatImageVo) {
        this.etatImageService.selectedEtatImage = value;
       }

   get viewEtatImageDialog(): boolean {
           return this.etatImageService.viewEtatImageDialog;

       }
    set viewEtatImageDialog(value: boolean) {
        this.etatImageService.viewEtatImageDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
