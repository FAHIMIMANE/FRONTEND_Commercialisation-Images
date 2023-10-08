import {Component, OnInit} from '@angular/core';
import {PaiementService} from 'src/app/controller/service/Paiement.service';
import {PaiementVo} from 'src/app/controller/model/Paiement.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {OffreReductionVo} from 'src/app/controller/model/OffreReduction.model';
import {OffreReductionService} from 'src/app/controller/service/OffreReduction.service';

@Component({
  selector: 'app-paiement-view-admin',
  templateUrl: './paiement-view-admin.component.html',
  styleUrls: ['./paiement-view-admin.component.css']
})
export class PaiementViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private paiementService: PaiementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private offreReductionService: OffreReductionService
) {
}

// methods
ngOnInit(): void {
    this.selectedOffreReduction = new OffreReductionVo();
    this.offreReductionService.findAll().subscribe((data) => this.offreReductions = data);
}

hideViewDialog(){
    this.viewPaiementDialog  = false;
}

// getters and setters

get paiements(): Array<PaiementVo> {
    return this.paiementService.paiements;
       }
set paiements(value: Array<PaiementVo>) {
        this.paiementService.paiements = value;
       }

 get selectedPaiement(): PaiementVo {
           return this.paiementService.selectedPaiement;
       }
    set selectedPaiement(value: PaiementVo) {
        this.paiementService.selectedPaiement = value;
       }

   get viewPaiementDialog(): boolean {
           return this.paiementService.viewPaiementDialog;

       }
    set viewPaiementDialog(value: boolean) {
        this.paiementService.viewPaiementDialog= value;
       }

       get selectedOffreReduction(): OffreReductionVo {
           return this.offreReductionService.selectedOffreReduction;
       }
      set selectedOffreReduction(value: OffreReductionVo) {
        this.offreReductionService.selectedOffreReduction = value;
       }
       get offreReductions():Array<OffreReductionVo> {
           return this.offreReductionService.offreReductions;
       }
       set offreReductions(value: Array<OffreReductionVo>) {
        this.offreReductionService.offreReductions = value;
       }
       get editOffreReductionDialog(): boolean {
           return this.offreReductionService.editOffreReductionDialog;
       }
      set editOffreReductionDialog(value: boolean) {
        this.offreReductionService.editOffreReductionDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
