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

import { TypePaiementCreateAdminComponent } from './type-paiement-admin/create-admin/type-paiement-create-admin.component';
import { TypePaiementEditAdminComponent } from './type-paiement-admin/edit-admin/type-paiement-edit-admin.component';
import { TypePaiementViewAdminComponent } from './type-paiement-admin/view-admin/type-paiement-view-admin.component';
import { TypePaiementListAdminComponent } from './type-paiement-admin/list-admin/type-paiement-list-admin.component';
import { TypePaiementAdminComponent } from './type-paiement-admin/type-paiement-admin.component';
import { EtatAbonnementCreateAdminComponent } from './etat-abonnement-admin/create-admin/etat-abonnement-create-admin.component';
import { EtatAbonnementEditAdminComponent } from './etat-abonnement-admin/edit-admin/etat-abonnement-edit-admin.component';
import { EtatAbonnementViewAdminComponent } from './etat-abonnement-admin/view-admin/etat-abonnement-view-admin.component';
import { EtatAbonnementListAdminComponent } from './etat-abonnement-admin/list-admin/etat-abonnement-list-admin.component';
import { EtatAbonnementAdminComponent } from './etat-abonnement-admin/etat-abonnement-admin.component';
import { ContractCreateAdminComponent } from './contract-admin/create-admin/contract-create-admin.component';
import { ContractEditAdminComponent } from './contract-admin/edit-admin/contract-edit-admin.component';
import { ContractViewAdminComponent } from './contract-admin/view-admin/contract-view-admin.component';
import { ContractListAdminComponent } from './contract-admin/list-admin/contract-list-admin.component';
import { ContractAdminComponent } from './contract-admin/contract-admin.component';
import { SignatureCreateAdminComponent } from './signature-admin/create-admin/signature-create-admin.component';
import { SignatureEditAdminComponent } from './signature-admin/edit-admin/signature-edit-admin.component';
import { SignatureViewAdminComponent } from './signature-admin/view-admin/signature-view-admin.component';
import { SignatureListAdminComponent } from './signature-admin/list-admin/signature-list-admin.component';
import { SignatureAdminComponent } from './signature-admin/signature-admin.component';
import { TypeContratCreateAdminComponent } from './type-contrat-admin/create-admin/type-contrat-create-admin.component';
import { TypeContratEditAdminComponent } from './type-contrat-admin/edit-admin/type-contrat-edit-admin.component';
import { TypeContratViewAdminComponent } from './type-contrat-admin/view-admin/type-contrat-view-admin.component';
import { TypeContratListAdminComponent } from './type-contrat-admin/list-admin/type-contrat-list-admin.component';
import { TypeContratAdminComponent } from './type-contrat-admin/type-contrat-admin.component';
import { PanierItemCreateAdminComponent } from './panier-item-admin/create-admin/panier-item-create-admin.component';
import { PanierItemEditAdminComponent } from './panier-item-admin/edit-admin/panier-item-edit-admin.component';
import { PanierItemViewAdminComponent } from './panier-item-admin/view-admin/panier-item-view-admin.component';
import { PanierItemListAdminComponent } from './panier-item-admin/list-admin/panier-item-list-admin.component';
import { PanierItemAdminComponent } from './panier-item-admin/panier-item-admin.component';
import { CategorieImageCreateAdminComponent } from './categorie-image-admin/create-admin/categorie-image-create-admin.component';
import { CategorieImageEditAdminComponent } from './categorie-image-admin/edit-admin/categorie-image-edit-admin.component';
import { CategorieImageViewAdminComponent } from './categorie-image-admin/view-admin/categorie-image-view-admin.component';
import { CategorieImageListAdminComponent } from './categorie-image-admin/list-admin/categorie-image-list-admin.component';
import { CategorieImageAdminComponent } from './categorie-image-admin/categorie-image-admin.component';
import { PanierCreateAdminComponent } from './panier-admin/create-admin/panier-create-admin.component';
import { PanierEditAdminComponent } from './panier-admin/edit-admin/panier-edit-admin.component';
import { PanierViewAdminComponent } from './panier-admin/view-admin/panier-view-admin.component';
import { PanierListAdminComponent } from './panier-admin/list-admin/panier-list-admin.component';
import { PanierAdminComponent } from './panier-admin/panier-admin.component';
import { ChercheurCreateAdminComponent } from './chercheur-admin/create-admin/chercheur-create-admin.component';
import { ChercheurEditAdminComponent } from './chercheur-admin/edit-admin/chercheur-edit-admin.component';
import { ChercheurViewAdminComponent } from './chercheur-admin/view-admin/chercheur-view-admin.component';
import { ChercheurListAdminComponent } from './chercheur-admin/list-admin/chercheur-list-admin.component';
import { ChercheurAdminComponent } from './chercheur-admin/chercheur-admin.component';
import { OffreReductionCreateAdminComponent } from './offre-reduction-admin/create-admin/offre-reduction-create-admin.component';
import { OffreReductionEditAdminComponent } from './offre-reduction-admin/edit-admin/offre-reduction-edit-admin.component';
import { OffreReductionViewAdminComponent } from './offre-reduction-admin/view-admin/offre-reduction-view-admin.component';
import { OffreReductionListAdminComponent } from './offre-reduction-admin/list-admin/offre-reduction-list-admin.component';
import { OffreReductionAdminComponent } from './offre-reduction-admin/offre-reduction-admin.component';
import { TypeContributeurCreateAdminComponent } from './type-contributeur-admin/create-admin/type-contributeur-create-admin.component';
import { TypeContributeurEditAdminComponent } from './type-contributeur-admin/edit-admin/type-contributeur-edit-admin.component';
import { TypeContributeurViewAdminComponent } from './type-contributeur-admin/view-admin/type-contributeur-view-admin.component';
import { TypeContributeurListAdminComponent } from './type-contributeur-admin/list-admin/type-contributeur-list-admin.component';
import { TypeContributeurAdminComponent } from './type-contributeur-admin/type-contributeur-admin.component';
import { EtatPanierCreateAdminComponent } from './etat-panier-admin/create-admin/etat-panier-create-admin.component';
import { EtatPanierEditAdminComponent } from './etat-panier-admin/edit-admin/etat-panier-edit-admin.component';
import { EtatPanierViewAdminComponent } from './etat-panier-admin/view-admin/etat-panier-view-admin.component';
import { EtatPanierListAdminComponent } from './etat-panier-admin/list-admin/etat-panier-list-admin.component';
import { EtatPanierAdminComponent } from './etat-panier-admin/etat-panier-admin.component';
import { EtatImageCreateAdminComponent } from './etat-image-admin/create-admin/etat-image-create-admin.component';
import { EtatImageEditAdminComponent } from './etat-image-admin/edit-admin/etat-image-edit-admin.component';
import { EtatImageViewAdminComponent } from './etat-image-admin/view-admin/etat-image-view-admin.component';
import { EtatImageListAdminComponent } from './etat-image-admin/list-admin/etat-image-list-admin.component';
import { EtatImageAdminComponent } from './etat-image-admin/etat-image-admin.component';
import { ClientCreateAdminComponent } from './client-admin/create-admin/client-create-admin.component';
import { ClientEditAdminComponent } from './client-admin/edit-admin/client-edit-admin.component';
import { ClientViewAdminComponent } from './client-admin/view-admin/client-view-admin.component';
import { ClientListAdminComponent } from './client-admin/list-admin/client-list-admin.component';
import { ClientAdminComponent } from './client-admin/client-admin.component';
import { TagBucketCreateAdminComponent } from './tag-bucket-admin/create-admin/tag-bucket-create-admin.component';
import { TagBucketEditAdminComponent } from './tag-bucket-admin/edit-admin/tag-bucket-edit-admin.component';
import { TagBucketViewAdminComponent } from './tag-bucket-admin/view-admin/tag-bucket-view-admin.component';
import { TagBucketListAdminComponent } from './tag-bucket-admin/list-admin/tag-bucket-list-admin.component';
import { TagBucketAdminComponent } from './tag-bucket-admin/tag-bucket-admin.component';
import { StateBucketCreateAdminComponent } from './state-bucket-admin/create-admin/state-bucket-create-admin.component';
import { StateBucketEditAdminComponent } from './state-bucket-admin/edit-admin/state-bucket-edit-admin.component';
import { StateBucketViewAdminComponent } from './state-bucket-admin/view-admin/state-bucket-view-admin.component';
import { StateBucketListAdminComponent } from './state-bucket-admin/list-admin/state-bucket-list-admin.component';
import { StateBucketAdminComponent } from './state-bucket-admin/state-bucket-admin.component';
import { TypeImageCreateAdminComponent } from './type-image-admin/create-admin/type-image-create-admin.component';
import { TypeImageEditAdminComponent } from './type-image-admin/edit-admin/type-image-edit-admin.component';
import { TypeImageViewAdminComponent } from './type-image-admin/view-admin/type-image-view-admin.component';
import { TypeImageListAdminComponent } from './type-image-admin/list-admin/type-image-list-admin.component';
import { TypeImageAdminComponent } from './type-image-admin/type-image-admin.component';
import { BucketCreateAdminComponent } from './bucket-admin/create-admin/bucket-create-admin.component';
import { BucketEditAdminComponent } from './bucket-admin/edit-admin/bucket-edit-admin.component';
import { BucketViewAdminComponent } from './bucket-admin/view-admin/bucket-view-admin.component';
import { BucketListAdminComponent } from './bucket-admin/list-admin/bucket-list-admin.component';
import { BucketAdminComponent } from './bucket-admin/bucket-admin.component';
import { AbonnementCreateAdminComponent } from './abonnement-admin/create-admin/abonnement-create-admin.component';
import { AbonnementEditAdminComponent } from './abonnement-admin/edit-admin/abonnement-edit-admin.component';
import { AbonnementViewAdminComponent } from './abonnement-admin/view-admin/abonnement-view-admin.component';
import { AbonnementListAdminComponent } from './abonnement-admin/list-admin/abonnement-list-admin.component';
import { AbonnementAdminComponent } from './abonnement-admin/abonnement-admin.component';
import { TagCreateAdminComponent } from './tag-admin/create-admin/tag-create-admin.component';
import { TagEditAdminComponent } from './tag-admin/edit-admin/tag-edit-admin.component';
import { TagViewAdminComponent } from './tag-admin/view-admin/tag-view-admin.component';
import { TagListAdminComponent } from './tag-admin/list-admin/tag-list-admin.component';
import { TagAdminComponent } from './tag-admin/tag-admin.component';
import { CategorieItemCreateAdminComponent } from './categorie-item-admin/create-admin/categorie-item-create-admin.component';
import { CategorieItemEditAdminComponent } from './categorie-item-admin/edit-admin/categorie-item-edit-admin.component';
import { CategorieItemViewAdminComponent } from './categorie-item-admin/view-admin/categorie-item-view-admin.component';
import { CategorieItemListAdminComponent } from './categorie-item-admin/list-admin/categorie-item-list-admin.component';
import { CategorieItemAdminComponent } from './categorie-item-admin/categorie-item-admin.component';
import { ImageCreateAdminComponent } from './image-admin/create-admin/image-create-admin.component';
import { ImageEditAdminComponent } from './image-admin/edit-admin/image-edit-admin.component';
import { ImageViewAdminComponent } from './image-admin/view-admin/image-view-admin.component';
import { ImageListAdminComponent } from './image-admin/list-admin/image-list-admin.component';
import { ImageAdminComponent } from './image-admin/image-admin.component';
import { PaiementCreateAdminComponent } from './paiement-admin/create-admin/paiement-create-admin.component';
import { PaiementEditAdminComponent } from './paiement-admin/edit-admin/paiement-edit-admin.component';
import { PaiementViewAdminComponent } from './paiement-admin/view-admin/paiement-view-admin.component';
import { PaiementListAdminComponent } from './paiement-admin/list-admin/paiement-list-admin.component';
import { PaiementAdminComponent } from './paiement-admin/paiement-admin.component';
import { PackAbonnementCreateAdminComponent } from './pack-abonnement-admin/create-admin/pack-abonnement-create-admin.component';
import { PackAbonnementEditAdminComponent } from './pack-abonnement-admin/edit-admin/pack-abonnement-edit-admin.component';
import { PackAbonnementViewAdminComponent } from './pack-abonnement-admin/view-admin/pack-abonnement-view-admin.component';
import { PackAbonnementListAdminComponent } from './pack-abonnement-admin/list-admin/pack-abonnement-list-admin.component';
import { PackAbonnementAdminComponent } from './pack-abonnement-admin/pack-abonnement-admin.component';
import { TypeClientCreateAdminComponent } from './type-client-admin/create-admin/type-client-create-admin.component';
import { TypeClientEditAdminComponent } from './type-client-admin/edit-admin/type-client-edit-admin.component';
import { TypeClientViewAdminComponent } from './type-client-admin/view-admin/type-client-view-admin.component';
import { TypeClientListAdminComponent } from './type-client-admin/list-admin/type-client-list-admin.component';
import { TypeClientAdminComponent } from './type-client-admin/type-client-admin.component';
import { ContributeurCreateAdminComponent } from './contributeur-admin/create-admin/contributeur-create-admin.component';
import { ContributeurEditAdminComponent } from './contributeur-admin/edit-admin/contributeur-edit-admin.component';
import { ContributeurViewAdminComponent } from './contributeur-admin/view-admin/contributeur-view-admin.component';
import { ContributeurListAdminComponent } from './contributeur-admin/list-admin/contributeur-list-admin.component';
import { ContributeurAdminComponent } from './contributeur-admin/contributeur-admin.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {CardModule} from 'primeng/card';
import {ImagePanierAdminComponent} from './image-admin/panier-admin/image-panier-admin.component';
import {FileUploadModule} from 'primeng/fileupload';

