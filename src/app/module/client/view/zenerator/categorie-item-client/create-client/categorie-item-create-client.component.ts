import {Component, OnInit, Input} from '@angular/core';
import {CategorieItemService} from 'src/app/controller/service/CategorieItem.service';
import {CategorieItemVo} from 'src/app/controller/model/CategorieItem.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {CategorieImageVo} from 'src/app/controller/model/CategorieImage.model';
import {CategorieImageService} from 'src/app/controller/service/CategorieImage.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {ImageService} from 'src/app/controller/service/Image.service';
@Component({
  selector: 'app-categorie-item-create-client',
  templateUrl: './categorie-item-create-client.component.html',
  styleUrls: ['./categorie-item-create-client.component.css']
})
export class CategorieItemCreateClientComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validImageReference = true;
    _validImagePrix = true;
    _validImageDescription = true;
    _validImageBucket = true;
    _validCategorieImageLibelle = true;
    _validCategorieImageDescription = true;



constructor(private datePipe: DatePipe, private categorieItemService: CategorieItemService
 ,       private stringUtilService: StringUtilService
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




private setValidation(value : boolean){
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
     this.categorieItemService.save().subscribe(categorieItem=>{
       this.categorieItems.push({...categorieItem});
       this.createCategorieItemDialog = false;
       this.submitted = false;
       this.selectedCategorieItem = new CategorieItemVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

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

hideCreateDialog(){
    this.createCategorieItemDialog  = false;
    this.setValidation(true);
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

   get createCategorieItemDialog(): boolean {
           return this.categorieItemService.createCategorieItemDialog;

       }
    set createCategorieItemDialog(value: boolean) {
        this.categorieItemService.createCategorieItemDialog= value;
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
    get validCategorieImageLibelle(): boolean {
    return this._validCategorieImageLibelle;
    }

    set validCategorieImageLibelle(value: boolean) {
    this._validCategorieImageLibelle = value;
    }
    get validCategorieImageDescription(): boolean {
    return this._validCategorieImageDescription;
    }

    set validCategorieImageDescription(value: boolean) {
    this._validCategorieImageDescription = value;
    }

}
