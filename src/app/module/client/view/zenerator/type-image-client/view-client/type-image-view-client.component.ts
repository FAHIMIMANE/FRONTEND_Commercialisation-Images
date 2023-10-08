import {Component, OnInit} from '@angular/core';
import {TypeImageService} from 'src/app/controller/service/TypeImage.service';
import {TypeImageVo} from 'src/app/controller/model/TypeImage.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-image-view-client',
  templateUrl: './type-image-view-client.component.html',
  styleUrls: ['./type-image-view-client.component.css']
})
export class TypeImageViewClientComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeImageService: TypeImageService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeImageDialog  = false;
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

   get viewTypeImageDialog(): boolean {
           return this.typeImageService.viewTypeImageDialog;

       }
    set viewTypeImageDialog(value: boolean) {
        this.typeImageService.viewTypeImageDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
