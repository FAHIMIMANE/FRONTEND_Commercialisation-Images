import {Component, OnInit} from '@angular/core';
import {TypeContributeurService} from 'src/app/controller/service/TypeContributeur.service';
import {TypeContributeurVo} from 'src/app/controller/model/TypeContributeur.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-contributeur-edit-admin',
  templateUrl: './type-contributeur-edit-admin.component.html',
  styleUrls: ['./type-contributeur-edit-admin.component.css']
})
export class TypeContributeurEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeContributeurService: TypeContributeurService
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
    this.typeContributeurService.edit().subscribe(typeContributeur=>{
    const myIndex = this.typeContributeurs.findIndex(e => e.id === this.selectedTypeContributeur.id);
    this.typeContributeurs[myIndex] = this.selectedTypeContributeur;
    this.editTypeContributeurDialog = false;
    this.selectedTypeContributeur = new TypeContributeurVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeContributeurDialog  = false;
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

   get editTypeContributeurDialog(): boolean {
           return this.typeContributeurService.editTypeContributeurDialog;

       }
    set editTypeContributeurDialog(value: boolean) {
        this.typeContributeurService.editTypeContributeurDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
