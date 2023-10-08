import {Component, OnInit} from '@angular/core';
import {SignatureService} from 'src/app/controller/service/Signature.service';
import {SignatureVo} from 'src/app/controller/model/Signature.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import { ContributeurService } from 'src/app/controller/service/Contributeur.service';
import { ContractService } from 'src/app/controller/service/Contract.service';

import {ContributeurVo} from 'src/app/controller/model/Contributeur.model';
import {ContractVo} from 'src/app/controller/model/Contract.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-signature-list-chercheur',
  templateUrl: './signature-list-chercheur.component.html',
  styleUrls: ['./signature-list-chercheur.component.css']
})
export class SignatureListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Signature';
    contributeurs :Array<ContributeurVo>;
    contracts :Array<ContractVo>;


    constructor(private datePipe: DatePipe, private signatureService: SignatureService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private contributeurService: ContributeurService
        , private contractService: ContractService
) { }

    ngOnInit() : void {
      this.loadSignatures();
      this.initExport();
      this.initCol();
      this.loadContributeur();
      this.loadContract();
    }
    
    // methods
      public async loadSignatures(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Signature', 'list');
        isPermistted ? this.signatureService.findAll().subscribe(signatures => this.signatures = signatures,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.signatureService.findByCriteria(this.searchSignature).subscribe(signatures=>{
            
            this.signatures = signatures;
           // this.searchSignature = new SignatureVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'dateSignature', header: 'Date signature'},
                        {field: 'contributeur?.cin', header: 'Contributeur'},
                        {field: 'contract?.objet', header: 'Contract'},
        ];
    }
    
    public async editSignature(signature: SignatureVo){
        const isPermistted = await this.roleService.isPermitted('Signature', 'edit');
         if(isPermistted){
          this.signatureService.findByIdWithAssociatedList(signature).subscribe(res => {
           this.selectedSignature = res;
            this.selectedSignature.dateSignature = new Date(signature.dateSignature);
            this.editSignatureDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewSignature(signature: SignatureVo){
        const isPermistted = await this.roleService.isPermitted('Signature', 'view');
        if(isPermistted){
           this.signatureService.findByIdWithAssociatedList(signature).subscribe(res => {
           this.selectedSignature = res;
            this.selectedSignature.dateSignature = new Date(signature.dateSignature);
            this.viewSignatureDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateSignature(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedSignature = new SignatureVo();
            this.createSignatureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteSignature(signature: SignatureVo){
       const isPermistted = await this.roleService.isPermitted('Signature', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Signature) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.signatureService.delete(signature).subscribe(status=>{
                          if(status > 0){
                          const position = this.signatures.indexOf(signature);
                          position > -1 ? this.signatures.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Signature Supprimé',
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

public async loadContributeur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Signature', 'list');
    isPermistted ? this.contributeurService.findAll().subscribe(contributeurs => this.contributeurs = contributeurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadContract(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Signature', 'list');
    isPermistted ? this.contractService.findAll().subscribe(contracts => this.contracts = contracts,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateSignature(signature: SignatureVo) {

     this.signatureService.findByIdWithAssociatedList(signature).subscribe(
	 res => {
	       this.initDuplicateSignature(res);
	       this.selectedSignature = res;
	       this.selectedSignature.id = null;
            this.createSignatureDialog = true;

});

	}

	initDuplicateSignature(res: SignatureVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.signatures.map(e => {
    return {
                    'Date signature': this.datePipe.transform(e.dateSignature , 'dd-MM-yyyy'),
            'Contributeur': e.contributeurVo?.cin ,
            'Contract': e.contractVo?.objet ,
     }
      });

      this.criteriaData = [{
            'Date signature Min': this.searchSignature.dateSignatureMin ? this.datePipe.transform(this.searchSignature.dateSignatureMin , this.dateFormat) : environment.emptyForExport ,
            'Date signature Max': this.searchSignature.dateSignatureMax ? this.datePipe.transform(this.searchSignature.dateSignatureMax , this.dateFormat) : environment.emptyForExport ,
        'Contributeur': this.searchSignature.contributeurVo?.cin ? this.searchSignature.contributeurVo?.cin : environment.emptyForExport ,
        'Contract': this.searchSignature.contractVo?.objet ? this.searchSignature.contractVo?.objet : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get signatures() : Array<SignatureVo> {
           return this.signatureService.signatures;
       }
    set signatures(value: Array<SignatureVo>) {
        this.signatureService.signatures = value;
       }

    get signatureSelections() : Array<SignatureVo> {
           return this.signatureService.signatureSelections;
       }
    set signatureSelections(value: Array<SignatureVo>) {
        this.signatureService.signatureSelections = value;
       }
   
     


    get selectedSignature() : SignatureVo {
           return this.signatureService.selectedSignature;
       }
    set selectedSignature(value: SignatureVo) {
        this.signatureService.selectedSignature = value;
       }
    
    get createSignatureDialog() :boolean {
           return this.signatureService.createSignatureDialog;
       }
    set createSignatureDialog(value: boolean) {
        this.signatureService.createSignatureDialog= value;
       }
    
    get editSignatureDialog() :boolean {
           return this.signatureService.editSignatureDialog;
       }
    set editSignatureDialog(value: boolean) {
        this.signatureService.editSignatureDialog= value;
       }
    get viewSignatureDialog() :boolean {
           return this.signatureService.viewSignatureDialog;
       }
    set viewSignatureDialog(value: boolean) {
        this.signatureService.viewSignatureDialog = value;
       }
       
     get searchSignature() : SignatureVo {
        return this.signatureService.searchSignature;
       }
    set searchSignature(value: SignatureVo) {
        this.signatureService.searchSignature = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
