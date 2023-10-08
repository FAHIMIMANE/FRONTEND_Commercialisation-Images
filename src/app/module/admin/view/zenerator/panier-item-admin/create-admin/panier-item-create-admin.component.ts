import {Component, OnInit, Input} from '@angular/core';
import {PanierItemService} from 'src/app/controller/service/PanierItem.service';
import {PanierItemVo} from 'src/app/controller/model/PanierItem.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {PanierVo} from 'src/app/controller/model/Panier.model';
import {PanierService} from 'src/app/controller/service/Panier.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {ImageService} from 'src/app/controller/service/Image.service';
@Component({
  selector: 'app-panier-item-create-admin',
  templateUrl: './panier-item-create-admin.component.html',
  styleUrls: ['./panier-item-create-admin.component.css']
})
export class PanierItemCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPanierItemImage = true;
   _validPanierItemPanier = true;

    _validImageReference = true;
    _validImagePrix = true;
    _validImageDescription = true;
    _validImageBucket = true;
    _validPanierReference = true;
    _validPanierPrixTotal = true;
    _validPanierEtatPanier = true;
    _validPanierPanierItems = true;



constructor(private datePipe: DatePipe, private panierItemService: PanierItemService
 ,       private stringUtilService: StringUtilService
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




private setValidation(value : boolean){
    this.validPanierItemImage = value;
    this.validPanierItemPanier = value;
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.panierItemService.save().subscribe(panierItem=>{
       this.panierItems.push({...panierItem});
       this.createPanierItemDialog = false;
       this.submitted = false;
       this.selectedPanierItem = new PanierItemVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePanierItemImage();
this.validatePanierItemPanier();

    }

private validatePanierItemImage(){
        if (this.stringUtilService.isEmpty(this.selectedPanierItem.imageVo)) {
            this.errorMessages.push('Image non valide');
            this.validPanierItemImage = false;
        } else {
            this.validPanierItemImage = true;
        }
    }
private validatePanierItemPanier(){
        if (this.stringUtilService.isEmpty(this.selectedPanierItem.panierVo)) {
            this.errorMessages.push('Panier non valide');
            this.validPanierItemPanier = false;
        } else {
            this.validPanierItemPanier = true;
        }
    }









//openPopup
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

hideCreateDialog(){
    this.createPanierItemDialog  = false;
    this.setValidation(true);
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

   get createPanierItemDialog(): boolean {
           return this.panierItemService.createPanierItemDialog;

       }
    set createPanierItemDialog(value: boolean) {
        this.panierItemService.createPanierItemDialog= value;
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
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validPanierItemImage(): boolean {
    return this._validPanierItemImage;
    }

    set validPanierItemImage(value: boolean) {
    this._validPanierItemImage = value;
    }
    get validPanierItemPanier(): boolean {
    return this._validPanierItemPanier;
    }

    set validPanierItemPanier(value: boolean) {
    this._validPanierItemPanier = value;
    }

    get validImageReference(): boolean {
    return this._validImageReference;
    }

    set validImageReference(value: boolean) {
    this._validImageReference = value;
    }
    get validImagePrix(): boolean {
    return this._validImagePrix;
    }

    set validImagePrix(value: boolean) {
    this._validImagePrix = value;
    }
    get validImageDescription(): boolean {
    return this._validImageDescription;
    }

    set validImageDescription(value: boolean) {
    this._validImageDescription = value;
    }
    get validImageBucket(): boolean {
    return this._validImageBucket;
    }

    set validImageBucket(value: boolean) {
    this._validImageBucket = value;
    }
    get validPanierReference(): boolean {
    return this._validPanierReference;
    }

    set validPanierReference(value: boolean) {
    this._validPanierReference = value;
    }
    get validPanierPrixTotal(): boolean {
    return this._validPanierPrixTotal;
    }

    set validPanierPrixTotal(value: boolean) {
    this._validPanierPrixTotal = value;
    }
    get validPanierEtatPanier(): boolean {
    return this._validPanierEtatPanier;
    }

    set validPanierEtatPanier(value: boolean) {
    this._validPanierEtatPanier = value;
    }
    get validPanierPanierItems(): boolean {
    return this._validPanierPanierItems;
    }

    set validPanierPanierItems(value: boolean) {
    this._validPanierPanierItems = value;
    }

}
