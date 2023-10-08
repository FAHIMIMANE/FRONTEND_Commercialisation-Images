import {Component, OnInit} from '@angular/core';
import {PanierService} from 'src/app/controller/service/Panier.service';
import {PanierVo} from 'src/app/controller/model/Panier.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import { EtatPanierService } from 'src/app/controller/service/EtatPanier.service';

import {PanierItemVo} from 'src/app/controller/model/PanierItem.model';
import {EtatPanierVo} from 'src/app/controller/model/EtatPanier.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-panier-list-chercheur',
  templateUrl: './panier-list-chercheur.component.html',
  styleUrls: ['./panier-list-chercheur.component.css']
})
export class PanierListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Panier';
    etatPaniers :Array<EtatPanierVo>;


    constructor(private datePipe: DatePipe, private panierService: PanierService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private etatPanierService: EtatPanierService
) { }

    ngOnInit() : void {
      this.loadPaniers();
      this.initExport();
      this.initCol();
      this.loadEtatPanier();
    }
    
    // methods
      public async loadPaniers(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Panier', 'list');
        isPermistted ? this.panierService.findAll().subscribe(paniers => this.paniers = paniers,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.panierService.findByCriteria(this.searchPanier).subscribe(paniers=>{
            
            this.paniers = paniers;
           // this.searchPanier = new PanierVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'prixTotal', header: 'Prix total'},
                        {field: 'etatPanier?.libelle', header: 'Etat panier'},
        ];
    }
    
    public async editPanier(panier: PanierVo){
        const isPermistted = await this.roleService.isPermitted('Panier', 'edit');
         if(isPermistted){
          this.panierService.findByIdWithAssociatedList(panier).subscribe(res => {
           this.selectedPanier = res;
            this.editPanierDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPanier(panier: PanierVo){
        const isPermistted = await this.roleService.isPermitted('Panier', 'view');
        if(isPermistted){
           this.panierService.findByIdWithAssociatedList(panier).subscribe(res => {
           this.selectedPanier = res;
            this.viewPanierDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePanier(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPanier = new PanierVo();
            this.createPanierDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePanier(panier: PanierVo){
       const isPermistted = await this.roleService.isPermitted('Panier', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Panier) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.panierService.delete(panier).subscribe(status=>{
                          if(status > 0){
                          const position = this.paniers.indexOf(panier);
                          position > -1 ? this.paniers.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Panier Supprimé',
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

public async loadEtatPanier(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Panier', 'list');
    isPermistted ? this.etatPanierService.findAll().subscribe(etatPaniers => this.etatPaniers = etatPaniers,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePanier(panier: PanierVo) {

     this.panierService.findByIdWithAssociatedList(panier).subscribe(
	 res => {
	       this.initDuplicatePanier(res);
	       this.selectedPanier = res;
	       this.selectedPanier.id = null;
            this.createPanierDialog = true;

});

	}

	initDuplicatePanier(res: PanierVo) {
        if (res.panierItemsVo != null) {
             res.panierItemsVo.forEach(d => { d.panierVo = null; d.id = null; });
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
    this.exportData = this.paniers.map(e => {
    return {
                    'Reference': e.reference ,
                    'Prix total': e.prixTotal ,
            'Etat panier': e.etatPanierVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchPanier.reference ? this.searchPanier.reference : environment.emptyForExport ,
            'Prix total Min': this.searchPanier.prixTotalMin ? this.searchPanier.prixTotalMin : environment.emptyForExport ,
            'Prix total Max': this.searchPanier.prixTotalMax ? this.searchPanier.prixTotalMax : environment.emptyForExport ,
        'Etat panier': this.searchPanier.etatPanierVo?.libelle ? this.searchPanier.etatPanierVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get paniers() : Array<PanierVo> {
           return this.panierService.paniers;
       }
    set paniers(value: Array<PanierVo>) {
        this.panierService.paniers = value;
       }

    get panierSelections() : Array<PanierVo> {
           return this.panierService.panierSelections;
       }
    set panierSelections(value: Array<PanierVo>) {
        this.panierService.panierSelections = value;
       }
   
     


    get selectedPanier() : PanierVo {
           return this.panierService.selectedPanier;
       }
    set selectedPanier(value: PanierVo) {
        this.panierService.selectedPanier = value;
       }
    
    get createPanierDialog() :boolean {
           return this.panierService.createPanierDialog;
       }
    set createPanierDialog(value: boolean) {
        this.panierService.createPanierDialog= value;
       }
    
    get editPanierDialog() :boolean {
           return this.panierService.editPanierDialog;
       }
    set editPanierDialog(value: boolean) {
        this.panierService.editPanierDialog= value;
       }
    get viewPanierDialog() :boolean {
           return this.panierService.viewPanierDialog;
       }
    set viewPanierDialog(value: boolean) {
        this.panierService.viewPanierDialog = value;
       }
       
     get searchPanier() : PanierVo {
        return this.panierService.searchPanier;
       }
    set searchPanier(value: PanierVo) {
        this.panierService.searchPanier = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
