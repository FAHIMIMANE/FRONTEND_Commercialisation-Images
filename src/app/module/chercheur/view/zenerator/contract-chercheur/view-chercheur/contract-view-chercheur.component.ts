import {Component, OnInit} from '@angular/core';
import {ContractService} from 'src/app/controller/service/Contract.service';
import {ContractVo} from 'src/app/controller/model/Contract.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {TypeContratVo} from 'src/app/controller/model/TypeContrat.model';
import {TypeContratService} from 'src/app/controller/service/TypeContrat.service';
import {SignatureVo} from 'src/app/controller/model/Signature.model';
import {SignatureService} from 'src/app/controller/service/Signature.service';
import {ContributeurVo} from 'src/app/controller/model/Contributeur.model';
import {ContributeurService} from 'src/app/controller/service/Contributeur.service';

@Component({
  selector: 'app-contract-view-chercheur',
  templateUrl: './contract-view-chercheur.component.html',
  styleUrls: ['./contract-view-chercheur.component.css']
})
export class ContractViewChercheurComponent implements OnInit {

        selectedSignatures: SignatureVo = new SignatureVo();
        signaturesListe: Array<SignatureVo> = [];

        myContributeurs: Array<ContributeurVo> = [];


constructor(private datePipe: DatePipe, private contractService: ContractService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeContratService: TypeContratService
    ,private signatureService: SignatureService
    ,private contributeurService: ContributeurService
) {
}

// methods
ngOnInit(): void {
                this.selectedSignatures.contributeurVo = new ContributeurVo();
                this.contributeurService.findAll().subscribe((data) => this.contributeurs = data);
    this.selectedTypeContrat = new TypeContratVo();
    this.typeContratService.findAll().subscribe((data) => this.typeContrats = data);
}

hideViewDialog(){
    this.viewContractDialog  = false;
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

   get viewContractDialog(): boolean {
           return this.contractService.viewContractDialog;

       }
    set viewContractDialog(value: boolean) {
        this.contractService.viewContractDialog= value;
       }

       get selectedTypeContrat(): TypeContratVo {
           return this.typeContratService.selectedTypeContrat;
       }
      set selectedTypeContrat(value: TypeContratVo) {
        this.typeContratService.selectedTypeContrat = value;
       }
       get typeContrats():Array<TypeContratVo> {
           return this.typeContratService.typeContrats;
       }
       set typeContrats(value: Array<TypeContratVo>) {
        this.typeContratService.typeContrats = value;
       }
       get editTypeContratDialog(): boolean {
           return this.typeContratService.editTypeContratDialog;
       }
      set editTypeContratDialog(value: boolean) {
        this.typeContratService.editTypeContratDialog= value;
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
