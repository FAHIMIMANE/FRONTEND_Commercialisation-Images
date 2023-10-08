import {Component, OnInit} from '@angular/core';
import {TypeImageService} from 'src/app/controller/service/TypeImage.service';
import {TypeImageVo} from 'src/app/controller/model/TypeImage.model';
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
  selector: 'app-type-image-list-client',
  templateUrl: './type-image-list-client.component.html',
  styleUrls: ['./type-image-list-client.component.css']
})
export class TypeImageListClientComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeImage';


    constructor(private datePipe: DatePipe, private typeImageService: TypeImageService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTypeImages();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTypeImages(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeImage', 'list');
        isPermistted ? this.typeImageService.findAll().subscribe(typeImages => this.typeImages = typeImages,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeImageService.findByCriteria(this.searchTypeImage).subscribe(typeImages=>{
            
            this.typeImages = typeImages;
           // this.searchTypeImage = new TypeImageVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editTypeImage(typeImage: TypeImageVo){
        const isPermistted = await this.roleService.isPermitted('TypeImage', 'edit');
         if(isPermistted){
          this.typeImageService.findByIdWithAssociatedList(typeImage).subscribe(res => {
           this.selectedTypeImage = res;
            this.editTypeImageDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeImage(typeImage: TypeImageVo){
        const isPermistted = await this.roleService.isPermitted('TypeImage', 'view');
        if(isPermistted){
           this.typeImageService.findByIdWithAssociatedList(typeImage).subscribe(res => {
           this.selectedTypeImage = res;
            this.viewTypeImageDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeImage(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeImage = new TypeImageVo();
            this.createTypeImageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeImage(typeImage: TypeImageVo){
       const isPermistted = await this.roleService.isPermitted('TypeImage', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type image) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeImageService.delete(typeImage).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeImages.indexOf(typeImage);
                          position > -1 ? this.typeImages.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type image Supprimé',
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


public async duplicateTypeImage(typeImage: TypeImageVo) {

     this.typeImageService.findByIdWithAssociatedList(typeImage).subscribe(
	 res => {
	       this.initDuplicateTypeImage(res);
	       this.selectedTypeImage = res;
	       this.selectedTypeImage.id = null;
            this.createTypeImageDialog = true;

});

	}

	initDuplicateTypeImage(res: TypeImageVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.typeImages.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypeImage.libelle ? this.searchTypeImage.libelle : environment.emptyForExport ,
            'Code': this.searchTypeImage.code ? this.searchTypeImage.code : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeImages() : Array<TypeImageVo> {
           return this.typeImageService.typeImages;
       }
    set typeImages(value: Array<TypeImageVo>) {
        this.typeImageService.typeImages = value;
       }

    get typeImageSelections() : Array<TypeImageVo> {
           return this.typeImageService.typeImageSelections;
       }
    set typeImageSelections(value: Array<TypeImageVo>) {
        this.typeImageService.typeImageSelections = value;
       }
   
     


    get selectedTypeImage() : TypeImageVo {
           return this.typeImageService.selectedTypeImage;
       }
    set selectedTypeImage(value: TypeImageVo) {
        this.typeImageService.selectedTypeImage = value;
       }
    
    get createTypeImageDialog() :boolean {
           return this.typeImageService.createTypeImageDialog;
       }
    set createTypeImageDialog(value: boolean) {
        this.typeImageService.createTypeImageDialog= value;
       }
    
    get editTypeImageDialog() :boolean {
           return this.typeImageService.editTypeImageDialog;
       }
    set editTypeImageDialog(value: boolean) {
        this.typeImageService.editTypeImageDialog= value;
       }
    get viewTypeImageDialog() :boolean {
           return this.typeImageService.viewTypeImageDialog;
       }
    set viewTypeImageDialog(value: boolean) {
        this.typeImageService.viewTypeImageDialog = value;
       }
       
     get searchTypeImage() : TypeImageVo {
        return this.typeImageService.searchTypeImage;
       }
    set searchTypeImage(value: TypeImageVo) {
        this.typeImageService.searchTypeImage = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
