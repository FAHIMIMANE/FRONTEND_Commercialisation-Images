import {Component, OnInit} from '@angular/core';
import {BucketService} from 'src/app/controller/service/Bucket.service';
import {BucketVo} from 'src/app/controller/model/Bucket.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import { StateBucketService } from 'src/app/controller/service/StateBucket.service';
import { ContributeurService } from 'src/app/controller/service/Contributeur.service';

import {StateBucketVo} from 'src/app/controller/model/StateBucket.model';
import {ContributeurVo} from 'src/app/controller/model/Contributeur.model';
import {ImageVo} from 'src/app/controller/model/Image.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-bucket-list-contributeur',
  templateUrl: './bucket-list-contributeur.component.html',
  styleUrls: ['./bucket-list-contributeur.component.css']
})
export class BucketListContributeurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Bucket';
    stateBuckets :Array<StateBucketVo>;
    contributeurs :Array<ContributeurVo>;


    constructor(private datePipe: DatePipe, private bucketService: BucketService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private stateBucketService: StateBucketService
        , private contributeurService: ContributeurService
) { }

    ngOnInit() : void {
      this.loadBuckets();
      this.initExport();
      this.initCol();
      this.loadStateBucket();
      this.loadContributeur();
    }
    
    // methods
      public async loadBuckets(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Bucket', 'list');
        isPermistted ? this.bucketService.findAll().subscribe(buckets => this.buckets = buckets,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.bucketService.findByCriteria(this.searchBucket).subscribe(buckets=>{
            
            this.buckets = buckets;
           // this.searchBucket = new BucketVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'nom', header: 'Nom'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'libelle', header: 'Libelle'},
                        {field: 'stateBucket?.libelle', header: 'State bucket'},
                        {field: 'contributeur?.cin', header: 'Contributeur'},
        ];
    }
    
    public async editBucket(bucket: BucketVo){
        const isPermistted = await this.roleService.isPermitted('Bucket', 'edit');
         if(isPermistted){
          this.bucketService.findByIdWithAssociatedList(bucket).subscribe(res => {
           this.selectedBucket = res;
            this.selectedBucket.dateCreation = new Date(bucket.dateCreation);
            this.editBucketDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewBucket(bucket: BucketVo){
        const isPermistted = await this.roleService.isPermitted('Bucket', 'view');
        if(isPermistted){
           this.bucketService.findByIdWithAssociatedList(bucket).subscribe(res => {
           this.selectedBucket = res;
            this.selectedBucket.dateCreation = new Date(bucket.dateCreation);
            this.viewBucketDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateBucket(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedBucket = new BucketVo();
            this.createBucketDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteBucket(bucket: BucketVo){
       const isPermistted = await this.roleService.isPermitted('Bucket', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Bucket) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.bucketService.delete(bucket).subscribe(status=>{
                          if(status > 0){
                          const position = this.buckets.indexOf(bucket);
                          position > -1 ? this.buckets.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Bucket Supprimé',
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

public async loadStateBucket(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Bucket', 'list');
    isPermistted ? this.stateBucketService.findAll().subscribe(stateBuckets => this.stateBuckets = stateBuckets,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadContributeur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Bucket', 'list');
    isPermistted ? this.contributeurService.findAll().subscribe(contributeurs => this.contributeurs = contributeurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateBucket(bucket: BucketVo) {

     this.bucketService.findByIdWithAssociatedList(bucket).subscribe(
	 res => {
	       this.initDuplicateBucket(res);
	       this.selectedBucket = res;
	       this.selectedBucket.id = null;
            this.createBucketDialog = true;

});

	}

	initDuplicateBucket(res: BucketVo) {
        if (res.imagesVo != null) {
             res.imagesVo.forEach(d => { d.bucketVo = null; d.id = null; });
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
    this.exportData = this.buckets.map(e => {
    return {
                    'Nom': e.nom ,
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Libelle': e.libelle ,
            'State bucket': e.stateBucketVo?.libelle ,
            'Contributeur': e.contributeurVo?.cin ,
     }
      });

      this.criteriaData = [{
            'Nom': this.searchBucket.nom ? this.searchBucket.nom : environment.emptyForExport ,
            'Date creation Min': this.searchBucket.dateCreationMin ? this.datePipe.transform(this.searchBucket.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchBucket.dateCreationMax ? this.datePipe.transform(this.searchBucket.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Libelle': this.searchBucket.libelle ? this.searchBucket.libelle : environment.emptyForExport ,
        'State bucket': this.searchBucket.stateBucketVo?.libelle ? this.searchBucket.stateBucketVo?.libelle : environment.emptyForExport ,
        'Contributeur': this.searchBucket.contributeurVo?.cin ? this.searchBucket.contributeurVo?.cin : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get buckets() : Array<BucketVo> {
           return this.bucketService.buckets;
       }
    set buckets(value: Array<BucketVo>) {
        this.bucketService.buckets = value;
       }

    get bucketSelections() : Array<BucketVo> {
           return this.bucketService.bucketSelections;
       }
    set bucketSelections(value: Array<BucketVo>) {
        this.bucketService.bucketSelections = value;
       }
   
     


    get selectedBucket() : BucketVo {
           return this.bucketService.selectedBucket;
       }
    set selectedBucket(value: BucketVo) {
        this.bucketService.selectedBucket = value;
       }
    
    get createBucketDialog() :boolean {
           return this.bucketService.createBucketDialog;
       }
    set createBucketDialog(value: boolean) {
        this.bucketService.createBucketDialog= value;
       }
    
    get editBucketDialog() :boolean {
           return this.bucketService.editBucketDialog;
       }
    set editBucketDialog(value: boolean) {
        this.bucketService.editBucketDialog= value;
       }
    get viewBucketDialog() :boolean {
           return this.bucketService.viewBucketDialog;
       }
    set viewBucketDialog(value: boolean) {
        this.bucketService.viewBucketDialog = value;
       }
       
     get searchBucket() : BucketVo {
        return this.bucketService.searchBucket;
       }
    set searchBucket(value: BucketVo) {
        this.bucketService.searchBucket = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
