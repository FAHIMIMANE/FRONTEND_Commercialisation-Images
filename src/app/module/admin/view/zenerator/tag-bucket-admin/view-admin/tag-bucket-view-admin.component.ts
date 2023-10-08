import {Component, OnInit} from '@angular/core';
import {TagBucketService} from 'src/app/controller/service/TagBucket.service';
import {TagBucketVo} from 'src/app/controller/model/TagBucket.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {BucketVo} from 'src/app/controller/model/Bucket.model';
import {BucketService} from 'src/app/controller/service/Bucket.service';
import {TagVo} from 'src/app/controller/model/Tag.model';
import {TagService} from 'src/app/controller/service/Tag.service';

@Component({
  selector: 'app-tag-bucket-view-admin',
  templateUrl: './tag-bucket-view-admin.component.html',
  styleUrls: ['./tag-bucket-view-admin.component.css']
})
export class TagBucketViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private tagBucketService: TagBucketService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private bucketService: BucketService
    ,private tagService: TagService
) {
}

// methods
ngOnInit(): void {
    this.selectedBucket = new BucketVo();
    this.bucketService.findAll().subscribe((data) => this.buckets = data);
    this.selectedTag = new TagVo();
    this.tagService.findAll().subscribe((data) => this.tags = data);
}

hideViewDialog(){
    this.viewTagBucketDialog  = false;
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

   get viewTagBucketDialog(): boolean {
           return this.tagBucketService.viewTagBucketDialog;

       }
    set viewTagBucketDialog(value: boolean) {
        this.tagBucketService.viewTagBucketDialog= value;
       }

       get selectedTag(): TagVo {
           return this.tagService.selectedTag;
       }
      set selectedTag(value: TagVo) {
        this.tagService.selectedTag = value;
       }
       get tags():Array<TagVo> {
           return this.tagService.tags;
       }
       set tags(value: Array<TagVo>) {
        this.tagService.tags = value;
       }
       get editTagDialog(): boolean {
           return this.tagService.editTagDialog;
       }
      set editTagDialog(value: boolean) {
        this.tagService.editTagDialog= value;
       }
       get selectedBucket(): BucketVo {
           return this.bucketService.selectedBucket;
       }
      set selectedBucket(value: BucketVo) {
        this.bucketService.selectedBucket = value;
       }
       get buckets():Array<BucketVo> {
           return this.bucketService.buckets;
       }
       set buckets(value: Array<BucketVo>) {
        this.bucketService.buckets = value;
       }
       get editBucketDialog(): boolean {
           return this.bucketService.editBucketDialog;
       }
      set editBucketDialog(value: boolean) {
        this.bucketService.editBucketDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
