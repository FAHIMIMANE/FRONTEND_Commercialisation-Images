import {Component, OnInit, Input} from '@angular/core';
import {ClientService} from 'src/app/controller/service/Client.service';
import {ClientVo} from 'src/app/controller/model/Client.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {CategorieImageVo} from 'src/app/controller/model/CategorieImage.model';
import {CategorieImageService} from 'src/app/controller/service/CategorieImage.service';
import {TypeImageVo} from 'src/app/controller/model/TypeImage.model';
import {TypeImageService} from 'src/app/controller/service/TypeImage.service';
import {BucketVo} from 'src/app/controller/model/Bucket.model';
import {BucketService} from 'src/app/controller/service/Bucket.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {ImageService} from 'src/app/controller/service/Image.service';
import {CategorieItemVo} from 'src/app/controller/model/CategorieItem.model';
import {CategorieItemService} from 'src/app/controller/service/CategorieItem.service';
@Component({
  selector: 'app-client-create-chercheur',
  templateUrl: './client-create-chercheur.component.html',
  styleUrls: ['./client-create-chercheur.component.css']
})
export class ClientCreateChercheurComponent implements OnInit {

        selectedImages: ImageVo = new ImageVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validClientNumeroMatricule = true;
   _validClientNumeroDeTel = true;
   _validClientImages = true;
   _validClientCodePostal = true;
   _validClientRib = true;

    _validImageReference = true;
    _validImagePrix = true;
    _validImageDescription = true;
    _validImageBucket = true;

       private _categorieItemsVo: Array<CategorieItemVo> = [];


constructor(private datePipe: DatePipe, private clientService: ClientService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private categorieImageService: CategorieImageService
,       private typeImageService: TypeImageService
,       private bucketService: BucketService
,       private imageService: ImageService
) {

}


// methods
ngOnInit(): void {


                this.selectedImages.bucketVo = new BucketVo();
                this.bucketService.findAll().subscribe((data) => this.buckets = data);
                this.selectedImages.typeImageVo = new TypeImageVo();
                this.typeImageService.findAll().subscribe((data) => this.typeImages = data);

                this.categorieImageService.findAll().subscribe(data => this.prepareCategorieItems(data));

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
    this.validClientNumeroMatricule = value;
    this.validClientNumeroDeTel = value;
    this.validClientImages = value;
    this.validImageReference = value;
    this.validImagePrix = value;
    this.validImageDescription = value;
    this.validImageBucket = value;
    this.validClientCodePostal = value;
    this.validClientRib = value;
    }

        addImages() {
        if( this.selectedClient.imagesVo == null ){
            this.selectedClient.imagesVo = new Array<ImageVo>();
        }
       this.validateImages();
       if (this.errorMessages.length === 0) {
              this.selectedClient.imagesVo.push(this.selectedImages);
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
        this.selectedClient.imagesVo.forEach((element, index) => {
            if (element === p) { this.selectedClient.imagesVo.splice(index, 1); }
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
     this.clientService.save().subscribe(client=>{
       this.clients.push({...client});
       this.createClientDialog = false;
       this.submitted = false;
       this.selectedClient = new ClientVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateClientNumeroMatricule();
this.validateClientNumeroDeTel();
this.validateClientImages();
this.validateClientCodePostal();
this.validateClientRib();

    }

private validateClientNumeroMatricule(){
        if (this.stringUtilService.isEmpty(this.selectedClient.numeroMatricule)) {
            this.errorMessages.push('Numero matricule non valide');
            this.validClientNumeroMatricule = false;
        } else {
            this.validClientNumeroMatricule = true;
        }
    }
private validateClientNumeroDeTel(){
        if (this.stringUtilService.isEmpty(this.selectedClient.numeroDeTel)) {
            this.errorMessages.push('Numero de tel non valide');
            this.validClientNumeroDeTel = false;
        } else {
            this.validClientNumeroDeTel = true;
        }
    }
private validateClientImages(){
        if (this.stringUtilService.isEmpty(this.selectedClient.imagesVo)) {
            this.errorMessages.push('Images non valide');
            this.validClientImages = false;
        } else {
            this.validClientImages = true;
        }
    }
private validateClientCodePostal(){
        if (this.stringUtilService.isEmpty(this.selectedClient.codePostal)) {
            this.errorMessages.push('Code postal non valide');
            this.validClientCodePostal = false;
        } else {
            this.validClientCodePostal = true;
        }
    }
private validateClientRib(){
        if (this.stringUtilService.isEmpty(this.selectedClient.rib)) {
            this.errorMessages.push('Rib non valide');
            this.validClientRib = false;
        } else {
            this.validClientRib = true;
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
              public async openCreatebucket(bucket: string) {
                      const isPermistted = await this.roleService.isPermitted('Bucket', 'add');
                       if(isPermistted){
         this.selectedBucket = new BucketVo();
        this.createBucketDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createClientDialog  = false;
    this.setValidation(true);
}

// getters and setters

get clients(): Array<ClientVo> {
    return this.clientService.clients;
       }
set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }

 get selectedClient(): ClientVo {
           return this.clientService.selectedClient;
       }
    set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
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
       get selectedBucket(): BucketVo {
           return this.bucketService.selectedBucket;
       }
      set selectedBucket(value: BucketVo) {
        this.bucketService.selectedBucket = value;
       }
       get buckets(): Array<BucketVo> {
           return this.bucketService.buckets;
       }
       set buckets(value: Array<BucketVo>) {
        this.bucketService.buckets = value;
       }
       get createBucketDialog(): boolean {
           return this.bucketService.createBucketDialog;
       }
      set createBucketDialog(value: boolean) {
        this.bucketService.createBucketDialog= value;
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

    get validClientNumeroMatricule(): boolean {
    return this._validClientNumeroMatricule;
    }

    set validClientNumeroMatricule(value: boolean) {
    this._validClientNumeroMatricule = value;
    }
    get validClientNumeroDeTel(): boolean {
    return this._validClientNumeroDeTel;
    }

    set validClientNumeroDeTel(value: boolean) {
    this._validClientNumeroDeTel = value;
    }
    get validClientImages(): boolean {
    return this._validClientImages;
    }

    set validClientImages(value: boolean) {
    this._validClientImages = value;
    }
    get validClientCodePostal(): boolean {
    return this._validClientCodePostal;
    }

    set validClientCodePostal(value: boolean) {
    this._validClientCodePostal = value;
    }
    get validClientRib(): boolean {
    return this._validClientRib;
    }

    set validClientRib(value: boolean) {
    this._validClientRib = value;
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

}
