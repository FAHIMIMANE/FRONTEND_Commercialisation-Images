import {Component, OnInit, Input} from '@angular/core';
import {CategorieImageService} from 'src/app/controller/service/CategorieImage.service';
import {CategorieImageVo} from 'src/app/controller/model/CategorieImage.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-categorie-image-create-admin',
  templateUrl: './categorie-image-create-admin.component.html',
  styleUrls: ['./categorie-image-create-admin.component.css']
})
export class CategorieImageCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validCategorieImageLibelle = true;
   _validCategorieImageDescription = true;




constructor(private datePipe: DatePipe, private categorieImageService: CategorieImageService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}




private setValidation(value : boolean){
    this.validCategorieImageLibelle = value;
    this.validCategorieImageDescription = value;
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
     this.categorieImageService.save().subscribe(categorieImage=>{
       this.categorieImages.push({...categorieImage});
       this.createCategorieImageDialog = false;
       this.submitted = false;
       this.selectedCategorieImage = new CategorieImageVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateCategorieImageLibelle();
this.validateCategorieImageDescription();

    }

private validateCategorieImageLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedCategorieImage.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validCategorieImageLibelle = false;
        } else {
            this.validCategorieImageLibelle = true;
        }
    }
private validateCategorieImageDescription(){
        if (this.stringUtilService.isEmpty(this.selectedCategorieImage.description)) {
            this.errorMessages.push('Description non valide');
            this.validCategorieImageDescription = false;
        } else {
            this.validCategorieImageDescription = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createCategorieImageDialog  = false;
    this.setValidation(true);
}

// getters and setters

get categorieImages(): Array<CategorieImageVo> {
    return this.categorieImageService.categorieImages;
       }
set categorieImages(value: Array<CategorieImageVo>) {
        this.categorieImageService.categorieImages = value;
       }

 get selectedCategorieImage(): CategorieImageVo {
           return this.categorieImageService.selectedCategorieImage;
       }
    set selectedCategorieImage(value: CategorieImageVo) {
        this.categorieImageService.selectedCategorieImage = value;
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
