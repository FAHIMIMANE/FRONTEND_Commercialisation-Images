import {Component, OnInit} from '@angular/core';
import {TypeContributeurService} from 'src/app/controller/service/TypeContributeur.service';
import {TypeContributeurVo} from 'src/app/controller/model/TypeContributeur.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-contributeur-view-admin',
  templateUrl: './type-contributeur-view-admin.component.html',
  styleUrls: ['./type-contributeur-view-admin.component.css']
})
export class TypeContributeurViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeContributeurService: TypeContributeurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeContributeurDialog  = false;
}

// getters and setters

get typeContributeurs(): Array<TypeContributeurVo> {
    return this.typeContributeurService.typeContributeurs;
       }
set typeContributeurs(value: Array<TypeContributeurVo>) {
        this.typeContributeurService.typeContributeurs = value;
       }

 get selectedTypeContributeur(): TypeContributeurVo {
           return this.typeContributeurService.selectedTypeContributeur;
       }
    set selectedTypeContributeur(value: TypeContributeurVo) {
        this.typeContributeurService.selectedTypeContributeur = value;
       }

   get viewTypeContributeurDialog(): boolean {
           return this.typeContributeurService.viewTypeContributeurDialog;

       }
    set viewTypeContributeurDialog(value: boolean) {
        this.typeContributeurService.viewTypeContributeurDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
