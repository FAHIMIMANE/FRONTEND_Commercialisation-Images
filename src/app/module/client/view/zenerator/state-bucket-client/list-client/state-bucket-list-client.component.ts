import {Component, OnInit} from '@angular/core';
import {StateBucketService} from 'src/app/controller/service/StateBucket.service';
import {StateBucketVo} from 'src/app/controller/model/StateBucket.model';
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
  selector: 'app-state-bucket-list-client',
  templateUrl: './state-bucket-list-client.component.html',
  styleUrls: ['./state-bucket-list-client.component.css']
})
export class StateBucketListClientComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'StateBucket';


    constructor(private datePipe: DatePipe, private stateBucketService: StateBucketService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadStateBuckets();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadStateBuckets(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('StateBucket', 'list');
        isPermistted ? this.stateBucketService.findAll().subscribe(stateBuckets => this.stateBuckets = stateBuckets,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.stateBucketService.findByCriteria(this.searchStateBucket).subscribe(stateBuckets=>{
            
            this.stateBuckets = stateBuckets;
           // this.searchStateBucket = new StateBucketVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editStateBucket(stateBucket: StateBucketVo){
        const isPermistted = await this.roleService.isPermitted('StateBucket', 'edit');
         if(isPermistted){
          this.stateBucketService.findByIdWithAssociatedList(stateBucket).subscribe(res => {
           this.selectedStateBucket = res;
            this.editStateBucketDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewStateBucket(stateBucket: StateBucketVo){
        const isPermistted = await this.roleService.isPermitted('StateBucket', 'view');
        if(isPermistted){
           this.stateBucketService.findByIdWithAssociatedList(stateBucket).subscribe(res => {
           this.selectedStateBucket = res;
            this.viewStateBucketDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateStateBucket(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedStateBucket = new StateBucketVo();
            this.createStateBucketDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteStateBucket(stateBucket: StateBucketVo){
       const isPermistted = await this.roleService.isPermitted('StateBucket', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (State bucket) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.stateBucketService.delete(stateBucket).subscribe(status=>{
                          if(status > 0){
                          const position = this.stateBuckets.indexOf(stateBucket);
                          position > -1 ? this.stateBuckets.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'State bucket Supprimé',
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


public async duplicateStateBucket(stateBucket: StateBucketVo) {

     this.stateBucketService.findByIdWithAssociatedList(stateBucket).subscribe(
	 res => {
	       this.initDuplicateStateBucket(res);
	       this.selectedStateBucket = res;
	       this.selectedStateBucket.id = null;
            this.createStateBucketDialog = true;

});

	}

	initDuplicateStateBucket(res: StateBucketVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.stateBuckets.map(e => {
    return {
                    'Code': e.code ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchStateBucket.code ? this.searchStateBucket.code : environment.emptyForExport ,
            'Libelle': this.searchStateBucket.libelle ? this.searchStateBucket.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get stateBuckets() : Array<StateBucketVo> {
           return this.stateBucketService.stateBuckets;
       }
    set stateBuckets(value: Array<StateBucketVo>) {
        this.stateBucketService.stateBuckets = value;
       }

    get stateBucketSelections() : Array<StateBucketVo> {
           return this.stateBucketService.stateBucketSelections;
       }
    set stateBucketSelections(value: Array<StateBucketVo>) {
        this.stateBucketService.stateBucketSelections = value;
       }
   
     


    get selectedStateBucket() : StateBucketVo {
           return this.stateBucketService.selectedStateBucket;
       }
    set selectedStateBucket(value: StateBucketVo) {
        this.stateBucketService.selectedStateBucket = value;
       }
    
    get createStateBucketDialog() :boolean {
           return this.stateBucketService.createStateBucketDialog;
       }
    set createStateBucketDialog(value: boolean) {
        this.stateBucketService.createStateBucketDialog= value;
       }
    
    get editStateBucketDialog() :boolean {
           return this.stateBucketService.editStateBucketDialog;
       }
    set editStateBucketDialog(value: boolean) {
        this.stateBucketService.editStateBucketDialog= value;
       }
    get viewStateBucketDialog() :boolean {
           return this.stateBucketService.viewStateBucketDialog;
       }
    set viewStateBucketDialog(value: boolean) {
        this.stateBucketService.viewStateBucketDialog = value;
       }
       
     get searchStateBucket() : StateBucketVo {
        return this.stateBucketService.searchStateBucket;
       }
    set searchStateBucket(value: StateBucketVo) {
        this.stateBucketService.searchStateBucket = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