import { DashboardCreateAdminComponent } from './dashboard-admin/dashboard-create-admin/dashboard-create-admin.component';
import { DashboardEditAdminComponent } from './dashboard-admin/dashboard-edit-admin/dashboard-edit-admin.component';
import { DashboardViewAdminComponent } from './dashboard-admin/dashboard-view-admin/dashboard-view-admin.component';
import { DashboardListAdminComponent } from './dashboard-admin/dashboard-list-admin/dashboard-list-admin.component';
import {ChartModule} from 'primeng/chart';
import {DashboardAdminComponent} from './dashboard-admin/dashboard-admin.component';




@NgModule({
    declarations: [
        ImagePanierAdminComponent,
        TypePaiementCreateAdminComponent,
        TypePaiementListAdminComponent,
        TypePaiementViewAdminComponent,
        TypePaiementEditAdminComponent,
        TypePaiementAdminComponent,
        EtatAbonnementCreateAdminComponent,
        EtatAbonnementListAdminComponent,
        EtatAbonnementViewAdminComponent,
        EtatAbonnementEditAdminComponent,
        EtatAbonnementAdminComponent,
        ContractCreateAdminComponent,
        ContractListAdminComponent,
        ContractViewAdminComponent,
        ContractEditAdminComponent,
        ContractAdminComponent,
        SignatureCreateAdminComponent,
        SignatureListAdminComponent,
        SignatureViewAdminComponent,
        SignatureEditAdminComponent,
        SignatureAdminComponent,
        TypeContratCreateAdminComponent,
        TypeContratListAdminComponent,
        TypeContratViewAdminComponent,
        TypeContratEditAdminComponent,
        TypeContratAdminComponent,
        PanierItemCreateAdminComponent,
        PanierItemListAdminComponent,
        PanierItemViewAdminComponent,
        PanierItemEditAdminComponent,
        PanierItemAdminComponent,
        CategorieImageCreateAdminComponent,
        CategorieImageListAdminComponent,
        CategorieImageViewAdminComponent,
        CategorieImageEditAdminComponent,
        CategorieImageAdminComponent,
        PanierCreateAdminComponent,
        PanierListAdminComponent,
        PanierViewAdminComponent,
        PanierEditAdminComponent,
        PanierAdminComponent,
        ChercheurCreateAdminComponent,
        ChercheurListAdminComponent,
        ChercheurViewAdminComponent,
        ChercheurEditAdminComponent,
        ChercheurAdminComponent,
        OffreReductionCreateAdminComponent,
        OffreReductionListAdminComponent,
        OffreReductionViewAdminComponent,
        OffreReductionEditAdminComponent,
        OffreReductionAdminComponent,
        TypeContributeurCreateAdminComponent,
        TypeContributeurListAdminComponent,
        TypeContributeurViewAdminComponent,
        TypeContributeurEditAdminComponent,
        TypeContributeurAdminComponent,
        EtatPanierCreateAdminComponent,
        EtatPanierListAdminComponent,
        EtatPanierViewAdminComponent,
        EtatPanierEditAdminComponent,
        EtatPanierAdminComponent,
        EtatImageCreateAdminComponent,
        EtatImageListAdminComponent,
        EtatImageViewAdminComponent,
        EtatImageEditAdminComponent,
        EtatImageAdminComponent,
        ClientCreateAdminComponent,
        ClientListAdminComponent,
        ClientViewAdminComponent,
        ClientEditAdminComponent,
        ClientAdminComponent,
        TagBucketCreateAdminComponent,
        TagBucketListAdminComponent,
        TagBucketViewAdminComponent,
        TagBucketEditAdminComponent,
        TagBucketAdminComponent,
        StateBucketCreateAdminComponent,
        StateBucketListAdminComponent,
        StateBucketViewAdminComponent,
        StateBucketEditAdminComponent,
        StateBucketAdminComponent,
        TypeImageCreateAdminComponent,
        TypeImageListAdminComponent,
        TypeImageViewAdminComponent,
        TypeImageEditAdminComponent,
        TypeImageAdminComponent,
        BucketCreateAdminComponent,
        BucketListAdminComponent,
        BucketViewAdminComponent,
        BucketEditAdminComponent,
        BucketAdminComponent,
        AbonnementCreateAdminComponent,
        AbonnementListAdminComponent,
        AbonnementViewAdminComponent,
        AbonnementEditAdminComponent,
        AbonnementAdminComponent,
        TagCreateAdminComponent,
        TagListAdminComponent,
        TagViewAdminComponent,
        TagEditAdminComponent,
        TagAdminComponent,
        CategorieItemCreateAdminComponent,
        CategorieItemListAdminComponent,
        CategorieItemViewAdminComponent,
        CategorieItemEditAdminComponent,
        CategorieItemAdminComponent,
        ImageCreateAdminComponent,
        ImageListAdminComponent,
        ImageViewAdminComponent,
        ImageEditAdminComponent,
        ImageAdminComponent,
        PaiementCreateAdminComponent,
        PaiementListAdminComponent,
        PaiementViewAdminComponent,
        PaiementEditAdminComponent,
        PaiementAdminComponent,
        PackAbonnementCreateAdminComponent,
        PackAbonnementListAdminComponent,
        PackAbonnementViewAdminComponent,
        PackAbonnementEditAdminComponent,
        PackAbonnementAdminComponent,
        TypeClientCreateAdminComponent,
        TypeClientListAdminComponent,
        TypeClientViewAdminComponent,
        TypeClientEditAdminComponent,
        TypeClientAdminComponent,
        ContributeurCreateAdminComponent,
        ContributeurListAdminComponent,
        ContributeurViewAdminComponent,
        ContributeurEditAdminComponent,
        ContributeurAdminComponent,
        DashboardAdminComponent,
        DashboardCreateAdminComponent,
        DashboardEditAdminComponent,
        DashboardListAdminComponent,
        DashboardViewAdminComponent,
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
        CardModule,
        FileUploadModule,
        ChartModule,
    ],
    exports: [
        TypePaiementCreateAdminComponent,
        TypePaiementListAdminComponent,
        TypePaiementViewAdminComponent,
        TypePaiementEditAdminComponent,
        TypePaiementAdminComponent,
        EtatAbonnementCreateAdminComponent,
        EtatAbonnementListAdminComponent,
        EtatAbonnementViewAdminComponent,
        EtatAbonnementEditAdminComponent,
        EtatAbonnementAdminComponent,
        ContractCreateAdminComponent,
        ContractListAdminComponent,
        ContractViewAdminComponent,
        ContractEditAdminComponent,
        ContractAdminComponent,
        SignatureCreateAdminComponent,
        SignatureListAdminComponent,
        SignatureViewAdminComponent,
        SignatureEditAdminComponent,
        SignatureAdminComponent,
        TypeContratCreateAdminComponent,
        TypeContratListAdminComponent,
        TypeContratViewAdminComponent,
        TypeContratEditAdminComponent,
        TypeContratAdminComponent,
        PanierItemCreateAdminComponent,
        PanierItemListAdminComponent,
        PanierItemViewAdminComponent,
        PanierItemEditAdminComponent,
        PanierItemAdminComponent,
        CategorieImageCreateAdminComponent,
        CategorieImageListAdminComponent,
        CategorieImageViewAdminComponent,
        CategorieImageEditAdminComponent,
        CategorieImageAdminComponent,
        PanierCreateAdminComponent,
        PanierListAdminComponent,
        PanierViewAdminComponent,
        PanierEditAdminComponent,
        PanierAdminComponent,
        ChercheurCreateAdminComponent,
        ChercheurListAdminComponent,
        ChercheurViewAdminComponent,
        ChercheurEditAdminComponent,
        ChercheurAdminComponent,
        OffreReductionCreateAdminComponent,
        OffreReductionListAdminComponent,
        OffreReductionViewAdminComponent,
        OffreReductionEditAdminComponent,
        OffreReductionAdminComponent,
        TypeContributeurCreateAdminComponent,
        TypeContributeurListAdminComponent,
        TypeContributeurViewAdminComponent,
        TypeContributeurEditAdminComponent,
        TypeContributeurAdminComponent,
        EtatPanierCreateAdminComponent,
        EtatPanierListAdminComponent,
        EtatPanierViewAdminComponent,
        EtatPanierEditAdminComponent,
        EtatPanierAdminComponent,
        EtatImageCreateAdminComponent,
        EtatImageListAdminComponent,
        EtatImageViewAdminComponent,
        EtatImageEditAdminComponent,
        EtatImageAdminComponent,
        ClientCreateAdminComponent,
        ClientListAdminComponent,
        ClientViewAdminComponent,
        ClientEditAdminComponent,
        ClientAdminComponent,
        TagBucketCreateAdminComponent,
        TagBucketListAdminComponent,
        TagBucketViewAdminComponent,
        TagBucketEditAdminComponent,
        TagBucketAdminComponent,
        StateBucketCreateAdminComponent,
        StateBucketListAdminComponent,
        StateBucketViewAdminComponent,
        StateBucketEditAdminComponent,
        StateBucketAdminComponent,
        TypeImageCreateAdminComponent,
        TypeImageListAdminComponent,
        TypeImageViewAdminComponent,
        TypeImageEditAdminComponent,
        TypeImageAdminComponent,
        BucketCreateAdminComponent,
        BucketListAdminComponent,
        BucketViewAdminComponent,
        BucketEditAdminComponent,
        BucketAdminComponent,
        AbonnementCreateAdminComponent,
        AbonnementListAdminComponent,
        AbonnementViewAdminComponent,
        AbonnementEditAdminComponent,
        AbonnementAdminComponent,
        TagCreateAdminComponent,
        TagListAdminComponent,
        TagViewAdminComponent,
        TagEditAdminComponent,
        TagAdminComponent,
        CategorieItemCreateAdminComponent,
        CategorieItemListAdminComponent,
        CategorieItemViewAdminComponent,
        CategorieItemEditAdminComponent,
        CategorieItemAdminComponent,
        ImageCreateAdminComponent,
        ImageListAdminComponent,
        ImageViewAdminComponent,
        ImageEditAdminComponent,
        ImageAdminComponent,
        PaiementCreateAdminComponent,
        PaiementListAdminComponent,
        PaiementViewAdminComponent,
        PaiementEditAdminComponent,
        PaiementAdminComponent,
        PackAbonnementCreateAdminComponent,
        PackAbonnementListAdminComponent,
        PackAbonnementViewAdminComponent,
        PackAbonnementEditAdminComponent,
        PackAbonnementAdminComponent,
        TypeClientCreateAdminComponent,
        TypeClientListAdminComponent,
        TypeClientViewAdminComponent,
        TypeClientEditAdminComponent,
        TypeClientAdminComponent,
        ContributeurCreateAdminComponent,
        ContributeurListAdminComponent,
        ContributeurViewAdminComponent,
        ContributeurEditAdminComponent,
        ContributeurAdminComponent,
    ]
})
export class ZeneratorAdminModule { }
