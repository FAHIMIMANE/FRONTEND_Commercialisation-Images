import {Component, OnInit, Input} from '@angular/core';
import {SignatureService} from 'src/app/controller/service/Signature.service';
import {SignatureVo} from 'src/app/controller/model/Signature.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {ContributeurVo} from 'src/app/controller/model/Contributeur.model';
import {ContributeurService} from 'src/app/controller/service/Contributeur.service';
import {ContractVo} from 'src/app/controller/model/Contract.model';
import {ContractService} from 'src/app/controller/service/Contract.service';
@Component({
  selector: 'app-signature-create-admin',
  templateUrl: './signature-create-admin.component.html',
  styleUrls: ['./signature-create-admin.component.css']
})
export class SignatureCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validSignatureDateSignature = true;
   _validSignatureContributeur = true;
   _validSignatureContract = true;

    _validContributeurNumeroMatricule = true;
    _validContributeurPrenom = true;
    _validContributeurNom = true;
    _validContributeurCin = true;
    _validContributeurNumeroTelephone = true;
    _validContributeurAdresse = true;
    _validContributeurCodePostale = true;
    _validContractDateDebut = true;
    _validContractDateFin = true;
    _validContractObjet = true;
    _validContractContenu = true;
    _validContractReference = true;
    _validContractSignatures = true;



constructor(private datePipe: DatePipe, private signatureService: SignatureService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private contributeurService: ContributeurService
,       private contractService: ContractService
) {

}


// methods
ngOnInit(): void {

    this.selectedContributeur = new ContributeurVo();
    this.contributeurService.findAll().subscribe((data) => this.contributeurs = data);
    this.selectedContract = new ContractVo();
    this.contractService.findAll().subscribe((data) => this.contracts = data);
}




private setValidation(value : boolean){
    this.validSignatureDateSignature = value;
    this.validSignatureContributeur = value;
    this.validSignatureContract = value;
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
     this.signatureService.save().subscribe(signature=>{
       this.signatures.push({...signature});
       this.createSignatureDialog = false;
       this.submitted = false;
       this.selectedSignature = new SignatureVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateSignatureDateSignature();
this.validateSignatureContributeur();
this.validateSignatureContract();

    }

private validateSignatureDateSignature(){
        if (this.stringUtilService.isEmpty(this.selectedSignature.dateSignature)) {
            this.errorMessages.push('Date signature non valide');
            this.validSignatureDateSignature = false;
        } else {
            this.validSignatureDateSignature = true;
        }
    }
private validateSignatureContributeur(){
        if (this.stringUtilService.isEmpty(this.selectedSignature.contributeurVo)) {
            this.errorMessages.push('Contributeur non valide');
            this.validSignatureContributeur = false;
        } else {
            this.validSignatureContributeur = true;
        }
    }
private validateSignatureContract(){
        if (this.stringUtilService.isEmpty(this.selectedSignature.contractVo)) {
            this.errorMessages.push('Contract non valide');
            this.validSignatureContract = false;
        } else {
            this.validSignatureContract = true;
        }
    }







//openPopup
              public async openCreatecontract(contract: string) {
                      const isPermistted = await this.roleService.isPermitted('Contract', 'add');
                       if(isPermistted){
         this.selectedContract = new ContractVo();
        this.createContractDialog = true;
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
    this.createSignatureDialog  = false;
    this.setValidation(true);
}

// getters and setters

get signatures(): Array<SignatureVo> {
    return this.signatureService.signatures;
       }
set signatures(value: Array<SignatureVo>) {
        this.signatureService.signatures = value;
       }

 get selectedSignature(): SignatureVo {
           return this.signatureService.selectedSignature;
       }
    set selectedSignature(value: SignatureVo) {
        this.signatureService.selectedSignature = value;
       }

   get createSignatureDialog(): boolean {
           return this.signatureService.createSignatureDialog;

       }
    set createSignatureDialog(value: boolean) {
        this.signatureService.createSignatureDialog= value;
       }

       get selectedContract(): ContractVo {
           return this.contractService.selectedContract;
       }
      set selectedContract(value: ContractVo) {
        this.contractService.selectedContract = value;
       }
       get contracts(): Array<ContractVo> {
           return this.contractService.contracts;
       }
       set contracts(value: Array<ContractVo>) {
        this.contractService.contracts = value;
       }
       get createContractDialog(): boolean {
           return this.contractService.createContractDialog;
       }
      set createContractDialog(value: boolean) {
        this.contractService.createContractDialog= value;
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

    get validContributeurNumeroMatricule(): boolean {
    return this._validContributeurNumeroMatricule;
    }

    set validContributeurNumeroMatricule(value: boolean) {
    this._validContributeurNumeroMatricule = value;
    }
    get validContributeurPrenom(): boolean {
    return this._validContributeurPrenom;
    }

    set validContributeurPrenom(value: boolean) {
    this._validContributeurPrenom = value;
    }
    get validContributeurNom(): boolean {
    return this._validContributeurNom;
    }

    set validContributeurNom(value: boolean) {
    this._validContributeurNom = value;
    }
    get validContributeurCin(): boolean {
    return this._validContributeurCin;
    }

    set validContributeurCin(value: boolean) {
    this._validContributeurCin = value;
    }
    get validContributeurNumeroTelephone(): boolean {
    return this._validContributeurNumeroTelephone;
    }

    set validContributeurNumeroTelephone(value: boolean) {
    this._validContributeurNumeroTelephone = value;
    }
    get validContributeurAdresse(): boolean {
    return this._validContributeurAdresse;
    }

    set validContributeurAdresse(value: boolean) {
    this._validContributeurAdresse = value;
    }
    get validContributeurCodePostale(): boolean {
    return this._validContributeurCodePostale;
    }

    set validContributeurCodePostale(value: boolean) {
    this._validContributeurCodePostale = value;
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

}
