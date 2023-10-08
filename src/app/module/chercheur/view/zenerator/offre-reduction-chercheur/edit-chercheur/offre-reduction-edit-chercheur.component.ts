import {Component, OnInit} from '@angular/core';
import {OffreReductionService} from 'src/app/controller/service/OffreReduction.service';
import {OffreReductionVo} from 'src/app/controller/model/OffreReduction.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-offre-reduction-edit-chercheur',
  templateUrl: './offre-reduction-edit-chercheur.component.html',
  styleUrls: ['./offre-reduction-edit-chercheur.component.css']
})
export class OffreReductionEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private offreReductionService: OffreReductionService
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
            this.selectedOffreReduction.dateMin = DateUtils.toDate(this.selectedOffreReduction.dateMin);
            this.selectedOffreReduction.dateMax = DateUtils.toDate(this.selectedOffreReduction.dateMax);
    this.offreReductionService.edit().subscribe(offreReduction=>{
    const myIndex = this.offreReductions.findIndex(e => e.id === this.selectedOffreReduction.id);
    this.offreReductions[myIndex] = this.selectedOffreReduction;
    this.editOffreReductionDialog = false;
    this.selectedOffreReduction = new OffreReductionVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editOffreReductionDialog  = false;
}

// getters and setters

get offreReductions(): Array<OffreReductionVo> {
    return this.offreReductionService.offreReductions;
       }
set offreReductions(value: Array<OffreReductionVo>) {
        this.offreReductionService.offreReductions = value;
       }

 get selectedOffreReduction(): OffreReductionVo {
           return this.offreReductionService.selectedOffreReduction;
       }
    set selectedOffreReduction(value: OffreReductionVo) {
        this.offreReductionService.selectedOffreReduction = value;
       }

   get editOffreReductionDialog(): boolean {
           return this.offreReductionService.editOffreReductionDialog;

       }
    set editOffreReductionDialog(value: boolean) {
        this.offreReductionService.editOffreReductionDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
