import {Component, OnInit} from '@angular/core';
import {TypeImageService} from 'src/app/controller/service/TypeImage.service';
import {TypeImageVo} from 'src/app/controller/model/TypeImage.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-image-edit-chercheur',
  templateUrl: './type-image-edit-chercheur.component.html',
  styleUrls: ['./type-image-edit-chercheur.component.css']
})
export class TypeImageEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeImageService: TypeImageService
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
    this.typeImageService.edit().subscribe(typeImage=>{
    const myIndex = this.typeImages.findIndex(e => e.id === this.selectedTypeImage.id);
    this.typeImages[myIndex] = this.selectedTypeImage;
    this.editTypeImageDialog = false;
    this.selectedTypeImage = new TypeImageVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeImageDialog  = false;
}

// getters and setters

get typeImages(): Array<TypeImageVo> {
    return this.typeImageService.typeImages;
       }
set typeImages(value: Array<TypeImageVo>) {
        this.typeImageService.typeImages = value;
       }

 get selectedTypeImage(): TypeImageVo {
           return this.typeImageService.selectedTypeImage;
       }
    set selectedTypeImage(value: TypeImageVo) {
        this.typeImageService.selectedTypeImage = value;
       }

   get editTypeImageDialog(): boolean {
           return this.typeImageService.editTypeImageDialog;

       }
    set editTypeImageDialog(value: boolean) {
        this.typeImageService.editTypeImageDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
