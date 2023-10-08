import {Component, OnInit, Input} from '@angular/core';
import {BucketService} from 'src/app/controller/service/Bucket.service';
import {BucketVo} from 'src/app/controller/model/Bucket.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {ContributeurVo} from 'src/app/controller/model/Contributeur.model';
import {ContributeurService} from 'src/app/controller/service/Contributeur.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {ImageService} from 'src/app/controller/service/Image.service';
import {CategorieImageVo} from 'src/app/controller/model/CategorieImage.model';
import {CategorieImageService} from 'src/app/controller/service/CategorieImage.service';
import {TypeImageVo} from 'src/app/controller/model/TypeImage.model';
import {TypeImageService} from 'src/app/controller/service/TypeImage.service';
import {ClientVo} from 'src/app/controller/model/Client.model';
import {ClientService} from 'src/app/controller/service/Client.service';
import {CategorieItemVo} from 'src/app/controller/model/CategorieItem.model';
import {CategorieItemService} from 'src/app/controller/service/CategorieItem.service';
import {StateBucketVo} from 'src/app/controller/model/StateBucket.model';
import {StateBucketService} from 'src/app/controller/service/StateBucket.service';
@Component({
  selector: 'app-bucket-create-admin',
  templateUrl: './bucket-create-admin.component.html',
  styleUrls: ['./bucket-create-admin.component.css']
})
export class BucketCreateAdminComponent implements OnInit {

        selectedImages: ImageVo = new ImageVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validBucketNom = true;
   _validBucketDateCreation = true;
   _validBucketLibelle = true;
   _validBucketStateBucket = true;
   _validBucketContributeur = true;

    _validImageReference = true;
    _validImagePrix = true;
    _validImageDescription = true;
    _validImageBucket = true;
    _validStateBucketCode = true;
    _validStateBucketLibelle = true;
    _validContributeurNumeroMatricule = true;
    _validContributeurPrenom = true;
    _validContributeurNom = true;
    _validContributeurCin = true;
    _validContributeurNumeroTelephone = true;
    _validContributeurAdresse = true;
    _validContributeurCodePostale = true;

       private _categorieItemsVo: Array<CategorieItemVo> = [];


constructor(private datePipe: DatePipe, private bucketService: BucketService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private categorieImageService: CategorieImageService
,       private typeImageService: TypeImageService
,       private contributeurService: ContributeurService
,       private clientService: ClientService
,       private imageService: ImageService
,       private stateBucketService: StateBucketService
) {

}


// methods
ngOnInit(): void {


                this.selectedImages.clientVo = new ClientVo();
                this.clientService.findAll().subscribe((data) => this.clients = data);
                this.selectedImages.typeImageVo = new TypeImageVo();
                this.typeImageService.findAll().subscribe((data) => this.typeImages = data);

                this.categorieImageService.findAll().subscribe(data => this.prepareCategorieItems(data));

    this.selectedStateBucket = new StateBucketVo();
    this.stateBucketService.findAll().subscribe((data) => this.stateBuckets = data);
    this.selectedContributeur = new ContributeurVo();
    this.contributeurService.findAll().subscribe((data) => this.contributeurs = data);
}

   prepareCategorieItems(categorieImages: Array<CategorieImageVo>): void{
        if( categorieImages != null){
        categorieImages.forEach(e => {
        const categorieItem = new CategorieItemVo();
        categorieItem.categorieImageVo = e;
        this.categorieItemsVo.push(categorieItem);
        });
        }
   }

    validateImages(){
    this.errorMessages = new Array();
    this.validateImageReference();
    this.validateImagePrix();
    this.validateImageDescription();
    this.validateImageBucket();
    }


private setValidation(value : boolean){
    this.validImageReference = value;
    this.validImagePrix = value;
    this.validImageDescription = value;
    this.validImageBucket = value;
    this.validBucketNom = value;
    this.validBucketDateCreation = value;
    this.validBucketLibelle = value;
    this.validBucketStateBucket = value;
    this.validBucketContributeur = value;
    }

