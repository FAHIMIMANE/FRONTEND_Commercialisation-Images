import {Component, OnInit, Input} from '@angular/core';
import {TypeImageService} from 'src/app/controller/service/TypeImage.service';
import {TypeImageVo} from 'src/app/controller/model/TypeImage.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-type-image-create-chercheur',
  templateUrl: './type-image-create-chercheur.component.html',
  styleUrls: ['./type-image-create-chercheur.component.css']
})
export class TypeImageCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeImageLibelle = true;
   _validTypeImageCode = true;




constructor(private datePipe: DatePipe, private typeImageService: TypeImageService
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
    this.validTypeImageLibelle = value;
    this.validTypeImageCode = value;
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
     this.typeImageService.save().subscribe(typeImage=>{
       this.typeImages.push({...typeImage});
       this.createTypeImageDialog = false;
       this.submitted = false;
       this.selectedTypeImage = new TypeImageVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeImageLibelle();
this.validateTypeImageCode();

    }

private validateTypeImageLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeImage.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeImageLibelle = false;
        } else {
            this.validTypeImageLibelle = true;
        }
    }
private validateTypeImageCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeImage.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeImageCode = false;
        } else {
            this.validTypeImageCode = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createTypeImageDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeImages(): Array<TypeImageVo> {
    return this.typeImageService.typeImages;
       }
set typeImages(value: Array<TypeImageVo>) {
        this.typeImageService.typeImages = value;
       }

 get selectedTypeImage(): TypeImageVo {
           return this.typeImageService.selectedTypeImage;
       }
    set selectedTypeImage(value: TypeImageVo) {
        this.typeImageService.selectedTypeImage = value;
       }

   get createTypeImageDialog(): boolean {
           return this.typeImageService.createTypeImageDialog;

       }
    set createTypeImageDialog(value: boolean) {
        this.typeImageService.createTypeImageDialog= value;
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


}
