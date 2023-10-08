import {Component, OnInit, Input} from '@angular/core';
import {TypeContributeurService} from 'src/app/controller/service/TypeContributeur.service';
import {TypeContributeurVo} from 'src/app/controller/model/TypeContributeur.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-type-contributeur-create-client',
  templateUrl: './type-contributeur-create-client.component.html',
  styleUrls: ['./type-contributeur-create-client.component.css']
})
export class TypeContributeurCreateClientComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeContributeurLibelle = true;
   _validTypeContributeurCode = true;




constructor(private datePipe: DatePipe, private typeContributeurService: TypeContributeurService
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
    this.validTypeContributeurLibelle = value;
    this.validTypeContributeurCode = value;
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
     this.typeContributeurService.save().subscribe(typeContributeur=>{
       this.typeContributeurs.push({...typeContributeur});
       this.createTypeContributeurDialog = false;
       this.submitted = false;
       this.selectedTypeContributeur = new TypeContributeurVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeContributeurLibelle();
this.validateTypeContributeurCode();

    }

private validateTypeContributeurLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeContributeur.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeContributeurLibelle = false;
        } else {
            this.validTypeContributeurLibelle = true;
        }
    }
private validateTypeContributeurCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeContributeur.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeContributeurCode = false;
        } else {
            this.validTypeContributeurCode = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createTypeContributeurDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeContributeurs(): Array<TypeContributeurVo> {
    return this.typeContributeurService.typeContributeurs;
       }
set typeContributeurs(value: Array<TypeContributeurVo>) {
        this.typeContributeurService.typeContributeurs = value;
       }

 get selectedTypeContributeur(): TypeContributeurVo {
           return this.typeContributeurService.selectedTypeContributeur;
       }
    set selectedTypeContributeur(value: TypeContributeurVo) {
        this.typeContributeurService.selectedTypeContributeur = value;
       }

   get createTypeContributeurDialog(): boolean {
           return this.typeContributeurService.createTypeContributeurDialog;

       }
    set createTypeContributeurDialog(value: boolean) {
        this.typeContributeurService.createTypeContributeurDialog= value;
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

    get validTypeContributeurLibelle(): boolean {
    return this._validTypeContributeurLibelle;
    }

    set validTypeContributeurLibelle(value: boolean) {
    this._validTypeContributeurLibelle = value;
    }
    get validTypeContributeurCode(): boolean {
    return this._validTypeContributeurCode;
    }

    set validTypeContributeurCode(value: boolean) {
    this._validTypeContributeurCode = value;
    }


}
