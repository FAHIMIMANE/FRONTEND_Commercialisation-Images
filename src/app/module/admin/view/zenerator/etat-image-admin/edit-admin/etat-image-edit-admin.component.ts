import {Component, OnInit} from '@angular/core';
import {EtatImageService} from 'src/app/controller/service/EtatImage.service';
import {EtatImageVo} from 'src/app/controller/model/EtatImage.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-image-edit-admin',
  templateUrl: './etat-image-edit-admin.component.html',
  styleUrls: ['./etat-image-edit-admin.component.css']
})
export class EtatImageEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatImageService: EtatImageService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
) {
}

// methods
ngOnInit(): void {
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.etatImageService.edit().subscribe(etatImage=>{
    const myIndex = this.etatImages.findIndex(e => e.id === this.selectedEtatImage.id);
    this.etatImages[myIndex] = this.selectedEtatImage;
    this.editEtatImageDialog = false;
    this.selectedEtatImage = new EtatImageVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtatImageDialog  = false;
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

   get editEtatImageDialog(): boolean {
           return this.etatImageService.editEtatImageDialog;

       }
    set editEtatImageDialog(value: boolean) {
        this.etatImageService.editEtatImageDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
