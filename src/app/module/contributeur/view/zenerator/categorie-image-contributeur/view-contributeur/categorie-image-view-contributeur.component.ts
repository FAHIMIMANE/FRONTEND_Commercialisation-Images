import {Component, OnInit} from '@angular/core';
import {CategorieImageService} from 'src/app/controller/service/CategorieImage.service';
import {CategorieImageVo} from 'src/app/controller/model/CategorieImage.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-categorie-image-view-contributeur',
  templateUrl: './categorie-image-view-contributeur.component.html',
  styleUrls: ['./categorie-image-view-contributeur.component.css']
})
export class CategorieImageViewContributeurComponent implements OnInit {


constructor(private datePipe: DatePipe, private categorieImageService: CategorieImageService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewCategorieImageDialog  = false;
}

// getters and setters

get categorieImages(): Array<CategorieImageVo> {
    return this.categorieImageService.categorieImages;
       }
set categorieImages(value: Array<CategorieImageVo>) {
        this.categorieImageService.categorieImages = value;
       }

 get selectedCategorieImage(): CategorieImageVo {
           return this.categorieImageService.selectedCategorieImage;
       }
    set selectedCategorieImage(value: CategorieImageVo) {
        this.categorieImageService.selectedCategorieImage = value;
       }

   get viewCategorieImageDialog(): boolean {
           return this.categorieImageService.viewCategorieImageDialog;

       }
    set viewCategorieImageDialog(value: boolean) {
        this.categorieImageService.viewCategorieImageDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
