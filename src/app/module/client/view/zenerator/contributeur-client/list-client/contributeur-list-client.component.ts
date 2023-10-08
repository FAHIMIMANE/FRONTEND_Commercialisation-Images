import {Component, OnInit} from '@angular/core';
import {ContributeurService} from 'src/app/controller/service/Contributeur.service';
import {ContributeurVo} from 'src/app/controller/model/Contributeur.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';



import {BucketVo} from 'src/app/controller/model/Bucket.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-contributeur-list-client',
  templateUrl: './contributeur-list-client.component.html',
  styleUrls: ['./contributeur-list-client.component.css']
})
export class ContributeurListClientComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Contributeur';
     yesOrNoCredentialsNonExpired :any[] =[];
     yesOrNoEnabled :any[] =[];
     yesOrNoAccountNonExpired :any[] =[];
     yesOrNoAccountNonLocked :any[] =[];
     yesOrNoPasswordChanged :any[] =[];


    constructor(private datePipe: DatePipe, private contributeurService: ContributeurService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadContributeurs();
      this.initExport();
      this.initCol();
    this.yesOrNoCredentialsNonExpired =  [{label: 'CredentialsNonExpired', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoEnabled =  [{label: 'Enabled', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAccountNonExpired =  [{label: 'AccountNonExpired', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAccountNonLocked =  [{label: 'AccountNonLocked', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoPasswordChanged =  [{label: 'PasswordChanged', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadContributeurs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Contributeur', 'list');
        isPermistted ? this.contributeurService.findAll().subscribe(contributeurs => this.contributeurs = contributeurs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.contributeurService.findByCriteria(this.searchContributeur).subscribe(contributeurs=>{
            
            this.contributeurs = contributeurs;
           // this.searchContributeur = new ContributeurVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'numeroMatricule', header: 'Numero matricule'},
                            {field: 'emailPrincipale', header: 'Email principale'},
                            {field: 'credentialsNonExpired', header: 'Credentials non expired'},
                            {field: 'enabled', header: 'Enabled'},
                            {field: 'accountNonExpired', header: 'Account non expired'},
                            {field: 'accountNonLocked', header: 'Account non locked'},
                            {field: 'passwordChanged', header: 'Password changed'},
                            {field: 'createdAt', header: 'Created at'},
                            {field: 'updatedAt', header: 'Updated at'},
                            {field: 'username', header: 'Username'},
                            {field: 'password', header: 'Password'},
                            {field: 'prenom', header: 'Prenom'},
                            {field: 'nom', header: 'Nom'},
                            {field: 'cin', header: 'Cin'},
                            {field: 'numeroTelephone', header: 'Numero telephone'},
                            {field: 'adresse', header: 'Adresse'},
                            {field: 'codePostale', header: 'Code postale'},
        ];
    }
    
    public async editContributeur(contributeur: ContributeurVo){
        const isPermistted = await this.roleService.isPermitted('Contributeur', 'edit');
         if(isPermistted){
          this.contributeurService.findByIdWithAssociatedList(contributeur).subscribe(res => {
           this.selectedContributeur = res;
            this.selectedContributeur.createdAt = new Date(contributeur.createdAt);
            this.selectedContributeur.updatedAt = new Date(contributeur.updatedAt);
            this.editContributeurDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewContributeur(contributeur: ContributeurVo){
        const isPermistted = await this.roleService.isPermitted('Contributeur', 'view');
        if(isPermistted){
           this.contributeurService.findByIdWithAssociatedList(contributeur).subscribe(res => {
           this.selectedContributeur = res;
            this.selectedContributeur.createdAt = new Date(contributeur.createdAt);
            this.selectedContributeur.updatedAt = new Date(contributeur.updatedAt);
            this.viewContributeurDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateContributeur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedContributeur = new ContributeurVo();
            this.createContributeurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteContributeur(contributeur: ContributeurVo){
       const isPermistted = await this.roleService.isPermitted('Contributeur', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Contributeur) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.contributeurService.delete(contributeur).subscribe(status=>{
                          if(status > 0){
                          const position = this.contributeurs.indexOf(contributeur);
                          position > -1 ? this.contributeurs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Contributeur Supprimé',
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


public async duplicateContributeur(contributeur: ContributeurVo) {

     this.contributeurService.findByIdWithAssociatedList(contributeur).subscribe(
	 res => {
	       this.initDuplicateContributeur(res);
	       this.selectedContributeur = res;
	       this.selectedContributeur.id = null;
            this.createContributeurDialog = true;

});

	}

	initDuplicateContributeur(res: ContributeurVo) {
        if (res.bucketsVo != null) {
             res.bucketsVo.forEach(d => { d.contributeurVo = null; d.id = null; });
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
    this.exportData = this.contributeurs.map(e => {
    return {
                    'Numero matricule': e.numeroMatricule ,
                    'Email principale': e.emailPrincipale ,
                    'Resume': e.resume ,
                    'Credentials non expired': e.credentialsNonExpired? 'Vrai' : 'Faux' ,
                    'Enabled': e.enabled? 'Vrai' : 'Faux' ,
                    'Account non expired': e.accountNonExpired? 'Vrai' : 'Faux' ,
                    'Account non locked': e.accountNonLocked? 'Vrai' : 'Faux' ,
                    'Password changed': e.passwordChanged? 'Vrai' : 'Faux' ,
                    'Created at': this.datePipe.transform(e.createdAt , 'dd-MM-yyyy'),
                    'Updated at': this.datePipe.transform(e.updatedAt , 'dd-MM-yyyy'),
                    'Username': e.username ,
                    'Password': e.password ,
                    'Prenom': e.prenom ,
                    'Nom': e.nom ,
                    'Cin': e.cin ,
                    'Numero telephone': e.numeroTelephone ,
                    'Adresse': e.adresse ,
                    'Code postale': e.codePostale ,
     }
      });

      this.criteriaData = [{
            'Numero matricule': this.searchContributeur.numeroMatricule ? this.searchContributeur.numeroMatricule : environment.emptyForExport ,
            'Email principale': this.searchContributeur.emailPrincipale ? this.searchContributeur.emailPrincipale : environment.emptyForExport ,
            'Resume': this.searchContributeur.resume ? this.searchContributeur.resume : environment.emptyForExport ,
            'Credentials non expired': this.searchContributeur.credentialsNonExpired ? (this.searchContributeur.credentialsNonExpired ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Enabled': this.searchContributeur.enabled ? (this.searchContributeur.enabled ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Account non expired': this.searchContributeur.accountNonExpired ? (this.searchContributeur.accountNonExpired ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Account non locked': this.searchContributeur.accountNonLocked ? (this.searchContributeur.accountNonLocked ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Password changed': this.searchContributeur.passwordChanged ? (this.searchContributeur.passwordChanged ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Created at Min': this.searchContributeur.createdAtMin ? this.datePipe.transform(this.searchContributeur.createdAtMin , this.dateFormat) : environment.emptyForExport ,
            'Created at Max': this.searchContributeur.createdAtMax ? this.datePipe.transform(this.searchContributeur.createdAtMax , this.dateFormat) : environment.emptyForExport ,
            'Updated at Min': this.searchContributeur.updatedAtMin ? this.datePipe.transform(this.searchContributeur.updatedAtMin , this.dateFormat) : environment.emptyForExport ,
            'Updated at Max': this.searchContributeur.updatedAtMax ? this.datePipe.transform(this.searchContributeur.updatedAtMax , this.dateFormat) : environment.emptyForExport ,
            'Username': this.searchContributeur.username ? this.searchContributeur.username : environment.emptyForExport ,
            'Password': this.searchContributeur.password ? this.searchContributeur.password : environment.emptyForExport ,
            'Prenom': this.searchContributeur.prenom ? this.searchContributeur.prenom : environment.emptyForExport ,
            'Nom': this.searchContributeur.nom ? this.searchContributeur.nom : environment.emptyForExport ,
            'Cin': this.searchContributeur.cin ? this.searchContributeur.cin : environment.emptyForExport ,
            'Numero telephone': this.searchContributeur.numeroTelephone ? this.searchContributeur.numeroTelephone : environment.emptyForExport ,
            'Adresse': this.searchContributeur.adresse ? this.searchContributeur.adresse : environment.emptyForExport ,
            'Code postale': this.searchContributeur.codePostale ? this.searchContributeur.codePostale : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get contributeurs() : Array<ContributeurVo> {
           return this.contributeurService.contributeurs;
       }
    set contributeurs(value: Array<ContributeurVo>) {
        this.contributeurService.contributeurs = value;
       }

    get contributeurSelections() : Array<ContributeurVo> {
           return this.contributeurService.contributeurSelections;
       }
    set contributeurSelections(value: Array<ContributeurVo>) {
        this.contributeurService.contributeurSelections = value;
       }
   
     


    get selectedContributeur() : ContributeurVo {
           return this.contributeurService.selectedContributeur;
       }
    set selectedContributeur(value: ContributeurVo) {
        this.contributeurService.selectedContributeur = value;
       }
    
    get createContributeurDialog() :boolean {
           return this.contributeurService.createContributeurDialog;
       }
    set createContributeurDialog(value: boolean) {
        this.contributeurService.createContributeurDialog= value;
       }
    
    get editContributeurDialog() :boolean {
           return this.contributeurService.editContributeurDialog;
       }
    set editContributeurDialog(value: boolean) {
        this.contributeurService.editContributeurDialog= value;
       }
    get viewContributeurDialog() :boolean {
           return this.contributeurService.viewContributeurDialog;
       }
    set viewContributeurDialog(value: boolean) {
        this.contributeurService.viewContributeurDialog = value;
       }
       
     get searchContributeur() : ContributeurVo {
        return this.contributeurService.searchContributeur;
       }
    set searchContributeur(value: ContributeurVo) {
        this.contributeurService.searchContributeur = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
