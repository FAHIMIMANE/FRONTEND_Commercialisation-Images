import {Component, OnInit, Input} from '@angular/core';
import {TypePaiementService} from 'src/app/controller/service/TypePaiement.service';
import {TypePaiementVo} from 'src/app/controller/model/TypePaiement.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-type-paiement-create-admin',
  templateUrl: './type-paiement-create-admin.component.html',
  styleUrls: ['./type-paiement-create-admin.component.css']
})
export class TypePaiementCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypePaiementLibelle = true;
   _validTypePaiementCode = true;




constructor(private datePipe: DatePipe, private typePaiementService: TypePaiementService
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
    this.validTypePaiementLibelle = value;
    this.validTypePaiementCode = value;
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
     this.typePaiementService.save().subscribe(typePaiement=>{
       this.typePaiements.push({...typePaiement});
       this.createTypePaiementDialog = false;
       this.submitted = false;
       this.selectedTypePaiement = new TypePaiementVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypePaiementLibelle();
this.validateTypePaiementCode();

    }

private validateTypePaiementLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypePaiement.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypePaiementLibelle = false;
        } else {
            this.validTypePaiementLibelle = true;
        }
    }
private validateTypePaiementCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypePaiement.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypePaiementCode = false;
        } else {
            this.validTypePaiementCode = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createTypePaiementDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typePaiements(): Array<TypePaiementVo> {
    return this.typePaiementService.typePaiements;
       }
set typePaiements(value: Array<TypePaiementVo>) {
        this.typePaiementService.typePaiements = value;
       }

 get selectedTypePaiement(): TypePaiementVo {
           return this.typePaiementService.selectedTypePaiement;
       }
    set selectedTypePaiement(value: TypePaiementVo) {
        this.typePaiementService.selectedTypePaiement = value;
       }

   get createTypePaiementDialog(): boolean {
           return this.typePaiementService.createTypePaiementDialog;

       }
    set createTypePaiementDialog(value: boolean) {
        this.typePaiementService.createTypePaiementDialog= value;
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

    get validTypePaiementLibelle(): boolean {
    return this._validTypePaiementLibelle;
    }

    set validTypePaiementLibelle(value: boolean) {
    this._validTypePaiementLibelle = value;
    }
    get validTypePaiementCode(): boolean {
    return this._validTypePaiementCode;
    }

    set validTypePaiementCode(value: boolean) {
    this._validTypePaiementCode = value;
    }


}
