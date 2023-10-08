import {Component, OnInit} from '@angular/core';
import {TypeContratService} from 'src/app/controller/service/TypeContrat.service';
import {TypeContratVo} from 'src/app/controller/model/TypeContrat.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-contrat-view-contributeur',
  templateUrl: './type-contrat-view-contributeur.component.html',
  styleUrls: ['./type-contrat-view-contributeur.component.css']
})
export class TypeContratViewContributeurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeContratService: TypeContratService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeContratDialog  = false;
}

// getters and setters

get typeContrats(): Array<TypeContratVo> {
    return this.typeContratService.typeContrats;
       }
set typeContrats(value: Array<TypeContratVo>) {
        this.typeContratService.typeContrats = value;
       }

 get selectedTypeContrat(): TypeContratVo {
           return this.typeContratService.selectedTypeContrat;
       }
    set selectedTypeContrat(value: TypeContratVo) {
        this.typeContratService.selectedTypeContrat = value;
       }

   get viewTypeContratDialog(): boolean {
           return this.typeContratService.viewTypeContratDialog;

       }
    set viewTypeContratDialog(value: boolean) {
        this.typeContratService.viewTypeContratDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
