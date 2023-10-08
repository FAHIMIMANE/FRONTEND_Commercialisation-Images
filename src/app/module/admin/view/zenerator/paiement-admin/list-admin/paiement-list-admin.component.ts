import {Component, OnInit} from '@angular/core';
import {PaiementService} from 'src/app/controller/service/Paiement.service';
import {PaiementVo} from 'src/app/controller/model/Paiement.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import { OffreReductionService } from 'src/app/controller/service/OffreReduction.service';

import {OffreReductionVo} from 'src/app/controller/model/OffreReduction.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-paiement-list-admin',
  templateUrl: './paiement-list-admin.component.html',
  styleUrls: ['./paiement-list-admin.component.css']
})
export class PaiementListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Paiement';
    offreReductions :Array<OffreReductionVo>;


    constructor(private datePipe: DatePipe, private paiementService: PaiementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private offreReductionService: OffreReductionService
) { }

    ngOnInit() : void {
      this.loadPaiements();
      this.initExport();
      this.initCol();
      this.loadOffreReduction();
    }
    
    // methods
      public async loadPaiements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Paiement', 'list');
        isPermistted ? this.paiementService.findAll().subscribe(paiements => this.paiements = paiements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.paiementService.findByCriteria(this.searchPaiement).subscribe(paiements=>{
            
            this.paiements = paiements;
           // this.searchPaiement = new PaiementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'montantHt', header: 'Montant ht'},
                            {field: 'montantTtc', header: 'Montant ttc'},
                            {field: 'montantTva', header: 'Montant tva'},
                            {field: 'datePaiement', header: 'Date paiement'},
                            {field: 'pourcentageReduction', header: 'Pourcentage reduction'},
                        {field: 'offreReduction?.qteMin', header: 'Offre reduction'},
        ];
    }
    
    public async editPaiement(paiement: PaiementVo){
        const isPermistted = await this.roleService.isPermitted('Paiement', 'edit');
         if(isPermistted){
          this.paiementService.findByIdWithAssociatedList(paiement).subscribe(res => {
           this.selectedPaiement = res;
            this.selectedPaiement.datePaiement = new Date(paiement.datePaiement);
            this.editPaiementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPaiement(paiement: PaiementVo){
        const isPermistted = await this.roleService.isPermitted('Paiement', 'view');
        if(isPermistted){
           this.paiementService.findByIdWithAssociatedList(paiement).subscribe(res => {
           this.selectedPaiement = res;
            this.selectedPaiement.datePaiement = new Date(paiement.datePaiement);
            this.viewPaiementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePaiement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPaiement = new PaiementVo();
            this.createPaiementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePaiement(paiement: PaiementVo){
       const isPermistted = await this.roleService.isPermitted('Paiement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Paiement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.paiementService.delete(paiement).subscribe(status=>{
                          if(status > 0){
                          const position = this.paiements.indexOf(paiement);
                          position > -1 ? this.paiements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Paiement Supprimé',
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

public async loadOffreReduction(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Paiement', 'list');
    isPermistted ? this.offreReductionService.findAll().subscribe(offreReductions => this.offreReductions = offreReductions,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePaiement(paiement: PaiementVo) {

     this.paiementService.findByIdWithAssociatedList(paiement).subscribe(
	 res => {
	       this.initDuplicatePaiement(res);
	       this.selectedPaiement = res;
	       this.selectedPaiement.id = null;
            this.createPaiementDialog = true;

});

	}

	initDuplicatePaiement(res: PaiementVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.paiements.map(e => {
    return {
                    'Code': e.code ,
                    'Montant ht': e.montantHt ,
                    'Montant ttc': e.montantTtc ,
                    'Montant tva': e.montantTva ,
                    'Date paiement': this.datePipe.transform(e.datePaiement , 'dd-MM-yyyy'),
                    'Pourcentage reduction': e.pourcentageReduction ,
            'Offre reduction': e.offreReductionVo?.qteMin ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchPaiement.code ? this.searchPaiement.code : environment.emptyForExport ,
            'Montant ht Min': this.searchPaiement.montantHtMin ? this.searchPaiement.montantHtMin : environment.emptyForExport ,
            'Montant ht Max': this.searchPaiement.montantHtMax ? this.searchPaiement.montantHtMax : environment.emptyForExport ,
            'Montant ttc Min': this.searchPaiement.montantTtcMin ? this.searchPaiement.montantTtcMin : environment.emptyForExport ,
            'Montant ttc Max': this.searchPaiement.montantTtcMax ? this.searchPaiement.montantTtcMax : environment.emptyForExport ,
            'Montant tva Min': this.searchPaiement.montantTvaMin ? this.searchPaiement.montantTvaMin : environment.emptyForExport ,
            'Montant tva Max': this.searchPaiement.montantTvaMax ? this.searchPaiement.montantTvaMax : environment.emptyForExport ,
            'Date paiement Min': this.searchPaiement.datePaiementMin ? this.datePipe.transform(this.searchPaiement.datePaiementMin , this.dateFormat) : environment.emptyForExport ,
            'Date paiement Max': this.searchPaiement.datePaiementMax ? this.datePipe.transform(this.searchPaiement.datePaiementMax , this.dateFormat) : environment.emptyForExport ,
            'Pourcentage reduction Min': this.searchPaiement.pourcentageReductionMin ? this.searchPaiement.pourcentageReductionMin : environment.emptyForExport ,
            'Pourcentage reduction Max': this.searchPaiement.pourcentageReductionMax ? this.searchPaiement.pourcentageReductionMax : environment.emptyForExport ,
        'Offre reduction': this.searchPaiement.offreReductionVo?.qteMin ? this.searchPaiement.offreReductionVo?.qteMin : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get paiements() : Array<PaiementVo> {
           return this.paiementService.paiements;
       }
    set paiements(value: Array<PaiementVo>) {
        this.paiementService.paiements = value;
       }

    get paiementSelections() : Array<PaiementVo> {
           return this.paiementService.paiementSelections;
       }
    set paiementSelections(value: Array<PaiementVo>) {
        this.paiementService.paiementSelections = value;
       }
   
     


    get selectedPaiement() : PaiementVo {
           return this.paiementService.selectedPaiement;
       }
    set selectedPaiement(value: PaiementVo) {
        this.paiementService.selectedPaiement = value;
       }
    
    get createPaiementDialog() :boolean {
           return this.paiementService.createPaiementDialog;
       }
    set createPaiementDialog(value: boolean) {
        this.paiementService.createPaiementDialog= value;
       }
    
    get editPaiementDialog() :boolean {
           return this.paiementService.editPaiementDialog;
       }
    set editPaiementDialog(value: boolean) {
        this.paiementService.editPaiementDialog= value;
       }
    get viewPaiementDialog() :boolean {
           return this.paiementService.viewPaiementDialog;
       }
    set viewPaiementDialog(value: boolean) {
        this.paiementService.viewPaiementDialog = value;
       }
       
     get searchPaiement() : PaiementVo {
        return this.paiementService.searchPaiement;
       }
    set searchPaiement(value: PaiementVo) {
        this.paiementService.searchPaiement = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
