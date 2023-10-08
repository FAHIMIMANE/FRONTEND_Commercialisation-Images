import {Component, OnInit} from '@angular/core';
import {PanierItemService} from 'src/app/controller/service/PanierItem.service';
import {PanierItemVo} from 'src/app/controller/model/PanierItem.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, {RowInput} from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import {ImageService} from 'src/app/controller/service/Image.service';
import {PanierService} from 'src/app/controller/service/Panier.service';

import {PanierVo} from 'src/app/controller/model/Panier.model';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {MessageService, ConfirmationService, MenuItem} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import {ExportService} from 'src/app/controller/service/Export.service';

@Component({
    selector: 'app-panier-item-list-client',
    templateUrl: './panier-item-list-client.component.html',
    styleUrls: ['./panier-item-list-client.component.css']
})
export class PanierItemListClientComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PanierItem';
    images: Array<ImageVo>;
    paniers: Array<PanierVo>;


    constructor(private datePipe: DatePipe, private panierItemService: PanierItemService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private imageService: ImageService
        , private panierService: PanierService
    ) {
    }

    ngOnInit(): void {
        //this.loadPanierItems();
        this.initExport();
        this.initCol();
        // this.loadImage();
        //this.loadPanier();
    }

    // methods
    public async loadPanierItems() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PanierItem', 'list');
        isPermistted ? this.panierItemService.findAll().subscribe(panierItems => this.panierItems = panierItems, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.panierItemService.findByCriteria(this.searchPanierItem).subscribe(panierItems => {

            this.panierItems = panierItems;
            // this.searchPanierItem = new PanierItemVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'image?.reference', header: 'Image'},
            {field: 'panier?.id', header: 'Panier'},
            {field: 'prix', header: 'Prix'},
            {field: 'reduction', header: 'Reduction'},
            {field: 'prixApresReduction', header: 'Prix apres reduction'},
        ];
    }

    public async editPanierItem(panierItem: PanierItemVo) {
        const isPermistted = await this.roleService.isPermitted('PanierItem', 'edit');
        if (isPermistted) {
            this.panierItemService.findByIdWithAssociatedList(panierItem).subscribe(res => {
                this.selectedPanierItem = res;
                this.editPanierItemDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewPanierItem(panierItem: PanierItemVo) {
        const isPermistted = await this.roleService.isPermitted('PanierItem', 'view');
        if (isPermistted) {
            this.panierItemService.findByIdWithAssociatedList(panierItem).subscribe(res => {
                this.selectedPanierItem = res;
                this.viewPanierItemDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreatePanierItem(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedPanierItem = new PanierItemVo();
            this.createPanierItemDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deletePanierItem(panierItem: PanierItemVo) {
        const isPermistted = await this.roleService.isPermitted('PanierItem', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Panier item) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.panierItemService.delete(panierItem).subscribe(status => {
                        if (status > 0) {
                            const position = this.panierItems.indexOf(panierItem);
                            position > -1 ? this.panierItems.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Panier item Supprimé',
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

    public async loadImage() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PanierItem', 'list');
        isPermistted ? this.imageService.findAll().subscribe(images => this.images = images, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadPanier() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PanierItem', 'list');
        isPermistted ? this.panierService.findAll().subscribe(paniers => this.paniers = paniers, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicatePanierItem(panierItem: PanierItemVo) {

        this.panierItemService.findByIdWithAssociatedList(panierItem).subscribe(
            res => {
                this.initDuplicatePanierItem(res);
                this.selectedPanierItem = res;
                this.selectedPanierItem.id = null;
                this.createPanierItemDialog = true;

            });

    }

    initDuplicatePanierItem(res: PanierItemVo) {


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
        this.exportData = this.panierItems.map(e => {
            return {
                'Image': e.imageVo?.reference,
                'Panier': e.panierVo?.id,
                'Prix': e.prix,
                'Reduction': e.reduction,
                'Prix apres reduction': e.prixApresReduction,
            };
        });

        this.criteriaData = [{
            'Image': this.searchPanierItem.imageVo?.reference ? this.searchPanierItem.imageVo?.reference : environment.emptyForExport,
            'Panier': this.searchPanierItem.panierVo?.id ? this.searchPanierItem.panierVo?.id : environment.emptyForExport,
            'Prix Min': this.searchPanierItem.prixMin ? this.searchPanierItem.prixMin : environment.emptyForExport,
            'Prix Max': this.searchPanierItem.prixMax ? this.searchPanierItem.prixMax : environment.emptyForExport,
            'Reduction Min': this.searchPanierItem.reductionMin ? this.searchPanierItem.reductionMin : environment.emptyForExport,
            'Reduction Max': this.searchPanierItem.reductionMax ? this.searchPanierItem.reductionMax : environment.emptyForExport,
            'Prix apres reduction Min': this.searchPanierItem.prixApresReductionMin ? this.searchPanierItem.prixApresReductionMin : environment.emptyForExport,
            'Prix apres reduction Max': this.searchPanierItem.prixApresReductionMax ? this.searchPanierItem.prixApresReductionMax : environment.emptyForExport,
        }];

    }

    // getters and setters

    get panierItems(): Array<PanierItemVo> {
        return this.panierItemService.panier.panierItemsVo;
    }

    set panierItems(value: Array<PanierItemVo>) {
        this.panierItemService.panierItems = value;
    }

    get panierItemSelections(): Array<PanierItemVo> {
        return this.panierItemService.panierItemSelections;
    }

    set panierItemSelections(value: Array<PanierItemVo>) {
        this.panierItemService.panierItemSelections = value;
    }


    get selectedPanierItem(): PanierItemVo {
        return this.panierItemService.selectedPanierItem;
    }

    set selectedPanierItem(value: PanierItemVo) {
        this.panierItemService.selectedPanierItem = value;
    }

    get createPanierItemDialog(): boolean {
        return this.panierItemService.createPanierItemDialog;
    }

    set createPanierItemDialog(value: boolean) {
        this.panierItemService.createPanierItemDialog = value;
    }

    get editPanierItemDialog(): boolean {
        return this.panierItemService.editPanierItemDialog;
    }

    set editPanierItemDialog(value: boolean) {
        this.panierItemService.editPanierItemDialog = value;
    }

    get viewPanierItemDialog(): boolean {
        return this.panierItemService.viewPanierItemDialog;
    }

    set viewPanierItemDialog(value: boolean) {
        this.panierItemService.viewPanierItemDialog = value;
    }

    get searchPanierItem(): PanierItemVo {
        return this.panierItemService.searchPanierItem;
    }

    set searchPanierItem(value: PanierItemVo) {
        this.panierItemService.searchPanierItem = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
