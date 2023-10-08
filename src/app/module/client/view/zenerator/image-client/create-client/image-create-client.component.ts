import {Component, OnInit, Input} from '@angular/core';
import {ImageService} from 'src/app/controller/service/Image.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
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
import {ClientVo} from 'src/app/controller/model/Client.model';
import {ClientService} from 'src/app/controller/service/Client.service';
import {CategorieItemVo} from 'src/app/controller/model/CategorieItem.model';
import {CategorieItemService} from 'src/app/controller/service/CategorieItem.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {DomSanitizer} from "@angular/platform-browser";
import {AngularFireStorage} from '@angular/fire/compat/storage';
@Component({
  selector: 'app-image-create-client',
  templateUrl: './image-create-client.component.html',
  styleUrls: ['./image-create-client.component.css']
})
export class ImageCreateClientComponent implements OnInit {
    // formTemplate = new FormGroup({
    //     caption: new FormControl('', Validators.required),
    //     category: new FormControl(''),
    //     imageUrl: new FormControl('', Validators.required)
    // });

        selectedCategorieItems: CategorieItemVo = new CategorieItemVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validImageReference = true;
   _validImagePrix = true;
   _validImageDescription = true;
   _validImageBucket = true;

    _validClientNumeroMatricule = true;
    _validClientNumeroDeTel = true;
    _validClientImages = true;
    _validClientCodePostal = true;
    _validClientRib = true;
    _validBucketNom = true;
    _validBucketDateCreation = true;
    _validBucketLibelle = true;
    _validBucketStateBucket = true;
    _validBucketContributeur = true;
    _validTypeImageLibelle = true;
    _validTypeImageCode = true;


private _categorieItemsVo: Array<CategorieItemVo> = [];
    imgSrc: any = 'assets/images/upload.jpg';
    public _selectedImage: any = null;



    constructor(private datePipe: DatePipe, private imageService: ImageService
 ,              private stringUtilService: StringUtilService
 ,              private roleService: RoleService
 ,              private messageService: MessageService
 ,              private router: Router
            ,   private storage : AngularFireStorage
,               private categorieImageService: CategorieImageService
,               private typeImageService: TypeImageService
,               private bucketService: BucketService
,               private clientService: ClientService
,               private categorieItemService: CategorieItemService
        , public _DomSanitizationService: DomSanitizer
) {

}


// methods
ngOnInit(): void {

            this.categorieImageService.findAll().subscribe(data => this.prepareCategorieItems(data));

            this.selectedCategorieItems.categorieImageVo = new CategorieImageVo();
            this.categorieImageService.findAll().subscribe((data) => this.categorieImages = data);


            this.selectedClient = new ClientVo();
            this.clientService.findAll().subscribe((data) => this.clients = data);
            this.selectedBucket = new BucketVo();
            this.bucketService.findAll().subscribe((data) => this.buckets = data);
            this.selectedTypeImage = new TypeImageVo();
            this.typeImageService.findAll().subscribe((data) => this.typeImages = data);
}

         prepareCategorieItems(categorieImages: Array<CategorieImageVo>): void{
        if ( categorieImages != null){
        categorieImages.forEach(e => {
        const categorieItem = new CategorieItemVo();
        categorieItem.categorieImageVo = e;
        this.categorieItemsVo.push(categorieItem);
        });
        }
    }



private setValidation(value: boolean){
    this.validImageReference = value;
    this.validImagePrix = value;
    this.validImageDescription = value;
    this.validImageBucket = value;
    }


// public save(){
//   this.submitted = true;
//   this.validateForm();
//   if (this.errorMessages.length === 0) {
//         this.saveWithShowOption(false);
//   } else {
//         this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
//   }
// }

public saveWithShowOption(showList: boolean){
     this.imageService.save().subscribe(image => {
       this.images.push({...image});
       this.createImageDialog = false;
       this.submitted = false;
       this.selectedImage = new ImageVo();


    } , error => {
        console.log(error);
    });

}
// validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateImageReference();
this.validateImagePrix();
this.validateImageDescription();
this.validateImageBucket();

    }

