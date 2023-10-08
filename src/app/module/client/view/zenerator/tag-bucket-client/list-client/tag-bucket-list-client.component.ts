import {Component, OnInit} from '@angular/core';
import {TagBucketService} from 'src/app/controller/service/TagBucket.service';
import {TagBucketVo} from 'src/app/controller/model/TagBucket.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import { BucketService } from 'src/app/controller/service/Bucket.service';
import { TagService } from 'src/app/controller/service/Tag.service';

import {BucketVo} from 'src/app/controller/model/Bucket.model';
import {TagVo} from 'src/app/controller/model/Tag.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-tag-bucket-list-client',
  templateUrl: './tag-bucket-list-client.component.html',
  styleUrls: ['./tag-bucket-list-client.component.css']
})
export class TagBucketListClientComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TagBucket';
    buckets :Array<BucketVo>;
    tags :Array<TagVo>;


    constructor(private datePipe: DatePipe, private tagBucketService: TagBucketService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private bucketService: BucketService
        , private tagService: TagService
) { }

    ngOnInit() : void {
      this.loadTagBuckets();
      this.initExport();
      this.initCol();
      this.loadBucket();
      this.loadTag();
    }
    
    // methods
      public async loadTagBuckets(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TagBucket', 'list');
        isPermistted ? this.tagBucketService.findAll().subscribe(tagBuckets => this.tagBuckets = tagBuckets,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.tagBucketService.findByCriteria(this.searchTagBucket).subscribe(tagBuckets=>{
            
            this.tagBuckets = tagBuckets;
           // this.searchTagBucket = new TagBucketVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'bucket?.libelle', header: 'Bucket'},
                        {field: 'tag?.libelle', header: 'Tag'},
        ];
    }
    
    public async editTagBucket(tagBucket: TagBucketVo){
        const isPermistted = await this.roleService.isPermitted('TagBucket', 'edit');
         if(isPermistted){
          this.tagBucketService.findByIdWithAssociatedList(tagBucket).subscribe(res => {
           this.selectedTagBucket = res;
            this.editTagBucketDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTagBucket(tagBucket: TagBucketVo){
        const isPermistted = await this.roleService.isPermitted('TagBucket', 'view');
        if(isPermistted){
           this.tagBucketService.findByIdWithAssociatedList(tagBucket).subscribe(res => {
           this.selectedTagBucket = res;
            this.viewTagBucketDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTagBucket(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTagBucket = new TagBucketVo();
            this.createTagBucketDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTagBucket(tagBucket: TagBucketVo){
       const isPermistted = await this.roleService.isPermitted('TagBucket', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Tag bucket) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.tagBucketService.delete(tagBucket).subscribe(status=>{
                          if(status > 0){
                          const position = this.tagBuckets.indexOf(tagBucket);
                          position > -1 ? this.tagBuckets.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Tag bucket Supprimé',
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

public async loadBucket(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TagBucket', 'list');
    isPermistted ? this.bucketService.findAll().subscribe(buckets => this.buckets = buckets,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTag(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TagBucket', 'list');
    isPermistted ? this.tagService.findAll().subscribe(tags => this.tags = tags,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateTagBucket(tagBucket: TagBucketVo) {

     this.tagBucketService.findByIdWithAssociatedList(tagBucket).subscribe(
	 res => {
	       this.initDuplicateTagBucket(res);
	       this.selectedTagBucket = res;
	       this.selectedTagBucket.id = null;
            this.createTagBucketDialog = true;

});

	}

	initDuplicateTagBucket(res: TagBucketVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.tagBuckets.map(e => {
    return {
            'Bucket': e.bucketVo?.libelle ,
            'Tag': e.tagVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Bucket': this.searchTagBucket.bucketVo?.libelle ? this.searchTagBucket.bucketVo?.libelle : environment.emptyForExport ,
        'Tag': this.searchTagBucket.tagVo?.libelle ? this.searchTagBucket.tagVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get tagBuckets() : Array<TagBucketVo> {
           return this.tagBucketService.tagBuckets;
       }
    set tagBuckets(value: Array<TagBucketVo>) {
        this.tagBucketService.tagBuckets = value;
       }

    get tagBucketSelections() : Array<TagBucketVo> {
           return this.tagBucketService.tagBucketSelections;
       }
    set tagBucketSelections(value: Array<TagBucketVo>) {
        this.tagBucketService.tagBucketSelections = value;
       }
   
     


    get selectedTagBucket() : TagBucketVo {
           return this.tagBucketService.selectedTagBucket;
       }
    set selectedTagBucket(value: TagBucketVo) {
        this.tagBucketService.selectedTagBucket = value;
       }
    
    get createTagBucketDialog() :boolean {
           return this.tagBucketService.createTagBucketDialog;
       }
    set createTagBucketDialog(value: boolean) {
        this.tagBucketService.createTagBucketDialog= value;
       }
    
    get editTagBucketDialog() :boolean {
           return this.tagBucketService.editTagBucketDialog;
       }
    set editTagBucketDialog(value: boolean) {
        this.tagBucketService.editTagBucketDialog= value;
       }
    get viewTagBucketDialog() :boolean {
           return this.tagBucketService.viewTagBucketDialog;
       }
    set viewTagBucketDialog(value: boolean) {
        this.tagBucketService.viewTagBucketDialog = value;
       }
       
     get searchTagBucket() : TagBucketVo {
        return this.tagBucketService.searchTagBucket;
       }
    set searchTagBucket(value: TagBucketVo) {
        this.tagBucketService.searchTagBucket = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
