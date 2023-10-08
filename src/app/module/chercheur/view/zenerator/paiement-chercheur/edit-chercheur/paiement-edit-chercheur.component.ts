import {Component, OnInit} from '@angular/core';
import {PaiementService} from 'src/app/controller/service/Paiement.service';
import {PaiementVo} from 'src/app/controller/model/Paiement.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {OffreReductionVo} from 'src/app/controller/model/OffreReduction.model';
import {OffreReductionService} from 'src/app/controller/service/OffreReduction.service';

@Component({
  selector: 'app-paiement-edit-chercheur',
  templateUrl: './paiement-edit-chercheur.component.html',
  styleUrls: ['./paiement-edit-chercheur.component.css']
})
export class PaiementEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private paiementService: PaiementService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private offreReductionService: OffreReductionService
) {
}

// methods
ngOnInit(): void {
    this.selectedOffreReduction = new OffreReductionVo();
    this.offreReductionService.findAll().subscribe((data) => this.offreReductions = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedPaiement.datePaiement = DateUtils.toDate(this.selectedPaiement.datePaiement);
    this.paiementService.edit().subscribe(paiement=>{
    const myIndex = this.paiements.findIndex(e => e.id === this.selectedPaiement.id);
    this.paiements[myIndex] = this.selectedPaiement;
    this.editPaiementDialog = false;
    this.selectedPaiement = new PaiementVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateoffreReduction(offreReduction: string) {
                      const isPermistted = await this.roleService.isPermitted('OffreReduction', 'add');
                       if(isPermistted){
         this.selectedOffreReduction = new OffreReductionVo();
        this.createOffreReductionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editPaiementDialog  = false;
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

   get editPaiementDialog(): boolean {
           return this.paiementService.editPaiementDialog;

       }
    set editPaiementDialog(value: boolean) {
        this.paiementService.editPaiementDialog = value;
       }

       get selectedOffreReduction(): OffreReductionVo {
           return this.offreReductionService.selectedOffreReduction;
       }
      set selectedOffreReduction(value: OffreReductionVo) {
        this.offreReductionService.selectedOffreReduction = value;
       }
       get offreReductions(): Array<OffreReductionVo> {
           return this.offreReductionService.offreReductions;
       }
       set offreReductions(value: Array<OffreReductionVo>) {
        this.offreReductionService.offreReductions = value;
       }
       get createOffreReductionDialog(): boolean {
           return this.offreReductionService.createOffreReductionDialog;
       }
      set createOffreReductionDialog(value: boolean) {
        this.offreReductionService.createOffreReductionDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
