import {Component, OnInit, Input} from '@angular/core';
import {TagBucketService} from 'src/app/controller/service/TagBucket.service';
import {TagBucketVo} from 'src/app/controller/model/TagBucket.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {TagVo} from 'src/app/controller/model/Tag.model';
import {TagService} from 'src/app/controller/service/Tag.service';
import {BucketVo} from 'src/app/controller/model/Bucket.model';
import {BucketService} from 'src/app/controller/service/Bucket.service';
@Component({
  selector: 'app-tag-bucket-create-admin',
  templateUrl: './tag-bucket-create-admin.component.html',
  styleUrls: ['./tag-bucket-create-admin.component.css']
})
export class TagBucketCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validBucketNom = true;
    _validBucketDateCreation = true;
    _validBucketLibelle = true;
    _validBucketStateBucket = true;
    _validBucketContributeur = true;
    _validTagLibelle = true;
    _validTagCode = true;



constructor(private datePipe: DatePipe, private tagBucketService: TagBucketService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private tagService: TagService
,       private bucketService: BucketService
) {

}


// methods
ngOnInit(): void {

    this.selectedBucket = new BucketVo();
    this.bucketService.findAll().subscribe((data) => this.buckets = data);
    this.selectedTag = new TagVo();
    this.tagService.findAll().subscribe((data) => this.tags = data);
}




private setValidation(value : boolean){
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
     this.tagBucketService.save().subscribe(tagBucket=>{
       this.tagBuckets.push({...tagBucket});
       this.createTagBucketDialog = false;
       this.submitted = false;
       this.selectedTagBucket = new TagBucketVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreatetag(tag: string) {
                      const isPermistted = await this.roleService.isPermitted('Tag', 'add');
                       if(isPermistted){
         this.selectedTag = new TagVo();
        this.createTagDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatebucket(bucket: string) {
                      const isPermistted = await this.roleService.isPermitted('Bucket', 'add');
                       if(isPermistted){
         this.selectedBucket = new BucketVo();
        this.createBucketDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createTagBucketDialog  = false;
    this.setValidation(true);
}

// getters and setters

get tagBuckets(): Array<TagBucketVo> {
    return this.tagBucketService.tagBuckets;
       }
set tagBuckets(value: Array<TagBucketVo>) {
        this.tagBucketService.tagBuckets = value;
       }

 get selectedTagBucket(): TagBucketVo {
           return this.tagBucketService.selectedTagBucket;
       }
    set selectedTagBucket(value: TagBucketVo) {
        this.tagBucketService.selectedTagBucket = value;
       }

   get createTagBucketDialog(): boolean {
           return this.tagBucketService.createTagBucketDialog;

       }
    set createTagBucketDialog(value: boolean) {
        this.tagBucketService.createTagBucketDialog= value;
       }

       get selectedTag(): TagVo {
           return this.tagService.selectedTag;
       }
      set selectedTag(value: TagVo) {
        this.tagService.selectedTag = value;
       }
       get tags(): Array<TagVo> {
           return this.tagService.tags;
       }
       set tags(value: Array<TagVo>) {
        this.tagService.tags = value;
       }
       get createTagDialog(): boolean {
           return this.tagService.createTagDialog;
       }
      set createTagDialog(value: boolean) {
        this.tagService.createTagDialog= value;
       }
       get selectedBucket(): BucketVo {
           return this.bucketService.selectedBucket;
       }
      set selectedBucket(value: BucketVo) {
        this.bucketService.selectedBucket = value;
       }
       get buckets(): Array<BucketVo> {
           return this.bucketService.buckets;
       }
       set buckets(value: Array<BucketVo>) {
        this.bucketService.buckets = value;
       }
       get createBucketDialog(): boolean {
           return this.bucketService.createBucketDialog;
       }
      set createBucketDialog(value: boolean) {
        this.bucketService.createBucketDialog= value;
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
