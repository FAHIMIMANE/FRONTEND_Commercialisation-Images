import {Component, OnInit} from '@angular/core';
import {CategorieItemService} from 'src/app/controller/service/CategorieItem.service';
import {CategorieItemVo} from 'src/app/controller/model/CategorieItem.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import { ImageService } from 'src/app/controller/service/Image.service';
import { CategorieImageService } from 'src/app/controller/service/CategorieImage.service';

import {CategorieImageVo} from 'src/app/controller/model/CategorieImage.model';
import {ImageVo} from 'src/app/controller/model/Image.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-categorie-item-list-chercheur',
  templateUrl: './categorie-item-list-chercheur.component.html',
  styleUrls: ['./categorie-item-list-chercheur.component.css']
})
export class CategorieItemListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CategorieItem';
    images :Array<ImageVo>;
    categorieImages :Array<CategorieImageVo>;


    constructor(private datePipe: DatePipe, private categorieItemService: CategorieItemService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private imageService: ImageService
        , private categorieImageService: CategorieImageService
) { }

    ngOnInit() : void {
      this.loadCategorieItems();
      this.initExport();
      this.initCol();
      this.loadImage();
      this.loadCategorieImage();
    }
    
    // methods
      public async loadCategorieItems(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CategorieItem', 'list');
        isPermistted ? this.categorieItemService.findAll().subscribe(categorieItems => this.categorieItems = categorieItems,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.categorieItemService.findByCriteria(this.searchCategorieItem).subscribe(categorieItems=>{
            
            this.categorieItems = categorieItems;
           // this.searchCategorieItem = new CategorieItemVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'image?.reference', header: 'Image'},
                        {field: 'categorieImage?.libelle', header: 'Categorie image'},
        ];
    }
    
    public async editCategorieItem(categorieItem: CategorieItemVo){
        const isPermistted = await this.roleService.isPermitted('CategorieItem', 'edit');
         if(isPermistted){
          this.categorieItemService.findByIdWithAssociatedList(categorieItem).subscribe(res => {
           this.selectedCategorieItem = res;
            this.editCategorieItemDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCategorieItem(categorieItem: CategorieItemVo){
        const isPermistted = await this.roleService.isPermitted('CategorieItem', 'view');
        if(isPermistted){
           this.categorieItemService.findByIdWithAssociatedList(categorieItem).subscribe(res => {
           this.selectedCategorieItem = res;
            this.viewCategorieItemDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCategorieItem(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCategorieItem = new CategorieItemVo();
            this.createCategorieItemDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCategorieItem(categorieItem: CategorieItemVo){
       const isPermistted = await this.roleService.isPermitted('CategorieItem', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Categorie item) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.categorieItemService.delete(categorieItem).subscribe(status=>{
                          if(status > 0){
                          const position = this.categorieItems.indexOf(categorieItem);
                          position > -1 ? this.categorieItems.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Categorie item Supprimé',
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

public async loadImage(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CategorieItem', 'list');
    isPermistted ? this.imageService.findAll().subscribe(images => this.images = images,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCategorieImage(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CategorieItem', 'list');
    isPermistted ? this.categorieImageService.findAll().subscribe(categorieImages => this.categorieImages = categorieImages,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCategorieItem(categorieItem: CategorieItemVo) {

     this.categorieItemService.findByIdWithAssociatedList(categorieItem).subscribe(
	 res => {
	       this.initDuplicateCategorieItem(res);
	       this.selectedCategorieItem = res;
	       this.selectedCategorieItem.id = null;
            this.createCategorieItemDialog = true;

});

	}

	initDuplicateCategorieItem(res: CategorieItemVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.categorieItems.map(e => {
    return {
            'Image': e.imageVo?.reference ,
            'Categorie image': e.categorieImageVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Image': this.searchCategorieItem.imageVo?.reference ? this.searchCategorieItem.imageVo?.reference : environment.emptyForExport ,
        'Categorie image': this.searchCategorieItem.categorieImageVo?.libelle ? this.searchCategorieItem.categorieImageVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get categorieItems() : Array<CategorieItemVo> {
           return this.categorieItemService.categorieItems;
       }
    set categorieItems(value: Array<CategorieItemVo>) {
        this.categorieItemService.categorieItems = value;
       }

    get categorieItemSelections() : Array<CategorieItemVo> {
           return this.categorieItemService.categorieItemSelections;
       }
    set categorieItemSelections(value: Array<CategorieItemVo>) {
        this.categorieItemService.categorieItemSelections = value;
       }
   
     


    get selectedCategorieItem() : CategorieItemVo {
           return this.categorieItemService.selectedCategorieItem;
       }
    set selectedCategorieItem(value: CategorieItemVo) {
        this.categorieItemService.selectedCategorieItem = value;
       }
    
    get createCategorieItemDialog() :boolean {
           return this.categorieItemService.createCategorieItemDialog;
       }
    set createCategorieItemDialog(value: boolean) {
        this.categorieItemService.createCategorieItemDialog= value;
       }
    
    get editCategorieItemDialog() :boolean {
           return this.categorieItemService.editCategorieItemDialog;
       }
    set editCategorieItemDialog(value: boolean) {
        this.categorieItemService.editCategorieItemDialog= value;
       }
    get viewCategorieItemDialog() :boolean {
           return this.categorieItemService.viewCategorieItemDialog;
       }
    set viewCategorieItemDialog(value: boolean) {
        this.categorieItemService.viewCategorieItemDialog = value;
       }
       
     get searchCategorieItem() : CategorieItemVo {
        return this.categorieItemService.searchCategorieItem;
       }
    set searchCategorieItem(value: CategorieItemVo) {
        this.categorieItemService.searchCategorieItem = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
