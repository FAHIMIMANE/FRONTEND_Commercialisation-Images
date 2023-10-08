import {Component, OnInit} from '@angular/core';
import {EtatPanierService} from 'src/app/controller/service/EtatPanier.service';
import {EtatPanierVo} from 'src/app/controller/model/EtatPanier.model';
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
  selector: 'app-etat-panier-list-admin',
  templateUrl: './etat-panier-list-admin.component.html',
  styleUrls: ['./etat-panier-list-admin.component.css']
})
export class EtatPanierListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatPanier';


    constructor(private datePipe: DatePipe, private etatPanierService: EtatPanierService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadEtatPaniers();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadEtatPaniers(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatPanier', 'list');
        isPermistted ? this.etatPanierService.findAll().subscribe(etatPaniers => this.etatPaniers = etatPaniers,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatPanierService.findByCriteria(this.searchEtatPanier).subscribe(etatPaniers=>{
            
            this.etatPaniers = etatPaniers;
           // this.searchEtatPanier = new EtatPanierVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editEtatPanier(etatPanier: EtatPanierVo){
        const isPermistted = await this.roleService.isPermitted('EtatPanier', 'edit');
         if(isPermistted){
          this.etatPanierService.findByIdWithAssociatedList(etatPanier).subscribe(res => {
           this.selectedEtatPanier = res;
            this.editEtatPanierDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatPanier(etatPanier: EtatPanierVo){
        const isPermistted = await this.roleService.isPermitted('EtatPanier', 'view');
        if(isPermistted){
           this.etatPanierService.findByIdWithAssociatedList(etatPanier).subscribe(res => {
           this.selectedEtatPanier = res;
            this.viewEtatPanierDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatPanier(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatPanier = new EtatPanierVo();
            this.createEtatPanierDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtatPanier(etatPanier: EtatPanierVo){
       const isPermistted = await this.roleService.isPermitted('EtatPanier', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat panier) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatPanierService.delete(etatPanier).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatPaniers.indexOf(etatPanier);
                          position > -1 ? this.etatPaniers.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat panier Supprimé',
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


public async duplicateEtatPanier(etatPanier: EtatPanierVo) {

     this.etatPanierService.findByIdWithAssociatedList(etatPanier).subscribe(
	 res => {
	       this.initDuplicateEtatPanier(res);
	       this.selectedEtatPanier = res;
	       this.selectedEtatPanier.id = null;
            this.createEtatPanierDialog = true;

});

	}

	initDuplicateEtatPanier(res: EtatPanierVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.etatPaniers.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchEtatPanier.libelle ? this.searchEtatPanier.libelle : environment.emptyForExport ,
            'Code': this.searchEtatPanier.code ? this.searchEtatPanier.code : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatPaniers() : Array<EtatPanierVo> {
           return this.etatPanierService.etatPaniers;
       }
    set etatPaniers(value: Array<EtatPanierVo>) {
        this.etatPanierService.etatPaniers = value;
       }

    get etatPanierSelections() : Array<EtatPanierVo> {
           return this.etatPanierService.etatPanierSelections;
       }
    set etatPanierSelections(value: Array<EtatPanierVo>) {
        this.etatPanierService.etatPanierSelections = value;
       }
   
     


    get selectedEtatPanier() : EtatPanierVo {
           return this.etatPanierService.selectedEtatPanier;
       }
    set selectedEtatPanier(value: EtatPanierVo) {
        this.etatPanierService.selectedEtatPanier = value;
       }
    
    get createEtatPanierDialog() :boolean {
           return this.etatPanierService.createEtatPanierDialog;
       }
    set createEtatPanierDialog(value: boolean) {
        this.etatPanierService.createEtatPanierDialog= value;
       }
    
    get editEtatPanierDialog() :boolean {
           return this.etatPanierService.editEtatPanierDialog;
       }
    set editEtatPanierDialog(value: boolean) {
        this.etatPanierService.editEtatPanierDialog= value;
       }
    get viewEtatPanierDialog() :boolean {
           return this.etatPanierService.viewEtatPanierDialog;
       }
    set viewEtatPanierDialog(value: boolean) {
        this.etatPanierService.viewEtatPanierDialog = value;
       }
       
     get searchEtatPanier() : EtatPanierVo {
        return this.etatPanierService.searchEtatPanier;
       }
    set searchEtatPanier(value: EtatPanierVo) {
        this.etatPanierService.searchEtatPanier = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
