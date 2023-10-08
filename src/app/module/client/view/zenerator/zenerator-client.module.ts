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

import { TypePaiementCreateClientComponent } from './type-paiement-client/create-client/type-paiement-create-client.component';
import { TypePaiementEditClientComponent } from './type-paiement-client/edit-client/type-paiement-edit-client.component';
import { TypePaiementViewClientComponent } from './type-paiement-client/view-client/type-paiement-view-client.component';
import { TypePaiementListClientComponent } from './type-paiement-client/list-client/type-paiement-list-client.component';
import { TypePaiementClientComponent } from './type-paiement-client/type-paiement-client.component';
import { EtatAbonnementCreateClientComponent } from './etat-abonnement-client/create-client/etat-abonnement-create-client.component';
import { EtatAbonnementEditClientComponent } from './etat-abonnement-client/edit-client/etat-abonnement-edit-client.component';
import { EtatAbonnementViewClientComponent } from './etat-abonnement-client/view-client/etat-abonnement-view-client.component';
import { EtatAbonnementListClientComponent } from './etat-abonnement-client/list-client/etat-abonnement-list-client.component';
import { EtatAbonnementClientComponent } from './etat-abonnement-client/etat-abonnement-client.component';
import { ContractCreateClientComponent } from './contract-client/create-client/contract-create-client.component';
import { ContractEditClientComponent } from './contract-client/edit-client/contract-edit-client.component';
import { ContractViewClientComponent } from './contract-client/view-client/contract-view-client.component';
import { ContractListClientComponent } from './contract-client/list-client/contract-list-client.component';
import { ContractClientComponent } from './contract-client/contract-client.component';
import { SignatureCreateClientComponent } from './signature-client/create-client/signature-create-client.component';
import { SignatureEditClientComponent } from './signature-client/edit-client/signature-edit-client.component';
import { SignatureViewClientComponent } from './signature-client/view-client/signature-view-client.component';
import { SignatureListClientComponent } from './signature-client/list-client/signature-list-client.component';
import { SignatureClientComponent } from './signature-client/signature-client.component';
import { TypeContratCreateClientComponent } from './type-contrat-client/create-client/type-contrat-create-client.component';
import { TypeContratEditClientComponent } from './type-contrat-client/edit-client/type-contrat-edit-client.component';
import { TypeContratViewClientComponent } from './type-contrat-client/view-client/type-contrat-view-client.component';
import { TypeContratListClientComponent } from './type-contrat-client/list-client/type-contrat-list-client.component';
import { TypeContratClientComponent } from './type-contrat-client/type-contrat-client.component';
import { PanierItemCreateClientComponent } from './panier-item-client/create-client/panier-item-create-client.component';
import { PanierItemEditClientComponent } from './panier-item-client/edit-client/panier-item-edit-client.component';
import { PanierItemViewClientComponent } from './panier-item-client/view-client/panier-item-view-client.component';
import { PanierItemListClientComponent } from './panier-item-client/list-client/panier-item-list-client.component';
import { PanierItemClientComponent } from './panier-item-client/panier-item-client.component';
import { CategorieImageCreateClientComponent } from './categorie-image-client/create-client/categorie-image-create-client.component';
import { CategorieImageEditClientComponent } from './categorie-image-client/edit-client/categorie-image-edit-client.component';
import { CategorieImageViewClientComponent } from './categorie-image-client/view-client/categorie-image-view-client.component';
import { CategorieImageListClientComponent } from './categorie-image-client/list-client/categorie-image-list-client.component';
import { CategorieImageClientComponent } from './categorie-image-client/categorie-image-client.component';
import { PanierCreateClientComponent } from './panier-client/create-client/panier-create-client.component';
import { PanierEditClientComponent } from './panier-client/edit-client/panier-edit-client.component';
import { PanierViewClientComponent } from './panier-client/view-client/panier-view-client.component';
import { PanierListClientComponent } from './panier-client/list-client/panier-list-client.component';
import { PanierClientComponent } from './panier-client/panier-client.component';
import { ChercheurCreateClientComponent } from './chercheur-client/create-client/chercheur-create-client.component';
import { ChercheurEditClientComponent } from './chercheur-client/edit-client/chercheur-edit-client.component';
import { ChercheurViewClientComponent } from './chercheur-client/view-client/chercheur-view-client.component';
import { ChercheurListClientComponent } from './chercheur-client/list-client/chercheur-list-client.component';
import { ChercheurClientComponent } from './chercheur-client/chercheur-client.component';
import { OffreReductionCreateClientComponent } from './offre-reduction-client/create-client/offre-reduction-create-client.component';
import { OffreReductionEditClientComponent } from './offre-reduction-client/edit-client/offre-reduction-edit-client.component';
import { OffreReductionViewClientComponent } from './offre-reduction-client/view-client/offre-reduction-view-client.component';
import { OffreReductionListClientComponent } from './offre-reduction-client/list-client/offre-reduction-list-client.component';
import { OffreReductionClientComponent } from './offre-reduction-client/offre-reduction-client.component';
import { TypeContributeurCreateClientComponent } from './type-contributeur-client/create-client/type-contributeur-create-client.component';
import { TypeContributeurEditClientComponent } from './type-contributeur-client/edit-client/type-contributeur-edit-client.component';
import { TypeContributeurViewClientComponent } from './type-contributeur-client/view-client/type-contributeur-view-client.component';
import { TypeContributeurListClientComponent } from './type-contributeur-client/list-client/type-contributeur-list-client.component';
import { TypeContributeurClientComponent } from './type-contributeur-client/type-contributeur-client.component';
import { EtatPanierCreateClientComponent } from './etat-panier-client/create-client/etat-panier-create-client.component';
import { EtatPanierEditClientComponent } from './etat-panier-client/edit-client/etat-panier-edit-client.component';
import { EtatPanierViewClientComponent } from './etat-panier-client/view-client/etat-panier-view-client.component';
import { EtatPanierListClientComponent } from './etat-panier-client/list-client/etat-panier-list-client.component';
import { EtatPanierClientComponent } from './etat-panier-client/etat-panier-client.component';
import { EtatImageCreateClientComponent } from './etat-image-client/create-client/etat-image-create-client.component';
import { EtatImageEditClientComponent } from './etat-image-client/edit-client/etat-image-edit-client.component';
import { EtatImageViewClientComponent } from './etat-image-client/view-client/etat-image-view-client.component';
import { EtatImageListClientComponent } from './etat-image-client/list-client/etat-image-list-client.component';
import { EtatImageClientComponent } from './etat-image-client/etat-image-client.component';
import { ClientCreateClientComponent } from './client-client/create-client/client-create-client.component';
import { ClientEditClientComponent } from './client-client/edit-client/client-edit-client.component';
import { ClientViewClientComponent } from './client-client/view-client/client-view-client.component';
import { ClientListClientComponent } from './client-client/list-client/client-list-client.component';
import { ClientClientComponent } from './client-client/client-client.component';
import { TagBucketCreateClientComponent } from './tag-bucket-client/create-client/tag-bucket-create-client.component';
import { TagBucketEditClientComponent } from './tag-bucket-client/edit-client/tag-bucket-edit-client.component';
import { TagBucketViewClientComponent } from './tag-bucket-client/view-client/tag-bucket-view-client.component';
import { TagBucketListClientComponent } from './tag-bucket-client/list-client/tag-bucket-list-client.component';
import { TagBucketClientComponent } from './tag-bucket-client/tag-bucket-client.component';
import { StateBucketCreateClientComponent } from './state-bucket-client/create-client/state-bucket-create-client.component';
import { StateBucketEditClientComponent } from './state-bucket-client/edit-client/state-bucket-edit-client.component';
import { StateBucketViewClientComponent } from './state-bucket-client/view-client/state-bucket-view-client.component';
import { StateBucketListClientComponent } from './state-bucket-client/list-client/state-bucket-list-client.component';
import { StateBucketClientComponent } from './state-bucket-client/state-bucket-client.component';
import { TypeImageCreateClientComponent } from './type-image-client/create-client/type-image-create-client.component';
import { TypeImageEditClientComponent } from './type-image-client/edit-client/type-image-edit-client.component';
import { TypeImageViewClientComponent } from './type-image-client/view-client/type-image-view-client.component';
import { TypeImageListClientComponent } from './type-image-client/list-client/type-image-list-client.component';
import { TypeImageClientComponent } from './type-image-client/type-image-client.component';
import { BucketCreateClientComponent } from './bucket-client/create-client/bucket-create-client.component';
import { BucketEditClientComponent } from './bucket-client/edit-client/bucket-edit-client.component';
import { BucketViewClientComponent } from './bucket-client/view-client/bucket-view-client.component';
import { BucketListClientComponent } from './bucket-client/list-client/bucket-list-client.component';
import { BucketClientComponent } from './bucket-client/bucket-client.component';
import { AbonnementCreateClientComponent } from './abonnement-client/create-client/abonnement-create-client.component';
import { AbonnementEditClientComponent } from './abonnement-client/edit-client/abonnement-edit-client.component';
import { AbonnementViewClientComponent } from './abonnement-client/view-client/abonnement-view-client.component';
import { AbonnementListClientComponent } from './abonnement-client/list-client/abonnement-list-client.component';
import { AbonnementClientComponent } from './abonnement-client/abonnement-client.component';
import { TagCreateClientComponent } from './tag-client/create-client/tag-create-client.component';
import { TagEditClientComponent } from './tag-client/edit-client/tag-edit-client.component';
import { TagViewClientComponent } from './tag-client/view-client/tag-view-client.component';
import { TagListClientComponent } from './tag-client/list-client/tag-list-client.component';
import { TagClientComponent } from './tag-client/tag-client.component';
import { CategorieItemCreateClientComponent } from './categorie-item-client/create-client/categorie-item-create-client.component';
import { CategorieItemEditClientComponent } from './categorie-item-client/edit-client/categorie-item-edit-client.component';
import { CategorieItemViewClientComponent } from './categorie-item-client/view-client/categorie-item-view-client.component';
import { CategorieItemListClientComponent } from './categorie-item-client/list-client/categorie-item-list-client.component';
import { CategorieItemClientComponent } from './categorie-item-client/categorie-item-client.component';
import { ImageCreateClientComponent } from './image-client/create-client/image-create-client.component';
import { ImageEditClientComponent } from './image-client/edit-client/image-edit-client.component';
import { ImageViewClientComponent } from './image-client/view-client/image-view-client.component';
import { ImageListClientComponent } from './image-client/list-client/image-list-client.component';
import { ImageClientComponent } from './image-client/image-client.component';
import { PaiementCreateClientComponent } from './paiement-client/create-client/paiement-create-client.component';
import { PaiementEditClientComponent } from './paiement-client/edit-client/paiement-edit-client.component';
import { PaiementViewClientComponent } from './paiement-client/view-client/paiement-view-client.component';
import { PaiementListClientComponent } from './paiement-client/list-client/paiement-list-client.component';
import { PaiementClientComponent } from './paiement-client/paiement-client.component';
import { PackAbonnementCreateClientComponent } from './pack-abonnement-client/create-client/pack-abonnement-create-client.component';
import { PackAbonnementEditClientComponent } from './pack-abonnement-client/edit-client/pack-abonnement-edit-client.component';
import { PackAbonnementViewClientComponent } from './pack-abonnement-client/view-client/pack-abonnement-view-client.component';
import { PackAbonnementListClientComponent } from './pack-abonnement-client/list-client/pack-abonnement-list-client.component';
import { PackAbonnementClientComponent } from './pack-abonnement-client/pack-abonnement-client.component';
import { TypeClientCreateClientComponent } from './type-client-client/create-client/type-client-create-client.component';
import { TypeClientEditClientComponent } from './type-client-client/edit-client/type-client-edit-client.component';
import { TypeClientViewClientComponent } from './type-client-client/view-client/type-client-view-client.component';
import { TypeClientListClientComponent } from './type-client-client/list-client/type-client-list-client.component';
import { TypeClientClientComponent } from './type-client-client/type-client-client.component';
import { ContributeurCreateClientComponent } from './contributeur-client/create-client/contributeur-create-client.component';
import { ContributeurEditClientComponent } from './contributeur-client/edit-client/contributeur-edit-client.component';
import { ContributeurViewClientComponent } from './contributeur-client/view-client/contributeur-view-client.component';
import { ContributeurListClientComponent } from './contributeur-client/list-client/contributeur-list-client.component';
import { ContributeurClientComponent } from './contributeur-client/contributeur-client.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {RatingModule} from 'primeng/rating';


