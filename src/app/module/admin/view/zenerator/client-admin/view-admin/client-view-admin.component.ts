import {Component, OnInit} from '@angular/core';
import {ClientService} from 'src/app/controller/service/Client.service';
import {ClientVo} from 'src/app/controller/model/Client.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {BucketVo} from 'src/app/controller/model/Bucket.model';
import {BucketService} from 'src/app/controller/service/Bucket.service';
import {TypeImageVo} from 'src/app/controller/model/TypeImage.model';
import {TypeImageService} from 'src/app/controller/service/TypeImage.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {ImageService} from 'src/app/controller/service/Image.service';

@Component({
  selector: 'app-client-view-admin',
  templateUrl: './client-view-admin.component.html',
  styleUrls: ['./client-view-admin.component.css']
})
export class ClientViewAdminComponent implements OnInit {

        selectedImages: ImageVo = new ImageVo();
        imagesListe: Array<ImageVo> = [];

        myBuckets: Array<BucketVo> = [];
        myTypeImages: Array<TypeImageVo> = [];


constructor(private datePipe: DatePipe, private clientService: ClientService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private bucketService: BucketService
    ,private typeImageService: TypeImageService
    ,private imageService: ImageService
) {
}

// methods
ngOnInit(): void {
                this.selectedImages.bucketVo = new BucketVo();
                this.bucketService.findAll().subscribe((data) => this.buckets = data);
                this.selectedImages.typeImageVo = new TypeImageVo();
                this.typeImageService.findAll().subscribe((data) => this.typeImages = data);
}

hideViewDialog(){
    this.viewClientDialog  = false;
}

// getters and setters

get clients(): Array<ClientVo> {
    return this.clientService.clients;
       }
set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }

 get selectedClient(): ClientVo {
           return this.clientService.selectedClient;
       }
    set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }

   get viewClientDialog(): boolean {
           return this.clientService.viewClientDialog;

       }
    set viewClientDialog(value: boolean) {
        this.clientService.viewClientDialog= value;
       }

       get selectedTypeImage(): TypeImageVo {
           return this.typeImageService.selectedTypeImage;
       }
      set selectedTypeImage(value: TypeImageVo) {
        this.typeImageService.selectedTypeImage = value;
       }
       get typeImages():Array<TypeImageVo> {
           return this.typeImageService.typeImages;
       }
       set typeImages(value: Array<TypeImageVo>) {
        this.typeImageService.typeImages = value;
       }
       get editTypeImageDialog(): boolean {
           return this.typeImageService.editTypeImageDialog;
       }
      set editTypeImageDialog(value: boolean) {
        this.typeImageService.editTypeImageDialog= value;
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
