import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';

import { TypePaiementCreateChercheurComponent } from './type-paiement-chercheur/create-chercheur/type-paiement-create-chercheur.component';
import { TypePaiementEditChercheurComponent } from './type-paiement-chercheur/edit-chercheur/type-paiement-edit-chercheur.component';
import { TypePaiementViewChercheurComponent } from './type-paiement-chercheur/view-chercheur/type-paiement-view-chercheur.component';
import { TypePaiementListChercheurComponent } from './type-paiement-chercheur/list-chercheur/type-paiement-list-chercheur.component';
import { TypePaiementChercheurComponent } from './type-paiement-chercheur/type-paiement-chercheur.component';
import { EtatAbonnementCreateChercheurComponent } from './etat-abonnement-chercheur/create-chercheur/etat-abonnement-create-chercheur.component';
import { EtatAbonnementEditChercheurComponent } from './etat-abonnement-chercheur/edit-chercheur/etat-abonnement-edit-chercheur.component';
import { EtatAbonnementViewChercheurComponent } from './etat-abonnement-chercheur/view-chercheur/etat-abonnement-view-chercheur.component';
import { EtatAbonnementListChercheurComponent } from './etat-abonnement-chercheur/list-chercheur/etat-abonnement-list-chercheur.component';
import { EtatAbonnementChercheurComponent } from './etat-abonnement-chercheur/etat-abonnement-chercheur.component';
import { ContractCreateChercheurComponent } from './contract-chercheur/create-chercheur/contract-create-chercheur.component';
import { ContractEditChercheurComponent } from './contract-chercheur/edit-chercheur/contract-edit-chercheur.component';
import { ContractViewChercheurComponent } from './contract-chercheur/view-chercheur/contract-view-chercheur.component';
import { ContractListChercheurComponent } from './contract-chercheur/list-chercheur/contract-list-chercheur.component';
import { ContractChercheurComponent } from './contract-chercheur/contract-chercheur.component';
import { SignatureCreateChercheurComponent } from './signature-chercheur/create-chercheur/signature-create-chercheur.component';
import { SignatureEditChercheurComponent } from './signature-chercheur/edit-chercheur/signature-edit-chercheur.component';
import { SignatureViewChercheurComponent } from './signature-chercheur/view-chercheur/signature-view-chercheur.component';
import { SignatureListChercheurComponent } from './signature-chercheur/list-chercheur/signature-list-chercheur.component';
import { SignatureChercheurComponent } from './signature-chercheur/signature-chercheur.component';
import { TypeContratCreateChercheurComponent } from './type-contrat-chercheur/create-chercheur/type-contrat-create-chercheur.component';
import { TypeContratEditChercheurComponent } from './type-contrat-chercheur/edit-chercheur/type-contrat-edit-chercheur.component';
import { TypeContratViewChercheurComponent } from './type-contrat-chercheur/view-chercheur/type-contrat-view-chercheur.component';
import { TypeContratListChercheurComponent } from './type-contrat-chercheur/list-chercheur/type-contrat-list-chercheur.component';
import { TypeContratChercheurComponent } from './type-contrat-chercheur/type-contrat-chercheur.component';
import { PanierItemCreateChercheurComponent } from './panier-item-chercheur/create-chercheur/panier-item-create-chercheur.component';
import { PanierItemEditChercheurComponent } from './panier-item-chercheur/edit-chercheur/panier-item-edit-chercheur.component';
import { PanierItemViewChercheurComponent } from './panier-item-chercheur/view-chercheur/panier-item-view-chercheur.component';
import { PanierItemListChercheurComponent } from './panier-item-chercheur/list-chercheur/panier-item-list-chercheur.component';
import { PanierItemChercheurComponent } from './panier-item-chercheur/panier-item-chercheur.component';
import { CategorieImageCreateChercheurComponent } from './categorie-image-chercheur/create-chercheur/categorie-image-create-chercheur.component';
import { CategorieImageEditChercheurComponent } from './categorie-image-chercheur/edit-chercheur/categorie-image-edit-chercheur.component';
import { CategorieImageViewChercheurComponent } from './categorie-image-chercheur/view-chercheur/categorie-image-view-chercheur.component';
import { CategorieImageListChercheurComponent } from './categorie-image-chercheur/list-chercheur/categorie-image-list-chercheur.component';
import { CategorieImageChercheurComponent } from './categorie-image-chercheur/categorie-image-chercheur.component';
import { PanierCreateChercheurComponent } from './panier-chercheur/create-chercheur/panier-create-chercheur.component';
import { PanierEditChercheurComponent } from './panier-chercheur/edit-chercheur/panier-edit-chercheur.component';
import { PanierViewChercheurComponent } from './panier-chercheur/view-chercheur/panier-view-chercheur.component';
import { PanierListChercheurComponent } from './panier-chercheur/list-chercheur/panier-list-chercheur.component';
import { PanierChercheurComponent } from './panier-chercheur/panier-chercheur.component';
import { ChercheurCreateChercheurComponent } from './chercheur-chercheur/create-chercheur/chercheur-create-chercheur.component';
import { ChercheurEditChercheurComponent } from './chercheur-chercheur/edit-chercheur/chercheur-edit-chercheur.component';
import { ChercheurViewChercheurComponent } from './chercheur-chercheur/view-chercheur/chercheur-view-chercheur.component';
import { ChercheurListChercheurComponent } from './chercheur-chercheur/list-chercheur/chercheur-list-chercheur.component';
import { ChercheurChercheurComponent } from './chercheur-chercheur/chercheur-chercheur.component';
import { OffreReductionCreateChercheurComponent } from './offre-reduction-chercheur/create-chercheur/offre-reduction-create-chercheur.component';
import { OffreReductionEditChercheurComponent } from './offre-reduction-chercheur/edit-chercheur/offre-reduction-edit-chercheur.component';
import { OffreReductionViewChercheurComponent } from './offre-reduction-chercheur/view-chercheur/offre-reduction-view-chercheur.component';
import { OffreReductionListChercheurComponent } from './offre-reduction-chercheur/list-chercheur/offre-reduction-list-chercheur.component';
import { OffreReductionChercheurComponent } from './offre-reduction-chercheur/offre-reduction-chercheur.component';
import { TypeContributeurCreateChercheurComponent } from './type-contributeur-chercheur/create-chercheur/type-contributeur-create-chercheur.component';
import { TypeContributeurEditChercheurComponent } from './type-contributeur-chercheur/edit-chercheur/type-contributeur-edit-chercheur.component';
import { TypeContributeurViewChercheurComponent } from './type-contributeur-chercheur/view-chercheur/type-contributeur-view-chercheur.component';
import { TypeContributeurListChercheurComponent } from './type-contributeur-chercheur/list-chercheur/type-contributeur-list-chercheur.component';
import { TypeContributeurChercheurComponent } from './type-contributeur-chercheur/type-contributeur-chercheur.component';
import { EtatPanierCreateChercheurComponent } from './etat-panier-chercheur/create-chercheur/etat-panier-create-chercheur.component';
import { EtatPanierEditChercheurComponent } from './etat-panier-chercheur/edit-chercheur/etat-panier-edit-chercheur.component';
import { EtatPanierViewChercheurComponent } from './etat-panier-chercheur/view-chercheur/etat-panier-view-chercheur.component';
import { EtatPanierListChercheurComponent } from './etat-panier-chercheur/list-chercheur/etat-panier-list-chercheur.component';
import { EtatPanierChercheurComponent } from './etat-panier-chercheur/etat-panier-chercheur.component';
import { EtatImageCreateChercheurComponent } from './etat-image-chercheur/create-chercheur/etat-image-create-chercheur.component';
import { EtatImageEditChercheurComponent } from './etat-image-chercheur/edit-chercheur/etat-image-edit-chercheur.component';
import { EtatImageViewChercheurComponent } from './etat-image-chercheur/view-chercheur/etat-image-view-chercheur.component';
import { EtatImageListChercheurComponent } from './etat-image-chercheur/list-chercheur/etat-image-list-chercheur.component';
import { EtatImageChercheurComponent } from './etat-image-chercheur/etat-image-chercheur.component';
import { ClientCreateChercheurComponent } from './client-chercheur/create-chercheur/client-create-chercheur.component';
import { ClientEditChercheurComponent } from './client-chercheur/edit-chercheur/client-edit-chercheur.component';
import { ClientViewChercheurComponent } from './client-chercheur/view-chercheur/client-view-chercheur.component';
import { ClientListChercheurComponent } from './client-chercheur/list-chercheur/client-list-chercheur.component';
import { ClientChercheurComponent } from './client-chercheur/client-chercheur.component';
import { TagBucketCreateChercheurComponent } from './tag-bucket-chercheur/create-chercheur/tag-bucket-create-chercheur.component';
import { TagBucketEditChercheurComponent } from './tag-bucket-chercheur/edit-chercheur/tag-bucket-edit-chercheur.component';
import { TagBucketViewChercheurComponent } from './tag-bucket-chercheur/view-chercheur/tag-bucket-view-chercheur.component';
import { TagBucketListChercheurComponent } from './tag-bucket-chercheur/list-chercheur/tag-bucket-list-chercheur.component';
import { TagBucketChercheurComponent } from './tag-bucket-chercheur/tag-bucket-chercheur.component';
import { StateBucketCreateChercheurComponent } from './state-bucket-chercheur/create-chercheur/state-bucket-create-chercheur.component';
import { StateBucketEditChercheurComponent } from './state-bucket-chercheur/edit-chercheur/state-bucket-edit-chercheur.component';
import { StateBucketViewChercheurComponent } from './state-bucket-chercheur/view-chercheur/state-bucket-view-chercheur.component';
import { StateBucketListChercheurComponent } from './state-bucket-chercheur/list-chercheur/state-bucket-list-chercheur.component';
import { StateBucketChercheurComponent } from './state-bucket-chercheur/state-bucket-chercheur.component';
import { TypeImageCreateChercheurComponent } from './type-image-chercheur/create-chercheur/type-image-create-chercheur.component';
import { TypeImageEditChercheurComponent } from './type-image-chercheur/edit-chercheur/type-image-edit-chercheur.component';
import { TypeImageViewChercheurComponent } from './type-image-chercheur/view-chercheur/type-image-view-chercheur.component';
import { TypeImageListChercheurComponent } from './type-image-chercheur/list-chercheur/type-image-list-chercheur.component';
import { TypeImageChercheurComponent } from './type-image-chercheur/type-image-chercheur.component';
import { BucketCreateChercheurComponent } from './bucket-chercheur/create-chercheur/bucket-create-chercheur.component';
import { BucketEditChercheurComponent } from './bucket-chercheur/edit-chercheur/bucket-edit-chercheur.component';
import { BucketViewChercheurComponent } from './bucket-chercheur/view-chercheur/bucket-view-chercheur.component';
import { BucketListChercheurComponent } from './bucket-chercheur/list-chercheur/bucket-list-chercheur.component';
import { BucketChercheurComponent } from './bucket-chercheur/bucket-chercheur.component';
import { AbonnementCreateChercheurComponent } from './abonnement-chercheur/create-chercheur/abonnement-create-chercheur.component';
import { AbonnementEditChercheurComponent } from './abonnement-chercheur/edit-chercheur/abonnement-edit-chercheur.component';
import { AbonnementViewChercheurComponent } from './abonnement-chercheur/view-chercheur/abonnement-view-chercheur.component';
import { AbonnementListChercheurComponent } from './abonnement-chercheur/list-chercheur/abonnement-list-chercheur.component';
import { AbonnementChercheurComponent } from './abonnement-chercheur/abonnement-chercheur.component';
import { TagCreateChercheurComponent } from './tag-chercheur/create-chercheur/tag-create-chercheur.component';
import { TagEditChercheurComponent } from './tag-chercheur/edit-chercheur/tag-edit-chercheur.component';
import { TagViewChercheurComponent } from './tag-chercheur/view-chercheur/tag-view-chercheur.component';
import { TagListChercheurComponent } from './tag-chercheur/list-chercheur/tag-list-chercheur.component';
import { TagChercheurComponent } from './tag-chercheur/tag-chercheur.component';
import { CategorieItemCreateChercheurComponent } from './categorie-item-chercheur/create-chercheur/categorie-item-create-chercheur.component';
import { CategorieItemEditChercheurComponent } from './categorie-item-chercheur/edit-chercheur/categorie-item-edit-chercheur.component';
import { CategorieItemViewChercheurComponent } from './categorie-item-chercheur/view-chercheur/categorie-item-view-chercheur.component';
import { CategorieItemListChercheurComponent } from './categorie-item-chercheur/list-chercheur/categorie-item-list-chercheur.component';
import { CategorieItemChercheurComponent } from './categorie-item-chercheur/categorie-item-chercheur.component';
import { ImageCreateChercheurComponent } from './image-chercheur/create-chercheur/image-create-chercheur.component';
import { ImageEditChercheurComponent } from './image-chercheur/edit-chercheur/image-edit-chercheur.component';
import { ImageViewChercheurComponent } from './image-chercheur/view-chercheur/image-view-chercheur.component';
import { ImageListChercheurComponent } from './image-chercheur/list-chercheur/image-list-chercheur.component';
import { ImageChercheurComponent } from './image-chercheur/image-chercheur.component';
import { PaiementCreateChercheurComponent } from './paiement-chercheur/create-chercheur/paiement-create-chercheur.component';
import { PaiementEditChercheurComponent } from './paiement-chercheur/edit-chercheur/paiement-edit-chercheur.component';
import { PaiementViewChercheurComponent } from './paiement-chercheur/view-chercheur/paiement-view-chercheur.component';
import { PaiementListChercheurComponent } from './paiement-chercheur/list-chercheur/paiement-list-chercheur.component';
import { PaiementChercheurComponent } from './paiement-chercheur/paiement-chercheur.component';
import { PackAbonnementCreateChercheurComponent } from './pack-abonnement-chercheur/create-chercheur/pack-abonnement-create-chercheur.component';
import { PackAbonnementEditChercheurComponent } from './pack-abonnement-chercheur/edit-chercheur/pack-abonnement-edit-chercheur.component';
import { PackAbonnementViewChercheurComponent } from './pack-abonnement-chercheur/view-chercheur/pack-abonnement-view-chercheur.component';
import { PackAbonnementListChercheurComponent } from './pack-abonnement-chercheur/list-chercheur/pack-abonnement-list-chercheur.component';
import { PackAbonnementChercheurComponent } from './pack-abonnement-chercheur/pack-abonnement-chercheur.component';
import { TypeClientCreateChercheurComponent } from './type-client-chercheur/create-chercheur/type-client-create-chercheur.component';
import { TypeClientEditChercheurComponent } from './type-client-chercheur/edit-chercheur/type-client-edit-chercheur.component';
import { TypeClientViewChercheurComponent } from './type-client-chercheur/view-chercheur/type-client-view-chercheur.component';
import { TypeClientListChercheurComponent } from './type-client-chercheur/list-chercheur/type-client-list-chercheur.component';
import { TypeClientChercheurComponent } from './type-client-chercheur/type-client-chercheur.component';
import { ContributeurCreateChercheurComponent } from './contributeur-chercheur/create-chercheur/contributeur-create-chercheur.component';
import { ContributeurEditChercheurComponent } from './contributeur-chercheur/edit-chercheur/contributeur-edit-chercheur.component';
import { ContributeurViewChercheurComponent } from './contributeur-chercheur/view-chercheur/contributeur-view-chercheur.component';
import { ContributeurListChercheurComponent } from './contributeur-chercheur/list-chercheur/contributeur-list-chercheur.component';
import { ContributeurChercheurComponent } from './contributeur-chercheur/contributeur-chercheur.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';


