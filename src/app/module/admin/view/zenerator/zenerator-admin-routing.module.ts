
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';



import { TypePaiementAdminComponent } from './type-paiement-admin/type-paiement-admin.component';



import { EtatAbonnementAdminComponent } from './etat-abonnement-admin/etat-abonnement-admin.component';



import { ContractAdminComponent } from './contract-admin/contract-admin.component';



import { SignatureAdminComponent } from './signature-admin/signature-admin.component';



import { TypeContratAdminComponent } from './type-contrat-admin/type-contrat-admin.component';



import { PanierItemAdminComponent } from './panier-item-admin/panier-item-admin.component';



import { CategorieImageAdminComponent } from './categorie-image-admin/categorie-image-admin.component';



import { PanierAdminComponent } from './panier-admin/panier-admin.component';



import { ChercheurAdminComponent } from './chercheur-admin/chercheur-admin.component';



import { OffreReductionAdminComponent } from './offre-reduction-admin/offre-reduction-admin.component';



import { TypeContributeurAdminComponent } from './type-contributeur-admin/type-contributeur-admin.component';



import { EtatPanierAdminComponent } from './etat-panier-admin/etat-panier-admin.component';



import { EtatImageAdminComponent } from './etat-image-admin/etat-image-admin.component';



import { ClientAdminComponent } from './client-admin/client-admin.component';



import { TagBucketAdminComponent } from './tag-bucket-admin/tag-bucket-admin.component';



import { StateBucketAdminComponent } from './state-bucket-admin/state-bucket-admin.component';



import { TypeImageAdminComponent } from './type-image-admin/type-image-admin.component';



import { BucketAdminComponent } from './bucket-admin/bucket-admin.component';



import { AbonnementAdminComponent } from './abonnement-admin/abonnement-admin.component';



import { TagAdminComponent } from './tag-admin/tag-admin.component';



import { CategorieItemAdminComponent } from './categorie-item-admin/categorie-item-admin.component';



import { ImageAdminComponent } from './image-admin/image-admin.component';



import { PaiementAdminComponent } from './paiement-admin/paiement-admin.component';



import { PackAbonnementAdminComponent } from './pack-abonnement-admin/pack-abonnement-admin.component';



import { TypeClientAdminComponent } from './type-client-admin/type-client-admin.component';



import { ContributeurAdminComponent } from './contributeur-admin/contributeur-admin.component';
import {DashboardAdminComponent} from './dashboard-admin/dashboard-admin.component';
import {DashboardListAdminComponent} from './dashboard-admin/dashboard-list-admin/dashboard-list-admin.component';




@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [


                        {

                            path: 'type-paiement',
                            children: [
                                {
                                    path: 'list',
                                    component: TypePaiementAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'dashboard',
                            children: [
                                {
                                    path: 'list',
                                    component: DashboardListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },



                        {

                            path: 'etat-abonnement',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatAbonnementAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'contract',
                            children: [
                                {
                                    path: 'list',
                                    component: ContractAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'signature',
                            children: [
                                {
                                    path: 'list',
                                    component: SignatureAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-contrat',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeContratAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'panier-item',
                            children: [
                                {
                                    path: 'list',
                                    component: PanierItemAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'categorie-image',
                            children: [
                                {
                                    path: 'list',
                                    component: CategorieImageAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'panier',
                            children: [
                                {
                                    path: 'list',
                                    component: PanierAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'offre-reduction',
                            children: [
                                {
                                    path: 'list',
                                    component: OffreReductionAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-contributeur',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeContributeurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-panier',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatPanierAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-image',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatImageAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'client',
                            children: [
                                {
                                    path: 'list',
                                    component: ClientAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tag-bucket',
                            children: [
                                {
                                    path: 'list',
                                    component: TagBucketAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'state-bucket',
                            children: [
                                {
                                    path: 'list',
                                    component: StateBucketAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-image',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeImageAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'bucket',
                            children: [
                                {
                                    path: 'list',
                                    component: BucketAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'abonnement',
                            children: [
                                {
                                    path: 'list',
                                    component: AbonnementAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tag',
                            children: [
                                {
                                    path: 'list',
                                    component: TagAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'categorie-item',
                            children: [
                                {
                                    path: 'list',
                                    component: CategorieItemAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'image',
                            children: [
                                {
                                    path: 'list',
                                    component: ImageAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'paiement',
                            children: [
                                {
                                    path: 'list',
                                    component: PaiementAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'pack-abonnement',
                            children: [
                                {
                                    path: 'list',
                                    component: PackAbonnementAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-client',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeClientAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'contributeur',
                            children: [
                                {
                                    path: 'list',
                                    component: ContributeurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class ZeneratorAdminRoutingModule { }
