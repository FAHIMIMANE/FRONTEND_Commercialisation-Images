import {Component, OnInit} from '@angular/core';
import {PanierService} from 'src/app/controller/service/Panier.service';
import {PanierVo} from 'src/app/controller/model/Panier.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ImageVo} from 'src/app/controller/model/Image.model';
import {ImageService} from 'src/app/controller/service/Image.service';
import {PanierItemVo} from 'src/app/controller/model/PanierItem.model';
import {PanierItemService} from 'src/app/controller/service/PanierItem.service';
import {EtatPanierVo} from 'src/app/controller/model/EtatPanier.model';
import {EtatPanierService} from 'src/app/controller/service/EtatPanier.service';

@Component({
  selector: 'app-panier-edit-admin',
  templateUrl: './panier-edit-admin.component.html',
  styleUrls: ['./panier-edit-admin.component.css']
})
export class PanierEditAdminComponent implements OnInit {

        selectedPanierItems: PanierItemVo = new PanierItemVo();
        panierItemsListe: Array<PanierItemVo> = [];

        myImages: Array<ImageVo> = [];


constructor(private datePipe: DatePipe, private panierService: PanierService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private imageService: ImageService
 ,       private panierItemService: PanierItemService
 ,       private etatPanierService: EtatPanierService
) {
}

// methods
ngOnInit(): void {
                this.selectedPanierItems.imageVo = new ImageVo();
                this.imageService.findAll().subscribe((data) => this.images = data);
    this.selectedEtatPanier = new EtatPanierVo();
    this.etatPanierService.findAll().subscribe((data) => this.etatPaniers = data);
}
        addPanierItems() {
        if( this.selectedPanier.panierItemsVo == null ){
            this.selectedPanier.panierItemsVo = new Array<PanierItemVo>();
        }
        this.selectedPanier.panierItemsVo.push(this.selectedPanierItems);
        this.selectedPanierItems = new PanierItemVo();
        }

       deletePanierItems(p: PanierItemVo) {
        this.selectedPanier.panierItemsVo.forEach((element, index) => {
            if (element === p) { this.selectedPanier.panierItemsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.panierService.edit().subscribe(panier=>{
    const myIndex = this.paniers.findIndex(e => e.id === this.selectedPanier.id);
    this.paniers[myIndex] = this.selectedPanier;
    this.editPanierDialog = false;
    this.selectedPanier = new PanierVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateetatPanier(etatPanier: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatPanier', 'add');
                       if(isPermistted){
         this.selectedEtatPanier = new EtatPanierVo();
        this.createEtatPanierDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
// methods

hideEditDialog(){
    this.editPanierDialog  = false;
}

// getters and setters

get paniers(): Array<PanierVo> {
    return this.panierService.paniers;
       }
set paniers(value: Array<PanierVo>) {
        this.panierService.paniers = value;
       }

 get selectedPanier(): PanierVo {
           return this.panierService.selectedPanier;
       }
    set selectedPanier(value: PanierVo) {
        this.panierService.selectedPanier = value;
       }

   get editPanierDialog(): boolean {
           return this.panierService.editPanierDialog;

       }
    set editPanierDialog(value: boolean) {
        this.panierService.editPanierDialog = value;
       }

       get selectedEtatPanier(): EtatPanierVo {
           return this.etatPanierService.selectedEtatPanier;
       }
      set selectedEtatPanier(value: EtatPanierVo) {
        this.etatPanierService.selectedEtatPanier = value;
       }
       get etatPaniers(): Array<EtatPanierVo> {
           return this.etatPanierService.etatPaniers;
       }
       set etatPaniers(value: Array<EtatPanierVo>) {
        this.etatPanierService.etatPaniers = value;
       }
       get createEtatPanierDialog(): boolean {
           return this.etatPanierService.createEtatPanierDialog;
       }
      set createEtatPanierDialog(value: boolean) {
        this.etatPanierService.createEtatPanierDialog= value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