@NgModule({
    declarations: [
        TypePaiementCreateChercheurComponent,
        TypePaiementListChercheurComponent,
        TypePaiementViewChercheurComponent,
        TypePaiementEditChercheurComponent,
        TypePaiementChercheurComponent,
        EtatAbonnementCreateChercheurComponent,
        EtatAbonnementListChercheurComponent,
        EtatAbonnementViewChercheurComponent,
        EtatAbonnementEditChercheurComponent,
        EtatAbonnementChercheurComponent,
        ContractCreateChercheurComponent,
        ContractListChercheurComponent,
        ContractViewChercheurComponent,
        ContractEditChercheurComponent,
        ContractChercheurComponent,
        SignatureCreateChercheurComponent,
        SignatureListChercheurComponent,
        SignatureViewChercheurComponent,
        SignatureEditChercheurComponent,
        SignatureChercheurComponent,
        TypeContratCreateChercheurComponent,
        TypeContratListChercheurComponent,
        TypeContratViewChercheurComponent,
        TypeContratEditChercheurComponent,
        TypeContratChercheurComponent,
        PanierItemCreateChercheurComponent,
        PanierItemListChercheurComponent,
        PanierItemViewChercheurComponent,
        PanierItemEditChercheurComponent,
        PanierItemChercheurComponent,
        CategorieImageCreateChercheurComponent,
        CategorieImageListChercheurComponent,
        CategorieImageViewChercheurComponent,
        CategorieImageEditChercheurComponent,
        CategorieImageChercheurComponent,
        PanierCreateChercheurComponent,
        PanierListChercheurComponent,
        PanierViewChercheurComponent,
        PanierEditChercheurComponent,
        PanierChercheurComponent,
        ChercheurCreateChercheurComponent,
        ChercheurListChercheurComponent,
        ChercheurViewChercheurComponent,
        ChercheurEditChercheurComponent,
        ChercheurChercheurComponent,
        OffreReductionCreateChercheurComponent,
        OffreReductionListChercheurComponent,
        OffreReductionViewChercheurComponent,
        OffreReductionEditChercheurComponent,
        OffreReductionChercheurComponent,
        TypeContributeurCreateChercheurComponent,
        TypeContributeurListChercheurComponent,
        TypeContributeurViewChercheurComponent,
        TypeContributeurEditChercheurComponent,
        TypeContributeurChercheurComponent,
        EtatPanierCreateChercheurComponent,
        EtatPanierListChercheurComponent,
        EtatPanierViewChercheurComponent,
        EtatPanierEditChercheurComponent,
        EtatPanierChercheurComponent,
        EtatImageCreateChercheurComponent,
        EtatImageListChercheurComponent,
        EtatImageViewChercheurComponent,
        EtatImageEditChercheurComponent,
        EtatImageChercheurComponent,
        ClientCreateChercheurComponent,
        ClientListChercheurComponent,
        ClientViewChercheurComponent,
        ClientEditChercheurComponent,
        ClientChercheurComponent,
        TagBucketCreateChercheurComponent,
        TagBucketListChercheurComponent,
        TagBucketViewChercheurComponent,
        TagBucketEditChercheurComponent,
        TagBucketChercheurComponent,
        StateBucketCreateChercheurComponent,
        StateBucketListChercheurComponent,
        StateBucketViewChercheurComponent,
        StateBucketEditChercheurComponent,
        StateBucketChercheurComponent,
        TypeImageCreateChercheurComponent,
        TypeImageListChercheurComponent,
        TypeImageViewChercheurComponent,
        TypeImageEditChercheurComponent,
        TypeImageChercheurComponent,
        BucketCreateChercheurComponent,
        BucketListChercheurComponent,
        BucketViewChercheurComponent,
        BucketEditChercheurComponent,
        BucketChercheurComponent,
        AbonnementCreateChercheurComponent,
        AbonnementListChercheurComponent,
        AbonnementViewChercheurComponent,
        AbonnementEditChercheurComponent,
        AbonnementChercheurComponent,
        TagCreateChercheurComponent,
        TagListChercheurComponent,
        TagViewChercheurComponent,
        TagEditChercheurComponent,
        TagChercheurComponent,
        CategorieItemCreateChercheurComponent,
        CategorieItemListChercheurComponent,
        CategorieItemViewChercheurComponent,
        CategorieItemEditChercheurComponent,
        CategorieItemChercheurComponent,
        ImageCreateChercheurComponent,
        ImageListChercheurComponent,
        ImageViewChercheurComponent,
        ImageEditChercheurComponent,
        ImageChercheurComponent,
        PaiementCreateChercheurComponent,
        PaiementListChercheurComponent,
        PaiementViewChercheurComponent,
        PaiementEditChercheurComponent,
        PaiementChercheurComponent,
        PackAbonnementCreateChercheurComponent,
        PackAbonnementListChercheurComponent,
        PackAbonnementViewChercheurComponent,
        PackAbonnementEditChercheurComponent,
        PackAbonnementChercheurComponent,
        TypeClientCreateChercheurComponent,
        TypeClientListChercheurComponent,
        TypeClientViewChercheurComponent,
        TypeClientEditChercheurComponent,
        TypeClientChercheurComponent,
        ContributeurCreateChercheurComponent,
        ContributeurListChercheurComponent,
        ContributeurViewChercheurComponent,
        ContributeurEditChercheurComponent,
        ContributeurChercheurComponent,
    ],
    imports: [
        CommonModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        ConfirmDialogModule,
        DialogModule,
        PasswordModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SplitButtonModule,
        BrowserAnimationsModule,
        DropdownModule,
        TabViewModule,
        InputSwitchModule,
        InputTextareaModule,
        CalendarModule,
        PanelModule,
        MessageModule,
        MessagesModule,
        InputNumberModule,
        BadgeModule,
        MultiSelectModule,
    ],
    exports: [
        TypePaiementCreateChercheurComponent,
        TypePaiementListChercheurComponent,
        TypePaiementViewChercheurComponent,
        TypePaiementEditChercheurComponent,
        TypePaiementChercheurComponent,
        EtatAbonnementCreateChercheurComponent,
        EtatAbonnementListChercheurComponent,
        EtatAbonnementViewChercheurComponent,
        EtatAbonnementEditChercheurComponent,
        EtatAbonnementChercheurComponent,
        ContractCreateChercheurComponent,
        ContractListChercheurComponent,
        ContractViewChercheurComponent,
        ContractEditChercheurComponent,
        ContractChercheurComponent,
        SignatureCreateChercheurComponent,
        SignatureListChercheurComponent,
        SignatureViewChercheurComponent,
        SignatureEditChercheurComponent,
        SignatureChercheurComponent,
        TypeContratCreateChercheurComponent,
        TypeContratListChercheurComponent,
        TypeContratViewChercheurComponent,
        TypeContratEditChercheurComponent,
        TypeContratChercheurComponent,
        PanierItemCreateChercheurComponent,
        PanierItemListChercheurComponent,
        PanierItemViewChercheurComponent,
        PanierItemEditChercheurComponent,
        PanierItemChercheurComponent,
        CategorieImageCreateChercheurComponent,
        CategorieImageListChercheurComponent,
        CategorieImageViewChercheurComponent,
        CategorieImageEditChercheurComponent,
        CategorieImageChercheurComponent,
        PanierCreateChercheurComponent,
        PanierListChercheurComponent,
        PanierViewChercheurComponent,
        PanierEditChercheurComponent,
        PanierChercheurComponent,
        ChercheurCreateChercheurComponent,
        ChercheurListChercheurComponent,
        ChercheurViewChercheurComponent,
        ChercheurEditChercheurComponent,
        ChercheurChercheurComponent,
        OffreReductionCreateChercheurComponent,
        OffreReductionListChercheurComponent,
        OffreReductionViewChercheurComponent,
        OffreReductionEditChercheurComponent,
        OffreReductionChercheurComponent,
        TypeContributeurCreateChercheurComponent,
        TypeContributeurListChercheurComponent,
        TypeContributeurViewChercheurComponent,
        TypeContributeurEditChercheurComponent,
        TypeContributeurChercheurComponent,
        EtatPanierCreateChercheurComponent,
        EtatPanierListChercheurComponent,
        EtatPanierViewChercheurComponent,
        EtatPanierEditChercheurComponent,
        EtatPanierChercheurComponent,
        EtatImageCreateChercheurComponent,
        EtatImageListChercheurComponent,
        EtatImageViewChercheurComponent,
        EtatImageEditChercheurComponent,
        EtatImageChercheurComponent,
        ClientCreateChercheurComponent,
        ClientListChercheurComponent,
        ClientViewChercheurComponent,
        ClientEditChercheurComponent,
        ClientChercheurComponent,
        TagBucketCreateChercheurComponent,
        TagBucketListChercheurComponent,
        TagBucketViewChercheurComponent,
        TagBucketEditChercheurComponent,
        TagBucketChercheurComponent,
        StateBucketCreateChercheurComponent,
        StateBucketListChercheurComponent,
        StateBucketViewChercheurComponent,
        StateBucketEditChercheurComponent,
        StateBucketChercheurComponent,
        TypeImageCreateChercheurComponent,
        TypeImageListChercheurComponent,
        TypeImageViewChercheurComponent,
        TypeImageEditChercheurComponent,
        TypeImageChercheurComponent,
        BucketCreateChercheurComponent,
        BucketListChercheurComponent,
        BucketViewChercheurComponent,
        BucketEditChercheurComponent,
        BucketChercheurComponent,
        AbonnementCreateChercheurComponent,
        AbonnementListChercheurComponent,
        AbonnementViewChercheurComponent,
        AbonnementEditChercheurComponent,
        AbonnementChercheurComponent,
        TagCreateChercheurComponent,
        TagListChercheurComponent,
        TagViewChercheurComponent,
        TagEditChercheurComponent,
        TagChercheurComponent,
        CategorieItemCreateChercheurComponent,
        CategorieItemListChercheurComponent,
        CategorieItemViewChercheurComponent,
        CategorieItemEditChercheurComponent,
        CategorieItemChercheurComponent,
        ImageCreateChercheurComponent,
        ImageListChercheurComponent,
        ImageViewChercheurComponent,
        ImageEditChercheurComponent,
        ImageChercheurComponent,
        PaiementCreateChercheurComponent,
        PaiementListChercheurComponent,
        PaiementViewChercheurComponent,
        PaiementEditChercheurComponent,
        PaiementChercheurComponent,
        PackAbonnementCreateChercheurComponent,
        PackAbonnementListChercheurComponent,
        PackAbonnementViewChercheurComponent,
        PackAbonnementEditChercheurComponent,
        PackAbonnementChercheurComponent,
        TypeClientCreateChercheurComponent,
        TypeClientListChercheurComponent,
        TypeClientViewChercheurComponent,
        TypeClientEditChercheurComponent,
        TypeClientChercheurComponent,
        ContributeurCreateChercheurComponent,
        ContributeurListChercheurComponent,
        ContributeurViewChercheurComponent,
        ContributeurEditChercheurComponent,
        ContributeurChercheurComponent,
    ]
})
export class ZeneratorChercheurModule { }
