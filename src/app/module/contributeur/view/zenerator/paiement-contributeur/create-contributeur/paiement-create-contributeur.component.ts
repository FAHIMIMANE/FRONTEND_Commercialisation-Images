import {Component, OnInit, Input} from '@angular/core';
import {PaiementService} from 'src/app/controller/service/Paiement.service';
import {PaiementVo} from 'src/app/controller/model/Paiement.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {OffreReductionVo} from 'src/app/controller/model/OffreReduction.model';
import {OffreReductionService} from 'src/app/controller/service/OffreReduction.service';
@Component({
  selector: 'app-paiement-create-contributeur',
  templateUrl: './paiement-create-contributeur.component.html',
  styleUrls: ['./paiement-create-contributeur.component.css']
})
export class PaiementCreateContributeurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPaiementCode = true;
   _validPaiementMontantHt = true;
   _validPaiementMontantTtc = true;
   _validPaiementMontantTva = true;
   _validPaiementDatePaiement = true;
   _validPaiementPourcentageReduction = true;

    _validOffreReductionQteMin = true;
    _validOffreReductionQteMax = true;
    _validOffreReductionPourcentage = true;
    _validOffreReductionDateMin = true;
    _validOffreReductionDateMax = true;



constructor(private datePipe: DatePipe, private paiementService: PaiementService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private offreReductionService: OffreReductionService
) {

}


// methods
ngOnInit(): void {

    this.selectedOffreReduction = new OffreReductionVo();
    this.offreReductionService.findAll().subscribe((data) => this.offreReductions = data);
}




private setValidation(value : boolean){
    this.validPaiementCode = value;
    this.validPaiementMontantHt = value;
    this.validPaiementMontantTtc = value;
    this.validPaiementMontantTva = value;
    this.validPaiementDatePaiement = value;
    this.validPaiementPourcentageReduction = value;
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
     this.paiementService.save().subscribe(paiement=>{
       this.paiements.push({...paiement});
       this.createPaiementDialog = false;
       this.submitted = false;
       this.selectedPaiement = new PaiementVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePaiementCode();
this.validatePaiementMontantHt();
this.validatePaiementMontantTtc();
this.validatePaiementMontantTva();
this.validatePaiementDatePaiement();
this.validatePaiementPourcentageReduction();

    }

private validatePaiementCode(){
        if (this.stringUtilService.isEmpty(this.selectedPaiement.code)) {
            this.errorMessages.push('Code non valide');
            this.validPaiementCode = false;
        } else {
            this.validPaiementCode = true;
        }
    }
private validatePaiementMontantHt(){
        if (this.stringUtilService.isEmpty(this.selectedPaiement.montantHt)) {
            this.errorMessages.push('Montant ht non valide');
            this.validPaiementMontantHt = false;
        } else {
            this.validPaiementMontantHt = true;
        }
    }
private validatePaiementMontantTtc(){
        if (this.stringUtilService.isEmpty(this.selectedPaiement.montantTtc)) {
            this.errorMessages.push('Montant ttc non valide');
            this.validPaiementMontantTtc = false;
        } else {
            this.validPaiementMontantTtc = true;
        }
    }
private validatePaiementMontantTva(){
        if (this.stringUtilService.isEmpty(this.selectedPaiement.montantTva)) {
            this.errorMessages.push('Montant tva non valide');
            this.validPaiementMontantTva = false;
        } else {
            this.validPaiementMontantTva = true;
        }
    }
private validatePaiementDatePaiement(){
        if (this.stringUtilService.isEmpty(this.selectedPaiement.datePaiement)) {
            this.errorMessages.push('Date paiement non valide');
            this.validPaiementDatePaiement = false;
        } else {
            this.validPaiementDatePaiement = true;
        }
    }
private validatePaiementPourcentageReduction(){
        if (this.stringUtilService.isEmpty(this.selectedPaiement.pourcentageReduction)) {
            this.errorMessages.push('Pourcentage reduction non valide');
            this.validPaiementPourcentageReduction = false;
        } else {
            this.validPaiementPourcentageReduction = true;
        }
    }











//openPopup
              public async openCreateoffreReduction(offreReduction: string) {
                      const isPermistted = await this.roleService.isPermitted('OffreReduction', 'add');
                       if(isPermistted){
         this.selectedOffreReduction = new OffreReductionVo();
        this.createOffreReductionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createPaiementDialog  = false;
    this.setValidation(true);
}

// getters and setters

get paiements(): Array<PaiementVo> {
    return this.paiementService.paiements;
       }
set paiements(value: Array<PaiementVo>) {
        this.paiementService.paiements = value;
       }

 get selectedPaiement(): PaiementVo {
           return this.paiementService.selectedPaiement;
       }
    set selectedPaiement(value: PaiementVo) {
        this.paiementService.selectedPaiement = value;
       }

   get createPaiementDialog(): boolean {
           return this.paiementService.createPaiementDialog;

       }
    set createPaiementDialog(value: boolean) {
        this.paiementService.createPaiementDialog= value;
       }

       get selectedOffreReduction(): OffreReductionVo {
           return this.offreReductionService.selectedOffreReduction;
       }
      set selectedOffreReduction(value: OffreReductionVo) {
        this.offreReductionService.selectedOffreReduction = value;
       }
       get offreReductions(): Array<OffreReductionVo> {
           return this.offreReductionService.offreReductions;
       }
       set offreReductions(value: Array<OffreReductionVo>) {
        this.offreReductionService.offreReductions = value;
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

    get validPaiementCode(): boolean {
    return this._validPaiementCode;
    }

    set validPaiementCode(value: boolean) {
    this._validPaiementCode = value;
    }
    get validPaiementMontantHt(): boolean {
    return this._validPaiementMontantHt;
    }

    set validPaiementMontantHt(value: boolean) {
    this._validPaiementMontantHt = value;
    }
    get validPaiementMontantTtc(): boolean {
    return this._validPaiementMontantTtc;
    }

    set validPaiementMontantTtc(value: boolean) {
    this._validPaiementMontantTtc = value;
    }
    get validPaiementMontantTva(): boolean {
    return this._validPaiementMontantTva;
    }

    set validPaiementMontantTva(value: boolean) {
    this._validPaiementMontantTva = value;
    }
    get validPaiementDatePaiement(): boolean {
    return this._validPaiementDatePaiement;
    }

    set validPaiementDatePaiement(value: boolean) {
    this._validPaiementDatePaiement = value;
    }
    get validPaiementPourcentageReduction(): boolean {
    return this._validPaiementPourcentageReduction;
    }

    set validPaiementPourcentageReduction(value: boolean) {
    this._validPaiementPourcentageReduction = value;
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
