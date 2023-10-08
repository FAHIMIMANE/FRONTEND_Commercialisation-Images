import {Component, OnInit} from '@angular/core';
import {ImageService} from 'src/app/controller/service/Image.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {CategorieImageVo} from 'src/app/controller/model/CategorieImage.model';
import {CategorieImageService} from 'src/app/controller/service/CategorieImage.service';
import {BucketVo} from 'src/app/controller/model/Bucket.model';
import {BucketService} from 'src/app/controller/service/Bucket.service';
import {CategorieItemVo} from 'src/app/controller/model/CategorieItem.model';
import {CategorieItemService} from 'src/app/controller/service/CategorieItem.service';
import {ClientVo} from 'src/app/controller/model/Client.model';
import {ClientService} from 'src/app/controller/service/Client.service';
import {TypeImageVo} from 'src/app/controller/model/TypeImage.model';
import {TypeImageService} from 'src/app/controller/service/TypeImage.service';

@Component({
  selector: 'app-image-edit-client',
  templateUrl: './image-edit-client.component.html',
  styleUrls: ['./image-edit-client.component.css']
})
export class ImageEditClientComponent implements OnInit {

        selectedCategorieItems: CategorieItemVo = new CategorieItemVo();
        categorieItemsListe: Array<CategorieItemVo> = [];

        myCategorieImages: Array<CategorieImageVo> = [];


constructor(private datePipe: DatePipe, private imageService: ImageService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private categorieImageService: CategorieImageService
 ,       private bucketService: BucketService
 ,       private categorieItemService: CategorieItemService
 ,       private clientService: ClientService
 ,       private typeImageService: TypeImageService
) {
}

// methods
ngOnInit(): void {
                this.selectedCategorieItems.categorieImageVo = new CategorieImageVo();
                this.categorieImageService.findAll().subscribe((data) => this.categorieImages = data);
    this.selectedClient = new ClientVo();
    this.clientService.findAll().subscribe((data) => this.clients = data);
    this.selectedBucket = new BucketVo();
    this.bucketService.findAll().subscribe((data) => this.buckets = data);
    this.selectedTypeImage = new TypeImageVo();
    this.typeImageService.findAll().subscribe((data) => this.typeImages = data);
}
        addCategorieItems() {
        if( this.selectedImage.categorieItemsVo == null ){
            this.selectedImage.categorieItemsVo = new Array<CategorieItemVo>();
        }
        this.selectedImage.categorieItemsVo.push(this.selectedCategorieItems);
        this.selectedCategorieItems = new CategorieItemVo();
        }

       deleteCategorieItems(p: CategorieItemVo) {
        this.selectedImage.categorieItemsVo.forEach((element, index) => {
            if (element === p) { this.selectedImage.categorieItemsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.imageService.edit().subscribe(image=>{
    const myIndex = this.images.findIndex(e => e.id === this.selectedImage.id);
    this.images[myIndex] = this.selectedImage;
    this.editImageDialog = false;
    this.selectedImage = new ImageVo();


    }, error => {
        console.log(error);
    });

}

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
              public async openCreatecategorieImage(categorieImage: string) {
                      const isPermistted = await this.roleService.isPermitted('CategorieImage', 'add');
                       if(isPermistted){
         this.selectedCategorieImage = new CategorieImageVo();
        this.createCategorieImageDialog = true;
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
    this.editImageDialog  = false;
}

// getters and setters

get images(): Array<ImageVo> {
    return this.imageService.images;
       }
set images(value: Array<ImageVo>) {
        this.imageService.images = value;
       }

 get selectedImage(): ImageVo {
           return this.imageService.selectedImage;
       }
    set selectedImage(value: ImageVo) {
        this.imageService.selectedImage = value;
       }

   get editImageDialog(): boolean {
           return this.imageService.editImageDialog;

       }
    set editImageDialog(value: boolean) {
        this.imageService.editImageDialog = value;
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
       get selectedCategorieImage(): CategorieImageVo {
           return this.categorieImageService.selectedCategorieImage;
       }
      set selectedCategorieImage(value: CategorieImageVo) {
        this.categorieImageService.selectedCategorieImage = value;
       }
       get categorieImages(): Array<CategorieImageVo> {
           return this.categorieImageService.categorieImages;
       }
       set categorieImages(value: Array<CategorieImageVo>) {
        this.categorieImageService.categorieImages = value;
       }
       get createCategorieImageDialog(): boolean {
           return this.categorieImageService.createCategorieImageDialog;
       }
      set createCategorieImageDialog(value: boolean) {
        this.categorieImageService.createCategorieImageDialog= value;
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
