import {Component, OnInit} from '@angular/core';
import {ContractService} from 'src/app/controller/service/Contract.service';
import {ContractVo} from 'src/app/controller/model/Contract.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TypeContratVo} from 'src/app/controller/model/TypeContrat.model';
import {TypeContratService} from 'src/app/controller/service/TypeContrat.service';
import {SignatureVo} from 'src/app/controller/model/Signature.model';
import {SignatureService} from 'src/app/controller/service/Signature.service';
import {ContributeurVo} from 'src/app/controller/model/Contributeur.model';
import {ContributeurService} from 'src/app/controller/service/Contributeur.service';

@Component({
  selector: 'app-contract-edit-client',
  templateUrl: './contract-edit-client.component.html',
  styleUrls: ['./contract-edit-client.component.css']
})
export class ContractEditClientComponent implements OnInit {

        selectedSignatures: SignatureVo = new SignatureVo();
        signaturesListe: Array<SignatureVo> = [];

        myContributeurs: Array<ContributeurVo> = [];


constructor(private datePipe: DatePipe, private contractService: ContractService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeContratService: TypeContratService
 ,       private signatureService: SignatureService
 ,       private contributeurService: ContributeurService
) {
}

// methods
ngOnInit(): void {
                this.selectedSignatures.contributeurVo = new ContributeurVo();
                this.contributeurService.findAll().subscribe((data) => this.contributeurs = data);
    this.selectedTypeContrat = new TypeContratVo();
    this.typeContratService.findAll().subscribe((data) => this.typeContrats = data);
}
        addSignatures() {
        if( this.selectedContract.signaturesVo == null ){
            this.selectedContract.signaturesVo = new Array<SignatureVo>();
        }
        this.selectedContract.signaturesVo.push(this.selectedSignatures);
        this.selectedSignatures = new SignatureVo();
        }

       deleteSignatures(p: SignatureVo) {
        this.selectedContract.signaturesVo.forEach((element, index) => {
            if (element === p) { this.selectedContract.signaturesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedContract.dateDebut = DateUtils.toDate(this.selectedContract.dateDebut);
            this.selectedContract.dateFin = DateUtils.toDate(this.selectedContract.dateFin);
            this.selectedContract.dateArchivage = DateUtils.toDate(this.selectedContract.dateArchivage);
            this.selectedContract.dateCreation = DateUtils.toDate(this.selectedContract.dateCreation);
    this.contractService.edit().subscribe(contract=>{
    const myIndex = this.contracts.findIndex(e => e.id === this.selectedContract.id);
    this.contracts[myIndex] = this.selectedContract;
    this.editContractDialog = false;
    this.selectedContract = new ContractVo();


    }, error => {
        console.log(error);
    });

}

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

hideEditDialog(){
    this.editContractDialog  = false;
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

   get editContractDialog(): boolean {
           return this.contractService.editContractDialog;

       }
    set editContractDialog(value: boolean) {
        this.contractService.editContractDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
