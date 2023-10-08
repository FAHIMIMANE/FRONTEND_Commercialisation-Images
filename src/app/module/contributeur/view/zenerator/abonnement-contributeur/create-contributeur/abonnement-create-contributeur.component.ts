import {Component, OnInit, Input} from '@angular/core';
import {AbonnementService} from 'src/app/controller/service/Abonnement.service';
import {AbonnementVo} from 'src/app/controller/model/Abonnement.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {EtatAbonnementVo} from 'src/app/controller/model/EtatAbonnement.model';
import {EtatAbonnementService} from 'src/app/controller/service/EtatAbonnement.service';
import {PackAbonnementVo} from 'src/app/controller/model/PackAbonnement.model';
import {PackAbonnementService} from 'src/app/controller/service/PackAbonnement.service';
import {ClientVo} from 'src/app/controller/model/Client.model';
import {ClientService} from 'src/app/controller/service/Client.service';
@Component({
  selector: 'app-abonnement-create-contributeur',
  templateUrl: './abonnement-create-contributeur.component.html',
  styleUrls: ['./abonnement-create-contributeur.component.css']
})
export class AbonnementCreateContributeurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validAbonnementDateDebut = true;
   _validAbonnementDateFin = true;
   _validAbonnementTarif = true;
   _validAbonnementEtatAbonnement = true;
   _validAbonnementReduction = true;

    _validEtatAbonnementLibelle = true;
    _validEtatAbonnementCode = true;
    _validClientNumeroMatricule = true;
    _validClientNumeroDeTel = true;
    _validClientImages = true;
    _validClientCodePostal = true;
    _validClientRib = true;
    _validPackAbonnementNombreImageMax = true;
    _validPackAbonnementReduction = true;
    _validPackAbonnementDateMin = true;
    _validPackAbonnementDateMax = true;



constructor(private datePipe: DatePipe, private abonnementService: AbonnementService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private etatAbonnementService: EtatAbonnementService
,       private packAbonnementService: PackAbonnementService
,       private clientService: ClientService
) {

}


// methods
ngOnInit(): void {

    this.selectedEtatAbonnement = new EtatAbonnementVo();
    this.etatAbonnementService.findAll().subscribe((data) => this.etatAbonnements = data);
    this.selectedClient = new ClientVo();
    this.clientService.findAll().subscribe((data) => this.clients = data);
    this.selectedPackAbonnement = new PackAbonnementVo();
    this.packAbonnementService.findAll().subscribe((data) => this.packAbonnements = data);
}




