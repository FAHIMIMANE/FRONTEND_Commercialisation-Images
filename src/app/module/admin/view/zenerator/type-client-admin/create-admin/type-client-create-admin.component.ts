import {Component, OnInit, Input} from '@angular/core';
import {TypeClientService} from 'src/app/controller/service/TypeClient.service';
import {TypeClientVo} from 'src/app/controller/model/TypeClient.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-type-client-create-admin',
  templateUrl: './type-client-create-admin.component.html',
  styleUrls: ['./type-client-create-admin.component.css']
})
export class TypeClientCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeClientLibelle = true;
   _validTypeClientCode = true;




constructor(private datePipe: DatePipe, private typeClientService: TypeClientService
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
    this.validTypeClientLibelle = value;
    this.validTypeClientCode = value;
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
     this.typeClientService.save().subscribe(typeClient=>{
       this.typeClients.push({...typeClient});
       this.createTypeClientDialog = false;
       this.submitted = false;
       this.selectedTypeClient = new TypeClientVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeClientLibelle();
this.validateTypeClientCode();

    }

private validateTypeClientLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeClient.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeClientLibelle = false;
        } else {
            this.validTypeClientLibelle = true;
        }
    }
private validateTypeClientCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeClient.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeClientCode = false;
        } else {
            this.validTypeClientCode = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createTypeClientDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeClients(): Array<TypeClientVo> {
    return this.typeClientService.typeClients;
       }
set typeClients(value: Array<TypeClientVo>) {
        this.typeClientService.typeClients = value;
       }

 get selectedTypeClient(): TypeClientVo {
           return this.typeClientService.selectedTypeClient;
       }
    set selectedTypeClient(value: TypeClientVo) {
        this.typeClientService.selectedTypeClient = value;
       }

   get createTypeClientDialog(): boolean {
           return this.typeClientService.createTypeClientDialog;

       }
    set createTypeClientDialog(value: boolean) {
        this.typeClientService.createTypeClientDialog= value;
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

    get validTypeClientLibelle(): boolean {
    return this._validTypeClientLibelle;
    }

    set validTypeClientLibelle(value: boolean) {
    this._validTypeClientLibelle = value;
    }
    get validTypeClientCode(): boolean {
    return this._validTypeClientCode;
    }

    set validTypeClientCode(value: boolean) {
    this._validTypeClientCode = value;
    }


}
