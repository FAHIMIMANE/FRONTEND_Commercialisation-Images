import {Component, OnInit, Input} from '@angular/core';
import {TagService} from 'src/app/controller/service/Tag.service';
import {TagVo} from 'src/app/controller/model/Tag.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-tag-create-chercheur',
  templateUrl: './tag-create-chercheur.component.html',
  styleUrls: ['./tag-create-chercheur.component.css']
})
export class TagCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTagLibelle = true;
   _validTagCode = true;




constructor(private datePipe: DatePipe, private tagService: TagService
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
    this.validTagLibelle = value;
    this.validTagCode = value;
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
     this.tagService.save().subscribe(tag=>{
       this.tags.push({...tag});
       this.createTagDialog = false;
       this.submitted = false;
       this.selectedTag = new TagVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTagLibelle();
this.validateTagCode();

    }

private validateTagLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTag.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTagLibelle = false;
        } else {
            this.validTagLibelle = true;
        }
    }
private validateTagCode(){
        if (this.stringUtilService.isEmpty(this.selectedTag.code)) {
            this.errorMessages.push('Code non valide');
            this.validTagCode = false;
        } else {
            this.validTagCode = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createTagDialog  = false;
    this.setValidation(true);
}

// getters and setters

get tags(): Array<TagVo> {
    return this.tagService.tags;
       }
set tags(value: Array<TagVo>) {
        this.tagService.tags = value;
       }

 get selectedTag(): TagVo {
           return this.tagService.selectedTag;
       }
    set selectedTag(value: TagVo) {
        this.tagService.selectedTag = value;
       }

   get createTagDialog(): boolean {
           return this.tagService.createTagDialog;

       }
    set createTagDialog(value: boolean) {
        this.tagService.createTagDialog= value;
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

    get validTagLibelle(): boolean {
    return this._validTagLibelle;
    }

    set validTagLibelle(value: boolean) {
    this._validTagLibelle = value;
    }
    get validTagCode(): boolean {
    return this._validTagCode;
    }

    set validTagCode(value: boolean) {
    this._validTagCode = value;
    }


}
