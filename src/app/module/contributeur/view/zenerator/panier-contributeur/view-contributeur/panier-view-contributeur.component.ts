import {Component, OnInit} from '@angular/core';
import {PanierService} from 'src/app/controller/service/Panier.service';
import {PanierVo} from 'src/app/controller/model/Panier.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {ImageVo} from 'src/app/controller/model/Image.model';
import {ImageService} from 'src/app/controller/service/Image.service';
import {PanierItemVo} from 'src/app/controller/model/PanierItem.model';
import {PanierItemService} from 'src/app/controller/service/PanierItem.service';
import {EtatPanierVo} from 'src/app/controller/model/EtatPanier.model';
import {EtatPanierService} from 'src/app/controller/service/EtatPanier.service';

@Component({
  selector: 'app-panier-view-contributeur',
  templateUrl: './panier-view-contributeur.component.html',
  styleUrls: ['./panier-view-contributeur.component.css']
})
export class PanierViewContributeurComponent implements OnInit {

        selectedPanierItems: PanierItemVo = new PanierItemVo();
        panierItemsListe: Array<PanierItemVo> = [];

        myImages: Array<ImageVo> = [];


constructor(private datePipe: DatePipe, private panierService: PanierService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private imageService: ImageService
    ,private panierItemService: PanierItemService
    ,private etatPanierService: EtatPanierService
) {
}

// methods
ngOnInit(): void {
                this.selectedPanierItems.imageVo = new ImageVo();
                this.imageService.findAll().subscribe((data) => this.images = data);
    this.selectedEtatPanier = new EtatPanierVo();
    this.etatPanierService.findAll().subscribe((data) => this.etatPaniers = data);
}

hideViewDialog(){
    this.viewPanierDialog  = false;
}

// getters and setters

get paniers(): Array<PanierVo> {
    return this.panierService.paniers;
       }
set paniers(value: Array<PanierVo>) {
        this.panierService.paniers = value;
       }

 get selectedPanier(): PanierVo {
           return this.panierService.selectedPanier;
       }
    set selectedPanier(value: PanierVo) {
        this.panierService.selectedPanier = value;
       }

   get viewPanierDialog(): boolean {
           return this.panierService.viewPanierDialog;

       }
    set viewPanierDialog(value: boolean) {
        this.panierService.viewPanierDialog= value;
       }

       get selectedEtatPanier(): EtatPanierVo {
           return this.etatPanierService.selectedEtatPanier;
       }
      set selectedEtatPanier(value: EtatPanierVo) {
        this.etatPanierService.selectedEtatPanier = value;
       }
       get etatPaniers():Array<EtatPanierVo> {
           return this.etatPanierService.etatPaniers;
       }
       set etatPaniers(value: Array<EtatPanierVo>) {
        this.etatPanierService.etatPaniers = value;
       }
       get editEtatPanierDialog(): boolean {
           return this.etatPanierService.editEtatPanierDialog;
       }
      set editEtatPanierDialog(value: boolean) {
        this.etatPanierService.editEtatPanierDialog= value;
       }
       get selectedImage(): ImageVo {
           return this.imageService.selectedImage;
       }
      set selectedImage(value: ImageVo) {
        this.imageService.selectedImage = value;
       }
       get images():Array<ImageVo> {
           return this.imageService.images;
       }
       set images(value: Array<ImageVo>) {
        this.imageService.images = value;
       }
       get editImageDialog(): boolean {
           return this.imageService.editImageDialog;
       }
      set editImageDialog(value: boolean) {
        this.imageService.editImageDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
