import {Component, OnInit} from '@angular/core';
import {CategorieItemService} from 'src/app/controller/service/CategorieItem.service';
import {CategorieItemVo} from 'src/app/controller/model/CategorieItem.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {CategorieImageVo} from 'src/app/controller/model/CategorieImage.model';
import {CategorieImageService} from 'src/app/controller/service/CategorieImage.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {ImageService} from 'src/app/controller/service/Image.service';

@Component({
  selector: 'app-categorie-item-view-contributeur',
  templateUrl: './categorie-item-view-contributeur.component.html',
  styleUrls: ['./categorie-item-view-contributeur.component.css']
})
export class CategorieItemViewContributeurComponent implements OnInit {


constructor(private datePipe: DatePipe, private categorieItemService: CategorieItemService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private categorieImageService: CategorieImageService
    ,private imageService: ImageService
) {
}

// methods
ngOnInit(): void {
    this.selectedImage = new ImageVo();
    this.imageService.findAll().subscribe((data) => this.images = data);
    this.selectedCategorieImage = new CategorieImageVo();
    this.categorieImageService.findAll().subscribe((data) => this.categorieImages = data);
}

hideViewDialog(){
    this.viewCategorieItemDialog  = false;
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

   get viewCategorieItemDialog(): boolean {
           return this.categorieItemService.viewCategorieItemDialog;

       }
    set viewCategorieItemDialog(value: boolean) {
        this.categorieItemService.viewCategorieItemDialog= value;
       }

       get selectedImage(): ImageVo {
           return this.imageService.selectedImage;
       }
      set selectedImage(value: ImageVo) {
        this.imageService.selectedImage = value;
       }
       get images():Array<ImageVo> {
           return this.imageService.images;
       }
       set images(value: Array<ImageVo>) {
        this.imageService.images = value;
       }
       get editImageDialog(): boolean {
           return this.imageService.editImageDialog;
       }
      set editImageDialog(value: boolean) {
        this.imageService.editImageDialog= value;
       }
       get selectedCategorieImage(): CategorieImageVo {
           return this.categorieImageService.selectedCategorieImage;
       }
      set selectedCategorieImage(value: CategorieImageVo) {
        this.categorieImageService.selectedCategorieImage = value;
       }
       get categorieImages():Array<CategorieImageVo> {
           return this.categorieImageService.categorieImages;
       }
       set categorieImages(value: Array<CategorieImageVo>) {
        this.categorieImageService.categorieImages = value;
       }
       get editCategorieImageDialog(): boolean {
           return this.categorieImageService.editCategorieImageDialog;
       }
      set editCategorieImageDialog(value: boolean) {
        this.categorieImageService.editCategorieImageDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
