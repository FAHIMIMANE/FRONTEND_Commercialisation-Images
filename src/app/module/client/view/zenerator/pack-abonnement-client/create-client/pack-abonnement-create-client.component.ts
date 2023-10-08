import {Component, OnInit, Input} from '@angular/core';
import {PackAbonnementService} from 'src/app/controller/service/PackAbonnement.service';
import {PackAbonnementVo} from 'src/app/controller/model/PackAbonnement.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-pack-abonnement-create-client',
  templateUrl: './pack-abonnement-create-client.component.html',
  styleUrls: ['./pack-abonnement-create-client.component.css']
})
export class PackAbonnementCreateClientComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPackAbonnementNombreImageMax = true;
   _validPackAbonnementReduction = true;
   _validPackAbonnementDateMin = true;
   _validPackAbonnementDateMax = true;




constructor(private datePipe: DatePipe, private packAbonnementService: PackAbonnementService
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
    this.validPackAbonnementNombreImageMax = value;
    this.validPackAbonnementReduction = value;
    this.validPackAbonnementDateMin = value;
    this.validPackAbonnementDateMax = value;
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
     this.packAbonnementService.save().subscribe(packAbonnement=>{
       this.packAbonnements.push({...packAbonnement});
       this.createPackAbonnementDialog = false;
       this.submitted = false;
       this.selectedPackAbonnement = new PackAbonnementVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePackAbonnementNombreImageMax();
this.validatePackAbonnementReduction();
this.validatePackAbonnementDateMin();
this.validatePackAbonnementDateMax();

    }

private validatePackAbonnementNombreImageMax(){
        if (this.stringUtilService.isEmpty(this.selectedPackAbonnement.nombreImageMax)) {
            this.errorMessages.push('Nombre image max non valide');
            this.validPackAbonnementNombreImageMax = false;
        } else {
            this.validPackAbonnementNombreImageMax = true;
        }
    }
private validatePackAbonnementReduction(){
        if (this.stringUtilService.isEmpty(this.selectedPackAbonnement.reduction)) {
            this.errorMessages.push('Reduction non valide');
            this.validPackAbonnementReduction = false;
        } else {
            this.validPackAbonnementReduction = true;
        }
    }
private validatePackAbonnementDateMin(){
        if (this.stringUtilService.isEmpty(this.selectedPackAbonnement.dateMin)) {
            this.errorMessages.push('Date min non valide');
            this.validPackAbonnementDateMin = false;
        } else {
            this.validPackAbonnementDateMin = true;
        }
    }
private validatePackAbonnementDateMax(){
        if (this.stringUtilService.isEmpty(this.selectedPackAbonnement.dateMax)) {
            this.errorMessages.push('Date max non valide');
            this.validPackAbonnementDateMax = false;
        } else {
            this.validPackAbonnementDateMax = true;
        }
    }








//openPopup
// methods

hideCreateDialog(){
    this.createPackAbonnementDialog  = false;
    this.setValidation(true);
}

// getters and setters

get packAbonnements(): Array<PackAbonnementVo> {
    return this.packAbonnementService.packAbonnements;
       }
set packAbonnements(value: Array<PackAbonnementVo>) {
        this.packAbonnementService.packAbonnements = value;
       }

 get selectedPackAbonnement(): PackAbonnementVo {
           return this.packAbonnementService.selectedPackAbonnement;
       }
    set selectedPackAbonnement(value: PackAbonnementVo) {
        this.packAbonnementService.selectedPackAbonnement = value;
       }

   get createPackAbonnementDialog(): boolean {
           return this.packAbonnementService.createPackAbonnementDialog;

       }
    set createPackAbonnementDialog(value: boolean) {
        this.packAbonnementService.createPackAbonnementDialog= value;
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

    get validPackAbonnementNombreImageMax(): boolean {
    return this._validPackAbonnementNombreImageMax;
    }

    set validPackAbonnementNombreImageMax(value: boolean) {
    this._validPackAbonnementNombreImageMax = value;
    }
    get validPackAbonnementReduction(): boolean {
    return this._validPackAbonnementReduction;
    }

    set validPackAbonnementReduction(value: boolean) {
    this._validPackAbonnementReduction = value;
    }
    get validPackAbonnementDateMin(): boolean {
    return this._validPackAbonnementDateMin;
    }

    set validPackAbonnementDateMin(value: boolean) {
    this._validPackAbonnementDateMin = value;
    }
    get validPackAbonnementDateMax(): boolean {
    return this._validPackAbonnementDateMax;
    }

    set validPackAbonnementDateMax(value: boolean) {
    this._validPackAbonnementDateMax = value;
    }


}
