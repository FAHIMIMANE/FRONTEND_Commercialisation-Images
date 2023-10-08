import {Component, OnInit, Input} from '@angular/core';
import {EtatPanierService} from 'src/app/controller/service/EtatPanier.service';
import {EtatPanierVo} from 'src/app/controller/model/EtatPanier.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-panier-create-chercheur',
  templateUrl: './etat-panier-create-chercheur.component.html',
  styleUrls: ['./etat-panier-create-chercheur.component.css']
})
export class EtatPanierCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtatPanierLibelle = true;
   _validEtatPanierCode = true;




constructor(private datePipe: DatePipe, private etatPanierService: EtatPanierService
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
    this.validEtatPanierLibelle = value;
    this.validEtatPanierCode = value;
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
     this.etatPanierService.save().subscribe(etatPanier=>{
       this.etatPaniers.push({...etatPanier});
       this.createEtatPanierDialog = false;
       this.submitted = false;
       this.selectedEtatPanier = new EtatPanierVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEtatPanierLibelle();
this.validateEtatPanierCode();

    }

private validateEtatPanierLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEtatPanier.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtatPanierLibelle = false;
        } else {
            this.validEtatPanierLibelle = true;
        }
    }
private validateEtatPanierCode(){
        if (this.stringUtilService.isEmpty(this.selectedEtatPanier.code)) {
            this.errorMessages.push('Code non valide');
            this.validEtatPanierCode = false;
        } else {
            this.validEtatPanierCode = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createEtatPanierDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatPaniers(): Array<EtatPanierVo> {
    return this.etatPanierService.etatPaniers;
       }
set etatPaniers(value: Array<EtatPanierVo>) {
        this.etatPanierService.etatPaniers = value;
       }

 get selectedEtatPanier(): EtatPanierVo {
           return this.etatPanierService.selectedEtatPanier;
       }
    set selectedEtatPanier(value: EtatPanierVo) {
        this.etatPanierService.selectedEtatPanier = value;
       }

   get createEtatPanierDialog(): boolean {
           return this.etatPanierService.createEtatPanierDialog;

       }
    set createEtatPanierDialog(value: boolean) {
        this.etatPanierService.createEtatPanierDialog= value;
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

    get validEtatPanierLibelle(): boolean {
    return this._validEtatPanierLibelle;
    }

    set validEtatPanierLibelle(value: boolean) {
    this._validEtatPanierLibelle = value;
    }
    get validEtatPanierCode(): boolean {
    return this._validEtatPanierCode;
    }

    set validEtatPanierCode(value: boolean) {
    this._validEtatPanierCode = value;
    }


}
