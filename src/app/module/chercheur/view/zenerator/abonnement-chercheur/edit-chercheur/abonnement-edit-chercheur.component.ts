import {Component, OnInit} from '@angular/core';
import {AbonnementService} from 'src/app/controller/service/Abonnement.service';
import {AbonnementVo} from 'src/app/controller/model/Abonnement.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EtatAbonnementVo} from 'src/app/controller/model/EtatAbonnement.model';
import {EtatAbonnementService} from 'src/app/controller/service/EtatAbonnement.service';
import {PackAbonnementVo} from 'src/app/controller/model/PackAbonnement.model';
import {PackAbonnementService} from 'src/app/controller/service/PackAbonnement.service';
import {ClientVo} from 'src/app/controller/model/Client.model';
import {ClientService} from 'src/app/controller/service/Client.service';

@Component({
  selector: 'app-abonnement-edit-chercheur',
  templateUrl: './abonnement-edit-chercheur.component.html',
  styleUrls: ['./abonnement-edit-chercheur.component.css']
})
export class AbonnementEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private abonnementService: AbonnementService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private etatAbonnementService: EtatAbonnementService
 ,       private packAbonnementService: PackAbonnementService
 ,       private clientService: ClientService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtatAbonnement = new EtatAbonnementVo();
    this.etatAbonnementService.findAll().subscribe((data) => this.etatAbonnements = data);
    this.selectedClient = new ClientVo();
    this.clientService.findAll().subscribe((data) => this.clients = data);
    this.selectedPackAbonnement = new PackAbonnementVo();
    this.packAbonnementService.findAll().subscribe((data) => this.packAbonnements = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedAbonnement.dateDebut = DateUtils.toDate(this.selectedAbonnement.dateDebut);
            this.selectedAbonnement.dateFin = DateUtils.toDate(this.selectedAbonnement.dateFin);
    this.abonnementService.edit().subscribe(abonnement=>{
    const myIndex = this.abonnements.findIndex(e => e.id === this.selectedAbonnement.id);
    this.abonnements[myIndex] = this.selectedAbonnement;
    this.editAbonnementDialog = false;
    this.selectedAbonnement = new AbonnementVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateclient(client: string) {
                      const isPermistted = await this.roleService.isPermitted('Client', 'add');
                       if(isPermistted){
         this.selectedClient = new ClientVo();
        this.createClientDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepackAbonnement(packAbonnement: string) {
                      const isPermistted = await this.roleService.isPermitted('PackAbonnement', 'add');
                       if(isPermistted){
         this.selectedPackAbonnement = new PackAbonnementVo();
        this.createPackAbonnementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatAbonnement(etatAbonnement: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatAbonnement', 'add');
                       if(isPermistted){
         this.selectedEtatAbonnement = new EtatAbonnementVo();
        this.createEtatAbonnementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editAbonnementDialog  = false;
}

// getters and setters

get abonnements(): Array<AbonnementVo> {
    return this.abonnementService.abonnements;
       }
set abonnements(value: Array<AbonnementVo>) {
        this.abonnementService.abonnements = value;
       }

 get selectedAbonnement(): AbonnementVo {
           return this.abonnementService.selectedAbonnement;
       }
    set selectedAbonnement(value: AbonnementVo) {
        this.abonnementService.selectedAbonnement = value;
       }

   get editAbonnementDialog(): boolean {
           return this.abonnementService.editAbonnementDialog;

       }
    set editAbonnementDialog(value: boolean) {
        this.abonnementService.editAbonnementDialog = value;
       }

       get selectedClient(): ClientVo {
           return this.clientService.selectedClient;
       }
      set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }
       get clients(): Array<ClientVo> {
           return this.clientService.clients;
       }
       set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }
       get createClientDialog(): boolean {
           return this.clientService.createClientDialog;
       }
      set createClientDialog(value: boolean) {
        this.clientService.createClientDialog= value;
       }
       get selectedPackAbonnement(): PackAbonnementVo {
           return this.packAbonnementService.selectedPackAbonnement;
       }
      set selectedPackAbonnement(value: PackAbonnementVo) {
        this.packAbonnementService.selectedPackAbonnement = value;
       }
       get packAbonnements(): Array<PackAbonnementVo> {
           return this.packAbonnementService.packAbonnements;
       }
       set packAbonnements(value: Array<PackAbonnementVo>) {
        this.packAbonnementService.packAbonnements = value;
       }
       get createPackAbonnementDialog(): boolean {
           return this.packAbonnementService.createPackAbonnementDialog;
       }
      set createPackAbonnementDialog(value: boolean) {
        this.packAbonnementService.createPackAbonnementDialog= value;
       }
       get selectedEtatAbonnement(): EtatAbonnementVo {
           return this.etatAbonnementService.selectedEtatAbonnement;
       }
      set selectedEtatAbonnement(value: EtatAbonnementVo) {
        this.etatAbonnementService.selectedEtatAbonnement = value;
       }
       get etatAbonnements(): Array<EtatAbonnementVo> {
           return this.etatAbonnementService.etatAbonnements;
       }
       set etatAbonnements(value: Array<EtatAbonnementVo>) {
        this.etatAbonnementService.etatAbonnements = value;
       }
       get createEtatAbonnementDialog(): boolean {
           return this.etatAbonnementService.createEtatAbonnementDialog;
       }
      set createEtatAbonnementDialog(value: boolean) {
        this.etatAbonnementService.createEtatAbonnementDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
