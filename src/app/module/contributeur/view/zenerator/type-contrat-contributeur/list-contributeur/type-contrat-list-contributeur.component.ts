import {Component, OnInit} from '@angular/core';
import {TypeContratService} from 'src/app/controller/service/TypeContrat.service';
import {TypeContratVo} from 'src/app/controller/model/TypeContrat.model';
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
  selector: 'app-type-contrat-list-contributeur',
  templateUrl: './type-contrat-list-contributeur.component.html',
  styleUrls: ['./type-contrat-list-contributeur.component.css']
})
export class TypeContratListContributeurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeContrat';


    constructor(private datePipe: DatePipe, private typeContratService: TypeContratService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTypeContrats();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTypeContrats(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeContrat', 'list');
        isPermistted ? this.typeContratService.findAll().subscribe(typeContrats => this.typeContrats = typeContrats,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeContratService.findByCriteria(this.searchTypeContrat).subscribe(typeContrats=>{
            
            this.typeContrats = typeContrats;
           // this.searchTypeContrat = new TypeContratVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editTypeContrat(typeContrat: TypeContratVo){
        const isPermistted = await this.roleService.isPermitted('TypeContrat', 'edit');
         if(isPermistted){
          this.typeContratService.findByIdWithAssociatedList(typeContrat).subscribe(res => {
           this.selectedTypeContrat = res;
            this.editTypeContratDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeContrat(typeContrat: TypeContratVo){
        const isPermistted = await this.roleService.isPermitted('TypeContrat', 'view');
        if(isPermistted){
           this.typeContratService.findByIdWithAssociatedList(typeContrat).subscribe(res => {
           this.selectedTypeContrat = res;
            this.viewTypeContratDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeContrat(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeContrat = new TypeContratVo();
            this.createTypeContratDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeContrat(typeContrat: TypeContratVo){
       const isPermistted = await this.roleService.isPermitted('TypeContrat', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type contrat) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeContratService.delete(typeContrat).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeContrats.indexOf(typeContrat);
                          position > -1 ? this.typeContrats.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type contrat Supprimé',
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


public async duplicateTypeContrat(typeContrat: TypeContratVo) {

     this.typeContratService.findByIdWithAssociatedList(typeContrat).subscribe(
	 res => {
	       this.initDuplicateTypeContrat(res);
	       this.selectedTypeContrat = res;
	       this.selectedTypeContrat.id = null;
            this.createTypeContratDialog = true;

});

	}

	initDuplicateTypeContrat(res: TypeContratVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.typeContrats.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Description': e.description ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypeContrat.libelle ? this.searchTypeContrat.libelle : environment.emptyForExport ,
            'Description': this.searchTypeContrat.description ? this.searchTypeContrat.description : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeContrats() : Array<TypeContratVo> {
           return this.typeContratService.typeContrats;
       }
    set typeContrats(value: Array<TypeContratVo>) {
        this.typeContratService.typeContrats = value;
       }

    get typeContratSelections() : Array<TypeContratVo> {
           return this.typeContratService.typeContratSelections;
       }
    set typeContratSelections(value: Array<TypeContratVo>) {
        this.typeContratService.typeContratSelections = value;
       }
   
     


    get selectedTypeContrat() : TypeContratVo {
           return this.typeContratService.selectedTypeContrat;
       }
    set selectedTypeContrat(value: TypeContratVo) {
        this.typeContratService.selectedTypeContrat = value;
       }
    
    get createTypeContratDialog() :boolean {
           return this.typeContratService.createTypeContratDialog;
       }
    set createTypeContratDialog(value: boolean) {
        this.typeContratService.createTypeContratDialog= value;
       }
    
    get editTypeContratDialog() :boolean {
           return this.typeContratService.editTypeContratDialog;
       }
    set editTypeContratDialog(value: boolean) {
        this.typeContratService.editTypeContratDialog= value;
       }
    get viewTypeContratDialog() :boolean {
           return this.typeContratService.viewTypeContratDialog;
       }
    set viewTypeContratDialog(value: boolean) {
        this.typeContratService.viewTypeContratDialog = value;
       }
       
     get searchTypeContrat() : TypeContratVo {
        return this.typeContratService.searchTypeContrat;
       }
    set searchTypeContrat(value: TypeContratVo) {
        this.typeContratService.searchTypeContrat = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
