import {Component, OnInit} from '@angular/core';
import {ClientService} from 'src/app/controller/service/Client.service';
import {ClientVo} from 'src/app/controller/model/Client.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {BucketVo} from 'src/app/controller/model/Bucket.model';
import {BucketService} from 'src/app/controller/service/Bucket.service';
import {TypeImageVo} from 'src/app/controller/model/TypeImage.model';
import {TypeImageService} from 'src/app/controller/service/TypeImage.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {ImageService} from 'src/app/controller/service/Image.service';

@Component({
  selector: 'app-client-edit-admin',
  templateUrl: './client-edit-admin.component.html',
  styleUrls: ['./client-edit-admin.component.css']
})
export class ClientEditAdminComponent implements OnInit {

        selectedImages: ImageVo = new ImageVo();
        imagesListe: Array<ImageVo> = [];

        myBuckets: Array<BucketVo> = [];
        myTypeImages: Array<TypeImageVo> = [];


constructor(private datePipe: DatePipe, private clientService: ClientService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private bucketService: BucketService
 ,       private typeImageService: TypeImageService
 ,       private imageService: ImageService
) {
}

// methods
ngOnInit(): void {
                this.selectedImages.bucketVo = new BucketVo();
                this.bucketService.findAll().subscribe((data) => this.buckets = data);
                this.selectedImages.typeImageVo = new TypeImageVo();
                this.typeImageService.findAll().subscribe((data) => this.typeImages = data);
}
        addImages() {
        if( this.selectedClient.imagesVo == null ){
            this.selectedClient.imagesVo = new Array<ImageVo>();
        }
        this.selectedClient.imagesVo.push(this.selectedImages);
        this.selectedImages = new ImageVo();
        }

       deleteImages(p: ImageVo) {
        this.selectedClient.imagesVo.forEach((element, index) => {
            if (element === p) { this.selectedClient.imagesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedClient.createdAt = DateUtils.toDate(this.selectedClient.createdAt);
            this.selectedClient.updatedAt = DateUtils.toDate(this.selectedClient.updatedAt);
    this.clientService.edit().subscribe(client=>{
    const myIndex = this.clients.findIndex(e => e.id === this.selectedClient.id);
    this.clients[myIndex] = this.selectedClient;
    this.editClientDialog = false;
    this.selectedClient = new ClientVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatetypeImage(typeImage: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeImage', 'add');
                       if(isPermistted){
         this.selectedTypeImage = new TypeImageVo();
        this.createTypeImageDialog = true;
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
    this.editClientDialog  = false;
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

   get editClientDialog(): boolean {
           return this.clientService.editClientDialog;

       }
    set editClientDialog(value: boolean) {
        this.clientService.editClientDialog = value;
       }

       get selectedTypeImage(): TypeImageVo {
           return this.typeImageService.selectedTypeImage;
       }
      set selectedTypeImage(value: TypeImageVo) {
        this.typeImageService.selectedTypeImage = value;
       }
       get typeImages(): Array<TypeImageVo> {
           return this.typeImageService.typeImages;
       }
       set typeImages(value: Array<TypeImageVo>) {
        this.typeImageService.typeImages = value;
       }
       get createTypeImageDialog(): boolean {
           return this.typeImageService.createTypeImageDialog;
       }
      set createTypeImageDialog(value: boolean) {
        this.typeImageService.createTypeImageDialog= value;
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
