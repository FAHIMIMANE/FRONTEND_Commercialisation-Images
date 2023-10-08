import {Component, OnInit} from '@angular/core';
import {TagService} from 'src/app/controller/service/Tag.service';
import {TagVo} from 'src/app/controller/model/Tag.model';
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
  selector: 'app-tag-list-client',
  templateUrl: './tag-list-client.component.html',
  styleUrls: ['./tag-list-client.component.css']
})
export class TagListClientComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Tag';


    constructor(private datePipe: DatePipe, private tagService: TagService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTags();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTags(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Tag', 'list');
        isPermistted ? this.tagService.findAll().subscribe(tags => this.tags = tags,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.tagService.findByCriteria(this.searchTag).subscribe(tags=>{
            
            this.tags = tags;
           // this.searchTag = new TagVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editTag(tag: TagVo){
        const isPermistted = await this.roleService.isPermitted('Tag', 'edit');
         if(isPermistted){
          this.tagService.findByIdWithAssociatedList(tag).subscribe(res => {
           this.selectedTag = res;
            this.editTagDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTag(tag: TagVo){
        const isPermistted = await this.roleService.isPermitted('Tag', 'view');
        if(isPermistted){
           this.tagService.findByIdWithAssociatedList(tag).subscribe(res => {
           this.selectedTag = res;
            this.viewTagDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTag(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTag = new TagVo();
            this.createTagDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTag(tag: TagVo){
       const isPermistted = await this.roleService.isPermitted('Tag', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Tag) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.tagService.delete(tag).subscribe(status=>{
                          if(status > 0){
                          const position = this.tags.indexOf(tag);
                          position > -1 ? this.tags.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Tag Supprimé',
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


public async duplicateTag(tag: TagVo) {

     this.tagService.findByIdWithAssociatedList(tag).subscribe(
	 res => {
	       this.initDuplicateTag(res);
	       this.selectedTag = res;
	       this.selectedTag.id = null;
            this.createTagDialog = true;

});

	}

	initDuplicateTag(res: TagVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.tags.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTag.libelle ? this.searchTag.libelle : environment.emptyForExport ,
            'Code': this.searchTag.code ? this.searchTag.code : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get tags() : Array<TagVo> {
           return this.tagService.tags;
       }
    set tags(value: Array<TagVo>) {
        this.tagService.tags = value;
       }

    get tagSelections() : Array<TagVo> {
           return this.tagService.tagSelections;
       }
    set tagSelections(value: Array<TagVo>) {
        this.tagService.tagSelections = value;
       }
   
     


    get selectedTag() : TagVo {
           return this.tagService.selectedTag;
       }
    set selectedTag(value: TagVo) {
        this.tagService.selectedTag = value;
       }
    
    get createTagDialog() :boolean {
           return this.tagService.createTagDialog;
       }
    set createTagDialog(value: boolean) {
        this.tagService.createTagDialog= value;
       }
    
    get editTagDialog() :boolean {
           return this.tagService.editTagDialog;
       }
    set editTagDialog(value: boolean) {
        this.tagService.editTagDialog= value;
       }
    get viewTagDialog() :boolean {
           return this.tagService.viewTagDialog;
       }
    set viewTagDialog(value: boolean) {
        this.tagService.viewTagDialog = value;
       }
       
     get searchTag() : TagVo {
        return this.tagService.searchTag;
       }
    set searchTag(value: TagVo) {
        this.tagService.searchTag = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
