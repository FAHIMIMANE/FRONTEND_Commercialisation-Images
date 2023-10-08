import {Component, OnInit, Input} from '@angular/core';
import {StateBucketService} from 'src/app/controller/service/StateBucket.service';
import {StateBucketVo} from 'src/app/controller/model/StateBucket.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-state-bucket-create-chercheur',
  templateUrl: './state-bucket-create-chercheur.component.html',
  styleUrls: ['./state-bucket-create-chercheur.component.css']
})
export class StateBucketCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validStateBucketCode = true;
   _validStateBucketLibelle = true;




constructor(private datePipe: DatePipe, private stateBucketService: StateBucketService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}




private setValidation(value : boolean){
    this.validStateBucketCode = value;
    this.validStateBucketLibelle = value;
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
     this.stateBucketService.save().subscribe(stateBucket=>{
       this.stateBuckets.push({...stateBucket});
       this.createStateBucketDialog = false;
       this.submitted = false;
       this.selectedStateBucket = new StateBucketVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateStateBucketCode();
this.validateStateBucketLibelle();

    }

private validateStateBucketCode(){
        if (this.stringUtilService.isEmpty(this.selectedStateBucket.code)) {
            this.errorMessages.push('Code non valide');
            this.validStateBucketCode = false;
        } else {
            this.validStateBucketCode = true;
        }
    }
private validateStateBucketLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedStateBucket.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validStateBucketLibelle = false;
        } else {
            this.validStateBucketLibelle = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createStateBucketDialog  = false;
    this.setValidation(true);
}

// getters and setters

get stateBuckets(): Array<StateBucketVo> {
    return this.stateBucketService.stateBuckets;
       }
set stateBuckets(value: Array<StateBucketVo>) {
        this.stateBucketService.stateBuckets = value;
       }

 get selectedStateBucket(): StateBucketVo {
           return this.stateBucketService.selectedStateBucket;
       }
    set selectedStateBucket(value: StateBucketVo) {
        this.stateBucketService.selectedStateBucket = value;
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

    get validStateBucketCode(): boolean {
    return this._validStateBucketCode;
    }

    set validStateBucketCode(value: boolean) {
    this._validStateBucketCode = value;
    }
    get validStateBucketLibelle(): boolean {
    return this._validStateBucketLibelle;
    }

    set validStateBucketLibelle(value: boolean) {
    this._validStateBucketLibelle = value;
    }


}
