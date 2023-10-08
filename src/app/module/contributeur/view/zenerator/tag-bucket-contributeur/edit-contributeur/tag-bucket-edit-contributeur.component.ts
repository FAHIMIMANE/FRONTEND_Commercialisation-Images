import {Component, OnInit} from '@angular/core';
import {TagBucketService} from 'src/app/controller/service/TagBucket.service';
import {TagBucketVo} from 'src/app/controller/model/TagBucket.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {BucketVo} from 'src/app/controller/model/Bucket.model';
import {BucketService} from 'src/app/controller/service/Bucket.service';
import {TagVo} from 'src/app/controller/model/Tag.model';
import {TagService} from 'src/app/controller/service/Tag.service';

@Component({
  selector: 'app-tag-bucket-edit-contributeur',
  templateUrl: './tag-bucket-edit-contributeur.component.html',
  styleUrls: ['./tag-bucket-edit-contributeur.component.css']
})
export class TagBucketEditContributeurComponent implements OnInit {


constructor(private datePipe: DatePipe, private tagBucketService: TagBucketService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private bucketService: BucketService
 ,       private tagService: TagService
) {
}

// methods
ngOnInit(): void {
    this.selectedBucket = new BucketVo();
    this.bucketService.findAll().subscribe((data) => this.buckets = data);
    this.selectedTag = new TagVo();
    this.tagService.findAll().subscribe((data) => this.tags = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.tagBucketService.edit().subscribe(tagBucket=>{
    const myIndex = this.tagBuckets.findIndex(e => e.id === this.selectedTagBucket.id);
    this.tagBuckets[myIndex] = this.selectedTagBucket;
    this.editTagBucketDialog = false;
    this.selectedTagBucket = new TagBucketVo();


    }, error => {
        console.log(error);
    });

}

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

hideEditDialog(){
    this.editTagBucketDialog  = false;
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

   get editTagBucketDialog(): boolean {
           return this.tagBucketService.editTagBucketDialog;

       }
    set editTagBucketDialog(value: boolean) {
        this.tagBucketService.editTagBucketDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
