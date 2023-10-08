import {Component, OnInit} from '@angular/core';
import {BucketService} from 'src/app/controller/service/Bucket.service';
import {BucketVo} from 'src/app/controller/model/Bucket.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {StateBucketVo} from 'src/app/controller/model/StateBucket.model';
import {StateBucketService} from 'src/app/controller/service/StateBucket.service';
import {ContributeurVo} from 'src/app/controller/model/Contributeur.model';
import {ContributeurService} from 'src/app/controller/service/Contributeur.service';
import {ClientVo} from 'src/app/controller/model/Client.model';
import {ClientService} from 'src/app/controller/service/Client.service';
import {TypeImageVo} from 'src/app/controller/model/TypeImage.model';
import {TypeImageService} from 'src/app/controller/service/TypeImage.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {ImageService} from 'src/app/controller/service/Image.service';

@Component({
  selector: 'app-bucket-edit-contributeur',
  templateUrl: './bucket-edit-contributeur.component.html',
  styleUrls: ['./bucket-edit-contributeur.component.css']
})
export class BucketEditContributeurComponent implements OnInit {

        selectedImages: ImageVo = new ImageVo();
        imagesListe: Array<ImageVo> = [];

        myClients: Array<ClientVo> = [];
        myTypeImages: Array<TypeImageVo> = [];


constructor(private datePipe: DatePipe, private bucketService: BucketService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private stateBucketService: StateBucketService
 ,       private contributeurService: ContributeurService
 ,       private clientService: ClientService
 ,       private typeImageService: TypeImageService
 ,       private imageService: ImageService
) {
}

// methods
ngOnInit(): void {
                this.selectedImages.clientVo = new ClientVo();
                this.clientService.findAll().subscribe((data) => this.clients = data);
                this.selectedImages.typeImageVo = new TypeImageVo();
                this.typeImageService.findAll().subscribe((data) => this.typeImages = data);
    this.selectedStateBucket = new StateBucketVo();
    this.stateBucketService.findAll().subscribe((data) => this.stateBuckets = data);
    this.selectedContributeur = new ContributeurVo();
    this.contributeurService.findAll().subscribe((data) => this.contributeurs = data);
}
        addImages() {
        if( this.selectedBucket.imagesVo == null ){
            this.selectedBucket.imagesVo = new Array<ImageVo>();
        }
        this.selectedBucket.imagesVo.push(this.selectedImages);
        this.selectedImages = new ImageVo();
        }

       deleteImages(p: ImageVo) {
        this.selectedBucket.imagesVo.forEach((element, index) => {
            if (element === p) { this.selectedBucket.imagesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedBucket.dateCreation = DateUtils.toDate(this.selectedBucket.dateCreation);
    this.bucketService.edit().subscribe(bucket=>{
    const myIndex = this.buckets.findIndex(e => e.id === this.selectedBucket.id);
    this.buckets[myIndex] = this.selectedBucket;
    this.editBucketDialog = false;
    this.selectedBucket = new BucketVo();


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
              public async openCreatecontributeur(contributeur: string) {
                      const isPermistted = await this.roleService.isPermitted('Contributeur', 'add');
                       if(isPermistted){
         this.selectedContributeur = new ContributeurVo();
        this.createContributeurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editBucketDialog  = false;
}

// getters and setters

get buckets(): Array<BucketVo> {
    return this.bucketService.buckets;
       }
set buckets(value: Array<BucketVo>) {
        this.bucketService.buckets = value;
       }

 get selectedBucket(): BucketVo {
           return this.bucketService.selectedBucket;
       }
    set selectedBucket(value: BucketVo) {
        this.bucketService.selectedBucket = value;
       }

   get editBucketDialog(): boolean {
           return this.bucketService.editBucketDialog;

       }
    set editBucketDialog(value: boolean) {
        this.bucketService.editBucketDialog = value;
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
       get selectedContributeur(): ContributeurVo {
           return this.contributeurService.selectedContributeur;
       }
      set selectedContributeur(value: ContributeurVo) {
        this.contributeurService.selectedContributeur = value;
       }
       get contributeurs(): Array<ContributeurVo> {
           return this.contributeurService.contributeurs;
       }
       set contributeurs(value: Array<ContributeurVo>) {
        this.contributeurService.contributeurs = value;
       }
       get createContributeurDialog(): boolean {
           return this.contributeurService.createContributeurDialog;
       }
      set createContributeurDialog(value: boolean) {
        this.contributeurService.createContributeurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
