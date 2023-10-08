import {Component, OnInit, Input} from '@angular/core';
import {EtatImageService} from 'src/app/controller/service/EtatImage.service';
import {EtatImageVo} from 'src/app/controller/model/EtatImage.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-image-create-contributeur',
  templateUrl: './etat-image-create-contributeur.component.html',
  styleUrls: ['./etat-image-create-contributeur.component.css']
})
export class EtatImageCreateContributeurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtatImageLibelle = true;
   _validEtatImageCode = true;




constructor(private datePipe: DatePipe, private etatImageService: EtatImageService
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
    this.validEtatImageLibelle = value;
    this.validEtatImageCode = value;
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
     this.etatImageService.save().subscribe(etatImage=>{
       this.etatImages.push({...etatImage});
       this.createEtatImageDialog = false;
       this.submitted = false;
       this.selectedEtatImage = new EtatImageVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEtatImageLibelle();
this.validateEtatImageCode();

    }

private validateEtatImageLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEtatImage.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtatImageLibelle = false;
        } else {
            this.validEtatImageLibelle = true;
        }
    }
private validateEtatImageCode(){
        if (this.stringUtilService.isEmpty(this.selectedEtatImage.code)) {
            this.errorMessages.push('Code non valide');
            this.validEtatImageCode = false;
        } else {
            this.validEtatImageCode = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createEtatImageDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatImages(): Array<EtatImageVo> {
    return this.etatImageService.etatImages;
       }
set etatImages(value: Array<EtatImageVo>) {
        this.etatImageService.etatImages = value;
       }

 get selectedEtatImage(): EtatImageVo {
           return this.etatImageService.selectedEtatImage;
       }
    set selectedEtatImage(value: EtatImageVo) {
        this.etatImageService.selectedEtatImage = value;
       }

   get createEtatImageDialog(): boolean {
           return this.etatImageService.createEtatImageDialog;

       }
    set createEtatImageDialog(value: boolean) {
        this.etatImageService.createEtatImageDialog= value;
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

    get validEtatImageLibelle(): boolean {
    return this._validEtatImageLibelle;
    }

    set validEtatImageLibelle(value: boolean) {
    this._validEtatImageLibelle = value;
    }
    get validEtatImageCode(): boolean {
    return this._validEtatImageCode;
    }

    set validEtatImageCode(value: boolean) {
    this._validEtatImageCode = value;
    }


}
