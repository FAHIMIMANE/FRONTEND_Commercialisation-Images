import {Component, OnInit} from '@angular/core';
import {TypePaiementService} from 'src/app/controller/service/TypePaiement.service';
import {TypePaiementVo} from 'src/app/controller/model/TypePaiement.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-paiement-edit-contributeur',
  templateUrl: './type-paiement-edit-contributeur.component.html',
  styleUrls: ['./type-paiement-edit-contributeur.component.css']
})
export class TypePaiementEditContributeurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typePaiementService: TypePaiementService
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
    this.typePaiementService.edit().subscribe(typePaiement=>{
    const myIndex = this.typePaiements.findIndex(e => e.id === this.selectedTypePaiement.id);
    this.typePaiements[myIndex] = this.selectedTypePaiement;
    this.editTypePaiementDialog = false;
    this.selectedTypePaiement = new TypePaiementVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypePaiementDialog  = false;
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

   get editTypePaiementDialog(): boolean {
           return this.typePaiementService.editTypePaiementDialog;

       }
    set editTypePaiementDialog(value: boolean) {
        this.typePaiementService.editTypePaiementDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
