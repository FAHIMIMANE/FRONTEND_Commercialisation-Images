import {Component, OnInit} from '@angular/core';
import {EtatImageService} from 'src/app/controller/service/EtatImage.service';
import {EtatImageVo} from 'src/app/controller/model/EtatImage.model';
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
  selector: 'app-etat-image-list-client',
  templateUrl: './etat-image-list-client.component.html',
  styleUrls: ['./etat-image-list-client.component.css']
})
export class EtatImageListClientComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatImage';


    constructor(private datePipe: DatePipe, private etatImageService: EtatImageService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadEtatImages();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadEtatImages(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatImage', 'list');
        isPermistted ? this.etatImageService.findAll().subscribe(etatImages => this.etatImages = etatImages,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatImageService.findByCriteria(this.searchEtatImage).subscribe(etatImages=>{
            
            this.etatImages = etatImages;
           // this.searchEtatImage = new EtatImageVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editEtatImage(etatImage: EtatImageVo){
        const isPermistted = await this.roleService.isPermitted('EtatImage', 'edit');
         if(isPermistted){
          this.etatImageService.findByIdWithAssociatedList(etatImage).subscribe(res => {
           this.selectedEtatImage = res;
            this.editEtatImageDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatImage(etatImage: EtatImageVo){
        const isPermistted = await this.roleService.isPermitted('EtatImage', 'view');
        if(isPermistted){
           this.etatImageService.findByIdWithAssociatedList(etatImage).subscribe(res => {
           this.selectedEtatImage = res;
            this.viewEtatImageDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatImage(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatImage = new EtatImageVo();
            this.createEtatImageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtatImage(etatImage: EtatImageVo){
       const isPermistted = await this.roleService.isPermitted('EtatImage', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat image) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatImageService.delete(etatImage).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatImages.indexOf(etatImage);
                          position > -1 ? this.etatImages.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat image Supprimé',
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


public async duplicateEtatImage(etatImage: EtatImageVo) {

     this.etatImageService.findByIdWithAssociatedList(etatImage).subscribe(
	 res => {
	       this.initDuplicateEtatImage(res);
	       this.selectedEtatImage = res;
	       this.selectedEtatImage.id = null;
            this.createEtatImageDialog = true;

});

	}

	initDuplicateEtatImage(res: EtatImageVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.etatImages.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchEtatImage.libelle ? this.searchEtatImage.libelle : environment.emptyForExport ,
            'Code': this.searchEtatImage.code ? this.searchEtatImage.code : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatImages() : Array<EtatImageVo> {
           return this.etatImageService.etatImages;
       }
    set etatImages(value: Array<EtatImageVo>) {
        this.etatImageService.etatImages = value;
       }

    get etatImageSelections() : Array<EtatImageVo> {
           return this.etatImageService.etatImageSelections;
       }
    set etatImageSelections(value: Array<EtatImageVo>) {
        this.etatImageService.etatImageSelections = value;
       }
   
     


    get selectedEtatImage() : EtatImageVo {
           return this.etatImageService.selectedEtatImage;
       }
    set selectedEtatImage(value: EtatImageVo) {
        this.etatImageService.selectedEtatImage = value;
       }
    
    get createEtatImageDialog() :boolean {
           return this.etatImageService.createEtatImageDialog;
       }
    set createEtatImageDialog(value: boolean) {
        this.etatImageService.createEtatImageDialog= value;
       }
    
    get editEtatImageDialog() :boolean {
           return this.etatImageService.editEtatImageDialog;
       }
    set editEtatImageDialog(value: boolean) {
        this.etatImageService.editEtatImageDialog= value;
       }
    get viewEtatImageDialog() :boolean {
           return this.etatImageService.viewEtatImageDialog;
       }
    set viewEtatImageDialog(value: boolean) {
        this.etatImageService.viewEtatImageDialog = value;
       }
       
     get searchEtatImage() : EtatImageVo {
        return this.etatImageService.searchEtatImage;
       }
    set searchEtatImage(value: EtatImageVo) {
        this.etatImageService.searchEtatImage = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
