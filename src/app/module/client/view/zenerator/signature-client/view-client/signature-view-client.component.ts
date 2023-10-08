import {Component, OnInit} from '@angular/core';
import {SignatureService} from 'src/app/controller/service/Signature.service';
import {SignatureVo} from 'src/app/controller/model/Signature.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {ContributeurVo} from 'src/app/controller/model/Contributeur.model';
import {ContributeurService} from 'src/app/controller/service/Contributeur.service';
import {ContractVo} from 'src/app/controller/model/Contract.model';
import {ContractService} from 'src/app/controller/service/Contract.service';

@Component({
  selector: 'app-signature-view-client',
  templateUrl: './signature-view-client.component.html',
  styleUrls: ['./signature-view-client.component.css']
})
export class SignatureViewClientComponent implements OnInit {


constructor(private datePipe: DatePipe, private signatureService: SignatureService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private contributeurService: ContributeurService
    ,private contractService: ContractService
) {
}

// methods
ngOnInit(): void {
    this.selectedContributeur = new ContributeurVo();
    this.contributeurService.findAll().subscribe((data) => this.contributeurs = data);
    this.selectedContract = new ContractVo();
    this.contractService.findAll().subscribe((data) => this.contracts = data);
}

hideViewDialog(){
    this.viewSignatureDialog  = false;
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

   get viewSignatureDialog(): boolean {
           return this.signatureService.viewSignatureDialog;

       }
    set viewSignatureDialog(value: boolean) {
        this.signatureService.viewSignatureDialog= value;
       }

       get selectedContract(): ContractVo {
           return this.contractService.selectedContract;
       }
      set selectedContract(value: ContractVo) {
        this.contractService.selectedContract = value;
       }
       get contracts():Array<ContractVo> {
           return this.contractService.contracts;
       }
       set contracts(value: Array<ContractVo>) {
        this.contractService.contracts = value;
       }
       get editContractDialog(): boolean {
           return this.contractService.editContractDialog;
       }
      set editContractDialog(value: boolean) {
        this.contractService.editContractDialog= value;
       }
       get selectedContributeur(): ContributeurVo {
           return this.contributeurService.selectedContributeur;
       }
      set selectedContributeur(value: ContributeurVo) {
        this.contributeurService.selectedContributeur = value;
       }
       get contributeurs():Array<ContributeurVo> {
           return this.contributeurService.contributeurs;
       }
       set contributeurs(value: Array<ContributeurVo>) {
        this.contributeurService.contributeurs = value;
       }
       get editContributeurDialog(): boolean {
           return this.contributeurService.editContributeurDialog;
       }
      set editContributeurDialog(value: boolean) {
        this.contributeurService.editContributeurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
