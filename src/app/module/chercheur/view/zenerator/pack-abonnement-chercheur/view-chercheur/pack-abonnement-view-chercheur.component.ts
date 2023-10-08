import {Component, OnInit} from '@angular/core';
import {PackAbonnementService} from 'src/app/controller/service/PackAbonnement.service';
import {PackAbonnementVo} from 'src/app/controller/model/PackAbonnement.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-pack-abonnement-view-chercheur',
  templateUrl: './pack-abonnement-view-chercheur.component.html',
  styleUrls: ['./pack-abonnement-view-chercheur.component.css']
})
export class PackAbonnementViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private packAbonnementService: PackAbonnementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewPackAbonnementDialog  = false;
}

// getters and setters

get packAbonnements(): Array<PackAbonnementVo> {
    return this.packAbonnementService.packAbonnements;
       }
set packAbonnements(value: Array<PackAbonnementVo>) {
        this.packAbonnementService.packAbonnements = value;
       }

 get selectedPackAbonnement(): PackAbonnementVo {
           return this.packAbonnementService.selectedPackAbonnement;
       }
    set selectedPackAbonnement(value: PackAbonnementVo) {
        this.packAbonnementService.selectedPackAbonnement = value;
       }

   get viewPackAbonnementDialog(): boolean {
           return this.packAbonnementService.viewPackAbonnementDialog;

       }
    set viewPackAbonnementDialog(value: boolean) {
        this.packAbonnementService.viewPackAbonnementDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
