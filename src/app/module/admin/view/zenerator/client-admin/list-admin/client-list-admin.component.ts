import {Component, OnInit} from '@angular/core';
import {ClientService} from 'src/app/controller/service/Client.service';
import {ClientVo} from 'src/app/controller/model/Client.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';



import {ImageVo} from 'src/app/controller/model/Image.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-client-list-admin',
  templateUrl: './client-list-admin.component.html',
  styleUrls: ['./client-list-admin.component.css']
})
export class ClientListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Client';
     yesOrNoCredentialsNonExpired :any[] =[];
     yesOrNoEnabled :any[] =[];
     yesOrNoAccountNonExpired :any[] =[];
     yesOrNoAccountNonLocked :any[] =[];
     yesOrNoPasswordChanged :any[] =[];


    constructor(private datePipe: DatePipe, private clientService: ClientService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadClients();
      this.initExport();
      this.initCol();
    this.yesOrNoCredentialsNonExpired =  [{label: 'CredentialsNonExpired', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoEnabled =  [{label: 'Enabled', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAccountNonExpired =  [{label: 'AccountNonExpired', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAccountNonLocked =  [{label: 'AccountNonLocked', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoPasswordChanged =  [{label: 'PasswordChanged', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadClients(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Client', 'list');
        isPermistted ? this.clientService.findAll().subscribe(clients => this.clients = clients,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.clientService.findByCriteria(this.searchClient).subscribe(clients=>{
            
            this.clients = clients;
           // this.searchClient = new ClientVo();
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
                            {field: 'equivalenceAvecPanelErc', header: 'Equivalence avec panel erc'},
                            {field: 'baseHorizon', header: 'Base horizon'},
                            {field: 'role', header: 'Role'},
                            {field: 'numeroDeTel', header: 'Numero de tel'},
                            {field: 'codePostal', header: 'Code postal'},
                            {field: 'rib', header: 'Rib'},
        ];
    }
    
    public async editClient(client: ClientVo){
        const isPermistted = await this.roleService.isPermitted('Client', 'edit');
         if(isPermistted){
          this.clientService.findByIdWithAssociatedList(client).subscribe(res => {
           this.selectedClient = res;
            this.selectedClient.createdAt = new Date(client.createdAt);
            this.selectedClient.updatedAt = new Date(client.updatedAt);
            this.editClientDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewClient(client: ClientVo){
        const isPermistted = await this.roleService.isPermitted('Client', 'view');
        if(isPermistted){
           this.clientService.findByIdWithAssociatedList(client).subscribe(res => {
           this.selectedClient = res;
            this.selectedClient.createdAt = new Date(client.createdAt);
            this.selectedClient.updatedAt = new Date(client.updatedAt);
            this.viewClientDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateClient(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedClient = new ClientVo();
            this.createClientDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteClient(client: ClientVo){
       const isPermistted = await this.roleService.isPermitted('Client', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Client) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.clientService.delete(client).subscribe(status=>{
                          if(status > 0){
                          const position = this.clients.indexOf(client);
                          position > -1 ? this.clients.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Client Supprimé',
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


public async duplicateClient(client: ClientVo) {

     this.clientService.findByIdWithAssociatedList(client).subscribe(
	 res => {
	       this.initDuplicateClient(res);
	       this.selectedClient = res;
	       this.selectedClient.id = null;
            this.createClientDialog = true;

});

	}

	initDuplicateClient(res: ClientVo) {
        if (res.imagesVo != null) {
             res.imagesVo.forEach(d => { d.clientVo = null; d.id = null; });
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
    this.exportData = this.clients.map(e => {
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
                    'Equivalence avec panel erc': e.equivalenceAvecPanelErc ,
                    'Base horizon': e.baseHorizon ,
                    'Role': e.role ,
                    'Numero de tel': e.numeroDeTel ,
                    'Code postal': e.codePostal ,
                    'Rib': e.rib ,
     }
      });

      this.criteriaData = [{
            'Numero matricule': this.searchClient.numeroMatricule ? this.searchClient.numeroMatricule : environment.emptyForExport ,
            'Email principale': this.searchClient.emailPrincipale ? this.searchClient.emailPrincipale : environment.emptyForExport ,
            'Resume': this.searchClient.resume ? this.searchClient.resume : environment.emptyForExport ,
            'Credentials non expired': this.searchClient.credentialsNonExpired ? (this.searchClient.credentialsNonExpired ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Enabled': this.searchClient.enabled ? (this.searchClient.enabled ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Account non expired': this.searchClient.accountNonExpired ? (this.searchClient.accountNonExpired ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Account non locked': this.searchClient.accountNonLocked ? (this.searchClient.accountNonLocked ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Password changed': this.searchClient.passwordChanged ? (this.searchClient.passwordChanged ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Created at Min': this.searchClient.createdAtMin ? this.datePipe.transform(this.searchClient.createdAtMin , this.dateFormat) : environment.emptyForExport ,
            'Created at Max': this.searchClient.createdAtMax ? this.datePipe.transform(this.searchClient.createdAtMax , this.dateFormat) : environment.emptyForExport ,
            'Updated at Min': this.searchClient.updatedAtMin ? this.datePipe.transform(this.searchClient.updatedAtMin , this.dateFormat) : environment.emptyForExport ,
            'Updated at Max': this.searchClient.updatedAtMax ? this.datePipe.transform(this.searchClient.updatedAtMax , this.dateFormat) : environment.emptyForExport ,
            'Username': this.searchClient.username ? this.searchClient.username : environment.emptyForExport ,
            'Password': this.searchClient.password ? this.searchClient.password : environment.emptyForExport ,
            'Prenom': this.searchClient.prenom ? this.searchClient.prenom : environment.emptyForExport ,
            'Nom': this.searchClient.nom ? this.searchClient.nom : environment.emptyForExport ,
            'Equivalence avec panel erc': this.searchClient.equivalenceAvecPanelErc ? this.searchClient.equivalenceAvecPanelErc : environment.emptyForExport ,
            'Base horizon': this.searchClient.baseHorizon ? this.searchClient.baseHorizon : environment.emptyForExport ,
            'Role': this.searchClient.role ? this.searchClient.role : environment.emptyForExport ,
            'Numero de tel': this.searchClient.numeroDeTel ? this.searchClient.numeroDeTel : environment.emptyForExport ,
            'Code postal': this.searchClient.codePostal ? this.searchClient.codePostal : environment.emptyForExport ,
            'Rib': this.searchClient.rib ? this.searchClient.rib : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get clients() : Array<ClientVo> {
           return this.clientService.clients;
       }
    set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }

    get clientSelections() : Array<ClientVo> {
           return this.clientService.clientSelections;
       }
    set clientSelections(value: Array<ClientVo>) {
        this.clientService.clientSelections = value;
       }
   
     


    get selectedClient() : ClientVo {
           return this.clientService.selectedClient;
       }
    set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }
    
    get createClientDialog() :boolean {
           return this.clientService.createClientDialog;
       }
    set createClientDialog(value: boolean) {
        this.clientService.createClientDialog= value;
       }
    
    get editClientDialog() :boolean {
           return this.clientService.editClientDialog;
       }
    set editClientDialog(value: boolean) {
        this.clientService.editClientDialog= value;
       }
    get viewClientDialog() :boolean {
           return this.clientService.viewClientDialog;
       }
    set viewClientDialog(value: boolean) {
        this.clientService.viewClientDialog = value;
       }
       
     get searchClient() : ClientVo {
        return this.clientService.searchClient;
       }
    set searchClient(value: ClientVo) {
        this.clientService.searchClient = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
