import {Component, OnInit} from '@angular/core';
import {EtatAbonnementService} from 'src/app/controller/service/EtatAbonnement.service';
import {EtatAbonnementVo} from 'src/app/controller/model/EtatAbonnement.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-abonnement-edit-admin',
  templateUrl: './etat-abonnement-edit-admin.component.html',
  styleUrls: ['./etat-abonnement-edit-admin.component.css']
})
export class EtatAbonnementEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatAbonnementService: EtatAbonnementService
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
    this.etatAbonnementService.edit().subscribe(etatAbonnement=>{
    const myIndex = this.etatAbonnements.findIndex(e => e.id === this.selectedEtatAbonnement.id);
    this.etatAbonnements[myIndex] = this.selectedEtatAbonnement;
    this.editEtatAbonnementDialog = false;
    this.selectedEtatAbonnement = new EtatAbonnementVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtatAbonnementDialog  = false;
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

   get editEtatAbonnementDialog(): boolean {
           return this.etatAbonnementService.editEtatAbonnementDialog;

       }
    set editEtatAbonnementDialog(value: boolean) {
        this.etatAbonnementService.editEtatAbonnementDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