private validateImageReference(){
        if (this.stringUtilService.isEmpty(this.selectedImage.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validImageReference = false;
        } else {
            this.validImageReference = true;
        }
    }
private validateImagePrix(){
        if (this.stringUtilService.isEmpty(this.selectedImage.prix)) {
            this.errorMessages.push('Prix non valide');
            this.validImagePrix = false;
        } else {
            this.validImagePrix = true;
        }
    }
private validateImageDescription(){
        if (this.stringUtilService.isEmpty(this.selectedImage.description)) {
            this.errorMessages.push('Description non valide');
            this.validImageDescription = false;
        } else {
            this.validImageDescription = true;
        }
    }
private validateImageBucket(){
        if (this.stringUtilService.isEmpty(this.selectedImage.bucketVo)) {
            this.errorMessages.push('Bucket non valide');
            this.validImageBucket = false;
        } else {
            this.validImageBucket = true;
        }
    }


















// openPopup
              public async openCreateclient(client: string) {
                      const isPermistted = await this.roleService.isPermitted('Client', 'add');
                      if (isPermistted){
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
                      if (isPermistted){
         this.selectedTypeImage = new TypeImageVo();
         this.createTypeImageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecategorieImage(categorieImage: string) {
                      const isPermistted = await this.roleService.isPermitted('CategorieImage', 'add');
                      if (isPermistted){
         this.selectedCategorieImage = new CategorieImageVo();
         this.createCategorieImageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatebucket(bucket: string) {
                      const isPermistted = await this.roleService.isPermitted('Bucket', 'add');
                      if (isPermistted){
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
    this.createImageDialog  = false;
    this.setValidation(true);
}

// getters and setters

get images(): Array<ImageVo> {
    return this.imageService.images;
       }
set images(value: Array<ImageVo>) {
        this.imageService.images = value;
       }

 get selectedImage(): ImageVo {
           return this.imageService.selectedImage;
       }
    set selectedImage(value: ImageVo) {
        this.imageService.selectedImage = value;
       }

   get createImageDialog(): boolean {
           return this.imageService.createImageDialog;

       }
    set createImageDialog(value: boolean) {
        this.imageService.createImageDialog = value;
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
        this.clientService.createClientDialog = value;
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
        this.typeImageService.createTypeImageDialog = value;
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
        this.categorieImageService.createCategorieImageDialog = value;
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
        this.bucketService.createBucketDialog = value;
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
    if ( this._categorieItemsVo == null ) {
    this._categorieItemsVo = new Array();
    }
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
    get validTypeImageLibelle(): boolean {
    return this._validTypeImageLibelle;
    }

    set validTypeImageLibelle(value: boolean) {
    this._validTypeImageLibelle = value;
    }
    get validTypeImageCode(): boolean {
    return this._validTypeImageCode;
    }

    set validTypeImageCode(value: boolean) {
    this._validTypeImageCode = value;
    }

    onselectedFile(event: any) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e: any) => this.imgSrc = e.target.result;

            reader.readAsDataURL(event.target.files[0]);

            this._selectedImage = event.target.files[0];
            console.log(this._selectedImage);
        } else {
            this.imgSrc = 'assets/images/upload.jpg';
            this._selectedImage = null;
        }
    }
    public save() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            const filePath = `image/reference/${this.selectedImage.reference.split('.').slice(0, -1).join('.')}${new Date().getTime()}`;
            const fileRef = this.storage.ref(filePath);
            this.storage.upload(filePath, this._selectedImage).snapshotChanges().pipe(
                finalize(() => {
                    fileRef.getDownloadURL().subscribe((url) => {
                        this._selectedImage = url;
                        this.imageService.insertImageDetails(this._selectedImage);
                        this.selectedImage.reference = this._selectedImage;
                        this.saveWithShowOption(false);
                        console.log('test*********');
                        console.log(this.selectedImage);
                        console.log(this._selectedImage);
                    });
                })
            ).subscribe();
            console.log('create' + this.selectedImage);
            this.imgSrc = 'assets/images/upload.jpg';
            this._selectedImage = null;

        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs sur le formulaire'
            });
        }
    }







}
