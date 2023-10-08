import {Component, OnInit} from '@angular/core';
import {OffreReductionService} from 'src/app/controller/service/OffreReduction.service';
import {OffreReductionVo} from 'src/app/controller/model/OffreReduction.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';



import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-offre-reduction-list-contributeur',
  templateUrl: './offre-reduction-list-contributeur.component.html',
  styleUrls: ['./offre-reduction-list-contributeur.component.css']
})
export class OffreReductionListContributeurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'OffreReduction';


    constructor(private datePipe: DatePipe, private offreReductionService: OffreReductionService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadOffreReductions();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadOffreReductions(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('OffreReduction', 'list');
        isPermistted ? this.offreReductionService.findAll().subscribe(offreReductions => this.offreReductions = offreReductions,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.offreReductionService.findByCriteria(this.searchOffreReduction).subscribe(offreReductions=>{
            
            this.offreReductions = offreReductions;
           // this.searchOffreReduction = new OffreReductionVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'qteMin', header: 'Qte min'},
                            {field: 'qteMax', header: 'Qte max'},
                            {field: 'pourcentage', header: 'Pourcentage'},
                            {field: 'dateMin', header: 'Date min'},
                            {field: 'dateMax', header: 'Date max'},
        ];
    }
    
    public async editOffreReduction(offreReduction: OffreReductionVo){
        const isPermistted = await this.roleService.isPermitted('OffreReduction', 'edit');
         if(isPermistted){
          this.offreReductionService.findByIdWithAssociatedList(offreReduction).subscribe(res => {
           this.selectedOffreReduction = res;
            this.selectedOffreReduction.dateMin = new Date(offreReduction.dateMin);
            this.selectedOffreReduction.dateMax = new Date(offreReduction.dateMax);
            this.editOffreReductionDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewOffreReduction(offreReduction: OffreReductionVo){
        const isPermistted = await this.roleService.isPermitted('OffreReduction', 'view');
        if(isPermistted){
           this.offreReductionService.findByIdWithAssociatedList(offreReduction).subscribe(res => {
           this.selectedOffreReduction = res;
            this.selectedOffreReduction.dateMin = new Date(offreReduction.dateMin);
            this.selectedOffreReduction.dateMax = new Date(offreReduction.dateMax);
            this.viewOffreReductionDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateOffreReduction(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedOffreReduction = new OffreReductionVo();
            this.createOffreReductionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteOffreReduction(offreReduction: OffreReductionVo){
       const isPermistted = await this.roleService.isPermitted('OffreReduction', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Offre reduction) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.offreReductionService.delete(offreReduction).subscribe(status=>{
                          if(status > 0){
                          const position = this.offreReductions.indexOf(offreReduction);
                          position > -1 ? this.offreReductions.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Offre reduction Supprimé',
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


public async duplicateOffreReduction(offreReduction: OffreReductionVo) {

     this.offreReductionService.findByIdWithAssociatedList(offreReduction).subscribe(
	 res => {
	       this.initDuplicateOffreReduction(res);
	       this.selectedOffreReduction = res;
	       this.selectedOffreReduction.id = null;
            this.createOffreReductionDialog = true;

});

	}

	initDuplicateOffreReduction(res: OffreReductionVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.offreReductions.map(e => {
    return {
                    'Qte min': e.qteMin ,
                    'Qte max': e.qteMax ,
                    'Pourcentage': e.pourcentage ,
                    'Date min': this.datePipe.transform(e.dateMin , 'dd-MM-yyyy'),
                    'Date max': this.datePipe.transform(e.dateMax , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
            'Qte min Min': this.searchOffreReduction.qteMinMin ? this.searchOffreReduction.qteMinMin : environment.emptyForExport ,
            'Qte min Max': this.searchOffreReduction.qteMinMax ? this.searchOffreReduction.qteMinMax : environment.emptyForExport ,
            'Qte max Min': this.searchOffreReduction.qteMaxMin ? this.searchOffreReduction.qteMaxMin : environment.emptyForExport ,
            'Qte max Max': this.searchOffreReduction.qteMaxMax ? this.searchOffreReduction.qteMaxMax : environment.emptyForExport ,
            'Pourcentage Min': this.searchOffreReduction.pourcentageMin ? this.searchOffreReduction.pourcentageMin : environment.emptyForExport ,
            'Pourcentage Max': this.searchOffreReduction.pourcentageMax ? this.searchOffreReduction.pourcentageMax : environment.emptyForExport ,
            'Date min Min': this.searchOffreReduction.dateMinMin ? this.datePipe.transform(this.searchOffreReduction.dateMinMin , this.dateFormat) : environment.emptyForExport ,
            'Date min Max': this.searchOffreReduction.dateMinMax ? this.datePipe.transform(this.searchOffreReduction.dateMinMax , this.dateFormat) : environment.emptyForExport ,
            'Date max Min': this.searchOffreReduction.dateMaxMin ? this.datePipe.transform(this.searchOffreReduction.dateMaxMin , this.dateFormat) : environment.emptyForExport ,
            'Date max Max': this.searchOffreReduction.dateMaxMax ? this.datePipe.transform(this.searchOffreReduction.dateMaxMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get offreReductions() : Array<OffreReductionVo> {
           return this.offreReductionService.offreReductions;
       }
    set offreReductions(value: Array<OffreReductionVo>) {
        this.offreReductionService.offreReductions = value;
       }

    get offreReductionSelections() : Array<OffreReductionVo> {
           return this.offreReductionService.offreReductionSelections;
       }
    set offreReductionSelections(value: Array<OffreReductionVo>) {
        this.offreReductionService.offreReductionSelections = value;
       }
   
     


    get selectedOffreReduction() : OffreReductionVo {
           return this.offreReductionService.selectedOffreReduction;
       }
    set selectedOffreReduction(value: OffreReductionVo) {
        this.offreReductionService.selectedOffreReduction = value;
       }
    
    get createOffreReductionDialog() :boolean {
           return this.offreReductionService.createOffreReductionDialog;
       }
    set createOffreReductionDialog(value: boolean) {
        this.offreReductionService.createOffreReductionDialog= value;
       }
    
    get editOffreReductionDialog() :boolean {
           return this.offreReductionService.editOffreReductionDialog;
       }
    set editOffreReductionDialog(value: boolean) {
        this.offreReductionService.editOffreReductionDialog= value;
       }
    get viewOffreReductionDialog() :boolean {
           return this.offreReductionService.viewOffreReductionDialog;
       }
    set viewOffreReductionDialog(value: boolean) {
        this.offreReductionService.viewOffreReductionDialog = value;
       }
       
     get searchOffreReduction() : OffreReductionVo {
        return this.offreReductionService.searchOffreReduction;
       }
    set searchOffreReduction(value: OffreReductionVo) {
        this.offreReductionService.searchOffreReduction = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
