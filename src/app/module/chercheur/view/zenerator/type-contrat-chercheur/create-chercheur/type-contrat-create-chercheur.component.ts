import {Component, OnInit, Input} from '@angular/core';
import {TypeContratService} from 'src/app/controller/service/TypeContrat.service';
import {TypeContratVo} from 'src/app/controller/model/TypeContrat.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-type-contrat-create-chercheur',
  templateUrl: './type-contrat-create-chercheur.component.html',
  styleUrls: ['./type-contrat-create-chercheur.component.css']
})
export class TypeContratCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeContratLibelle = true;
   _validTypeContratDescription = true;




constructor(private datePipe: DatePipe, private typeContratService: TypeContratService
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
    this.validTypeContratLibelle = value;
    this.validTypeContratDescription = value;
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
     this.typeContratService.save().subscribe(typeContrat=>{
       this.typeContrats.push({...typeContrat});
       this.createTypeContratDialog = false;
       this.submitted = false;
       this.selectedTypeContrat = new TypeContratVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeContratLibelle();
this.validateTypeContratDescription();

    }

private validateTypeContratLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeContrat.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeContratLibelle = false;
        } else {
            this.validTypeContratLibelle = true;
        }
    }
private validateTypeContratDescription(){
        if (this.stringUtilService.isEmpty(this.selectedTypeContrat.description)) {
            this.errorMessages.push('Description non valide');
            this.validTypeContratDescription = false;
        } else {
            this.validTypeContratDescription = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createTypeContratDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeContrats(): Array<TypeContratVo> {
    return this.typeContratService.typeContrats;
       }
set typeContrats(value: Array<TypeContratVo>) {
        this.typeContratService.typeContrats = value;
       }

 get selectedTypeContrat(): TypeContratVo {
           return this.typeContratService.selectedTypeContrat;
       }
    set selectedTypeContrat(value: TypeContratVo) {
        this.typeContratService.selectedTypeContrat = value;
       }

   get createTypeContratDialog(): boolean {
           return this.typeContratService.createTypeContratDialog;

       }
    set createTypeContratDialog(value: boolean) {
        this.typeContratService.createTypeContratDialog= value;
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

    get validTypeContratLibelle(): boolean {
    return this._validTypeContratLibelle;
    }

    set validTypeContratLibelle(value: boolean) {
    this._validTypeContratLibelle = value;
    }
    get validTypeContratDescription(): boolean {
    return this._validTypeContratDescription;
    }

    set validTypeContratDescription(value: boolean) {
    this._validTypeContratDescription = value;
    }


}
