import {Component, OnInit} from '@angular/core';
import {CategorieImageService} from 'src/app/controller/service/CategorieImage.service';
import {CategorieImageVo} from 'src/app/controller/model/CategorieImage.model';
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
  selector: 'app-categorie-image-list-chercheur',
  templateUrl: './categorie-image-list-chercheur.component.html',
  styleUrls: ['./categorie-image-list-chercheur.component.css']
})
export class CategorieImageListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CategorieImage';


    constructor(private datePipe: DatePipe, private categorieImageService: CategorieImageService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadCategorieImages();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadCategorieImages(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CategorieImage', 'list');
        isPermistted ? this.categorieImageService.findAll().subscribe(categorieImages => this.categorieImages = categorieImages,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.categorieImageService.findByCriteria(this.searchCategorieImage).subscribe(categorieImages=>{
            
            this.categorieImages = categorieImages;
           // this.searchCategorieImage = new CategorieImageVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editCategorieImage(categorieImage: CategorieImageVo){
        const isPermistted = await this.roleService.isPermitted('CategorieImage', 'edit');
         if(isPermistted){
          this.categorieImageService.findByIdWithAssociatedList(categorieImage).subscribe(res => {
           this.selectedCategorieImage = res;
            this.editCategorieImageDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCategorieImage(categorieImage: CategorieImageVo){
        const isPermistted = await this.roleService.isPermitted('CategorieImage', 'view');
        if(isPermistted){
           this.categorieImageService.findByIdWithAssociatedList(categorieImage).subscribe(res => {
           this.selectedCategorieImage = res;
            this.viewCategorieImageDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCategorieImage(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCategorieImage = new CategorieImageVo();
            this.createCategorieImageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCategorieImage(categorieImage: CategorieImageVo){
       const isPermistted = await this.roleService.isPermitted('CategorieImage', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Categorie image) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.categorieImageService.delete(categorieImage).subscribe(status=>{
                          if(status > 0){
                          const position = this.categorieImages.indexOf(categorieImage);
                          position > -1 ? this.categorieImages.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Categorie image Supprimé',
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


public async duplicateCategorieImage(categorieImage: CategorieImageVo) {

     this.categorieImageService.findByIdWithAssociatedList(categorieImage).subscribe(
	 res => {
	       this.initDuplicateCategorieImage(res);
	       this.selectedCategorieImage = res;
	       this.selectedCategorieImage.id = null;
            this.createCategorieImageDialog = true;

});

	}

	initDuplicateCategorieImage(res: CategorieImageVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.categorieImages.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Description': e.description ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchCategorieImage.libelle ? this.searchCategorieImage.libelle : environment.emptyForExport ,
            'Description': this.searchCategorieImage.description ? this.searchCategorieImage.description : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get categorieImages() : Array<CategorieImageVo> {
           return this.categorieImageService.categorieImages;
       }
    set categorieImages(value: Array<CategorieImageVo>) {
        this.categorieImageService.categorieImages = value;
       }

    get categorieImageSelections() : Array<CategorieImageVo> {
           return this.categorieImageService.categorieImageSelections;
       }
    set categorieImageSelections(value: Array<CategorieImageVo>) {
        this.categorieImageService.categorieImageSelections = value;
       }
   
     


    get selectedCategorieImage() : CategorieImageVo {
           return this.categorieImageService.selectedCategorieImage;
       }
    set selectedCategorieImage(value: CategorieImageVo) {
        this.categorieImageService.selectedCategorieImage = value;
       }
    
    get createCategorieImageDialog() :boolean {
           return this.categorieImageService.createCategorieImageDialog;
       }
    set createCategorieImageDialog(value: boolean) {
        this.categorieImageService.createCategorieImageDialog= value;
       }
    
    get editCategorieImageDialog() :boolean {
           return this.categorieImageService.editCategorieImageDialog;
       }
    set editCategorieImageDialog(value: boolean) {
        this.categorieImageService.editCategorieImageDialog= value;
       }
    get viewCategorieImageDialog() :boolean {
           return this.categorieImageService.viewCategorieImageDialog;
       }
    set viewCategorieImageDialog(value: boolean) {
        this.categorieImageService.viewCategorieImageDialog = value;
       }
       
     get searchCategorieImage() : CategorieImageVo {
        return this.categorieImageService.searchCategorieImage;
       }
    set searchCategorieImage(value: CategorieImageVo) {
        this.categorieImageService.searchCategorieImage = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