private setValidation(value : boolean){
    this.validAbonnementDateDebut = value;
    this.validAbonnementDateFin = value;
    this.validAbonnementTarif = value;
    this.validAbonnementEtatAbonnement = value;
    this.validAbonnementReduction = value;
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.abonnementService.save().subscribe(abonnement=>{
       this.abonnements.push({...abonnement});
       this.createAbonnementDialog = false;
       this.submitted = false;
       this.selectedAbonnement = new AbonnementVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateAbonnementDateDebut();
this.validateAbonnementDateFin();
this.validateAbonnementTarif();
this.validateAbonnementEtatAbonnement();
this.validateAbonnementReduction();

    }

private validateAbonnementDateDebut(){
        if (this.stringUtilService.isEmpty(this.selectedAbonnement.dateDebut)) {
            this.errorMessages.push('Date debut non valide');
            this.validAbonnementDateDebut = false;
        } else {
            this.validAbonnementDateDebut = true;
        }
    }
private validateAbonnementDateFin(){
        if (this.stringUtilService.isEmpty(this.selectedAbonnement.dateFin)) {
            this.errorMessages.push('Date fin non valide');
            this.validAbonnementDateFin = false;
        } else {
            this.validAbonnementDateFin = true;
        }
    }
private validateAbonnementTarif(){
        if (this.stringUtilService.isEmpty(this.selectedAbonnement.tarif)) {
            this.errorMessages.push('Tarif non valide');
            this.validAbonnementTarif = false;
        } else {
            this.validAbonnementTarif = true;
        }
    }
private validateAbonnementEtatAbonnement(){
        if (this.stringUtilService.isEmpty(this.selectedAbonnement.etatAbonnementVo)) {
            this.errorMessages.push('Etat abonnement non valide');
            this.validAbonnementEtatAbonnement = false;
        } else {
            this.validAbonnementEtatAbonnement = true;
        }
    }
private validateAbonnementReduction(){
        if (this.stringUtilService.isEmpty(this.selectedAbonnement.reduction)) {
            this.errorMessages.push('Reduction non valide');
            this.validAbonnementReduction = false;
        } else {
            this.validAbonnementReduction = true;
        }
    }











//openPopup
              public async openCreateclient(client: string) {
                      const isPermistted = await this.roleService.isPermitted('Client', 'add');
                       if(isPermistted){
         this.selectedClient = new ClientVo();
        this.createClientDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepackAbonnement(packAbonnement: string) {
                      const isPermistted = await this.roleService.isPermitted('PackAbonnement', 'add');
                       if(isPermistted){
         this.selectedPackAbonnement = new PackAbonnementVo();
        this.createPackAbonnementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatAbonnement(etatAbonnement: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatAbonnement', 'add');
                       if(isPermistted){
         this.selectedEtatAbonnement = new EtatAbonnementVo();
        this.createEtatAbonnementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createAbonnementDialog  = false;
    this.setValidation(true);
}

// getters and setters

get abonnements(): Array<AbonnementVo> {
    return this.abonnementService.abonnements;
       }
set abonnements(value: Array<AbonnementVo>) {
        this.abonnementService.abonnements = value;
       }

 get selectedAbonnement(): AbonnementVo {
           return this.abonnementService.selectedAbonnement;
       }
    set selectedAbonnement(value: AbonnementVo) {
        this.abonnementService.selectedAbonnement = value;
       }

   get createAbonnementDialog(): boolean {
           return this.abonnementService.createAbonnementDialog;

       }
    set createAbonnementDialog(value: boolean) {
        this.abonnementService.createAbonnementDialog= value;
       }

       get selectedClient(): ClientVo {
           return this.clientService.selectedClient;
       }
      set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }
       get clients(): Array<ClientVo> {
           return this.clientService.clients;
       }
       set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }
       get createClientDialog(): boolean {
           return this.clientService.createClientDialog;
       }
      set createClientDialog(value: boolean) {
        this.clientService.createClientDialog= value;
       }
       get selectedPackAbonnement(): PackAbonnementVo {
           return this.packAbonnementService.selectedPackAbonnement;
       }
      set selectedPackAbonnement(value: PackAbonnementVo) {
        this.packAbonnementService.selectedPackAbonnement = value;
       }
       get packAbonnements(): Array<PackAbonnementVo> {
           return this.packAbonnementService.packAbonnements;
       }
       set packAbonnements(value: Array<PackAbonnementVo>) {
        this.packAbonnementService.packAbonnements = value;
       }
       get createPackAbonnementDialog(): boolean {
           return this.packAbonnementService.createPackAbonnementDialog;
       }
      set createPackAbonnementDialog(value: boolean) {
        this.packAbonnementService.createPackAbonnementDialog= value;
       }
       get selectedEtatAbonnement(): EtatAbonnementVo {
           return this.etatAbonnementService.selectedEtatAbonnement;
       }
      set selectedEtatAbonnement(value: EtatAbonnementVo) {
        this.etatAbonnementService.selectedEtatAbonnement = value;
       }
       get etatAbonnements(): Array<EtatAbonnementVo> {
           return this.etatAbonnementService.etatAbonnements;
       }
       set etatAbonnements(value: Array<EtatAbonnementVo>) {
        this.etatAbonnementService.etatAbonnements = value;
       }
       get createEtatAbonnementDialog(): boolean {
           return this.etatAbonnementService.createEtatAbonnementDialog;
       }
      set createEtatAbonnementDialog(value: boolean) {
        this.etatAbonnementService.createEtatAbonnementDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validAbonnementDateDebut(): boolean {
    return this._validAbonnementDateDebut;
    }

    set validAbonnementDateDebut(value: boolean) {
    this._validAbonnementDateDebut = value;
    }
    get validAbonnementDateFin(): boolean {
    return this._validAbonnementDateFin;
    }

    set validAbonnementDateFin(value: boolean) {
    this._validAbonnementDateFin = value;
    }
    get validAbonnementTarif(): boolean {
    return this._validAbonnementTarif;
    }

    set validAbonnementTarif(value: boolean) {
    this._validAbonnementTarif = value;
    }
    get validAbonnementEtatAbonnement(): boolean {
    return this._validAbonnementEtatAbonnement;
    }

    set validAbonnementEtatAbonnement(value: boolean) {
    this._validAbonnementEtatAbonnement = value;
    }
    get validAbonnementReduction(): boolean {
    return this._validAbonnementReduction;
    }

    set validAbonnementReduction(value: boolean) {
    this._validAbonnementReduction = value;
    }

    get validEtatAbonnementLibelle(): boolean {
    return this._validEtatAbonnementLibelle;
    }

    set validEtatAbonnementLibelle(value: boolean) {
    this._validEtatAbonnementLibelle = value;
    }
    get validEtatAbonnementCode(): boolean {
    return this._validEtatAbonnementCode;
    }

    set validEtatAbonnementCode(value: boolean) {
    this._validEtatAbonnementCode = value;
    }
    get validClientNumeroMatricule(): boolean {
    return this._validClientNumeroMatricule;
    }

    set validClientNumeroMatricule(value: boolean) {
    this._validClientNumeroMatricule = value;
    }
    get validClientNumeroDeTel(): boolean {
    return this._validClientNumeroDeTel;
    }

    set validClientNumeroDeTel(value: boolean) {
    this._validClientNumeroDeTel = value;
    }
    get validClientImages(): boolean {
    return this._validClientImages;
    }

    set validClientImages(value: boolean) {
    this._validClientImages = value;
    }
    get validClientCodePostal(): boolean {
    return this._validClientCodePostal;
    }

    set validClientCodePostal(value: boolean) {
    this._validClientCodePostal = value;
    }
    get validClientRib(): boolean {
    return this._validClientRib;
    }

    set validClientRib(value: boolean) {
    this._validClientRib = value;
    }
    get validPackAbonnementNombreImageMax(): boolean {
    return this._validPackAbonnementNombreImageMax;
    }

    set validPackAbonnementNombreImageMax(value: boolean) {
    this._validPackAbonnementNombreImageMax = value;
    }
    get validPackAbonnementReduction(): boolean {
    return this._validPackAbonnementReduction;
    }

    set validPackAbonnementReduction(value: boolean) {
    this._validPackAbonnementReduction = value;
    }
    get validPackAbonnementDateMin(): boolean {
    return this._validPackAbonnementDateMin;
    }

    set validPackAbonnementDateMin(value: boolean) {
    this._validPackAbonnementDateMin = value;
    }
    get validPackAbonnementDateMax(): boolean {
    return this._validPackAbonnementDateMax;
    }

    set validPackAbonnementDateMax(value: boolean) {
    this._validPackAbonnementDateMax = value;
    }

}
