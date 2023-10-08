import {Component, OnInit} from '@angular/core';
import {ContractService} from 'src/app/controller/service/Contract.service';
import {ContractVo} from 'src/app/controller/model/Contract.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import { TypeContratService } from 'src/app/controller/service/TypeContrat.service';

import {TypeContratVo} from 'src/app/controller/model/TypeContrat.model';
import {SignatureVo} from 'src/app/controller/model/Signature.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-contract-list-client',
  templateUrl: './contract-list-client.component.html',
  styleUrls: ['./contract-list-client.component.css']
})
export class ContractListClientComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Contract';
     yesOrNoArchive :any[] =[];
    typeContrats :Array<TypeContratVo>;


    constructor(private datePipe: DatePipe, private contractService: ContractService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private typeContratService: TypeContratService
) { }

    ngOnInit() : void {
      this.loadContracts();
      this.initExport();
      this.initCol();
      this.loadTypeContrat();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadContracts(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Contract', 'list');
        isPermistted ? this.contractService.findAll().subscribe(contracts => this.contracts = contracts,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.contractService.findByCriteria(this.searchContract).subscribe(contracts=>{
            
            this.contracts = contracts;
           // this.searchContract = new ContractVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'dateDebut', header: 'Date debut'},
                            {field: 'dateFin', header: 'Date fin'},
                            {field: 'objet', header: 'Objet'},
                        {field: 'typeContrat?.libelle', header: 'Type contrat'},
                            {field: 'reference', header: 'Reference'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editContract(contract: ContractVo){
        const isPermistted = await this.roleService.isPermitted('Contract', 'edit');
         if(isPermistted){
          this.contractService.findByIdWithAssociatedList(contract).subscribe(res => {
           this.selectedContract = res;
            this.selectedContract.dateDebut = new Date(contract.dateDebut);
            this.selectedContract.dateFin = new Date(contract.dateFin);
            this.selectedContract.dateArchivage = new Date(contract.dateArchivage);
            this.selectedContract.dateCreation = new Date(contract.dateCreation);
            this.editContractDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewContract(contract: ContractVo){
        const isPermistted = await this.roleService.isPermitted('Contract', 'view');
        if(isPermistted){
           this.contractService.findByIdWithAssociatedList(contract).subscribe(res => {
           this.selectedContract = res;
            this.selectedContract.dateDebut = new Date(contract.dateDebut);
            this.selectedContract.dateFin = new Date(contract.dateFin);
            this.selectedContract.dateArchivage = new Date(contract.dateArchivage);
            this.selectedContract.dateCreation = new Date(contract.dateCreation);
            this.viewContractDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateContract(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedContract = new ContractVo();
            this.createContractDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverContract(contract: ContractVo){
const isPermistted = await this.roleService.isPermitted('Contract', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Contract) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.contractService.archiver(contract).subscribe(status=>{
const myIndex = this.contracts.indexOf(contract);
this.contracts[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Contract archivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}

public async desarchiverContract(contract: ContractVo){
const isPermistted = await this.roleService.isPermitted('Contract', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Contract) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.contractService.desarchiver(contract).subscribe(status=>{
const myIndex = this.contracts.indexOf(contract);
this.contracts[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Contract désarchivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}


    public async deleteContract(contract: ContractVo){
       const isPermistted = await this.roleService.isPermitted('Contract', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Contract) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.contractService.delete(contract).subscribe(status=>{
                          if(status > 0){
                          const position = this.contracts.indexOf(contract);
                          position > -1 ? this.contracts.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Contract Supprimé',
                        life: 3000
                    });
                                     }

                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
              });
             }
    }

public async loadTypeContrat(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Contract', 'list');
    isPermistted ? this.typeContratService.findAll().subscribe(typeContrats => this.typeContrats = typeContrats,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateContract(contract: ContractVo) {

     this.contractService.findByIdWithAssociatedList(contract).subscribe(
	 res => {
	       this.initDuplicateContract(res);
	       this.selectedContract = res;
	       this.selectedContract.id = null;
            this.createContractDialog = true;

});

	}

	initDuplicateContract(res: ContractVo) {
        if (res.signaturesVo != null) {
             res.signaturesVo.forEach(d => { d.contractVo = null; d.id = null; });
                }


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.contracts.map(e => {
    return {
                    'Date debut': this.datePipe.transform(e.dateDebut , 'dd-MM-yyyy'),
                    'Date fin': this.datePipe.transform(e.dateFin , 'dd-MM-yyyy'),
                    'Objet': e.objet ,
            'Type contrat': e.typeContratVo?.libelle ,
                    'Contenu': e.contenu ,
                    'Reference': e.reference ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
            'Date debut Min': this.searchContract.dateDebutMin ? this.datePipe.transform(this.searchContract.dateDebutMin , this.dateFormat) : environment.emptyForExport ,
            'Date debut Max': this.searchContract.dateDebutMax ? this.datePipe.transform(this.searchContract.dateDebutMax , this.dateFormat) : environment.emptyForExport ,
            'Date fin Min': this.searchContract.dateFinMin ? this.datePipe.transform(this.searchContract.dateFinMin , this.dateFormat) : environment.emptyForExport ,
            'Date fin Max': this.searchContract.dateFinMax ? this.datePipe.transform(this.searchContract.dateFinMax , this.dateFormat) : environment.emptyForExport ,
            'Objet': this.searchContract.objet ? this.searchContract.objet : environment.emptyForExport ,
        'Type contrat': this.searchContract.typeContratVo?.libelle ? this.searchContract.typeContratVo?.libelle : environment.emptyForExport ,
            'Contenu': this.searchContract.contenu ? this.searchContract.contenu : environment.emptyForExport ,
            'Reference': this.searchContract.reference ? this.searchContract.reference : environment.emptyForExport ,
            'Archive': this.searchContract.archive ? (this.searchContract.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchContract.dateArchivageMin ? this.datePipe.transform(this.searchContract.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchContract.dateArchivageMax ? this.datePipe.transform(this.searchContract.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchContract.dateCreationMin ? this.datePipe.transform(this.searchContract.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchContract.dateCreationMax ? this.datePipe.transform(this.searchContract.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get contracts() : Array<ContractVo> {
           return this.contractService.contracts;
       }
    set contracts(value: Array<ContractVo>) {
        this.contractService.contracts = value;
       }

    get contractSelections() : Array<ContractVo> {
           return this.contractService.contractSelections;
       }
    set contractSelections(value: Array<ContractVo>) {
        this.contractService.contractSelections = value;
       }
   
     


    get selectedContract() : ContractVo {
           return this.contractService.selectedContract;
       }
    set selectedContract(value: ContractVo) {
        this.contractService.selectedContract = value;
       }
    
    get createContractDialog() :boolean {
           return this.contractService.createContractDialog;
       }
    set createContractDialog(value: boolean) {
        this.contractService.createContractDialog= value;
       }
    
    get editContractDialog() :boolean {
           return this.contractService.editContractDialog;
       }
    set editContractDialog(value: boolean) {
        this.contractService.editContractDialog= value;
       }
    get viewContractDialog() :boolean {
           return this.contractService.viewContractDialog;
       }
    set viewContractDialog(value: boolean) {
        this.contractService.viewContractDialog = value;
       }
       
     get searchContract() : ContractVo {
        return this.contractService.searchContract;
       }
    set searchContract(value: ContractVo) {
        this.contractService.searchContract = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
