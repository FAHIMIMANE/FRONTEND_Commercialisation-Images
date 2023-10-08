import {Component, OnInit} from '@angular/core';
import {OffreReductionService} from 'src/app/controller/service/OffreReduction.service';
import {OffreReductionVo} from 'src/app/controller/model/OffreReduction.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-offre-reduction-view-chercheur',
  templateUrl: './offre-reduction-view-chercheur.component.html',
  styleUrls: ['./offre-reduction-view-chercheur.component.css']
})
export class OffreReductionViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private offreReductionService: OffreReductionService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewOffreReductionDialog  = false;
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

   get viewOffreReductionDialog(): boolean {
           return this.offreReductionService.viewOffreReductionDialog;

       }
    set viewOffreReductionDialog(value: boolean) {
        this.offreReductionService.viewOffreReductionDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
