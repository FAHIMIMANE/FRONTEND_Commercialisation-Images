import {Component, OnInit, Input} from '@angular/core';
import {EtatAbonnementService} from 'src/app/controller/service/EtatAbonnement.service';
import {EtatAbonnementVo} from 'src/app/controller/model/EtatAbonnement.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-abonnement-create-admin',
  templateUrl: './etat-abonnement-create-admin.component.html',
  styleUrls: ['./etat-abonnement-create-admin.component.css']
})
export class EtatAbonnementCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtatAbonnementLibelle = true;
   _validEtatAbonnementCode = true;




constructor(private datePipe: DatePipe, private etatAbonnementService: EtatAbonnementService
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
    this.validEtatAbonnementLibelle = value;
    this.validEtatAbonnementCode = value;
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
     this.etatAbonnementService.save().subscribe(etatAbonnement=>{
       this.etatAbonnements.push({...etatAbonnement});
       this.createEtatAbonnementDialog = false;
       this.submitted = false;
       this.selectedEtatAbonnement = new EtatAbonnementVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEtatAbonnementLibelle();
this.validateEtatAbonnementCode();

    }

private validateEtatAbonnementLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEtatAbonnement.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtatAbonnementLibelle = false;
        } else {
            this.validEtatAbonnementLibelle = true;
        }
    }
private validateEtatAbonnementCode(){
        if (this.stringUtilService.isEmpty(this.selectedEtatAbonnement.code)) {
            this.errorMessages.push('Code non valide');
            this.validEtatAbonnementCode = false;
        } else {
            this.validEtatAbonnementCode = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createEtatAbonnementDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatAbonnements(): Array<EtatAbonnementVo> {
    return this.etatAbonnementService.etatAbonnements;
       }
set etatAbonnements(value: Array<EtatAbonnementVo>) {
        this.etatAbonnementService.etatAbonnements = value;
       }

 get selectedEtatAbonnement(): EtatAbonnementVo {
           return this.etatAbonnementService.selectedEtatAbonnement;
       }
    set selectedEtatAbonnement(value: EtatAbonnementVo) {
        this.etatAbonnementService.selectedEtatAbonnement = value;
       }

   get createEtatAbonnementDialog(): boolean {
           return this.etatAbonnementService.createEtatAbonnementDialog;

       }
    set createEtatAbonnementDialog(value: boolean) {
        this.etatAbonnementService.createEtatAbonnementDialog= value;
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

    get validEtatAbonnementLibelle(): boolean {
    return this._validEtatAbonnementLibelle;
    }

    set validEtatAbonnementLibelle(value: boolean) {
    this._validEtatAbonnementLibelle = value;
    }
    get validEtatAbonnementCode(): boolean {
    return this._validEtatAbonnementCode;
    }

    set validEtatAbonnementCode(value: boolean) {
    this._validEtatAbonnementCode = value;
    }


}
