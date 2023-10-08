import {Component, OnInit} from '@angular/core';
import {AbonnementService} from 'src/app/controller/service/Abonnement.service';
import {AbonnementVo} from 'src/app/controller/model/Abonnement.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import { EtatAbonnementService } from 'src/app/controller/service/EtatAbonnement.service';
import { ClientService } from 'src/app/controller/service/Client.service';
import { PackAbonnementService } from 'src/app/controller/service/PackAbonnement.service';

import {EtatAbonnementVo} from 'src/app/controller/model/EtatAbonnement.model';
import {PackAbonnementVo} from 'src/app/controller/model/PackAbonnement.model';
import {ClientVo} from 'src/app/controller/model/Client.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-abonnement-list-admin',
  templateUrl: './abonnement-list-admin.component.html',
  styleUrls: ['./abonnement-list-admin.component.css']
})
export class AbonnementListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Abonnement';
    etatAbonnements :Array<EtatAbonnementVo>;
    clients :Array<ClientVo>;
    packAbonnements :Array<PackAbonnementVo>;


    constructor(private datePipe: DatePipe, private abonnementService: AbonnementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private etatAbonnementService: EtatAbonnementService
        , private clientService: ClientService
        , private packAbonnementService: PackAbonnementService
) { }

    ngOnInit() : void {
      this.loadAbonnements();
      this.initExport();
      this.initCol();
      this.loadEtatAbonnement();
      this.loadClient();
      this.loadPackAbonnement();
    }
    
    // methods
      public async loadAbonnements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Abonnement', 'list');
        isPermistted ? this.abonnementService.findAll().subscribe(abonnements => this.abonnements = abonnements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.abonnementService.findByCriteria(this.searchAbonnement).subscribe(abonnements=>{
            
            this.abonnements = abonnements;
           // this.searchAbonnement = new AbonnementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'dateDebut', header: 'Date debut'},
                            {field: 'dateFin', header: 'Date fin'},
                            {field: 'tarif', header: 'Tarif'},
                        {field: 'etatAbonnement?.libelle', header: 'Etat abonnement'},
                            {field: 'reduction', header: 'Reduction'},
                        {field: 'client?.numeroMatricule', header: 'Client'},
                        {field: 'packAbonnement?.nombreImageMax', header: 'Pack abonnement'},
        ];
    }
    
    public async editAbonnement(abonnement: AbonnementVo){
        const isPermistted = await this.roleService.isPermitted('Abonnement', 'edit');
         if(isPermistted){
          this.abonnementService.findByIdWithAssociatedList(abonnement).subscribe(res => {
           this.selectedAbonnement = res;
            this.selectedAbonnement.dateDebut = new Date(abonnement.dateDebut);
            this.selectedAbonnement.dateFin = new Date(abonnement.dateFin);
            this.editAbonnementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewAbonnement(abonnement: AbonnementVo){
        const isPermistted = await this.roleService.isPermitted('Abonnement', 'view');
        if(isPermistted){
           this.abonnementService.findByIdWithAssociatedList(abonnement).subscribe(res => {
           this.selectedAbonnement = res;
            this.selectedAbonnement.dateDebut = new Date(abonnement.dateDebut);
            this.selectedAbonnement.dateFin = new Date(abonnement.dateFin);
            this.viewAbonnementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateAbonnement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedAbonnement = new AbonnementVo();
            this.createAbonnementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteAbonnement(abonnement: AbonnementVo){
       const isPermistted = await this.roleService.isPermitted('Abonnement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Abonnement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.abonnementService.delete(abonnement).subscribe(status=>{
                          if(status > 0){
                          const position = this.abonnements.indexOf(abonnement);
                          position > -1 ? this.abonnements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Abonnement Supprimé',
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

public async loadEtatAbonnement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Abonnement', 'list');
    isPermistted ? this.etatAbonnementService.findAll().subscribe(etatAbonnements => this.etatAbonnements = etatAbonnements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadClient(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Abonnement', 'list');
    isPermistted ? this.clientService.findAll().subscribe(clients => this.clients = clients,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPackAbonnement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Abonnement', 'list');
    isPermistted ? this.packAbonnementService.findAll().subscribe(packAbonnements => this.packAbonnements = packAbonnements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateAbonnement(abonnement: AbonnementVo) {

     this.abonnementService.findByIdWithAssociatedList(abonnement).subscribe(
	 res => {
	       this.initDuplicateAbonnement(res);
	       this.selectedAbonnement = res;
	       this.selectedAbonnement.id = null;
            this.createAbonnementDialog = true;

});

	}

	initDuplicateAbonnement(res: AbonnementVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.abonnements.map(e => {
    return {
                    'Date debut': this.datePipe.transform(e.dateDebut , 'dd-MM-yyyy'),
                    'Date fin': this.datePipe.transform(e.dateFin , 'dd-MM-yyyy'),
                    'Tarif': e.tarif ,
            'Etat abonnement': e.etatAbonnementVo?.libelle ,
                    'Reduction': e.reduction ,
            'Client': e.clientVo?.numeroMatricule ,
            'Pack abonnement': e.packAbonnementVo?.nombreImageMax ,
     }
      });

      this.criteriaData = [{
            'Date debut Min': this.searchAbonnement.dateDebutMin ? this.datePipe.transform(this.searchAbonnement.dateDebutMin , this.dateFormat) : environment.emptyForExport ,
            'Date debut Max': this.searchAbonnement.dateDebutMax ? this.datePipe.transform(this.searchAbonnement.dateDebutMax , this.dateFormat) : environment.emptyForExport ,
            'Date fin Min': this.searchAbonnement.dateFinMin ? this.datePipe.transform(this.searchAbonnement.dateFinMin , this.dateFormat) : environment.emptyForExport ,
            'Date fin Max': this.searchAbonnement.dateFinMax ? this.datePipe.transform(this.searchAbonnement.dateFinMax , this.dateFormat) : environment.emptyForExport ,
            'Tarif Min': this.searchAbonnement.tarifMin ? this.searchAbonnement.tarifMin : environment.emptyForExport ,
            'Tarif Max': this.searchAbonnement.tarifMax ? this.searchAbonnement.tarifMax : environment.emptyForExport ,
        'Etat abonnement': this.searchAbonnement.etatAbonnementVo?.libelle ? this.searchAbonnement.etatAbonnementVo?.libelle : environment.emptyForExport ,
            'Reduction Min': this.searchAbonnement.reductionMin ? this.searchAbonnement.reductionMin : environment.emptyForExport ,
            'Reduction Max': this.searchAbonnement.reductionMax ? this.searchAbonnement.reductionMax : environment.emptyForExport ,
        'Client': this.searchAbonnement.clientVo?.numeroMatricule ? this.searchAbonnement.clientVo?.numeroMatricule : environment.emptyForExport ,
        'Pack abonnement': this.searchAbonnement.packAbonnementVo?.nombreImageMax ? this.searchAbonnement.packAbonnementVo?.nombreImageMax : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get abonnements() : Array<AbonnementVo> {
           return this.abonnementService.abonnements;
       }
    set abonnements(value: Array<AbonnementVo>) {
        this.abonnementService.abonnements = value;
       }

    get abonnementSelections() : Array<AbonnementVo> {
           return this.abonnementService.abonnementSelections;
       }
    set abonnementSelections(value: Array<AbonnementVo>) {
        this.abonnementService.abonnementSelections = value;
       }
   
     


    get selectedAbonnement() : AbonnementVo {
           return this.abonnementService.selectedAbonnement;
       }
    set selectedAbonnement(value: AbonnementVo) {
        this.abonnementService.selectedAbonnement = value;
       }
    
    get createAbonnementDialog() :boolean {
           return this.abonnementService.createAbonnementDialog;
       }
    set createAbonnementDialog(value: boolean) {
        this.abonnementService.createAbonnementDialog= value;
       }
    
    get editAbonnementDialog() :boolean {
           return this.abonnementService.editAbonnementDialog;
       }
    set editAbonnementDialog(value: boolean) {
        this.abonnementService.editAbonnementDialog= value;
       }
    get viewAbonnementDialog() :boolean {
           return this.abonnementService.viewAbonnementDialog;
       }
    set viewAbonnementDialog(value: boolean) {
        this.abonnementService.viewAbonnementDialog = value;
       }
       
     get searchAbonnement() : AbonnementVo {
        return this.abonnementService.searchAbonnement;
       }
    set searchAbonnement(value: AbonnementVo) {
        this.abonnementService.searchAbonnement = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
