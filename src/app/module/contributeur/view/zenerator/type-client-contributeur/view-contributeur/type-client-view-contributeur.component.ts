import {Component, OnInit} from '@angular/core';
import {TypeClientService} from 'src/app/controller/service/TypeClient.service';
import {TypeClientVo} from 'src/app/controller/model/TypeClient.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-client-view-contributeur',
  templateUrl: './type-client-view-contributeur.component.html',
  styleUrls: ['./type-client-view-contributeur.component.css']
})
export class TypeClientViewContributeurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeClientService: TypeClientService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeClientDialog  = false;
}

// getters and setters

get typeClients(): Array<TypeClientVo> {
    return this.typeClientService.typeClients;
       }
set typeClients(value: Array<TypeClientVo>) {
        this.typeClientService.typeClients = value;
       }

 get selectedTypeClient(): TypeClientVo {
           return this.typeClientService.selectedTypeClient;
       }
    set selectedTypeClient(value: TypeClientVo) {
        this.typeClientService.selectedTypeClient = value;
       }

   get viewTypeClientDialog(): boolean {
           return this.typeClientService.viewTypeClientDialog;

       }
    set viewTypeClientDialog(value: boolean) {
        this.typeClientService.viewTypeClientDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
