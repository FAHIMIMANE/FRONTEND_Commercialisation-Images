import {Component, OnInit} from '@angular/core';
import {ImageService} from 'src/app/controller/service/Image.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
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


import {Image} from '../../../../../../demo/domain/image';


@Component({
    selector: 'app-image-view-admin',
    templateUrl: './image-view-admin.component.html',
    styleUrls: ['./image-view-admin.component.css']
})
export class ImageViewAdminComponent implements OnInit {

    selectedCategorieItems: CategorieItemVo = new CategorieItemVo();
    categorieItemsListe: Array<CategorieItemVo> = [];

    myCategorieImages: Array<CategorieImageVo> = [];
    private items: any;

    private _imagesLoaded = new Array<string>();
     paniers = new Array<string>();

    constructor(private datePipe: DatePipe, private imageService: ImageService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private categorieImageService: CategorieImageService
        , private bucketService: BucketService
        , private categorieItemService: CategorieItemService
        , private clientService: ClientService
        , private typeImageService: TypeImageService,
                private route: ActivatedRoute,
    ) {
    }

    addToPanier(myImage: string) {
        this.paniers.push(myImage);
        alert('haaa panierrrr ' + this.paniers);
    }

// methods
    private image: Image;

    ngOnInit(): void {
        this.selectedCategorieItems.categorieImageVo = new CategorieImageVo();
        this.categorieImageService.findAll().subscribe((data) => this.categorieImages = data);
        this.selectedClient = new ClientVo();
        this.clientService.findAll().subscribe((data) => this.clients = data);
        this.selectedBucket = new BucketVo();
        this.bucketService.findAll().subscribe((data) => this.buckets = data);
        this.selectedTypeImage = new TypeImageVo();
        this.typeImageService.findAll().subscribe((data) => this.typeImages = data);
        this.initImages();
    }

    hideViewDialog() {
        this.viewImageDialog = false;
    }


    initImages(): void {
        this._imagesLoaded.push('background.jpg');
        this._imagesLoaded.push('fusion.png');
        this._imagesLoaded.push('hahaha.jpg');
        this._imagesLoaded.push('fruits.png');
        this._imagesLoaded.push('art.jpg');

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

    get viewImageDialog(): boolean {
        return this.imageService.viewImageDialog;

    }

    set viewImageDialog(value: boolean) {
        this.imageService.viewImageDialog = value;
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

    get editTypeImageDialog(): boolean {
        return this.typeImageService.editTypeImageDialog;
    }

    set editTypeImageDialog(value: boolean) {
        this.typeImageService.editTypeImageDialog = value;
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

    get editCategorieImageDialog(): boolean {
        return this.categorieImageService.editCategorieImageDialog;
    }

    set editCategorieImageDialog(value: boolean) {
        this.categorieImageService.editCategorieImageDialog = value;
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

    get editBucketDialog(): boolean {
        return this.bucketService.editBucketDialog;
    }

    set editBucketDialog(value: boolean) {
        this.bucketService.editBucketDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }


    get imagesLoaded(): string[] {
        return this._imagesLoaded;
    }

    set imagesLoaded(value: string[]) {
        this._imagesLoaded = value;
    }

}

