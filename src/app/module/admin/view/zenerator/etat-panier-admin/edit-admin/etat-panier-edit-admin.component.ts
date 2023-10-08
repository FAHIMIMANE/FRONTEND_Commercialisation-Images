import {Component, OnInit} from '@angular/core';
import {EtatPanierService} from 'src/app/controller/service/EtatPanier.service';
import {EtatPanierVo} from 'src/app/controller/model/EtatPanier.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-panier-edit-admin',
  templateUrl: './etat-panier-edit-admin.component.html',
  styleUrls: ['./etat-panier-edit-admin.component.css']
})
export class EtatPanierEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatPanierService: EtatPanierService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
) {
}

// methods
ngOnInit(): void {
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.etatPanierService.edit().subscribe(etatPanier=>{
    const myIndex = this.etatPaniers.findIndex(e => e.id === this.selectedEtatPanier.id);
    this.etatPaniers[myIndex] = this.selectedEtatPanier;
    this.editEtatPanierDialog = false;
    this.selectedEtatPanier = new EtatPanierVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtatPanierDialog  = false;
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

   get editEtatPanierDialog(): boolean {
           return this.etatPanierService.editEtatPanierDialog;

       }
    set editEtatPanierDialog(value: boolean) {
        this.etatPanierService.editEtatPanierDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
