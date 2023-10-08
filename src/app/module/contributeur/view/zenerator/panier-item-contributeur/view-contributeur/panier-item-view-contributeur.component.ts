import {Component, OnInit} from '@angular/core';
import {PanierItemService} from 'src/app/controller/service/PanierItem.service';
import {PanierItemVo} from 'src/app/controller/model/PanierItem.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {PanierVo} from 'src/app/controller/model/Panier.model';
import {PanierService} from 'src/app/controller/service/Panier.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {ImageService} from 'src/app/controller/service/Image.service';

@Component({
  selector: 'app-panier-item-view-contributeur',
  templateUrl: './panier-item-view-contributeur.component.html',
  styleUrls: ['./panier-item-view-contributeur.component.css']
})
export class PanierItemViewContributeurComponent implements OnInit {


constructor(private datePipe: DatePipe, private panierItemService: PanierItemService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private panierService: PanierService
    ,private imageService: ImageService
) {
}

// methods
ngOnInit(): void {
    this.selectedImage = new ImageVo();
    this.imageService.findAll().subscribe((data) => this.images = data);
    this.selectedPanier = new PanierVo();
    this.panierService.findAll().subscribe((data) => this.paniers = data);
}

hideViewDialog(){
    this.viewPanierItemDialog  = false;
}

// getters and setters

get panierItems(): Array<PanierItemVo> {
    return this.panierItemService.panierItems;
       }
set panierItems(value: Array<PanierItemVo>) {
        this.panierItemService.panierItems = value;
       }

 get selectedPanierItem(): PanierItemVo {
           return this.panierItemService.selectedPanierItem;
       }
    set selectedPanierItem(value: PanierItemVo) {
        this.panierItemService.selectedPanierItem = value;
       }

   get viewPanierItemDialog(): boolean {
           return this.panierItemService.viewPanierItemDialog;

       }
    set viewPanierItemDialog(value: boolean) {
        this.panierItemService.viewPanierItemDialog= value;
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
       get selectedPanier(): PanierVo {
           return this.panierService.selectedPanier;
       }
      set selectedPanier(value: PanierVo) {
        this.panierService.selectedPanier = value;
       }
       get paniers():Array<PanierVo> {
           return this.panierService.paniers;
       }
       set paniers(value: Array<PanierVo>) {
        this.panierService.paniers = value;
       }
       get editPanierDialog(): boolean {
           return this.panierService.editPanierDialog;
       }
      set editPanierDialog(value: boolean) {
        this.panierService.editPanierDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
