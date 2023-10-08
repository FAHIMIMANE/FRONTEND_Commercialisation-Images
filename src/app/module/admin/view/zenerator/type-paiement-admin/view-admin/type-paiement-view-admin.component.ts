import {Component, OnInit} from '@angular/core';
import {TypePaiementService} from 'src/app/controller/service/TypePaiement.service';
import {TypePaiementVo} from 'src/app/controller/model/TypePaiement.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-paiement-view-admin',
  templateUrl: './type-paiement-view-admin.component.html',
  styleUrls: ['./type-paiement-view-admin.component.css']
})
export class TypePaiementViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typePaiementService: TypePaiementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypePaiementDialog  = false;
}

// getters and setters

get typePaiements(): Array<TypePaiementVo> {
    return this.typePaiementService.typePaiements;
       }
set typePaiements(value: Array<TypePaiementVo>) {
        this.typePaiementService.typePaiements = value;
       }

 get selectedTypePaiement(): TypePaiementVo {
           return this.typePaiementService.selectedTypePaiement;
       }
    set selectedTypePaiement(value: TypePaiementVo) {
        this.typePaiementService.selectedTypePaiement = value;
       }

   get viewTypePaiementDialog(): boolean {
           return this.typePaiementService.viewTypePaiementDialog;

       }
    set viewTypePaiementDialog(value: boolean) {
        this.typePaiementService.viewTypePaiementDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
