import {Component, OnInit, Input} from '@angular/core';
import {ContributeurService} from 'src/app/controller/service/Contributeur.service';
import {ContributeurVo} from 'src/app/controller/model/Contributeur.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {BucketVo} from 'src/app/controller/model/Bucket.model';
import {BucketService} from 'src/app/controller/service/Bucket.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {ImageService} from 'src/app/controller/service/Image.service';
import {StateBucketVo} from 'src/app/controller/model/StateBucket.model';
import {StateBucketService} from 'src/app/controller/service/StateBucket.service';
@Component({
  selector: 'app-contributeur-create-chercheur',
  templateUrl: './contributeur-create-chercheur.component.html',
  styleUrls: ['./contributeur-create-chercheur.component.css']
})
export class ContributeurCreateChercheurComponent implements OnInit {

        selectedBuckets: BucketVo = new BucketVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validContributeurNumeroMatricule = true;
   _validContributeurPrenom = true;
   _validContributeurNom = true;
   _validContributeurCin = true;
   _validContributeurNumeroTelephone = true;
   _validContributeurAdresse = true;
   _validContributeurCodePostale = true;

    _validBucketNom = true;
    _validBucketDateCreation = true;
    _validBucketLibelle = true;
    _validBucketStateBucket = true;
    _validBucketContributeur = true;



constructor(private datePipe: DatePipe, private contributeurService: ContributeurService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private bucketService: BucketService
,       private stateBucketService: StateBucketService
) {

}


// methods
ngOnInit(): void {


                this.selectedBuckets.stateBucketVo = new StateBucketVo();
                this.stateBucketService.findAll().subscribe((data) => this.stateBuckets = data);


}


    validateBuckets(){
    this.errorMessages = new Array();
    this.validateBucketNom();
    this.validateBucketDateCreation();
    this.validateBucketLibelle();
    this.validateBucketStateBucket();
    this.validateBucketContributeur();
    }


private setValidation(value : boolean){
    this.validContributeurNumeroMatricule = value;
    this.validContributeurPrenom = value;
    this.validContributeurNom = value;
    this.validContributeurCin = value;
    this.validContributeurNumeroTelephone = value;
    this.validContributeurAdresse = value;
    this.validContributeurCodePostale = value;
    this.validBucketNom = value;
    this.validBucketDateCreation = value;
    this.validBucketLibelle = value;
    this.validBucketStateBucket = value;
    this.validBucketContributeur = value;
    }

