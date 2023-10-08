import {Component, OnInit} from '@angular/core';
import {CategorieItemService} from 'src/app/controller/service/CategorieItem.service';
import {CategorieItemVo} from 'src/app/controller/model/CategorieItem.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {CategorieImageVo} from 'src/app/controller/model/CategorieImage.model';
import {CategorieImageService} from 'src/app/controller/service/CategorieImage.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {ImageService} from 'src/app/controller/service/Image.service';

@Component({
  selector: 'app-categorie-item-edit-chercheur',
  templateUrl: './categorie-item-edit-chercheur.component.html',
  styleUrls: ['./categorie-item-edit-chercheur.component.css']
})
export class CategorieItemEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private categorieItemService: CategorieItemService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private categorieImageService: CategorieImageService
 ,       private imageService: ImageService
) {
}

// methods
ngOnInit(): void {
    this.selectedImage = new ImageVo();
    this.imageService.findAll().subscribe((data) => this.images = data);
    this.selectedCategorieImage = new CategorieImageVo();
    this.categorieImageService.findAll().subscribe((data) => this.categorieImages = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.categorieItemService.edit().subscribe(categorieItem=>{
    const myIndex = this.categorieItems.findIndex(e => e.id === this.selectedCategorieItem.id);
    this.categorieItems[myIndex] = this.selectedCategorieItem;
    this.editCategorieItemDialog = false;
    this.selectedCategorieItem = new CategorieItemVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateimage(image: string) {
                      const isPermistted = await this.roleService.isPermitted('Image', 'add');
                       if(isPermistted){
         this.selectedImage = new ImageVo();
        this.createImageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecategorieImage(categorieImage: string) {
                      const isPermistted = await this.roleService.isPermitted('CategorieImage', 'add');
                       if(isPermistted){
         this.selectedCategorieImage = new CategorieImageVo();
        this.createCategorieImageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editCategorieItemDialog  = false;
}

// getters and setters

get categorieItems(): Array<CategorieItemVo> {
    return this.categorieItemService.categorieItems;
       }
set categorieItems(value: Array<CategorieItemVo>) {
        this.categorieItemService.categorieItems = value;
       }

 get selectedCategorieItem(): CategorieItemVo {
           return this.categorieItemService.selectedCategorieItem;
       }
    set selectedCategorieItem(value: CategorieItemVo) {
        this.categorieItemService.selectedCategorieItem = value;
       }

   get editCategorieItemDialog(): boolean {
           return this.categorieItemService.editCategorieItemDialog;

       }
    set editCategorieItemDialog(value: boolean) {
        this.categorieItemService.editCategorieItemDialog = value;
       }

       get selectedImage(): ImageVo {
           return this.imageService.selectedImage;
       }
      set selectedImage(value: ImageVo) {
        this.imageService.selectedImage = value;
       }
       get images(): Array<ImageVo> {
           return this.imageService.images;
       }
       set images(value: Array<ImageVo>) {
        this.imageService.images = value;
       }
       get createImageDialog(): boolean {
           return this.imageService.createImageDialog;
       }
      set createImageDialog(value: boolean) {
        this.imageService.createImageDialog= value;
       }
       get selectedCategorieImage(): CategorieImageVo {
           return this.categorieImageService.selectedCategorieImage;
       }
      set selectedCategorieImage(value: CategorieImageVo) {
        this.categorieImageService.selectedCategorieImage = value;
       }
       get categorieImages(): Array<CategorieImageVo> {
           return this.categorieImageService.categorieImages;
       }
       set categorieImages(value: Array<CategorieImageVo>) {
        this.categorieImageService.categorieImages = value;
       }
       get createCategorieImageDialog(): boolean {
           return this.categorieImageService.createCategorieImageDialog;
       }
      set createCategorieImageDialog(value: boolean) {
        this.categorieImageService.createCategorieImageDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
