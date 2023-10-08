import {Component, OnInit} from '@angular/core';
import {TypeContratService} from 'src/app/controller/service/TypeContrat.service';
import {TypeContratVo} from 'src/app/controller/model/TypeContrat.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-contrat-edit-client',
  templateUrl: './type-contrat-edit-client.component.html',
  styleUrls: ['./type-contrat-edit-client.component.css']
})
export class TypeContratEditClientComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeContratService: TypeContratService
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
    this.typeContratService.edit().subscribe(typeContrat=>{
    const myIndex = this.typeContrats.findIndex(e => e.id === this.selectedTypeContrat.id);
    this.typeContrats[myIndex] = this.selectedTypeContrat;
    this.editTypeContratDialog = false;
    this.selectedTypeContrat = new TypeContratVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeContratDialog  = false;
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

   get editTypeContratDialog(): boolean {
           return this.typeContratService.editTypeContratDialog;

       }
    set editTypeContratDialog(value: boolean) {
        this.typeContratService.editTypeContratDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