        addImages() {
        if( this.selectedBucket.imagesVo == null ){
            this.selectedBucket.imagesVo = new Array<ImageVo>();
        }
       this.validateImages();
       if (this.errorMessages.length === 0) {
              this.selectedBucket.imagesVo.push(this.selectedImages);
              this.selectedImages = new ImageVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteImages(p: ImageVo) {
        this.selectedBucket.imagesVo.forEach((element, index) => {
            if (element === p) { this.selectedBucket.imagesVo.splice(index, 1); }
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
     this.bucketService.save().subscribe(bucket=>{
       this.buckets.push({...bucket});
       this.createBucketDialog = false;
       this.submitted = false;
       this.selectedBucket = new BucketVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateBucketNom();
this.validateBucketDateCreation();
this.validateBucketLibelle();
this.validateBucketStateBucket();
this.validateBucketContributeur();

    }

private validateBucketNom(){
        if (this.stringUtilService.isEmpty(this.selectedBucket.nom)) {
            this.errorMessages.push('Nom non valide');
            this.validBucketNom = false;
        } else {
            this.validBucketNom = true;
        }
    }
private validateBucketDateCreation(){
        if (this.stringUtilService.isEmpty(this.selectedBucket.dateCreation)) {
            this.errorMessages.push('Date creation non valide');
            this.validBucketDateCreation = false;
        } else {
            this.validBucketDateCreation = true;
        }
    }
private validateBucketLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedBucket.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validBucketLibelle = false;
        } else {
            this.validBucketLibelle = true;
        }
    }
private validateBucketStateBucket(){
        if (this.stringUtilService.isEmpty(this.selectedBucket.stateBucketVo)) {
            this.errorMessages.push('State bucket non valide');
            this.validBucketStateBucket = false;
        } else {
            this.validBucketStateBucket = true;
        }
    }
private validateBucketContributeur(){
        if (this.stringUtilService.isEmpty(this.selectedBucket.contributeurVo)) {
            this.errorMessages.push('Contributeur non valide');
            this.validBucketContributeur = false;
        } else {
            this.validBucketContributeur = true;
        }
    }





            private validateImageReference(){
            if (this.selectedImages.reference == null) {
            this.errorMessages.push('Reference de la image est  invalide');
             this.validImageReference = false;
            } else {
            this.validImageReference = true;
            }
            }

            private validateImagePrix(){
            if (this.selectedImages.prix == null) {
            this.errorMessages.push('Prix de la image est  invalide');
             this.validImagePrix = false;
            } else {
            this.validImagePrix = true;
            }
            }

            private validateImageDescription(){
            if (this.selectedImages.description == null) {
            this.errorMessages.push('Description de la image est  invalide');
             this.validImageDescription = false;
            } else {
            this.validImageDescription = true;
            }
            }





            private validateImageBucket(){
            if (this.selectedImages.bucketVo == null) {
            this.errorMessages.push('Bucket de la image est  invalide');
             this.validImageBucket = false;
            } else {
            this.validImageBucket = true;
            }
            }










//openPopup
              public async openCreateclient(client: string) {
                      const isPermistted = await this.roleService.isPermitted('Client', 'add');
                       if(isPermistted){
         this.selectedClient = new ClientVo();
        this.createClientDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeImage(typeImage: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeImage', 'add');
                       if(isPermistted){
         this.selectedTypeImage = new TypeImageVo();
        this.createTypeImageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatestateBucket(stateBucket: string) {
                      const isPermistted = await this.roleService.isPermitted('StateBucket', 'add');
                       if(isPermistted){
         this.selectedStateBucket = new StateBucketVo();
        this.createStateBucketDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecontributeur(contributeur: string) {
                      const isPermistted = await this.roleService.isPermitted('Contributeur', 'add');
                       if(isPermistted){
         this.selectedContributeur = new ContributeurVo();
        this.createContributeurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createBucketDialog  = false;
    this.setValidation(true);
}

// getters and setters

get buckets(): Array<BucketVo> {
    return this.bucketService.buckets;
       }
set buckets(value: Array<BucketVo>) {
        this.bucketService.buckets = value;
       }

 get selectedBucket(): BucketVo {
           return this.bucketService.selectedBucket;
       }
    set selectedBucket(value: BucketVo) {
        this.bucketService.selectedBucket = value;
       }

   get createBucketDialog(): boolean {
           return this.bucketService.createBucketDialog;

       }
    set createBucketDialog(value: boolean) {
        this.bucketService.createBucketDialog= value;
       }

       get selectedClient(): ClientVo {
           return this.clientService.selectedClient;
       }
      set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }
       get clients(): Array<ClientVo> {
           return this.clientService.clients;
       }
       set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }
       get createClientDialog(): boolean {
           return this.clientService.createClientDialog;
       }
      set createClientDialog(value: boolean) {
        this.clientService.createClientDialog= value;
       }
       get selectedTypeImage(): TypeImageVo {
           return this.typeImageService.selectedTypeImage;
       }
      set selectedTypeImage(value: TypeImageVo) {
        this.typeImageService.selectedTypeImage = value;
       }
       get typeImages(): Array<TypeImageVo> {
           return this.typeImageService.typeImages;
       }
       set typeImages(value: Array<TypeImageVo>) {
        this.typeImageService.typeImages = value;
       }
       get createTypeImageDialog(): boolean {
           return this.typeImageService.createTypeImageDialog;
       }
      set createTypeImageDialog(value: boolean) {
        this.typeImageService.createTypeImageDialog= value;
       }
       get selectedStateBucket(): StateBucketVo {
           return this.stateBucketService.selectedStateBucket;
       }
      set selectedStateBucket(value: StateBucketVo) {
        this.stateBucketService.selectedStateBucket = value;
       }
       get stateBuckets(): Array<StateBucketVo> {
           return this.stateBucketService.stateBuckets;
       }
       set stateBuckets(value: Array<StateBucketVo>) {
        this.stateBucketService.stateBuckets = value;
       }
       get createStateBucketDialog(): boolean {
           return this.stateBucketService.createStateBucketDialog;
       }
      set createStateBucketDialog(value: boolean) {
        this.stateBucketService.createStateBucketDialog= value;
       }
       get selectedContributeur(): ContributeurVo {
           return this.contributeurService.selectedContributeur;
       }
      set selectedContributeur(value: ContributeurVo) {
        this.contributeurService.selectedContributeur = value;
       }
       get contributeurs(): Array<ContributeurVo> {
           return this.contributeurService.contributeurs;
       }
       set contributeurs(value: Array<ContributeurVo>) {
        this.contributeurService.contributeurs = value;
       }
       get createContributeurDialog(): boolean {
           return this.contributeurService.createContributeurDialog;
       }
      set createContributeurDialog(value: boolean) {
        this.contributeurService.createContributeurDialog= value;
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



    get categorieItemsVo(): Array<CategorieItemVo> {
    if( this._categorieItemsVo == null )
    this._categorieItemsVo = new Array();
        return this._categorieItemsVo;
    }

    set categorieItemsVo(value: Array<CategorieItemVo>) {
        this._categorieItemsVo = value;
    }

    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validBucketNom(): boolean {
    return this._validBucketNom;
    }

    set validBucketNom(value: boolean) {
    this._validBucketNom = value;
    }
    get validBucketDateCreation(): boolean {
    return this._validBucketDateCreation;
    }

    set validBucketDateCreation(value: boolean) {
    this._validBucketDateCreation = value;
    }
    get validBucketLibelle(): boolean {
    return this._validBucketLibelle;
    }

    set validBucketLibelle(value: boolean) {
    this._validBucketLibelle = value;
    }
    get validBucketStateBucket(): boolean {
    return this._validBucketStateBucket;
    }

    set validBucketStateBucket(value: boolean) {
    this._validBucketStateBucket = value;
    }
    get validBucketContributeur(): boolean {
    return this._validBucketContributeur;
    }

    set validBucketContributeur(value: boolean) {
    this._validBucketContributeur = value;
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
    get validStateBucketCode(): boolean {
    return this._validStateBucketCode;
    }

    set validStateBucketCode(value: boolean) {
    this._validStateBucketCode = value;
    }
    get validStateBucketLibelle(): boolean {
    return this._validStateBucketLibelle;
    }

    set validStateBucketLibelle(value: boolean) {
    this._validStateBucketLibelle = value;
    }
    get validContributeurNumeroMatricule(): boolean {
    return this._validContributeurNumeroMatricule;
    }

    set validContributeurNumeroMatricule(value: boolean) {
    this._validContributeurNumeroMatricule = value;
    }
    get validContributeurPrenom(): boolean {
    return this._validContributeurPrenom;
    }

    set validContributeurPrenom(value: boolean) {
    this._validContributeurPrenom = value;
    }
    get validContributeurNom(): boolean {
    return this._validContributeurNom;
    }

    set validContributeurNom(value: boolean) {
    this._validContributeurNom = value;
    }
    get validContributeurCin(): boolean {
    return this._validContributeurCin;
    }

    set validContributeurCin(value: boolean) {
    this._validContributeurCin = value;
    }
    get validContributeurNumeroTelephone(): boolean {
    return this._validContributeurNumeroTelephone;
    }

    set validContributeurNumeroTelephone(value: boolean) {
    this._validContributeurNumeroTelephone = value;
    }
    get validContributeurAdresse(): boolean {
    return this._validContributeurAdresse;
    }

    set validContributeurAdresse(value: boolean) {
    this._validContributeurAdresse = value;
    }
    get validContributeurCodePostale(): boolean {
    return this._validContributeurCodePostale;
    }

    set validContributeurCodePostale(value: boolean) {
    this._validContributeurCodePostale = value;
    }

}
