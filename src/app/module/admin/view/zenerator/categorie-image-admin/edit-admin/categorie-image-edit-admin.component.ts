import {Component, OnInit} from '@angular/core';
import {CategorieImageService} from 'src/app/controller/service/CategorieImage.service';
import {CategorieImageVo} from 'src/app/controller/model/CategorieImage.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-categorie-image-edit-admin',
  templateUrl: './categorie-image-edit-admin.component.html',
  styleUrls: ['./categorie-image-edit-admin.component.css']
})
export class CategorieImageEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private categorieImageService: CategorieImageService
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
    this.categorieImageService.edit().subscribe(categorieImage=>{
    const myIndex = this.categorieImages.findIndex(e => e.id === this.selectedCategorieImage.id);
    this.categorieImages[myIndex] = this.selectedCategorieImage;
    this.editCategorieImageDialog = false;
    this.selectedCategorieImage = new CategorieImageVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editCategorieImageDialog  = false;
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

   get editCategorieImageDialog(): boolean {
           return this.categorieImageService.editCategorieImageDialog;

       }
    set editCategorieImageDialog(value: boolean) {
        this.categorieImageService.editCategorieImageDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
