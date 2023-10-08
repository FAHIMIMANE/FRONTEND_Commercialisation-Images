import {Component, OnInit} from '@angular/core';
import {PanierItemService} from 'src/app/controller/service/PanierItem.service';
import {PanierItemVo} from 'src/app/controller/model/PanierItem.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {PanierVo} from 'src/app/controller/model/Panier.model';
import {PanierService} from 'src/app/controller/service/Panier.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {ImageService} from 'src/app/controller/service/Image.service';

@Component({
  selector: 'app-panier-item-edit-client',
  templateUrl: './panier-item-edit-client.component.html',
  styleUrls: ['./panier-item-edit-client.component.css']
})
export class PanierItemEditClientComponent implements OnInit {


constructor(private datePipe: DatePipe, private panierItemService: PanierItemService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private panierService: PanierService
 ,       private imageService: ImageService
) {
}

// methods
ngOnInit(): void {
    this.selectedImage = new ImageVo();
    this.imageService.findAll().subscribe((data) => this.images = data);
    this.selectedPanier = new PanierVo();
    this.panierService.findAll().subscribe((data) => this.paniers = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.panierItemService.edit().subscribe(panierItem=>{
    const myIndex = this.panierItems.findIndex(e => e.id === this.selectedPanierItem.id);
    this.panierItems[myIndex] = this.selectedPanierItem;
    this.editPanierItemDialog = false;
    this.selectedPanierItem = new PanierItemVo();


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
              public async openCreatepanier(panier: string) {
                      const isPermistted = await this.roleService.isPermitted('Panier', 'add');
                       if(isPermistted){
         this.selectedPanier = new PanierVo();
        this.createPanierDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editPanierItemDialog  = false;
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

   get editPanierItemDialog(): boolean {
           return this.panierItemService.editPanierItemDialog;

       }
    set editPanierItemDialog(value: boolean) {
        this.panierItemService.editPanierItemDialog = value;
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
       get selectedPanier(): PanierVo {
           return this.panierService.selectedPanier;
       }
      set selectedPanier(value: PanierVo) {
        this.panierService.selectedPanier = value;
       }
       get paniers(): Array<PanierVo> {
           return this.panierService.paniers;
       }
       set paniers(value: Array<PanierVo>) {
        this.panierService.paniers = value;
       }
       get createPanierDialog(): boolean {
           return this.panierService.createPanierDialog;
       }
      set createPanierDialog(value: boolean) {
        this.panierService.createPanierDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
