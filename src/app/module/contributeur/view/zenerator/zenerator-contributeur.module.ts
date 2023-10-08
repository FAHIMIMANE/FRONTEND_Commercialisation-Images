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

import { TypePaiementCreateContributeurComponent } from './type-paiement-contributeur/create-contributeur/type-paiement-create-contributeur.component';
import { TypePaiementEditContributeurComponent } from './type-paiement-contributeur/edit-contributeur/type-paiement-edit-contributeur.component';
import { TypePaiementViewContributeurComponent } from './type-paiement-contributeur/view-contributeur/type-paiement-view-contributeur.component';
import { TypePaiementListContributeurComponent } from './type-paiement-contributeur/list-contributeur/type-paiement-list-contributeur.component';
import { TypePaiementContributeurComponent } from './type-paiement-contributeur/type-paiement-contributeur.component';
import { EtatAbonnementCreateContributeurComponent } from './etat-abonnement-contributeur/create-contributeur/etat-abonnement-create-contributeur.component';
import { EtatAbonnementEditContributeurComponent } from './etat-abonnement-contributeur/edit-contributeur/etat-abonnement-edit-contributeur.component';
import { EtatAbonnementViewContributeurComponent } from './etat-abonnement-contributeur/view-contributeur/etat-abonnement-view-contributeur.component';
import { EtatAbonnementListContributeurComponent } from './etat-abonnement-contributeur/list-contributeur/etat-abonnement-list-contributeur.component';
import { EtatAbonnementContributeurComponent } from './etat-abonnement-contributeur/etat-abonnement-contributeur.component';
import { ContractCreateContributeurComponent } from './contract-contributeur/create-contributeur/contract-create-contributeur.component';
import { ContractEditContributeurComponent } from './contract-contributeur/edit-contributeur/contract-edit-contributeur.component';
import { ContractViewContributeurComponent } from './contract-contributeur/view-contributeur/contract-view-contributeur.component';
import { ContractListContributeurComponent } from './contract-contributeur/list-contributeur/contract-list-contributeur.component';
import { ContractContributeurComponent } from './contract-contributeur/contract-contributeur.component';
import { SignatureCreateContributeurComponent } from './signature-contributeur/create-contributeur/signature-create-contributeur.component';
import { SignatureEditContributeurComponent } from './signature-contributeur/edit-contributeur/signature-edit-contributeur.component';
import { SignatureViewContributeurComponent } from './signature-contributeur/view-contributeur/signature-view-contributeur.component';
import { SignatureListContributeurComponent } from './signature-contributeur/list-contributeur/signature-list-contributeur.component';
import { SignatureContributeurComponent } from './signature-contributeur/signature-contributeur.component';
import { TypeContratCreateContributeurComponent } from './type-contrat-contributeur/create-contributeur/type-contrat-create-contributeur.component';
import { TypeContratEditContributeurComponent } from './type-contrat-contributeur/edit-contributeur/type-contrat-edit-contributeur.component';
import { TypeContratViewContributeurComponent } from './type-contrat-contributeur/view-contributeur/type-contrat-view-contributeur.component';
import { TypeContratListContributeurComponent } from './type-contrat-contributeur/list-contributeur/type-contrat-list-contributeur.component';
import { TypeContratContributeurComponent } from './type-contrat-contributeur/type-contrat-contributeur.component';
import { PanierItemCreateContributeurComponent } from './panier-item-contributeur/create-contributeur/panier-item-create-contributeur.component';
import { PanierItemEditContributeurComponent } from './panier-item-contributeur/edit-contributeur/panier-item-edit-contributeur.component';
import { PanierItemViewContributeurComponent } from './panier-item-contributeur/view-contributeur/panier-item-view-contributeur.component';
import { PanierItemListContributeurComponent } from './panier-item-contributeur/list-contributeur/panier-item-list-contributeur.component';
import { PanierItemContributeurComponent } from './panier-item-contributeur/panier-item-contributeur.component';
import { CategorieImageCreateContributeurComponent } from './categorie-image-contributeur/create-contributeur/categorie-image-create-contributeur.component';
import { CategorieImageEditContributeurComponent } from './categorie-image-contributeur/edit-contributeur/categorie-image-edit-contributeur.component';
import { CategorieImageViewContributeurComponent } from './categorie-image-contributeur/view-contributeur/categorie-image-view-contributeur.component';
import { CategorieImageListContributeurComponent } from './categorie-image-contributeur/list-contributeur/categorie-image-list-contributeur.component';
import { CategorieImageContributeurComponent } from './categorie-image-contributeur/categorie-image-contributeur.component';
import { PanierCreateContributeurComponent } from './panier-contributeur/create-contributeur/panier-create-contributeur.component';
import { PanierEditContributeurComponent } from './panier-contributeur/edit-contributeur/panier-edit-contributeur.component';
import { PanierViewContributeurComponent } from './panier-contributeur/view-contributeur/panier-view-contributeur.component';
import { PanierListContributeurComponent } from './panier-contributeur/list-contributeur/panier-list-contributeur.component';
import { PanierContributeurComponent } from './panier-contributeur/panier-contributeur.component';
import { ChercheurCreateContributeurComponent } from './chercheur-contributeur/create-contributeur/chercheur-create-contributeur.component';
import { ChercheurEditContributeurComponent } from './chercheur-contributeur/edit-contributeur/chercheur-edit-contributeur.component';
import { ChercheurViewContributeurComponent } from './chercheur-contributeur/view-contributeur/chercheur-view-contributeur.component';
import { ChercheurListContributeurComponent } from './chercheur-contributeur/list-contributeur/chercheur-list-contributeur.component';
import { ChercheurContributeurComponent } from './chercheur-contributeur/chercheur-contributeur.component';
import { OffreReductionCreateContributeurComponent } from './offre-reduction-contributeur/create-contributeur/offre-reduction-create-contributeur.component';
import { OffreReductionEditContributeurComponent } from './offre-reduction-contributeur/edit-contributeur/offre-reduction-edit-contributeur.component';
import { OffreReductionViewContributeurComponent } from './offre-reduction-contributeur/view-contributeur/offre-reduction-view-contributeur.component';
import { OffreReductionListContributeurComponent } from './offre-reduction-contributeur/list-contributeur/offre-reduction-list-contributeur.component';
import { OffreReductionContributeurComponent } from './offre-reduction-contributeur/offre-reduction-contributeur.component';
import { TypeContributeurCreateContributeurComponent } from './type-contributeur-contributeur/create-contributeur/type-contributeur-create-contributeur.component';
import { TypeContributeurEditContributeurComponent } from './type-contributeur-contributeur/edit-contributeur/type-contributeur-edit-contributeur.component';
import { TypeContributeurViewContributeurComponent } from './type-contributeur-contributeur/view-contributeur/type-contributeur-view-contributeur.component';
import { TypeContributeurListContributeurComponent } from './type-contributeur-contributeur/list-contributeur/type-contributeur-list-contributeur.component';
import { TypeContributeurContributeurComponent } from './type-contributeur-contributeur/type-contributeur-contributeur.component';
import { EtatPanierCreateContributeurComponent } from './etat-panier-contributeur/create-contributeur/etat-panier-create-contributeur.component';
import { EtatPanierEditContributeurComponent } from './etat-panier-contributeur/edit-contributeur/etat-panier-edit-contributeur.component';
import { EtatPanierViewContributeurComponent } from './etat-panier-contributeur/view-contributeur/etat-panier-view-contributeur.component';
import { EtatPanierListContributeurComponent } from './etat-panier-contributeur/list-contributeur/etat-panier-list-contributeur.component';
import { EtatPanierContributeurComponent } from './etat-panier-contributeur/etat-panier-contributeur.component';
import { EtatImageCreateContributeurComponent } from './etat-image-contributeur/create-contributeur/etat-image-create-contributeur.component';
import { EtatImageEditContributeurComponent } from './etat-image-contributeur/edit-contributeur/etat-image-edit-contributeur.component';
import { EtatImageViewContributeurComponent } from './etat-image-contributeur/view-contributeur/etat-image-view-contributeur.component';
import { EtatImageListContributeurComponent } from './etat-image-contributeur/list-contributeur/etat-image-list-contributeur.component';
import { EtatImageContributeurComponent } from './etat-image-contributeur/etat-image-contributeur.component';
import { ClientCreateContributeurComponent } from './client-contributeur/create-contributeur/client-create-contributeur.component';
import { ClientEditContributeurComponent } from './client-contributeur/edit-contributeur/client-edit-contributeur.component';
import { ClientViewContributeurComponent } from './client-contributeur/view-contributeur/client-view-contributeur.component';
import { ClientListContributeurComponent } from './client-contributeur/list-contributeur/client-list-contributeur.component';
import { ClientContributeurComponent } from './client-contributeur/client-contributeur.component';
import { TagBucketCreateContributeurComponent } from './tag-bucket-contributeur/create-contributeur/tag-bucket-create-contributeur.component';
import { TagBucketEditContributeurComponent } from './tag-bucket-contributeur/edit-contributeur/tag-bucket-edit-contributeur.component';
import { TagBucketViewContributeurComponent } from './tag-bucket-contributeur/view-contributeur/tag-bucket-view-contributeur.component';
import { TagBucketListContributeurComponent } from './tag-bucket-contributeur/list-contributeur/tag-bucket-list-contributeur.component';
import { TagBucketContributeurComponent } from './tag-bucket-contributeur/tag-bucket-contributeur.component';
import { StateBucketCreateContributeurComponent } from './state-bucket-contributeur/create-contributeur/state-bucket-create-contributeur.component';
import { StateBucketEditContributeurComponent } from './state-bucket-contributeur/edit-contributeur/state-bucket-edit-contributeur.component';
import { StateBucketViewContributeurComponent } from './state-bucket-contributeur/view-contributeur/state-bucket-view-contributeur.component';
import { StateBucketListContributeurComponent } from './state-bucket-contributeur/list-contributeur/state-bucket-list-contributeur.component';
import { StateBucketContributeurComponent } from './state-bucket-contributeur/state-bucket-contributeur.component';
import { TypeImageCreateContributeurComponent } from './type-image-contributeur/create-contributeur/type-image-create-contributeur.component';
import { TypeImageEditContributeurComponent } from './type-image-contributeur/edit-contributeur/type-image-edit-contributeur.component';
import { TypeImageViewContributeurComponent } from './type-image-contributeur/view-contributeur/type-image-view-contributeur.component';
import { TypeImageListContributeurComponent } from './type-image-contributeur/list-contributeur/type-image-list-contributeur.component';
import { TypeImageContributeurComponent } from './type-image-contributeur/type-image-contributeur.component';
import { BucketCreateContributeurComponent } from './bucket-contributeur/create-contributeur/bucket-create-contributeur.component';
import { BucketEditContributeurComponent } from './bucket-contributeur/edit-contributeur/bucket-edit-contributeur.component';
import { BucketViewContributeurComponent } from './bucket-contributeur/view-contributeur/bucket-view-contributeur.component';
import { BucketListContributeurComponent } from './bucket-contributeur/list-contributeur/bucket-list-contributeur.component';
import { BucketContributeurComponent } from './bucket-contributeur/bucket-contributeur.component';
import { AbonnementCreateContributeurComponent } from './abonnement-contributeur/create-contributeur/abonnement-create-contributeur.component';
import { AbonnementEditContributeurComponent } from './abonnement-contributeur/edit-contributeur/abonnement-edit-contributeur.component';
import { AbonnementViewContributeurComponent } from './abonnement-contributeur/view-contributeur/abonnement-view-contributeur.component';
import { AbonnementListContributeurComponent } from './abonnement-contributeur/list-contributeur/abonnement-list-contributeur.component';
import { AbonnementContributeurComponent } from './abonnement-contributeur/abonnement-contributeur.component';
import { TagCreateContributeurComponent } from './tag-contributeur/create-contributeur/tag-create-contributeur.component';
import { TagEditContributeurComponent } from './tag-contributeur/edit-contributeur/tag-edit-contributeur.component';
import { TagViewContributeurComponent } from './tag-contributeur/view-contributeur/tag-view-contributeur.component';
import { TagListContributeurComponent } from './tag-contributeur/list-contributeur/tag-list-contributeur.component';
import { TagContributeurComponent } from './tag-contributeur/tag-contributeur.component';
import { CategorieItemCreateContributeurComponent } from './categorie-item-contributeur/create-contributeur/categorie-item-create-contributeur.component';
import { CategorieItemEditContributeurComponent } from './categorie-item-contributeur/edit-contributeur/categorie-item-edit-contributeur.component';
import { CategorieItemViewContributeurComponent } from './categorie-item-contributeur/view-contributeur/categorie-item-view-contributeur.component';
import { CategorieItemListContributeurComponent } from './categorie-item-contributeur/list-contributeur/categorie-item-list-contributeur.component';
import { CategorieItemContributeurComponent } from './categorie-item-contributeur/categorie-item-contributeur.component';
import { ImageCreateContributeurComponent } from './image-contributeur/create-contributeur/image-create-contributeur.component';
import { ImageEditContributeurComponent } from './image-contributeur/edit-contributeur/image-edit-contributeur.component';
import { ImageViewContributeurComponent } from './image-contributeur/view-contributeur/image-view-contributeur.component';
import { ImageListContributeurComponent } from './image-contributeur/list-contributeur/image-list-contributeur.component';
import { ImageContributeurComponent } from './image-contributeur/image-contributeur.component';
import { PaiementCreateContributeurComponent } from './paiement-contributeur/create-contributeur/paiement-create-contributeur.component';
import { PaiementEditContributeurComponent } from './paiement-contributeur/edit-contributeur/paiement-edit-contributeur.component';
import { PaiementViewContributeurComponent } from './paiement-contributeur/view-contributeur/paiement-view-contributeur.component';
import { PaiementListContributeurComponent } from './paiement-contributeur/list-contributeur/paiement-list-contributeur.component';
import { PaiementContributeurComponent } from './paiement-contributeur/paiement-contributeur.component';
import { PackAbonnementCreateContributeurComponent } from './pack-abonnement-contributeur/create-contributeur/pack-abonnement-create-contributeur.component';
import { PackAbonnementEditContributeurComponent } from './pack-abonnement-contributeur/edit-contributeur/pack-abonnement-edit-contributeur.component';
import { PackAbonnementViewContributeurComponent } from './pack-abonnement-contributeur/view-contributeur/pack-abonnement-view-contributeur.component';
import { PackAbonnementListContributeurComponent } from './pack-abonnement-contributeur/list-contributeur/pack-abonnement-list-contributeur.component';
import { PackAbonnementContributeurComponent } from './pack-abonnement-contributeur/pack-abonnement-contributeur.component';
import { TypeClientCreateContributeurComponent } from './type-client-contributeur/create-contributeur/type-client-create-contributeur.component';
import { TypeClientEditContributeurComponent } from './type-client-contributeur/edit-contributeur/type-client-edit-contributeur.component';
import { TypeClientViewContributeurComponent } from './type-client-contributeur/view-contributeur/type-client-view-contributeur.component';
import { TypeClientListContributeurComponent } from './type-client-contributeur/list-contributeur/type-client-list-contributeur.component';
import { TypeClientContributeurComponent } from './type-client-contributeur/type-client-contributeur.component';
import { ContributeurCreateContributeurComponent } from './contributeur-contributeur/create-contributeur/contributeur-create-contributeur.component';
import { ContributeurEditContributeurComponent } from './contributeur-contributeur/edit-contributeur/contributeur-edit-contributeur.component';
import { ContributeurViewContributeurComponent } from './contributeur-contributeur/view-contributeur/contributeur-view-contributeur.component';
import { ContributeurListContributeurComponent } from './contributeur-contributeur/list-contributeur/contributeur-list-contributeur.component';
import { ContributeurContributeurComponent } from './contributeur-contributeur/contributeur-contributeur.component';

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
        TypePaiementCreateContributeurComponent,
        TypePaiementListContributeurComponent,
        TypePaiementViewContributeurComponent,
        TypePaiementEditContributeurComponent,
        TypePaiementContributeurComponent,
        EtatAbonnementCreateContributeurComponent,
        EtatAbonnementListContributeurComponent,
        EtatAbonnementViewContributeurComponent,
        EtatAbonnementEditContributeurComponent,
        EtatAbonnementContributeurComponent,
        ContractCreateContributeurComponent,
        ContractListContributeurComponent,
        ContractViewContributeurComponent,
        ContractEditContributeurComponent,
        ContractContributeurComponent,
        SignatureCreateContributeurComponent,
        SignatureListContributeurComponent,
        SignatureViewContributeurComponent,
        SignatureEditContributeurComponent,
        SignatureContributeurComponent,
        TypeContratCreateContributeurComponent,
        TypeContratListContributeurComponent,
        TypeContratViewContributeurComponent,
        TypeContratEditContributeurComponent,
        TypeContratContributeurComponent,
        PanierItemCreateContributeurComponent,
        PanierItemListContributeurComponent,
        PanierItemViewContributeurComponent,
        PanierItemEditContributeurComponent,
        PanierItemContributeurComponent,
        CategorieImageCreateContributeurComponent,
        CategorieImageListContributeurComponent,
        CategorieImageViewContributeurComponent,
        CategorieImageEditContributeurComponent,
        CategorieImageContributeurComponent,
        PanierCreateContributeurComponent,
        PanierListContributeurComponent,
        PanierViewContributeurComponent,
        PanierEditContributeurComponent,
        PanierContributeurComponent,
        ChercheurCreateContributeurComponent,
        ChercheurListContributeurComponent,
        ChercheurViewContributeurComponent,
        ChercheurEditContributeurComponent,
        ChercheurContributeurComponent,
        OffreReductionCreateContributeurComponent,
        OffreReductionListContributeurComponent,
        OffreReductionViewContributeurComponent,
        OffreReductionEditContributeurComponent,
        OffreReductionContributeurComponent,
        TypeContributeurCreateContributeurComponent,
        TypeContributeurListContributeurComponent,
        TypeContributeurViewContributeurComponent,
        TypeContributeurEditContributeurComponent,
        TypeContributeurContributeurComponent,
        EtatPanierCreateContributeurComponent,
        EtatPanierListContributeurComponent,
        EtatPanierViewContributeurComponent,
        EtatPanierEditContributeurComponent,
        EtatPanierContributeurComponent,
        EtatImageCreateContributeurComponent,
        EtatImageListContributeurComponent,
        EtatImageViewContributeurComponent,
        EtatImageEditContributeurComponent,
        EtatImageContributeurComponent,
        ClientCreateContributeurComponent,
        ClientListContributeurComponent,
        ClientViewContributeurComponent,
        ClientEditContributeurComponent,
        ClientContributeurComponent,
        TagBucketCreateContributeurComponent,
        TagBucketListContributeurComponent,
        TagBucketViewContributeurComponent,
        TagBucketEditContributeurComponent,
        TagBucketContributeurComponent,
        StateBucketCreateContributeurComponent,
        StateBucketListContributeurComponent,
        StateBucketViewContributeurComponent,
        StateBucketEditContributeurComponent,
        StateBucketContributeurComponent,
        TypeImageCreateContributeurComponent,
        TypeImageListContributeurComponent,
        TypeImageViewContributeurComponent,
        TypeImageEditContributeurComponent,
        TypeImageContributeurComponent,
        BucketCreateContributeurComponent,
        BucketListContributeurComponent,
        BucketViewContributeurComponent,
        BucketEditContributeurComponent,
        BucketContributeurComponent,
        AbonnementCreateContributeurComponent,
        AbonnementListContributeurComponent,
        AbonnementViewContributeurComponent,
        AbonnementEditContributeurComponent,
        AbonnementContributeurComponent,
        TagCreateContributeurComponent,
        TagListContributeurComponent,
        TagViewContributeurComponent,
        TagEditContributeurComponent,
        TagContributeurComponent,
        CategorieItemCreateContributeurComponent,
        CategorieItemListContributeurComponent,
        CategorieItemViewContributeurComponent,
        CategorieItemEditContributeurComponent,
        CategorieItemContributeurComponent,
        ImageCreateContributeurComponent,
        ImageListContributeurComponent,
        ImageViewContributeurComponent,
        ImageEditContributeurComponent,
        ImageContributeurComponent,
        PaiementCreateContributeurComponent,
        PaiementListContributeurComponent,
        PaiementViewContributeurComponent,
        PaiementEditContributeurComponent,
        PaiementContributeurComponent,
        PackAbonnementCreateContributeurComponent,
        PackAbonnementListContributeurComponent,
        PackAbonnementViewContributeurComponent,
        PackAbonnementEditContributeurComponent,
        PackAbonnementContributeurComponent,
        TypeClientCreateContributeurComponent,
        TypeClientListContributeurComponent,
        TypeClientViewContributeurComponent,
        TypeClientEditContributeurComponent,
        TypeClientContributeurComponent,
        ContributeurCreateContributeurComponent,
        ContributeurListContributeurComponent,
        ContributeurViewContributeurComponent,
        ContributeurEditContributeurComponent,
        ContributeurContributeurComponent,
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
        TypePaiementCreateContributeurComponent,
        TypePaiementListContributeurComponent,
        TypePaiementViewContributeurComponent,
        TypePaiementEditContributeurComponent,
        TypePaiementContributeurComponent,
        EtatAbonnementCreateContributeurComponent,
        EtatAbonnementListContributeurComponent,
        EtatAbonnementViewContributeurComponent,
        EtatAbonnementEditContributeurComponent,
        EtatAbonnementContributeurComponent,
        ContractCreateContributeurComponent,
        ContractListContributeurComponent,
        ContractViewContributeurComponent,
        ContractEditContributeurComponent,
        ContractContributeurComponent,
        SignatureCreateContributeurComponent,
        SignatureListContributeurComponent,
        SignatureViewContributeurComponent,
        SignatureEditContributeurComponent,
        SignatureContributeurComponent,
        TypeContratCreateContributeurComponent,
        TypeContratListContributeurComponent,
        TypeContratViewContributeurComponent,
        TypeContratEditContributeurComponent,
        TypeContratContributeurComponent,
        PanierItemCreateContributeurComponent,
        PanierItemListContributeurComponent,
        PanierItemViewContributeurComponent,
        PanierItemEditContributeurComponent,
        PanierItemContributeurComponent,
        CategorieImageCreateContributeurComponent,
        CategorieImageListContributeurComponent,
        CategorieImageViewContributeurComponent,
        CategorieImageEditContributeurComponent,
        CategorieImageContributeurComponent,
        PanierCreateContributeurComponent,
        PanierListContributeurComponent,
        PanierViewContributeurComponent,
        PanierEditContributeurComponent,
        PanierContributeurComponent,
        ChercheurCreateContributeurComponent,
        ChercheurListContributeurComponent,
        ChercheurViewContributeurComponent,
        ChercheurEditContributeurComponent,
        ChercheurContributeurComponent,
        OffreReductionCreateContributeurComponent,
        OffreReductionListContributeurComponent,
        OffreReductionViewContributeurComponent,
        OffreReductionEditContributeurComponent,
        OffreReductionContributeurComponent,
        TypeContributeurCreateContributeurComponent,
        TypeContributeurListContributeurComponent,
        TypeContributeurViewContributeurComponent,
        TypeContributeurEditContributeurComponent,
        TypeContributeurContributeurComponent,
        EtatPanierCreateContributeurComponent,
        EtatPanierListContributeurComponent,
        EtatPanierViewContributeurComponent,
        EtatPanierEditContributeurComponent,
        EtatPanierContributeurComponent,
        EtatImageCreateContributeurComponent,
        EtatImageListContributeurComponent,
        EtatImageViewContributeurComponent,
        EtatImageEditContributeurComponent,
        EtatImageContributeurComponent,
        ClientCreateContributeurComponent,
        ClientListContributeurComponent,
        ClientViewContributeurComponent,
        ClientEditContributeurComponent,
        ClientContributeurComponent,
        TagBucketCreateContributeurComponent,
        TagBucketListContributeurComponent,
        TagBucketViewContributeurComponent,
        TagBucketEditContributeurComponent,
        TagBucketContributeurComponent,
        StateBucketCreateContributeurComponent,
        StateBucketListContributeurComponent,
        StateBucketViewContributeurComponent,
        StateBucketEditContributeurComponent,
        StateBucketContributeurComponent,
        TypeImageCreateContributeurComponent,
        TypeImageListContributeurComponent,
        TypeImageViewContributeurComponent,
        TypeImageEditContributeurComponent,
        TypeImageContributeurComponent,
        BucketCreateContributeurComponent,
        BucketListContributeurComponent,
        BucketViewContributeurComponent,
        BucketEditContributeurComponent,
        BucketContributeurComponent,
        AbonnementCreateContributeurComponent,
        AbonnementListContributeurComponent,
        AbonnementViewContributeurComponent,
        AbonnementEditContributeurComponent,
        AbonnementContributeurComponent,
        TagCreateContributeurComponent,
        TagListContributeurComponent,
        TagViewContributeurComponent,
        TagEditContributeurComponent,
        TagContributeurComponent,
        CategorieItemCreateContributeurComponent,
        CategorieItemListContributeurComponent,
        CategorieItemViewContributeurComponent,
        CategorieItemEditContributeurComponent,
        CategorieItemContributeurComponent,
        ImageCreateContributeurComponent,
        ImageListContributeurComponent,
        ImageViewContributeurComponent,
        ImageEditContributeurComponent,
        ImageContributeurComponent,
        PaiementCreateContributeurComponent,
        PaiementListContributeurComponent,
        PaiementViewContributeurComponent,
        PaiementEditContributeurComponent,
        PaiementContributeurComponent,
        PackAbonnementCreateContributeurComponent,
        PackAbonnementListContributeurComponent,
        PackAbonnementViewContributeurComponent,
        PackAbonnementEditContributeurComponent,
        PackAbonnementContributeurComponent,
        TypeClientCreateContributeurComponent,
        TypeClientListContributeurComponent,
        TypeClientViewContributeurComponent,
        TypeClientEditContributeurComponent,
        TypeClientContributeurComponent,
        ContributeurCreateContributeurComponent,
        ContributeurListContributeurComponent,
        ContributeurViewContributeurComponent,
        ContributeurEditContributeurComponent,
        ContributeurContributeurComponent,
    ]
})
export class ZeneratorContributeurModule { }
