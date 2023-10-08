import {Component, OnInit} from '@angular/core';
import {PackAbonnementService} from 'src/app/controller/service/PackAbonnement.service';
import {PackAbonnementVo} from 'src/app/controller/model/PackAbonnement.model';
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
  selector: 'app-pack-abonnement-list-admin',
  templateUrl: './pack-abonnement-list-admin.component.html',
  styleUrls: ['./pack-abonnement-list-admin.component.css']
})
export class PackAbonnementListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PackAbonnement';


    constructor(private datePipe: DatePipe, private packAbonnementService: PackAbonnementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadPackAbonnements();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadPackAbonnements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PackAbonnement', 'list');
        isPermistted ? this.packAbonnementService.findAll().subscribe(packAbonnements => this.packAbonnements = packAbonnements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.packAbonnementService.findByCriteria(this.searchPackAbonnement).subscribe(packAbonnements=>{
            
            this.packAbonnements = packAbonnements;
           // this.searchPackAbonnement = new PackAbonnementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'nombreImageMax', header: 'Nombre image max'},
                            {field: 'reduction', header: 'Reduction'},
                            {field: 'dateMin', header: 'Date min'},
                            {field: 'dateMax', header: 'Date max'},
        ];
    }
    
    public async editPackAbonnement(packAbonnement: PackAbonnementVo){
        const isPermistted = await this.roleService.isPermitted('PackAbonnement', 'edit');
         if(isPermistted){
          this.packAbonnementService.findByIdWithAssociatedList(packAbonnement).subscribe(res => {
           this.selectedPackAbonnement = res;
            this.selectedPackAbonnement.dateMin = new Date(packAbonnement.dateMin);
            this.selectedPackAbonnement.dateMax = new Date(packAbonnement.dateMax);
            this.editPackAbonnementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPackAbonnement(packAbonnement: PackAbonnementVo){
        const isPermistted = await this.roleService.isPermitted('PackAbonnement', 'view');
        if(isPermistted){
           this.packAbonnementService.findByIdWithAssociatedList(packAbonnement).subscribe(res => {
           this.selectedPackAbonnement = res;
            this.selectedPackAbonnement.dateMin = new Date(packAbonnement.dateMin);
            this.selectedPackAbonnement.dateMax = new Date(packAbonnement.dateMax);
            this.viewPackAbonnementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePackAbonnement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPackAbonnement = new PackAbonnementVo();
            this.createPackAbonnementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePackAbonnement(packAbonnement: PackAbonnementVo){
       const isPermistted = await this.roleService.isPermitted('PackAbonnement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Pack abonnement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.packAbonnementService.delete(packAbonnement).subscribe(status=>{
                          if(status > 0){
                          const position = this.packAbonnements.indexOf(packAbonnement);
                          position > -1 ? this.packAbonnements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Pack abonnement Supprimé',
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


public async duplicatePackAbonnement(packAbonnement: PackAbonnementVo) {

     this.packAbonnementService.findByIdWithAssociatedList(packAbonnement).subscribe(
	 res => {
	       this.initDuplicatePackAbonnement(res);
	       this.selectedPackAbonnement = res;
	       this.selectedPackAbonnement.id = null;
            this.createPackAbonnementDialog = true;

});

	}

	initDuplicatePackAbonnement(res: PackAbonnementVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.packAbonnements.map(e => {
    return {
                    'Nombre image max': e.nombreImageMax ,
                    'Reduction': e.reduction ,
                    'Date min': this.datePipe.transform(e.dateMin , 'dd-MM-yyyy'),
                    'Date max': this.datePipe.transform(e.dateMax , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
            'Nombre image max Min': this.searchPackAbonnement.nombreImageMaxMin ? this.searchPackAbonnement.nombreImageMaxMin : environment.emptyForExport ,
            'Nombre image max Max': this.searchPackAbonnement.nombreImageMaxMax ? this.searchPackAbonnement.nombreImageMaxMax : environment.emptyForExport ,
            'Reduction Min': this.searchPackAbonnement.reductionMin ? this.searchPackAbonnement.reductionMin : environment.emptyForExport ,
            'Reduction Max': this.searchPackAbonnement.reductionMax ? this.searchPackAbonnement.reductionMax : environment.emptyForExport ,
            'Date min Min': this.searchPackAbonnement.dateMinMin ? this.datePipe.transform(this.searchPackAbonnement.dateMinMin , this.dateFormat) : environment.emptyForExport ,
            'Date min Max': this.searchPackAbonnement.dateMinMax ? this.datePipe.transform(this.searchPackAbonnement.dateMinMax , this.dateFormat) : environment.emptyForExport ,
            'Date max Min': this.searchPackAbonnement.dateMaxMin ? this.datePipe.transform(this.searchPackAbonnement.dateMaxMin , this.dateFormat) : environment.emptyForExport ,
            'Date max Max': this.searchPackAbonnement.dateMaxMax ? this.datePipe.transform(this.searchPackAbonnement.dateMaxMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get packAbonnements() : Array<PackAbonnementVo> {
           return this.packAbonnementService.packAbonnements;
       }
    set packAbonnements(value: Array<PackAbonnementVo>) {
        this.packAbonnementService.packAbonnements = value;
       }

    get packAbonnementSelections() : Array<PackAbonnementVo> {
           return this.packAbonnementService.packAbonnementSelections;
       }
    set packAbonnementSelections(value: Array<PackAbonnementVo>) {
        this.packAbonnementService.packAbonnementSelections = value;
       }
   
     


    get selectedPackAbonnement() : PackAbonnementVo {
           return this.packAbonnementService.selectedPackAbonnement;
       }
    set selectedPackAbonnement(value: PackAbonnementVo) {
        this.packAbonnementService.selectedPackAbonnement = value;
       }
    
    get createPackAbonnementDialog() :boolean {
           return this.packAbonnementService.createPackAbonnementDialog;
       }
    set createPackAbonnementDialog(value: boolean) {
        this.packAbonnementService.createPackAbonnementDialog= value;
       }
    
    get editPackAbonnementDialog() :boolean {
           return this.packAbonnementService.editPackAbonnementDialog;
       }
    set editPackAbonnementDialog(value: boolean) {
        this.packAbonnementService.editPackAbonnementDialog= value;
       }
    get viewPackAbonnementDialog() :boolean {
           return this.packAbonnementService.viewPackAbonnementDialog;
       }
    set viewPackAbonnementDialog(value: boolean) {
        this.packAbonnementService.viewPackAbonnementDialog = value;
       }
       
     get searchPackAbonnement() : PackAbonnementVo {
        return this.packAbonnementService.searchPackAbonnement;
       }
    set searchPackAbonnement(value: PackAbonnementVo) {
        this.packAbonnementService.searchPackAbonnement = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
