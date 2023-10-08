import {Component, OnInit, Input} from '@angular/core';
import {ContractService} from 'src/app/controller/service/Contract.service';
import {ContractVo} from 'src/app/controller/model/Contract.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {SignatureVo} from 'src/app/controller/model/Signature.model';
import {SignatureService} from 'src/app/controller/service/Signature.service';
import {ContributeurVo} from 'src/app/controller/model/Contributeur.model';
import {ContributeurService} from 'src/app/controller/service/Contributeur.service';
import {TypeContratVo} from 'src/app/controller/model/TypeContrat.model';
import {TypeContratService} from 'src/app/controller/service/TypeContrat.service';
@Component({
  selector: 'app-contract-create-admin',
  templateUrl: './contract-create-admin.component.html',
  styleUrls: ['./contract-create-admin.component.css']
})
export class ContractCreateAdminComponent implements OnInit {

        selectedSignatures: SignatureVo = new SignatureVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validContractDateDebut = true;
   _validContractDateFin = true;
   _validContractObjet = true;
   _validContractContenu = true;
   _validContractReference = true;
   _validContractSignatures = true;

    _validTypeContratLibelle = true;
    _validTypeContratDescription = true;
    _validSignatureDateSignature = true;
    _validSignatureContributeur = true;
    _validSignatureContract = true;



constructor(private datePipe: DatePipe, private contractService: ContractService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private signatureService: SignatureService
,       private contributeurService: ContributeurService
,       private typeContratService: TypeContratService
) {

}


// methods
ngOnInit(): void {


                this.selectedSignatures.contributeurVo = new ContributeurVo();
                this.contributeurService.findAll().subscribe((data) => this.contributeurs = data);


    this.selectedTypeContrat = new TypeContratVo();
    this.typeContratService.findAll().subscribe((data) => this.typeContrats = data);
}


    validateSignatures(){
    this.errorMessages = new Array();
    this.validateSignatureDateSignature();
    this.validateSignatureContributeur();
    this.validateSignatureContract();
    }


private setValidation(value : boolean){
    this.validContractDateDebut = value;
    this.validContractDateFin = value;
    this.validContractObjet = value;
    this.validContractContenu = value;
    this.validContractReference = value;
    this.validContractSignatures = value;
    this.validSignatureDateSignature = value;
    this.validSignatureContributeur = value;
    this.validSignatureContract = value;
    }

