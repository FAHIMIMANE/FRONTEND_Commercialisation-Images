import {Component, OnInit} from '@angular/core';
import {AbonnementService} from 'src/app/controller/service/Abonnement.service';
import {AbonnementVo} from 'src/app/controller/model/Abonnement.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {EtatAbonnementVo} from 'src/app/controller/model/EtatAbonnement.model';
import {EtatAbonnementService} from 'src/app/controller/service/EtatAbonnement.service';
import {PackAbonnementVo} from 'src/app/controller/model/PackAbonnement.model';
import {PackAbonnementService} from 'src/app/controller/service/PackAbonnement.service';
import {ClientVo} from 'src/app/controller/model/Client.model';
import {ClientService} from 'src/app/controller/service/Client.service';

@Component({
  selector: 'app-abonnement-view-admin',
  templateUrl: './abonnement-view-admin.component.html',
  styleUrls: ['./abonnement-view-admin.component.css']
})
export class AbonnementViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private abonnementService: AbonnementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private etatAbonnementService: EtatAbonnementService
    ,private packAbonnementService: PackAbonnementService
    ,private clientService: ClientService
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

hideViewDialog(){
    this.viewAbonnementDialog  = false;
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

   get viewAbonnementDialog(): boolean {
           return this.abonnementService.viewAbonnementDialog;

       }
    set viewAbonnementDialog(value: boolean) {
        this.abonnementService.viewAbonnementDialog= value;
       }

       get selectedClient(): ClientVo {
           return this.clientService.selectedClient;
       }
      set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }
       get clients():Array<ClientVo> {
           return this.clientService.clients;
       }
       set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }
       get editClientDialog(): boolean {
           return this.clientService.editClientDialog;
       }
      set editClientDialog(value: boolean) {
        this.clientService.editClientDialog= value;
       }
       get selectedPackAbonnement(): PackAbonnementVo {
           return this.packAbonnementService.selectedPackAbonnement;
       }
      set selectedPackAbonnement(value: PackAbonnementVo) {
        this.packAbonnementService.selectedPackAbonnement = value;
       }
       get packAbonnements():Array<PackAbonnementVo> {
           return this.packAbonnementService.packAbonnements;
       }
       set packAbonnements(value: Array<PackAbonnementVo>) {
        this.packAbonnementService.packAbonnements = value;
       }
       get editPackAbonnementDialog(): boolean {
           return this.packAbonnementService.editPackAbonnementDialog;
       }
      set editPackAbonnementDialog(value: boolean) {
        this.packAbonnementService.editPackAbonnementDialog= value;
       }
       get selectedEtatAbonnement(): EtatAbonnementVo {
           return this.etatAbonnementService.selectedEtatAbonnement;
       }
      set selectedEtatAbonnement(value: EtatAbonnementVo) {
        this.etatAbonnementService.selectedEtatAbonnement = value;
       }
       get etatAbonnements():Array<EtatAbonnementVo> {
           return this.etatAbonnementService.etatAbonnements;
       }
       set etatAbonnements(value: Array<EtatAbonnementVo>) {
        this.etatAbonnementService.etatAbonnements = value;
       }
       get editEtatAbonnementDialog(): boolean {
           return this.etatAbonnementService.editEtatAbonnementDialog;
       }
      set editEtatAbonnementDialog(value: boolean) {
        this.etatAbonnementService.editEtatAbonnementDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
