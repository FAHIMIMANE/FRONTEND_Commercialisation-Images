import {Component, OnInit} from '@angular/core';
import {EtatAbonnementService} from 'src/app/controller/service/EtatAbonnement.service';
import {EtatAbonnementVo} from 'src/app/controller/model/EtatAbonnement.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-etat-abonnement-view-client',
  templateUrl: './etat-abonnement-view-client.component.html',
  styleUrls: ['./etat-abonnement-view-client.component.css']
})
export class EtatAbonnementViewClientComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatAbonnementService: EtatAbonnementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatAbonnementDialog  = false;
}

// getters and setters

get etatAbonnements(): Array<EtatAbonnementVo> {
    return this.etatAbonnementService.etatAbonnements;
       }
set etatAbonnements(value: Array<EtatAbonnementVo>) {
        this.etatAbonnementService.etatAbonnements = value;
       }

 get selectedEtatAbonnement(): EtatAbonnementVo {
           return this.etatAbonnementService.selectedEtatAbonnement;
       }
    set selectedEtatAbonnement(value: EtatAbonnementVo) {
        this.etatAbonnementService.selectedEtatAbonnement = value;
       }

   get viewEtatAbonnementDialog(): boolean {
           return this.etatAbonnementService.viewEtatAbonnementDialog;

       }
    set viewEtatAbonnementDialog(value: boolean) {
        this.etatAbonnementService.viewEtatAbonnementDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
