import {Component, OnInit} from '@angular/core';
import {TypeContributeurService} from 'src/app/controller/service/TypeContributeur.service';
import {TypeContributeurVo} from 'src/app/controller/model/TypeContributeur.model';
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
  selector: 'app-type-contributeur-list-chercheur',
  templateUrl: './type-contributeur-list-chercheur.component.html',
  styleUrls: ['./type-contributeur-list-chercheur.component.css']
})
export class TypeContributeurListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeContributeur';


    constructor(private datePipe: DatePipe, private typeContributeurService: TypeContributeurService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTypeContributeurs();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTypeContributeurs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeContributeur', 'list');
        isPermistted ? this.typeContributeurService.findAll().subscribe(typeContributeurs => this.typeContributeurs = typeContributeurs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeContributeurService.findByCriteria(this.searchTypeContributeur).subscribe(typeContributeurs=>{
            
            this.typeContributeurs = typeContributeurs;
           // this.searchTypeContributeur = new TypeContributeurVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editTypeContributeur(typeContributeur: TypeContributeurVo){
        const isPermistted = await this.roleService.isPermitted('TypeContributeur', 'edit');
         if(isPermistted){
          this.typeContributeurService.findByIdWithAssociatedList(typeContributeur).subscribe(res => {
           this.selectedTypeContributeur = res;
            this.editTypeContributeurDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeContributeur(typeContributeur: TypeContributeurVo){
        const isPermistted = await this.roleService.isPermitted('TypeContributeur', 'view');
        if(isPermistted){
           this.typeContributeurService.findByIdWithAssociatedList(typeContributeur).subscribe(res => {
           this.selectedTypeContributeur = res;
            this.viewTypeContributeurDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeContributeur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeContributeur = new TypeContributeurVo();
            this.createTypeContributeurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeContributeur(typeContributeur: TypeContributeurVo){
       const isPermistted = await this.roleService.isPermitted('TypeContributeur', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type contributeur) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeContributeurService.delete(typeContributeur).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeContributeurs.indexOf(typeContributeur);
                          position > -1 ? this.typeContributeurs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type contributeur Supprimé',
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


public async duplicateTypeContributeur(typeContributeur: TypeContributeurVo) {

     this.typeContributeurService.findByIdWithAssociatedList(typeContributeur).subscribe(
	 res => {
	       this.initDuplicateTypeContributeur(res);
	       this.selectedTypeContributeur = res;
	       this.selectedTypeContributeur.id = null;
            this.createTypeContributeurDialog = true;

});

	}

	initDuplicateTypeContributeur(res: TypeContributeurVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.typeContributeurs.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypeContributeur.libelle ? this.searchTypeContributeur.libelle : environment.emptyForExport ,
            'Code': this.searchTypeContributeur.code ? this.searchTypeContributeur.code : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeContributeurs() : Array<TypeContributeurVo> {
           return this.typeContributeurService.typeContributeurs;
       }
    set typeContributeurs(value: Array<TypeContributeurVo>) {
        this.typeContributeurService.typeContributeurs = value;
       }

    get typeContributeurSelections() : Array<TypeContributeurVo> {
           return this.typeContributeurService.typeContributeurSelections;
       }
    set typeContributeurSelections(value: Array<TypeContributeurVo>) {
        this.typeContributeurService.typeContributeurSelections = value;
       }
   
     


    get selectedTypeContributeur() : TypeContributeurVo {
           return this.typeContributeurService.selectedTypeContributeur;
       }
    set selectedTypeContributeur(value: TypeContributeurVo) {
        this.typeContributeurService.selectedTypeContributeur = value;
       }
    
    get createTypeContributeurDialog() :boolean {
           return this.typeContributeurService.createTypeContributeurDialog;
       }
    set createTypeContributeurDialog(value: boolean) {
        this.typeContributeurService.createTypeContributeurDialog= value;
       }
    
    get editTypeContributeurDialog() :boolean {
           return this.typeContributeurService.editTypeContributeurDialog;
       }
    set editTypeContributeurDialog(value: boolean) {
        this.typeContributeurService.editTypeContributeurDialog= value;
       }
    get viewTypeContributeurDialog() :boolean {
           return this.typeContributeurService.viewTypeContributeurDialog;
       }
    set viewTypeContributeurDialog(value: boolean) {
        this.typeContributeurService.viewTypeContributeurDialog = value;
       }
       
     get searchTypeContributeur() : TypeContributeurVo {
        return this.typeContributeurService.searchTypeContributeur;
       }
    set searchTypeContributeur(value: TypeContributeurVo) {
        this.typeContributeurService.searchTypeContributeur = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