        addBuckets() {
        if( this.selectedContributeur.bucketsVo == null ){
            this.selectedContributeur.bucketsVo = new Array<BucketVo>();
        }
       this.validateBuckets();
       if (this.errorMessages.length === 0) {
              this.selectedContributeur.bucketsVo.push(this.selectedBuckets);
              this.selectedBuckets = new BucketVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteBuckets(p: BucketVo) {
        this.selectedContributeur.bucketsVo.forEach((element, index) => {
            if (element === p) { this.selectedContributeur.bucketsVo.splice(index, 1); }
        });
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
     this.contributeurService.save().subscribe(contributeur=>{
       this.contributeurs.push({...contributeur});
       this.createContributeurDialog = false;
       this.submitted = false;
       this.selectedContributeur = new ContributeurVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateContributeurNumeroMatricule();
this.validateContributeurPrenom();
this.validateContributeurNom();
this.validateContributeurCin();
this.validateContributeurNumeroTelephone();
this.validateContributeurAdresse();
this.validateContributeurCodePostale();

    }

private validateContributeurNumeroMatricule(){
        if (this.stringUtilService.isEmpty(this.selectedContributeur.numeroMatricule)) {
            this.errorMessages.push('Numero matricule non valide');
            this.validContributeurNumeroMatricule = false;
        } else {
            this.validContributeurNumeroMatricule = true;
        }
    }
private validateContributeurPrenom(){
        if (this.stringUtilService.isEmpty(this.selectedContributeur.prenom)) {
            this.errorMessages.push('Prenom non valide');
            this.validContributeurPrenom = false;
        } else {
            this.validContributeurPrenom = true;
        }
    }
private validateContributeurNom(){
        if (this.stringUtilService.isEmpty(this.selectedContributeur.nom)) {
            this.errorMessages.push('Nom non valide');
            this.validContributeurNom = false;
        } else {
            this.validContributeurNom = true;
        }
    }
private validateContributeurCin(){
        if (this.stringUtilService.isEmpty(this.selectedContributeur.cin)) {
            this.errorMessages.push('Cin non valide');
            this.validContributeurCin = false;
        } else {
            this.validContributeurCin = true;
        }
    }
private validateContributeurNumeroTelephone(){
        if (this.stringUtilService.isEmpty(this.selectedContributeur.numeroTelephone)) {
            this.errorMessages.push('Numero telephone non valide');
            this.validContributeurNumeroTelephone = false;
        } else {
            this.validContributeurNumeroTelephone = true;
        }
    }
private validateContributeurAdresse(){
        if (this.stringUtilService.isEmpty(this.selectedContributeur.adresse)) {
            this.errorMessages.push('Adresse non valide');
            this.validContributeurAdresse = false;
        } else {
            this.validContributeurAdresse = true;
        }
    }
private validateContributeurCodePostale(){
        if (this.stringUtilService.isEmpty(this.selectedContributeur.codePostale)) {
            this.errorMessages.push('Code postale non valide');
            this.validContributeurCodePostale = false;
        } else {
            this.validContributeurCodePostale = true;
        }
    }
























            private validateBucketNom(){
            if (this.selectedBuckets.nom == null) {
            this.errorMessages.push('Nom de la bucket est  invalide');
             this.validBucketNom = false;
            } else {
            this.validBucketNom = true;
            }
            }

            private validateBucketDateCreation(){
            if (this.selectedBuckets.dateCreation == null) {
            this.errorMessages.push('DateCreation de la bucket est  invalide');
             this.validBucketDateCreation = false;
            } else {
            this.validBucketDateCreation = true;
            }
            }

            private validateBucketLibelle(){
            if (this.selectedBuckets.libelle == null) {
            this.errorMessages.push('Libelle de la bucket est  invalide');
             this.validBucketLibelle = false;
            } else {
            this.validBucketLibelle = true;
            }
            }

            private validateBucketStateBucket(){
            if (this.selectedBuckets.stateBucketVo == null) {
            this.errorMessages.push('StateBucket de la bucket est  invalide');
             this.validBucketStateBucket = false;
            } else {
            this.validBucketStateBucket = true;
            }
            }

            private validateBucketContributeur(){
            if (this.selectedBuckets.contributeurVo == null) {
            this.errorMessages.push('Contributeur de la bucket est  invalide');
             this.validBucketContributeur = false;
            } else {
            this.validBucketContributeur = true;
            }
            }



//openPopup
              public async openCreatestateBucket(stateBucket: string) {
                      const isPermistted = await this.roleService.isPermitted('StateBucket', 'add');
                       if(isPermistted){
         this.selectedStateBucket = new StateBucketVo();
        this.createStateBucketDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createContributeurDialog  = false;
    this.setValidation(true);
}

// getters and setters

get contributeurs(): Array<ContributeurVo> {
    return this.contributeurService.contributeurs;
       }
set contributeurs(value: Array<ContributeurVo>) {
        this.contributeurService.contributeurs = value;
       }

 get selectedContributeur(): ContributeurVo {
           return this.contributeurService.selectedContributeur;
       }
    set selectedContributeur(value: ContributeurVo) {
        this.contributeurService.selectedContributeur = value;
       }

   get createContributeurDialog(): boolean {
           return this.contributeurService.createContributeurDialog;

       }
    set createContributeurDialog(value: boolean) {
        this.contributeurService.createContributeurDialog= value;
       }

       get selectedStateBucket(): StateBucketVo {
           return this.stateBucketService.selectedStateBucket;
       }
      set selectedStateBucket(value: StateBucketVo) {
        this.stateBucketService.selectedStateBucket = value;
       }
       get stateBuckets(): Array<StateBucketVo> {
           return this.stateBucketService.stateBuckets;
       }
       set stateBuckets(value: Array<StateBucketVo>) {
        this.stateBucketService.stateBuckets = value;
       }
       get createStateBucketDialog(): boolean {
           return this.stateBucketService.createStateBucketDialog;
       }
      set createStateBucketDialog(value: boolean) {
        this.stateBucketService.createStateBucketDialog= value;
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

    get validContributeurNumeroMatricule(): boolean {
    return this._validContributeurNumeroMatricule;
    }

    set validContributeurNumeroMatricule(value: boolean) {
    this._validContributeurNumeroMatricule = value;
    }
    get validContributeurPrenom(): boolean {
    return this._validContributeurPrenom;
    }

    set validContributeurPrenom(value: boolean) {
    this._validContributeurPrenom = value;
    }
    get validContributeurNom(): boolean {
    return this._validContributeurNom;
    }

    set validContributeurNom(value: boolean) {
    this._validContributeurNom = value;
    }
    get validContributeurCin(): boolean {
    return this._validContributeurCin;
    }

    set validContributeurCin(value: boolean) {
    this._validContributeurCin = value;
    }
    get validContributeurNumeroTelephone(): boolean {
    return this._validContributeurNumeroTelephone;
    }

    set validContributeurNumeroTelephone(value: boolean) {
    this._validContributeurNumeroTelephone = value;
    }
    get validContributeurAdresse(): boolean {
    return this._validContributeurAdresse;
    }

    set validContributeurAdresse(value: boolean) {
    this._validContributeurAdresse = value;
    }
    get validContributeurCodePostale(): boolean {
    return this._validContributeurCodePostale;
    }

    set validContributeurCodePostale(value: boolean) {
    this._validContributeurCodePostale = value;
    }

    get validBucketNom(): boolean {
    return this._validBucketNom;
    }

    set validBucketNom(value: boolean) {
    this._validBucketNom = value;
    }
    get validBucketDateCreation(): boolean {
    return this._validBucketDateCreation;
    }

    set validBucketDateCreation(value: boolean) {
    this._validBucketDateCreation = value;
    }
    get validBucketLibelle(): boolean {
    return this._validBucketLibelle;
    }

    set validBucketLibelle(value: boolean) {
    this._validBucketLibelle = value;
    }
    get validBucketStateBucket(): boolean {
    return this._validBucketStateBucket;
    }

    set validBucketStateBucket(value: boolean) {
    this._validBucketStateBucket = value;
    }
    get validBucketContributeur(): boolean {
    return this._validBucketContributeur;
    }

    set validBucketContributeur(value: boolean) {
    this._validBucketContributeur = value;
    }

}
