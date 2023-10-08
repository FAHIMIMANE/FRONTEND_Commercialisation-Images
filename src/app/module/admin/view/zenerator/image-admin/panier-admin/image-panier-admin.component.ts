import {Component, OnInit} from '@angular/core';
import {ImageService} from 'src/app/controller/service/Image.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, {RowInput} from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import {ClientService} from 'src/app/controller/service/Client.service';
import {BucketService} from 'src/app/controller/service/Bucket.service';
import {TypeImageService} from 'src/app/controller/service/TypeImage.service';

import {BucketVo} from 'src/app/controller/model/Bucket.model';
import {CategorieItemVo} from 'src/app/controller/model/CategorieItem.model';
import {ClientVo} from 'src/app/controller/model/Client.model';
import {TypeImageVo} from 'src/app/controller/model/TypeImage.model';
import {MessageService, ConfirmationService, MenuItem} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import {ExportService} from 'src/app/controller/service/Export.service';

@Component({
    selector: 'app-image-panier-client',
    templateUrl: './image-panier-admin.component.html',
    styleUrls: ['./image-panier-admin.component.css']
})
export class ImagePanierAdminComponent implements OnInit {

    cols: any[] = [];


     constructor(private datePipe: DatePipe, private imageService: ImageService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        ,       private clientService: ClientService
        ,       private bucketService: BucketService
        ,       private typeImageService: TypeImageService
    ) {
    }


    get panier(): Array<ImageVo> {
        return this.imageService.panier;
    }

    set panier(value: Array<ImageVo>) {
        this.imageService.panier = value;
    }

    ngOnInit(): void {
        this.initCol();
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'prix', header: 'Prix'},
            {field: 'extension', header: 'Extension'},
            {field: 'taille', header: 'Taille'},
            {field: 'resolution', header: 'Resolution'},
            {field: 'client?.numeroMatricule', header: 'Client'},
            {field: 'bucket?.libelle', header: 'Bucket'},
            {field: 'typeImage?.libelle', header: 'Type image'},
        ];
    }

    get selectedImage(): ImageVo {
        return this.imageService.selectedImage;
    }

    set selectedImage(value: ImageVo) {
        this.imageService.selectedImage = value;
    }


    get panierDialog(): boolean {
        return this.imageService.panierDialog;

    }

    set panierDialog(value: boolean) {
        this.imageService.panierDialog = value;
    }

}
