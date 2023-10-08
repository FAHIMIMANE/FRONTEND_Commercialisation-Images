import {Component, OnInit} from '@angular/core';
import {TypePaiementService} from 'src/app/controller/service/TypePaiement.service';
import {TypePaiementVo} from 'src/app/controller/model/TypePaiement.model';
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
  selector: 'app-type-paiement-list-client',
  templateUrl: './type-paiement-list-client.component.html',
  styleUrls: ['./type-paiement-list-client.component.css']
})
export class TypePaiementListClientComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypePaiement';


    constructor(private datePipe: DatePipe, private typePaiementService: TypePaiementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTypePaiements();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTypePaiements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypePaiement', 'list');
        isPermistted ? this.typePaiementService.findAll().subscribe(typePaiements => this.typePaiements = typePaiements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typePaiementService.findByCriteria(this.searchTypePaiement).subscribe(typePaiements=>{
            
            this.typePaiements = typePaiements;
           // this.searchTypePaiement = new TypePaiementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editTypePaiement(typePaiement: TypePaiementVo){
        const isPermistted = await this.roleService.isPermitted('TypePaiement', 'edit');
         if(isPermistted){
          this.typePaiementService.findByIdWithAssociatedList(typePaiement).subscribe(res => {
           this.selectedTypePaiement = res;
            this.editTypePaiementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypePaiement(typePaiement: TypePaiementVo){
        const isPermistted = await this.roleService.isPermitted('TypePaiement', 'view');
        if(isPermistted){
           this.typePaiementService.findByIdWithAssociatedList(typePaiement).subscribe(res => {
           this.selectedTypePaiement = res;
            this.viewTypePaiementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypePaiement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypePaiement = new TypePaiementVo();
            this.createTypePaiementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypePaiement(typePaiement: TypePaiementVo){
       const isPermistted = await this.roleService.isPermitted('TypePaiement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type paiement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typePaiementService.delete(typePaiement).subscribe(status=>{
                          if(status > 0){
                          const position = this.typePaiements.indexOf(typePaiement);
                          position > -1 ? this.typePaiements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type paiement Supprimé',
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


public async duplicateTypePaiement(typePaiement: TypePaiementVo) {

     this.typePaiementService.findByIdWithAssociatedList(typePaiement).subscribe(
	 res => {
	       this.initDuplicateTypePaiement(res);
	       this.selectedTypePaiement = res;
	       this.selectedTypePaiement.id = null;
            this.createTypePaiementDialog = true;

});

	}

	initDuplicateTypePaiement(res: TypePaiementVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.typePaiements.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypePaiement.libelle ? this.searchTypePaiement.libelle : environment.emptyForExport ,
            'Code': this.searchTypePaiement.code ? this.searchTypePaiement.code : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typePaiements() : Array<TypePaiementVo> {
           return this.typePaiementService.typePaiements;
       }
    set typePaiements(value: Array<TypePaiementVo>) {
        this.typePaiementService.typePaiements = value;
       }

    get typePaiementSelections() : Array<TypePaiementVo> {
           return this.typePaiementService.typePaiementSelections;
       }
    set typePaiementSelections(value: Array<TypePaiementVo>) {
        this.typePaiementService.typePaiementSelections = value;
       }
   
     


    get selectedTypePaiement() : TypePaiementVo {
           return this.typePaiementService.selectedTypePaiement;
       }
    set selectedTypePaiement(value: TypePaiementVo) {
        this.typePaiementService.selectedTypePaiement = value;
       }
    
    get createTypePaiementDialog() :boolean {
           return this.typePaiementService.createTypePaiementDialog;
       }
    set createTypePaiementDialog(value: boolean) {
        this.typePaiementService.createTypePaiementDialog= value;
       }
    
    get editTypePaiementDialog() :boolean {
           return this.typePaiementService.editTypePaiementDialog;
       }
    set editTypePaiementDialog(value: boolean) {
        this.typePaiementService.editTypePaiementDialog= value;
       }
    get viewTypePaiementDialog() :boolean {
           return this.typePaiementService.viewTypePaiementDialog;
       }
    set viewTypePaiementDialog(value: boolean) {
        this.typePaiementService.viewTypePaiementDialog = value;
       }
       
     get searchTypePaiement() : TypePaiementVo {
        return this.typePaiementService.searchTypePaiement;
       }
    set searchTypePaiement(value: TypePaiementVo) {
        this.typePaiementService.searchTypePaiement = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
