import {Component, OnInit} from '@angular/core';
import {SignatureService} from 'src/app/controller/service/Signature.service';
import {SignatureVo} from 'src/app/controller/model/Signature.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ContributeurVo} from 'src/app/controller/model/Contributeur.model';
import {ContributeurService} from 'src/app/controller/service/Contributeur.service';
import {ContractVo} from 'src/app/controller/model/Contract.model';
import {ContractService} from 'src/app/controller/service/Contract.service';

@Component({
  selector: 'app-signature-edit-contributeur',
  templateUrl: './signature-edit-contributeur.component.html',
  styleUrls: ['./signature-edit-contributeur.component.css']
})
export class SignatureEditContributeurComponent implements OnInit {


constructor(private datePipe: DatePipe, private signatureService: SignatureService
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

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedSignature.dateSignature = DateUtils.toDate(this.selectedSignature.dateSignature);
    this.signatureService.edit().subscribe(signature=>{
    const myIndex = this.signatures.findIndex(e => e.id === this.selectedSignature.id);
    this.signatures[myIndex] = this.selectedSignature;
    this.editSignatureDialog = false;
    this.selectedSignature = new SignatureVo();


    }, error => {
        console.log(error);
    });

}

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

hideEditDialog(){
    this.editSignatureDialog  = false;
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

   get editSignatureDialog(): boolean {
           return this.signatureService.editSignatureDialog;

       }
    set editSignatureDialog(value: boolean) {
        this.signatureService.editSignatureDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