        addSignatures() {
        if( this.selectedContract.signaturesVo == null ){
            this.selectedContract.signaturesVo = new Array<SignatureVo>();
        }
       this.validateSignatures();
       if (this.errorMessages.length === 0) {
              this.selectedContract.signaturesVo.push(this.selectedSignatures);
              this.selectedSignatures = new SignatureVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteSignatures(p: SignatureVo) {
        this.selectedContract.signaturesVo.forEach((element, index) => {
            if (element === p) { this.selectedContract.signaturesVo.splice(index, 1); }
        });
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
     this.contractService.save().subscribe(contract=>{
       this.contracts.push({...contract});
       this.createContractDialog = false;
       this.submitted = false;
       this.selectedContract = new ContractVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateContractDateDebut();
this.validateContractDateFin();
this.validateContractObjet();
this.validateContractContenu();
this.validateContractReference();
this.validateContractSignatures();

    }

private validateContractDateDebut(){
        if (this.stringUtilService.isEmpty(this.selectedContract.dateDebut)) {
            this.errorMessages.push('Date debut non valide');
            this.validContractDateDebut = false;
        } else {
            this.validContractDateDebut = true;
        }
    }
private validateContractDateFin(){
        if (this.stringUtilService.isEmpty(this.selectedContract.dateFin)) {
            this.errorMessages.push('Date fin non valide');
            this.validContractDateFin = false;
        } else {
            this.validContractDateFin = true;
        }
    }
private validateContractObjet(){
        if (this.stringUtilService.isEmpty(this.selectedContract.objet)) {
            this.errorMessages.push('Objet non valide');
            this.validContractObjet = false;
        } else {
            this.validContractObjet = true;
        }
    }
private validateContractContenu(){
        if (this.stringUtilService.isEmpty(this.selectedContract.contenu)) {
            this.errorMessages.push('Contenu non valide');
            this.validContractContenu = false;
        } else {
            this.validContractContenu = true;
        }
    }
private validateContractReference(){
        if (this.stringUtilService.isEmpty(this.selectedContract.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validContractReference = false;
        } else {
            this.validContractReference = true;
        }
    }
private validateContractSignatures(){
        if (this.stringUtilService.isEmpty(this.selectedContract.signaturesVo)) {
            this.errorMessages.push('Signatures non valide');
            this.validContractSignatures = false;
        } else {
            this.validContractSignatures = true;
        }
    }











            private validateSignatureDateSignature(){
            if (this.selectedSignatures.dateSignature == null) {
            this.errorMessages.push('DateSignature de la signature est  invalide');
             this.validSignatureDateSignature = false;
            } else {
            this.validSignatureDateSignature = true;
            }
            }

            private validateSignatureContributeur(){
            if (this.selectedSignatures.contributeurVo == null) {
            this.errorMessages.push('Contributeur de la signature est  invalide');
             this.validSignatureContributeur = false;
            } else {
            this.validSignatureContributeur = true;
            }
            }

            private validateSignatureContract(){
            if (this.selectedSignatures.contractVo == null) {
            this.errorMessages.push('Contract de la signature est  invalide');
             this.validSignatureContract = false;
            } else {
            this.validSignatureContract = true;
            }
            }






//openPopup
              public async openCreatetypeContrat(typeContrat: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeContrat', 'add');
                       if(isPermistted){
         this.selectedTypeContrat = new TypeContratVo();
        this.createTypeContratDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecontributeur(contributeur: string) {
                      const isPermistted = await this.roleService.isPermitted('Contributeur', 'add');
                       if(isPermistted){
         this.selectedContributeur = new ContributeurVo();
        this.createContributeurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createContractDialog  = false;
    this.setValidation(true);
}

// getters and setters

get contracts(): Array<ContractVo> {
    return this.contractService.contracts;
       }
set contracts(value: Array<ContractVo>) {
        this.contractService.contracts = value;
       }

 get selectedContract(): ContractVo {
           return this.contractService.selectedContract;
       }
    set selectedContract(value: ContractVo) {
        this.contractService.selectedContract = value;
       }

   get createContractDialog(): boolean {
           return this.contractService.createContractDialog;

       }
    set createContractDialog(value: boolean) {
        this.contractService.createContractDialog= value;
       }

       get selectedTypeContrat(): TypeContratVo {
           return this.typeContratService.selectedTypeContrat;
       }
      set selectedTypeContrat(value: TypeContratVo) {
        this.typeContratService.selectedTypeContrat = value;
       }
       get typeContrats(): Array<TypeContratVo> {
           return this.typeContratService.typeContrats;
       }
       set typeContrats(value: Array<TypeContratVo>) {
        this.typeContratService.typeContrats = value;
       }
       get createTypeContratDialog(): boolean {
           return this.typeContratService.createTypeContratDialog;
       }
      set createTypeContratDialog(value: boolean) {
        this.typeContratService.createTypeContratDialog= value;
       }
       get selectedContributeur(): ContributeurVo {
           return this.contributeurService.selectedContributeur;
       }
      set selectedContributeur(value: ContributeurVo) {
        this.contributeurService.selectedContributeur = value;
       }
       get contributeurs(): Array<ContributeurVo> {
           return this.contributeurService.contributeurs;
       }
       set contributeurs(value: Array<ContributeurVo>) {
        this.contributeurService.contributeurs = value;
       }
       get createContributeurDialog(): boolean {
           return this.contributeurService.createContributeurDialog;
       }
      set createContributeurDialog(value: boolean) {
        this.contributeurService.createContributeurDialog= value;
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

    get validContractDateDebut(): boolean {
    return this._validContractDateDebut;
    }

    set validContractDateDebut(value: boolean) {
    this._validContractDateDebut = value;
    }
    get validContractDateFin(): boolean {
    return this._validContractDateFin;
    }

    set validContractDateFin(value: boolean) {
    this._validContractDateFin = value;
    }
    get validContractObjet(): boolean {
    return this._validContractObjet;
    }

    set validContractObjet(value: boolean) {
    this._validContractObjet = value;
    }
    get validContractContenu(): boolean {
    return this._validContractContenu;
    }

    set validContractContenu(value: boolean) {
    this._validContractContenu = value;
    }
    get validContractReference(): boolean {
    return this._validContractReference;
    }

    set validContractReference(value: boolean) {
    this._validContractReference = value;
    }
    get validContractSignatures(): boolean {
    return this._validContractSignatures;
    }

    set validContractSignatures(value: boolean) {
    this._validContractSignatures = value;
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
    get validSignatureDateSignature(): boolean {
    return this._validSignatureDateSignature;
    }

    set validSignatureDateSignature(value: boolean) {
    this._validSignatureDateSignature = value;
    }
    get validSignatureContributeur(): boolean {
    return this._validSignatureContributeur;
    }

    set validSignatureContributeur(value: boolean) {
    this._validSignatureContributeur = value;
    }
    get validSignatureContract(): boolean {
    return this._validSignatureContract;
    }

    set validSignatureContract(value: boolean) {
    this._validSignatureContract = value;
    }

}
