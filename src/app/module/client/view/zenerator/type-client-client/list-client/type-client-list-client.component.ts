import {Component, OnInit} from '@angular/core';
import {TypeClientService} from 'src/app/controller/service/TypeClient.service';
import {TypeClientVo} from 'src/app/controller/model/TypeClient.model';
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
  selector: 'app-type-client-list-client',
  templateUrl: './type-client-list-client.component.html',
  styleUrls: ['./type-client-list-client.component.css']
})
export class TypeClientListClientComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeClient';


    constructor(private datePipe: DatePipe, private typeClientService: TypeClientService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTypeClients();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTypeClients(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeClient', 'list');
        isPermistted ? this.typeClientService.findAll().subscribe(typeClients => this.typeClients = typeClients,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeClientService.findByCriteria(this.searchTypeClient).subscribe(typeClients=>{
            
            this.typeClients = typeClients;
           // this.searchTypeClient = new TypeClientVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editTypeClient(typeClient: TypeClientVo){
        const isPermistted = await this.roleService.isPermitted('TypeClient', 'edit');
         if(isPermistted){
          this.typeClientService.findByIdWithAssociatedList(typeClient).subscribe(res => {
           this.selectedTypeClient = res;
            this.editTypeClientDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeClient(typeClient: TypeClientVo){
        const isPermistted = await this.roleService.isPermitted('TypeClient', 'view');
        if(isPermistted){
           this.typeClientService.findByIdWithAssociatedList(typeClient).subscribe(res => {
           this.selectedTypeClient = res;
            this.viewTypeClientDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeClient(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeClient = new TypeClientVo();
            this.createTypeClientDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeClient(typeClient: TypeClientVo){
       const isPermistted = await this.roleService.isPermitted('TypeClient', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type client) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeClientService.delete(typeClient).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeClients.indexOf(typeClient);
                          position > -1 ? this.typeClients.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type client Supprimé',
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


public async duplicateTypeClient(typeClient: TypeClientVo) {

     this.typeClientService.findByIdWithAssociatedList(typeClient).subscribe(
	 res => {
	       this.initDuplicateTypeClient(res);
	       this.selectedTypeClient = res;
	       this.selectedTypeClient.id = null;
            this.createTypeClientDialog = true;

});

	}

	initDuplicateTypeClient(res: TypeClientVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.typeClients.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypeClient.libelle ? this.searchTypeClient.libelle : environment.emptyForExport ,
            'Code': this.searchTypeClient.code ? this.searchTypeClient.code : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeClients() : Array<TypeClientVo> {
           return this.typeClientService.typeClients;
       }
    set typeClients(value: Array<TypeClientVo>) {
        this.typeClientService.typeClients = value;
       }

    get typeClientSelections() : Array<TypeClientVo> {
           return this.typeClientService.typeClientSelections;
       }
    set typeClientSelections(value: Array<TypeClientVo>) {
        this.typeClientService.typeClientSelections = value;
       }
   
     


    get selectedTypeClient() : TypeClientVo {
           return this.typeClientService.selectedTypeClient;
       }
    set selectedTypeClient(value: TypeClientVo) {
        this.typeClientService.selectedTypeClient = value;
       }
    
    get createTypeClientDialog() :boolean {
           return this.typeClientService.createTypeClientDialog;
       }
    set createTypeClientDialog(value: boolean) {
        this.typeClientService.createTypeClientDialog= value;
       }
    
    get editTypeClientDialog() :boolean {
           return this.typeClientService.editTypeClientDialog;
       }
    set editTypeClientDialog(value: boolean) {
        this.typeClientService.editTypeClientDialog= value;
       }
    get viewTypeClientDialog() :boolean {
           return this.typeClientService.viewTypeClientDialog;
       }
    set viewTypeClientDialog(value: boolean) {
        this.typeClientService.viewTypeClientDialog = value;
       }
       
     get searchTypeClient() : TypeClientVo {
        return this.typeClientService.searchTypeClient;
       }
    set searchTypeClient(value: TypeClientVo) {
        this.typeClientService.searchTypeClient = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
