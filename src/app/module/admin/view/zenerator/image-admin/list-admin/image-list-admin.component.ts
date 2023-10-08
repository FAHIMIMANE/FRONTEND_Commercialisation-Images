import {Component, OnInit} from '@angular/core';
import {ImageService} from 'src/app/controller/service/Image.service';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import {ClientService} from 'src/app/controller/service/Client.service';
import {BucketService} from 'src/app/controller/service/Bucket.service';
import {TypeImageService} from 'src/app/controller/service/TypeImage.service';

import {BucketVo} from 'src/app/controller/model/Bucket.model';
import {ClientVo} from 'src/app/controller/model/Client.model';
import {TypeImageVo} from 'src/app/controller/model/TypeImage.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import {ExportService} from 'src/app/controller/service/Export.service';
import {PanierService} from '../../../../../../controller/service/Panier.service';
import {PanierVo} from '../../../../../../controller/model/Panier.model';
import {PanierItemVo} from '../../../../../../controller/model/PanierItem.model';
import {PanierItemService} from '../../../../../../controller/service/PanierItem.service';


@Component({
    selector: 'app-image-list-admin',
    templateUrl: './image-list-admin.component.html',
    styleUrls: ['./image-list-admin.component.css']
})
export class ImageListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Image';
    clients: Array<ClientVo>;
    buckets: Array<BucketVo>;
    typeImages: Array<TypeImageVo>;


    constructor(private datePipe: DatePipe, private imageService: ImageService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        ,       private clientService: ClientService
        ,       private bucketService: BucketService
        ,       private typeImageService: TypeImageService
        ,       private panierService: PanierService
        ,       private panierItemService: PanierItemService
    ) {
    }

    ngOnInit(): void {
        this.loadImages();
        this.initExport();
        this.initCol();
        this.loadClient();
        this.loadBucket();
        this.loadTypeImage();
    }

    // methods

    saveAll() {
        this.panierService.selectedPanier = this.constructPanier(this.panier);
        this.panierService.save().subscribe(data => {
            alert('panier saved');
            this.panier = new Array<ImageVo>();
        });
    }

    public addToPanier(image: ImageVo): void {
        this.panier.push(image);
        console.log('pamier ¡¡¡ ' + this.panier);
    }

    public async loadImages() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Image', 'list');
        isPermistted ? this.imageService.findAll().subscribe(images => this.images = images, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.imageService.findByCriteria(this.searchImage).subscribe(images => {

            this.images = images;
            // this.searchImage = new ImageVo();
        }, error => console.log(error));
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

    public async editImage(image: ImageVo) {
        const isPermistted = await this.roleService.isPermitted('Image', 'edit');
        if (isPermistted) {
            this.imageService.findByIdWithAssociatedList(image).subscribe(res => {
                this.selectedImage = res;
                this.editImageDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewImage(image: ImageVo) {
        const isPermistted = await this.roleService.isPermitted('Image', 'view');
        if (isPermistted) {
            this.imageService.findByIdWithAssociatedList(image).subscribe(res => {
                this.selectedImage = res;
                this.viewImageDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateImage(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedImage = new ImageVo();
            this.createImageDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public constructPanier(images: Array<ImageVo>): PanierVo {
        const panier = new PanierVo();
        panier.prixTotal = 0;

        for (let i = 0; i < images.length; i++) {
            const panierItemVo = new PanierItemVo();
            panierItemVo.imageVo = images[i];
            panierItemVo.prix = images[i].prix;
            if (panier.panierItemsVo == null) {
                panier.panierItemsVo = new Array<PanierItemVo>();
            }
            panier.panierItemsVo.push(panierItemVo);
        }
        return panier;
    }

    public openPanier(pojo: string) {
        this.panierItemService.panier = this.panierService.selectedPanier;
        this.router.navigate(['/' + environment.rootAppUrl + '/admin/zenerator/panier']);

    }



    public async deleteImage(image: ImageVo) {
        const isPermistted = await this.roleService.isPermitted('Image', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Image) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.imageService.delete(image).subscribe(status => {
                        if (status > 0) {
                            const position = this.images.indexOf(image);
                            position > -1 ? this.images.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Image Supprimé',
                                life: 3000
                            });
                        }

                    }, error => console.log(error));
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public async loadClient() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Image', 'list');
        isPermistted ? this.clientService.findAll().subscribe(clients => this.clients = clients, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadBucket() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Image', 'list');
        isPermistted ? this.bucketService.findAll().subscribe(buckets => this.buckets = buckets, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadTypeImage() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Image', 'list');
        isPermistted ? this.typeImageService.findAll().subscribe(typeImages => this.typeImages = typeImages, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateImage(image: ImageVo) {

        this.imageService.findByIdWithAssociatedList(image).subscribe(
            res => {
                this.initDuplicateImage(res);
                this.selectedImage = res;
                this.selectedImage.id = null;
                this.createImageDialog = true;

            });

    }

    initDuplicateImage(res: ImageVo) {
        if (res.categorieItemsVo != null) {
            res.categorieItemsVo.forEach(d => {
                d.imageVo = null;
                d.id = null;
            });
        }


    }

    initExport(): void {
        this.excelPdfButons = [
            {
                label: 'CSV', icon: 'pi pi-file', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportCSV(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportExcel(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportPdf(this.criteriaData, this.exportData, this.fileName);
                }
            }
        ];
    }


    prepareColumnExport(): void {
        this.exportData = this.images.map(e => {
            return {
                'Reference': e.reference,
                'Prix': e.prix,
                'Description': e.description,
                'Extension': e.extension,
                'Taille': e.taille,
                'Resolution': e.resolution,
                'Client': e.clientVo?.numeroMatricule,
                'Bucket': e.bucketVo?.libelle,
                'Type image': e.typeImageVo?.libelle,
            };
        });

        this.criteriaData = [{
            'Reference': this.searchImage.reference ? this.searchImage.reference : environment.emptyForExport,
            'Prix Min': this.searchImage.prixMin ? this.searchImage.prixMin : environment.emptyForExport,
            'Prix Max': this.searchImage.prixMax ? this.searchImage.prixMax : environment.emptyForExport,
            'Description': this.searchImage.description ? this.searchImage.description : environment.emptyForExport,
            'Extension': this.searchImage.extension ? this.searchImage.extension : environment.emptyForExport,
            'Taille Min': this.searchImage.tailleMin ? this.searchImage.tailleMin : environment.emptyForExport,
            'Taille Max': this.searchImage.tailleMax ? this.searchImage.tailleMax : environment.emptyForExport,
            'Resolution Min': this.searchImage.resolutionMin ? this.searchImage.resolutionMin : environment.emptyForExport,
            'Resolution Max': this.searchImage.resolutionMax ? this.searchImage.resolutionMax : environment.emptyForExport,
            'Client': this.searchImage.clientVo?.numeroMatricule ? this.searchImage.clientVo?.numeroMatricule : environment.emptyForExport,
            'Bucket': this.searchImage.bucketVo?.libelle ? this.searchImage.bucketVo?.libelle : environment.emptyForExport,
            'Type image': this.searchImage.typeImageVo?.libelle ? this.searchImage.typeImageVo?.libelle : environment.emptyForExport,
        }];

    }

    // getters and setters

    get images(): Array<ImageVo> {
        return this.imageService.images;
    }

    set images(value: Array<ImageVo>) {
        this.imageService.images = value;
    }

    get panier(): Array<ImageVo> {
        return this.imageService.panier;
    }

    set panier(value: Array<ImageVo>) {
        this.imageService.panier = value;
    }

    get imageSelections(): Array<ImageVo> {
        return this.imageService.imageSelections;
    }

    set imageSelections(value: Array<ImageVo>) {
        this.imageService.imageSelections = value;
    }


    get selectedImage(): ImageVo {
        return this.imageService.selectedImage;
    }

    set selectedImage(value: ImageVo) {
        this.imageService.selectedImage = value;
    }

    get createImageDialog(): boolean {
        return this.imageService.createImageDialog;
    }

    set createImageDialog(value: boolean) {
        this.imageService.createImageDialog = value;
    }

    get editImageDialog(): boolean {
        return this.imageService.editImageDialog;
    }

    set editImageDialog(value: boolean) {
        this.imageService.editImageDialog = value;
    }

    get viewImageDialog(): boolean {
        return this.imageService.viewImageDialog;
    }

    set viewImageDialog(value: boolean) {
        this.imageService.viewImageDialog = value;
    }

    get searchImage(): ImageVo {
        return this.imageService.searchImage;
    }

    set searchImage(value: ImageVo) {
        this.imageService.searchImage = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


    get panierDialog(): boolean {
        return this.imageService.panierDialog;
    }

    set panierDialog(value: boolean) {
        this.imageService.panierDialog = value;
    }
}
