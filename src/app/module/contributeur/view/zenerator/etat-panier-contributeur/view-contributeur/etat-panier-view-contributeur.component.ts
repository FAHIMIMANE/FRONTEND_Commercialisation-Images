import {Component, OnInit} from '@angular/core';
import {EtatPanierService} from 'src/app/controller/service/EtatPanier.service';
import {EtatPanierVo} from 'src/app/controller/model/EtatPanier.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-etat-panier-view-contributeur',
  templateUrl: './etat-panier-view-contributeur.component.html',
  styleUrls: ['./etat-panier-view-contributeur.component.css']
})
export class EtatPanierViewContributeurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatPanierService: EtatPanierService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatPanierDialog  = false;
}

// getters and setters

get etatPaniers(): Array<EtatPanierVo> {
    return this.etatPanierService.etatPaniers;
       }
set etatPaniers(value: Array<EtatPanierVo>) {
        this.etatPanierService.etatPaniers = value;
       }

 get selectedEtatPanier(): EtatPanierVo {
           return this.etatPanierService.selectedEtatPanier;
       }
    set selectedEtatPanier(value: EtatPanierVo) {
        this.etatPanierService.selectedEtatPanier = value;
       }

   get viewEtatPanierDialog(): boolean {
           return this.etatPanierService.viewEtatPanierDialog;

       }
    set viewEtatPanierDialog(value: boolean) {
        this.etatPanierService.viewEtatPanierDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
