import {Component, OnInit, Input} from '@angular/core';
import {PanierService} from 'src/app/controller/service/Panier.service';
import {PanierVo} from 'src/app/controller/model/Panier.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {PanierItemVo} from 'src/app/controller/model/PanierItem.model';
import {PanierItemService} from 'src/app/controller/service/PanierItem.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {ImageService} from 'src/app/controller/service/Image.service';
import {EtatPanierVo} from 'src/app/controller/model/EtatPanier.model';
import {EtatPanierService} from 'src/app/controller/service/EtatPanier.service';
@Component({
  selector: 'app-panier-create-admin',
  templateUrl: './panier-create-admin.component.html',
  styleUrls: ['./panier-create-admin.component.css']
})
export class PanierCreateAdminComponent implements OnInit {

        selectedPanierItems: PanierItemVo = new PanierItemVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPanierReference = true;
   _validPanierPrixTotal = true;
   _validPanierEtatPanier = true;
   _validPanierPanierItems = true;

    _validEtatPanierLibelle = true;
    _validEtatPanierCode = true;
    _validPanierItemImage = true;
    _validPanierItemPanier = true;



constructor(private datePipe: DatePipe, private panierService: PanierService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private panierItemService: PanierItemService
,       private imageService: ImageService
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


    validatePanierItems(){
    this.errorMessages = new Array();
    this.validatePanierItemImage();
    this.validatePanierItemPanier();
    }


private setValidation(value : boolean){
    this.validPanierReference = value;
    this.validPanierPrixTotal = value;
    this.validPanierEtatPanier = value;
    this.validPanierPanierItems = value;
    this.validPanierItemImage = value;
    this.validPanierItemPanier = value;
    }

        addPanierItems() {
        if( this.selectedPanier.panierItemsVo == null ){
            this.selectedPanier.panierItemsVo = new Array<PanierItemVo>();
        }
       this.validatePanierItems();
       if (this.errorMessages.length === 0) {
              this.selectedPanier.panierItemsVo.push(this.selectedPanierItems);
              this.selectedPanierItems = new PanierItemVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deletePanierItems(p: PanierItemVo) {
        this.selectedPanier.panierItemsVo.forEach((element, index) => {
            if (element === p) { this.selectedPanier.panierItemsVo.splice(index, 1); }
        });
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
     this.panierService.save().subscribe(panier=>{
       this.paniers.push({...panier});
       this.createPanierDialog = false;
       this.submitted = false;
       this.selectedPanier = new PanierVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePanierReference();
this.validatePanierPrixTotal();
this.validatePanierEtatPanier();
this.validatePanierPanierItems();

    }

private validatePanierReference(){
        if (this.stringUtilService.isEmpty(this.selectedPanier.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validPanierReference = false;
        } else {
            this.validPanierReference = true;
        }
    }
private validatePanierPrixTotal(){
        if (this.stringUtilService.isEmpty(this.selectedPanier.prixTotal)) {
            this.errorMessages.push('Prix total non valide');
            this.validPanierPrixTotal = false;
        } else {
            this.validPanierPrixTotal = true;
        }
    }
private validatePanierEtatPanier(){
        if (this.stringUtilService.isEmpty(this.selectedPanier.etatPanierVo)) {
            this.errorMessages.push('Etat panier non valide');
            this.validPanierEtatPanier = false;
        } else {
            this.validPanierEtatPanier = true;
        }
    }
private validatePanierPanierItems(){
        if (this.stringUtilService.isEmpty(this.selectedPanier.panierItemsVo)) {
            this.errorMessages.push('Panier items non valide');
            this.validPanierPanierItems = false;
        } else {
            this.validPanierPanierItems = true;
        }
    }








            private validatePanierItemImage(){
            if (this.selectedPanierItems.imageVo == null) {
            this.errorMessages.push('Image de la panierItem est  invalide');
             this.validPanierItemImage = false;
            } else {
            this.validPanierItemImage = true;
            }
            }

            private validatePanierItemPanier(){
            if (this.selectedPanierItems.panierVo == null) {
            this.errorMessages.push('Panier de la panierItem est  invalide');
             this.validPanierItemPanier = false;
            } else {
            this.validPanierItemPanier = true;
            }
            }






//openPopup
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

hideCreateDialog(){
    this.createPanierDialog  = false;
    this.setValidation(true);
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

   get createPanierDialog(): boolean {
           return this.panierService.createPanierDialog;

       }
    set createPanierDialog(value: boolean) {
        this.panierService.createPanierDialog= value;
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

    get validEtatPanierLibelle(): boolean {
    return this._validEtatPanierLibelle;
    }

    set validEtatPanierLibelle(value: boolean) {
    this._validEtatPanierLibelle = value;
    }
    get validEtatPanierCode(): boolean {
    return this._validEtatPanierCode;
    }

    set validEtatPanierCode(value: boolean) {
    this._validEtatPanierCode = value;
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

}
