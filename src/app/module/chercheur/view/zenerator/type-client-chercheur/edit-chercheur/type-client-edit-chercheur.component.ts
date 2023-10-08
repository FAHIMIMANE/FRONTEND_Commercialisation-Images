import {Component, OnInit} from '@angular/core';
import {TypeClientService} from 'src/app/controller/service/TypeClient.service';
import {TypeClientVo} from 'src/app/controller/model/TypeClient.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-client-edit-chercheur',
  templateUrl: './type-client-edit-chercheur.component.html',
  styleUrls: ['./type-client-edit-chercheur.component.css']
})
export class TypeClientEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeClientService: TypeClientService
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
    this.typeClientService.edit().subscribe(typeClient=>{
    const myIndex = this.typeClients.findIndex(e => e.id === this.selectedTypeClient.id);
    this.typeClients[myIndex] = this.selectedTypeClient;
    this.editTypeClientDialog = false;
    this.selectedTypeClient = new TypeClientVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeClientDialog  = false;
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

   get editTypeClientDialog(): boolean {
           return this.typeClientService.editTypeClientDialog;

       }
    set editTypeClientDialog(value: boolean) {
        this.typeClientService.editTypeClientDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
