import {Component, OnInit} from '@angular/core';
import {PackAbonnementService} from 'src/app/controller/service/PackAbonnement.service';
import {PackAbonnementVo} from 'src/app/controller/model/PackAbonnement.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-pack-abonnement-edit-admin',
  templateUrl: './pack-abonnement-edit-admin.component.html',
  styleUrls: ['./pack-abonnement-edit-admin.component.css']
})
export class PackAbonnementEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private packAbonnementService: PackAbonnementService
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
            this.selectedPackAbonnement.dateMin = DateUtils.toDate(this.selectedPackAbonnement.dateMin);
            this.selectedPackAbonnement.dateMax = DateUtils.toDate(this.selectedPackAbonnement.dateMax);
    this.packAbonnementService.edit().subscribe(packAbonnement=>{
    const myIndex = this.packAbonnements.findIndex(e => e.id === this.selectedPackAbonnement.id);
    this.packAbonnements[myIndex] = this.selectedPackAbonnement;
    this.editPackAbonnementDialog = false;
    this.selectedPackAbonnement = new PackAbonnementVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editPackAbonnementDialog  = false;
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

   get editPackAbonnementDialog(): boolean {
           return this.packAbonnementService.editPackAbonnementDialog;

       }
    set editPackAbonnementDialog(value: boolean) {
        this.packAbonnementService.editPackAbonnementDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
