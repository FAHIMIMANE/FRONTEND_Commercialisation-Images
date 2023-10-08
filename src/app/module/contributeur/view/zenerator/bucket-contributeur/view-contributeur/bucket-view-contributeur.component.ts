import {Component, OnInit} from '@angular/core';
import {BucketService} from 'src/app/controller/service/Bucket.service';
import {BucketVo} from 'src/app/controller/model/Bucket.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
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
  selector: 'app-bucket-view-contributeur',
  templateUrl: './bucket-view-contributeur.component.html',
  styleUrls: ['./bucket-view-contributeur.component.css']
})
export class BucketViewContributeurComponent implements OnInit {

        selectedImages: ImageVo = new ImageVo();
        imagesListe: Array<ImageVo> = [];

        myClients: Array<ClientVo> = [];
        myTypeImages: Array<TypeImageVo> = [];


constructor(private datePipe: DatePipe, private bucketService: BucketService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private stateBucketService: StateBucketService
    ,private contributeurService: ContributeurService
    ,private clientService: ClientService
    ,private typeImageService: TypeImageService
    ,private imageService: ImageService
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

hideViewDialog(){
    this.viewBucketDialog  = false;
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

   get viewBucketDialog(): boolean {
           return this.bucketService.viewBucketDialog;

       }
    set viewBucketDialog(value: boolean) {
        this.bucketService.viewBucketDialog= value;
       }

       get selectedClient(): ClientVo {
           return this.clientService.selectedClient;
       }
      set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }
       get clients():Array<ClientVo> {
           return this.clientService.clients;
       }
       set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }
       get editClientDialog(): boolean {
           return this.clientService.editClientDialog;
       }
      set editClientDialog(value: boolean) {
        this.clientService.editClientDialog= value;
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
       get selectedStateBucket(): StateBucketVo {
           return this.stateBucketService.selectedStateBucket;
       }
      set selectedStateBucket(value: StateBucketVo) {
        this.stateBucketService.selectedStateBucket = value;
       }
       get stateBuckets():Array<StateBucketVo> {
           return this.stateBucketService.stateBuckets;
       }
       set stateBuckets(value: Array<StateBucketVo>) {
        this.stateBucketService.stateBuckets = value;
       }
       get editStateBucketDialog(): boolean {
           return this.stateBucketService.editStateBucketDialog;
       }
      set editStateBucketDialog(value: boolean) {
        this.stateBucketService.editStateBucketDialog= value;
       }
       get selectedContributeur(): ContributeurVo {
           return this.contributeurService.selectedContributeur;
       }
      set selectedContributeur(value: ContributeurVo) {
        this.contributeurService.selectedContributeur = value;
       }
       get contributeurs():Array<ContributeurVo> {
           return this.contributeurService.contributeurs;
       }
       set contributeurs(value: Array<ContributeurVo>) {
        this.contributeurService.contributeurs = value;
       }
       get editContributeurDialog(): boolean {
           return this.contributeurService.editContributeurDialog;
       }
      set editContributeurDialog(value: boolean) {
        this.contributeurService.editContributeurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
