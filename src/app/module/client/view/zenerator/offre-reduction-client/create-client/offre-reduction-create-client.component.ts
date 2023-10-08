import {Component, OnInit, Input} from '@angular/core';
import {OffreReductionService} from 'src/app/controller/service/OffreReduction.service';
import {OffreReductionVo} from 'src/app/controller/model/OffreReduction.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-offre-reduction-create-client',
  templateUrl: './offre-reduction-create-client.component.html',
  styleUrls: ['./offre-reduction-create-client.component.css']
})
export class OffreReductionCreateClientComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validOffreReductionQteMin = true;
   _validOffreReductionQteMax = true;
   _validOffreReductionPourcentage = true;
   _validOffreReductionDateMin = true;
   _validOffreReductionDateMax = true;




constructor(private datePipe: DatePipe, private offreReductionService: OffreReductionService
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
    this.validOffreReductionQteMin = value;
    this.validOffreReductionQteMax = value;
    this.validOffreReductionPourcentage = value;
    this.validOffreReductionDateMin = value;
    this.validOffreReductionDateMax = value;
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
     this.offreReductionService.save().subscribe(offreReduction=>{
       this.offreReductions.push({...offreReduction});
       this.createOffreReductionDialog = false;
       this.submitted = false;
       this.selectedOffreReduction = new OffreReductionVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateOffreReductionQteMin();
this.validateOffreReductionQteMax();
this.validateOffreReductionPourcentage();
this.validateOffreReductionDateMin();
this.validateOffreReductionDateMax();

    }

private validateOffreReductionQteMin(){
        if (this.stringUtilService.isEmpty(this.selectedOffreReduction.qteMin)) {
            this.errorMessages.push('Qte min non valide');
            this.validOffreReductionQteMin = false;
        } else {
            this.validOffreReductionQteMin = true;
        }
    }
private validateOffreReductionQteMax(){
        if (this.stringUtilService.isEmpty(this.selectedOffreReduction.qteMax)) {
            this.errorMessages.push('Qte max non valide');
            this.validOffreReductionQteMax = false;
        } else {
            this.validOffreReductionQteMax = true;
        }
    }
private validateOffreReductionPourcentage(){
        if (this.stringUtilService.isEmpty(this.selectedOffreReduction.pourcentage)) {
            this.errorMessages.push('Pourcentage non valide');
            this.validOffreReductionPourcentage = false;
        } else {
            this.validOffreReductionPourcentage = true;
        }
    }
private validateOffreReductionDateMin(){
        if (this.stringUtilService.isEmpty(this.selectedOffreReduction.dateMin)) {
            this.errorMessages.push('Date min non valide');
            this.validOffreReductionDateMin = false;
        } else {
            this.validOffreReductionDateMin = true;
        }
    }
private validateOffreReductionDateMax(){
        if (this.stringUtilService.isEmpty(this.selectedOffreReduction.dateMax)) {
            this.errorMessages.push('Date max non valide');
            this.validOffreReductionDateMax = false;
        } else {
            this.validOffreReductionDateMax = true;
        }
    }









//openPopup
// methods

hideCreateDialog(){
    this.createOffreReductionDialog  = false;
    this.setValidation(true);
}

// getters and setters

get offreReductions(): Array<OffreReductionVo> {
    return this.offreReductionService.offreReductions;
       }
set offreReductions(value: Array<OffreReductionVo>) {
        this.offreReductionService.offreReductions = value;
       }

 get selectedOffreReduction(): OffreReductionVo {
           return this.offreReductionService.selectedOffreReduction;
       }
    set selectedOffreReduction(value: OffreReductionVo) {
        this.offreReductionService.selectedOffreReduction = value;
       }

   get createOffreReductionDialog(): boolean {
           return this.offreReductionService.createOffreReductionDialog;

       }
    set createOffreReductionDialog(value: boolean) {
        this.offreReductionService.createOffreReductionDialog= value;
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

    get validOffreReductionQteMin(): boolean {
    return this._validOffreReductionQteMin;
    }

    set validOffreReductionQteMin(value: boolean) {
    this._validOffreReductionQteMin = value;
    }
    get validOffreReductionQteMax(): boolean {
    return this._validOffreReductionQteMax;
    }

    set validOffreReductionQteMax(value: boolean) {
    this._validOffreReductionQteMax = value;
    }
    get validOffreReductionPourcentage(): boolean {
    return this._validOffreReductionPourcentage;
    }

    set validOffreReductionPourcentage(value: boolean) {
    this._validOffreReductionPourcentage = value;
    }
    get validOffreReductionDateMin(): boolean {
    return this._validOffreReductionDateMin;
    }

    set validOffreReductionDateMin(value: boolean) {
    this._validOffreReductionDateMin = value;
    }
    get validOffreReductionDateMax(): boolean {
    return this._validOffreReductionDateMax;
    }

    set validOffreReductionDateMax(value: boolean) {
    this._validOffreReductionDateMax = value;
    }


}
