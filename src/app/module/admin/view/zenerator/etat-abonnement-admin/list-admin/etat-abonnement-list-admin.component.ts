import {Component, OnInit} from '@angular/core';
import {EtatAbonnementService} from 'src/app/controller/service/EtatAbonnement.service';
import {EtatAbonnementVo} from 'src/app/controller/model/EtatAbonnement.model';
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
  selector: 'app-etat-abonnement-list-admin',
  templateUrl: './etat-abonnement-list-admin.component.html',
  styleUrls: ['./etat-abonnement-list-admin.component.css']
})
export class EtatAbonnementListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatAbonnement';


    constructor(private datePipe: DatePipe, private etatAbonnementService: EtatAbonnementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadEtatAbonnements();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadEtatAbonnements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatAbonnement', 'list');
        isPermistted ? this.etatAbonnementService.findAll().subscribe(etatAbonnements => this.etatAbonnements = etatAbonnements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatAbonnementService.findByCriteria(this.searchEtatAbonnement).subscribe(etatAbonnements=>{
            
            this.etatAbonnements = etatAbonnements;
           // this.searchEtatAbonnement = new EtatAbonnementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editEtatAbonnement(etatAbonnement: EtatAbonnementVo){
        const isPermistted = await this.roleService.isPermitted('EtatAbonnement', 'edit');
         if(isPermistted){
          this.etatAbonnementService.findByIdWithAssociatedList(etatAbonnement).subscribe(res => {
           this.selectedEtatAbonnement = res;
            this.editEtatAbonnementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatAbonnement(etatAbonnement: EtatAbonnementVo){
        const isPermistted = await this.roleService.isPermitted('EtatAbonnement', 'view');
        if(isPermistted){
           this.etatAbonnementService.findByIdWithAssociatedList(etatAbonnement).subscribe(res => {
           this.selectedEtatAbonnement = res;
            this.viewEtatAbonnementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatAbonnement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatAbonnement = new EtatAbonnementVo();
            this.createEtatAbonnementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtatAbonnement(etatAbonnement: EtatAbonnementVo){
       const isPermistted = await this.roleService.isPermitted('EtatAbonnement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat abonnement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatAbonnementService.delete(etatAbonnement).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatAbonnements.indexOf(etatAbonnement);
                          position > -1 ? this.etatAbonnements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat abonnement Supprimé',
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


public async duplicateEtatAbonnement(etatAbonnement: EtatAbonnementVo) {

     this.etatAbonnementService.findByIdWithAssociatedList(etatAbonnement).subscribe(
	 res => {
	       this.initDuplicateEtatAbonnement(res);
	       this.selectedEtatAbonnement = res;
	       this.selectedEtatAbonnement.id = null;
            this.createEtatAbonnementDialog = true;

});

	}

	initDuplicateEtatAbonnement(res: EtatAbonnementVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.etatAbonnements.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchEtatAbonnement.libelle ? this.searchEtatAbonnement.libelle : environment.emptyForExport ,
            'Code': this.searchEtatAbonnement.code ? this.searchEtatAbonnement.code : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatAbonnements() : Array<EtatAbonnementVo> {
           return this.etatAbonnementService.etatAbonnements;
       }
    set etatAbonnements(value: Array<EtatAbonnementVo>) {
        this.etatAbonnementService.etatAbonnements = value;
       }

    get etatAbonnementSelections() : Array<EtatAbonnementVo> {
           return this.etatAbonnementService.etatAbonnementSelections;
       }
    set etatAbonnementSelections(value: Array<EtatAbonnementVo>) {
        this.etatAbonnementService.etatAbonnementSelections = value;
       }
   
     


    get selectedEtatAbonnement() : EtatAbonnementVo {
           return this.etatAbonnementService.selectedEtatAbonnement;
       }
    set selectedEtatAbonnement(value: EtatAbonnementVo) {
        this.etatAbonnementService.selectedEtatAbonnement = value;
       }
    
    get createEtatAbonnementDialog() :boolean {
           return this.etatAbonnementService.createEtatAbonnementDialog;
       }
    set createEtatAbonnementDialog(value: boolean) {
        this.etatAbonnementService.createEtatAbonnementDialog= value;
       }
    
    get editEtatAbonnementDialog() :boolean {
           return this.etatAbonnementService.editEtatAbonnementDialog;
       }
    set editEtatAbonnementDialog(value: boolean) {
        this.etatAbonnementService.editEtatAbonnementDialog= value;
       }
    get viewEtatAbonnementDialog() :boolean {
           return this.etatAbonnementService.viewEtatAbonnementDialog;
       }
    set viewEtatAbonnementDialog(value: boolean) {
        this.etatAbonnementService.viewEtatAbonnementDialog = value;
       }
       
     get searchEtatAbonnement() : EtatAbonnementVo {
        return this.etatAbonnementService.searchEtatAbonnement;
       }
    set searchEtatAbonnement(value: EtatAbonnementVo) {
        this.etatAbonnementService.searchEtatAbonnement = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