@NgModule({
    declarations: [
        TypePaiementCreateClientComponent,
        TypePaiementListClientComponent,
        TypePaiementViewClientComponent,
        TypePaiementEditClientComponent,
        TypePaiementClientComponent,
        EtatAbonnementCreateClientComponent,
        EtatAbonnementListClientComponent,
        EtatAbonnementViewClientComponent,
        EtatAbonnementEditClientComponent,
        EtatAbonnementClientComponent,
        ContractCreateClientComponent,
        ContractListClientComponent,
        ContractViewClientComponent,
        ContractEditClientComponent,
        ContractClientComponent,
        SignatureCreateClientComponent,
        SignatureListClientComponent,
        SignatureViewClientComponent,
        SignatureEditClientComponent,
        SignatureClientComponent,
        TypeContratCreateClientComponent,
        TypeContratListClientComponent,
        TypeContratViewClientComponent,
        TypeContratEditClientComponent,
        TypeContratClientComponent,
        PanierItemCreateClientComponent,
        PanierItemListClientComponent,
        PanierItemViewClientComponent,
        PanierItemEditClientComponent,
        PanierItemClientComponent,
        CategorieImageCreateClientComponent,
        CategorieImageListClientComponent,
        CategorieImageViewClientComponent,
        CategorieImageEditClientComponent,
        CategorieImageClientComponent,
        PanierCreateClientComponent,
        PanierListClientComponent,
        PanierViewClientComponent,
        PanierEditClientComponent,
        PanierClientComponent,
        ChercheurCreateClientComponent,
        ChercheurListClientComponent,
        ChercheurViewClientComponent,
        ChercheurEditClientComponent,
        ChercheurClientComponent,
        OffreReductionCreateClientComponent,
        OffreReductionListClientComponent,
        OffreReductionViewClientComponent,
        OffreReductionEditClientComponent,
        OffreReductionClientComponent,
        TypeContributeurCreateClientComponent,
        TypeContributeurListClientComponent,
        TypeContributeurViewClientComponent,
        TypeContributeurEditClientComponent,
        TypeContributeurClientComponent,
        EtatPanierCreateClientComponent,
        EtatPanierListClientComponent,
        EtatPanierViewClientComponent,
        EtatPanierEditClientComponent,
        EtatPanierClientComponent,
        EtatImageCreateClientComponent,
        EtatImageListClientComponent,
        EtatImageViewClientComponent,
        EtatImageEditClientComponent,
        EtatImageClientComponent,
        ClientCreateClientComponent,
        ClientListClientComponent,
        ClientViewClientComponent,
        ClientEditClientComponent,
        ClientClientComponent,
        TagBucketCreateClientComponent,
        TagBucketListClientComponent,
        TagBucketViewClientComponent,
        TagBucketEditClientComponent,
        TagBucketClientComponent,
        StateBucketCreateClientComponent,
        StateBucketListClientComponent,
        StateBucketViewClientComponent,
        StateBucketEditClientComponent,
        StateBucketClientComponent,
        TypeImageCreateClientComponent,
        TypeImageListClientComponent,
        TypeImageViewClientComponent,
        TypeImageEditClientComponent,
        TypeImageClientComponent,
        BucketCreateClientComponent,
        BucketListClientComponent,
        BucketViewClientComponent,
        BucketEditClientComponent,
        BucketClientComponent,
        AbonnementCreateClientComponent,
        AbonnementListClientComponent,
        AbonnementViewClientComponent,
        AbonnementEditClientComponent,
        AbonnementClientComponent,
        TagCreateClientComponent,
        TagListClientComponent,
        TagViewClientComponent,
        TagEditClientComponent,
        TagClientComponent,
        CategorieItemCreateClientComponent,
        CategorieItemListClientComponent,
        CategorieItemViewClientComponent,
        CategorieItemEditClientComponent,
        CategorieItemClientComponent,
        ImageCreateClientComponent,
        ImageListClientComponent,
        ImageViewClientComponent,
        ImageEditClientComponent,
        ImageClientComponent,
        PaiementCreateClientComponent,
        PaiementListClientComponent,
        PaiementViewClientComponent,
        PaiementEditClientComponent,
        PaiementClientComponent,
        PackAbonnementCreateClientComponent,
        PackAbonnementListClientComponent,
        PackAbonnementViewClientComponent,
        PackAbonnementEditClientComponent,
        PackAbonnementClientComponent,
        TypeClientCreateClientComponent,
        TypeClientListClientComponent,
        TypeClientViewClientComponent,
        TypeClientEditClientComponent,
        TypeClientClientComponent,
        ContributeurCreateClientComponent,
        ContributeurListClientComponent,
        ContributeurViewClientComponent,
        ContributeurEditClientComponent,
        ContributeurClientComponent,
        PanierClientComponent,

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
        RatingModule,
    ],
    exports: [
        TypePaiementCreateClientComponent,
        TypePaiementListClientComponent,
        TypePaiementViewClientComponent,
        TypePaiementEditClientComponent,
        TypePaiementClientComponent,
        EtatAbonnementCreateClientComponent,
        EtatAbonnementListClientComponent,
        EtatAbonnementViewClientComponent,
        EtatAbonnementEditClientComponent,
        EtatAbonnementClientComponent,
        ContractCreateClientComponent,
        ContractListClientComponent,
        ContractViewClientComponent,
        ContractEditClientComponent,
        ContractClientComponent,
        SignatureCreateClientComponent,
        SignatureListClientComponent,
        SignatureViewClientComponent,
        SignatureEditClientComponent,
        SignatureClientComponent,
        TypeContratCreateClientComponent,
        TypeContratListClientComponent,
        TypeContratViewClientComponent,
        TypeContratEditClientComponent,
        TypeContratClientComponent,
        PanierItemCreateClientComponent,
        PanierItemListClientComponent,
        PanierItemViewClientComponent,
        PanierItemEditClientComponent,
        PanierItemClientComponent,
        CategorieImageCreateClientComponent,
        CategorieImageListClientComponent,
        CategorieImageViewClientComponent,
        CategorieImageEditClientComponent,
        CategorieImageClientComponent,
        PanierCreateClientComponent,
        PanierListClientComponent,
        PanierViewClientComponent,
        PanierEditClientComponent,
        PanierClientComponent,
        ChercheurCreateClientComponent,
        ChercheurListClientComponent,
        ChercheurViewClientComponent,
        ChercheurEditClientComponent,
        ChercheurClientComponent,
        OffreReductionCreateClientComponent,
        OffreReductionListClientComponent,
        OffreReductionViewClientComponent,
        OffreReductionEditClientComponent,
        OffreReductionClientComponent,
        TypeContributeurCreateClientComponent,
        TypeContributeurListClientComponent,
        TypeContributeurViewClientComponent,
        TypeContributeurEditClientComponent,
        TypeContributeurClientComponent,
        EtatPanierCreateClientComponent,
        EtatPanierListClientComponent,
        EtatPanierViewClientComponent,
        EtatPanierEditClientComponent,
        EtatPanierClientComponent,
        EtatImageCreateClientComponent,
        EtatImageListClientComponent,
        EtatImageViewClientComponent,
        EtatImageEditClientComponent,
        EtatImageClientComponent,
        ClientCreateClientComponent,
        ClientListClientComponent,
        ClientViewClientComponent,
        ClientEditClientComponent,
        ClientClientComponent,
        TagBucketCreateClientComponent,
        TagBucketListClientComponent,
        TagBucketViewClientComponent,
        TagBucketEditClientComponent,
        TagBucketClientComponent,
        StateBucketCreateClientComponent,
        StateBucketListClientComponent,
        StateBucketViewClientComponent,
        StateBucketEditClientComponent,
        StateBucketClientComponent,
        TypeImageCreateClientComponent,
        TypeImageListClientComponent,
        TypeImageViewClientComponent,
        TypeImageEditClientComponent,
        TypeImageClientComponent,
        BucketCreateClientComponent,
        BucketListClientComponent,
        BucketViewClientComponent,
        BucketEditClientComponent,
        BucketClientComponent,
        AbonnementCreateClientComponent,
        AbonnementListClientComponent,
        AbonnementViewClientComponent,
        AbonnementEditClientComponent,
        AbonnementClientComponent,
        TagCreateClientComponent,
        TagListClientComponent,
        TagViewClientComponent,
        TagEditClientComponent,
        TagClientComponent,
        CategorieItemCreateClientComponent,
        CategorieItemListClientComponent,
        CategorieItemViewClientComponent,
        CategorieItemEditClientComponent,
        CategorieItemClientComponent,
        ImageCreateClientComponent,
        ImageListClientComponent,
        ImageViewClientComponent,
        ImageEditClientComponent,
        ImageClientComponent,
        PaiementCreateClientComponent,
        PaiementListClientComponent,
        PaiementViewClientComponent,
        PaiementEditClientComponent,
        PaiementClientComponent,
        PackAbonnementCreateClientComponent,
        PackAbonnementListClientComponent,
        PackAbonnementViewClientComponent,
        PackAbonnementEditClientComponent,
        PackAbonnementClientComponent,
        TypeClientCreateClientComponent,
        TypeClientListClientComponent,
        TypeClientViewClientComponent,
        TypeClientEditClientComponent,
        TypeClientClientComponent,
        ContributeurCreateClientComponent,
        ContributeurListClientComponent,
        ContributeurViewClientComponent,
        ContributeurEditClientComponent,
        ContributeurClientComponent,
        PanierClientComponent,
    ]
})
export class ZeneratorClientModule { }
