
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';



    import { TypePaiementChercheurComponent } from './type-paiement-chercheur/type-paiement-chercheur.component';



    import { EtatAbonnementChercheurComponent } from './etat-abonnement-chercheur/etat-abonnement-chercheur.component';



    import { ContractChercheurComponent } from './contract-chercheur/contract-chercheur.component';



    import { SignatureChercheurComponent } from './signature-chercheur/signature-chercheur.component';



    import { TypeContratChercheurComponent } from './type-contrat-chercheur/type-contrat-chercheur.component';



    import { PanierItemChercheurComponent } from './panier-item-chercheur/panier-item-chercheur.component';



    import { CategorieImageChercheurComponent } from './categorie-image-chercheur/categorie-image-chercheur.component';



    import { PanierChercheurComponent } from './panier-chercheur/panier-chercheur.component';



    import { ChercheurChercheurComponent } from './chercheur-chercheur/chercheur-chercheur.component';



    import { OffreReductionChercheurComponent } from './offre-reduction-chercheur/offre-reduction-chercheur.component';



    import { TypeContributeurChercheurComponent } from './type-contributeur-chercheur/type-contributeur-chercheur.component';



    import { EtatPanierChercheurComponent } from './etat-panier-chercheur/etat-panier-chercheur.component';



    import { EtatImageChercheurComponent } from './etat-image-chercheur/etat-image-chercheur.component';



    import { ClientChercheurComponent } from './client-chercheur/client-chercheur.component';



    import { TagBucketChercheurComponent } from './tag-bucket-chercheur/tag-bucket-chercheur.component';



    import { StateBucketChercheurComponent } from './state-bucket-chercheur/state-bucket-chercheur.component';



    import { TypeImageChercheurComponent } from './type-image-chercheur/type-image-chercheur.component';



    import { BucketChercheurComponent } from './bucket-chercheur/bucket-chercheur.component';



    import { AbonnementChercheurComponent } from './abonnement-chercheur/abonnement-chercheur.component';



    import { TagChercheurComponent } from './tag-chercheur/tag-chercheur.component';



    import { CategorieItemChercheurComponent } from './categorie-item-chercheur/categorie-item-chercheur.component';



    import { ImageChercheurComponent } from './image-chercheur/image-chercheur.component';



    import { PaiementChercheurComponent } from './paiement-chercheur/paiement-chercheur.component';



    import { PackAbonnementChercheurComponent } from './pack-abonnement-chercheur/pack-abonnement-chercheur.component';



    import { TypeClientChercheurComponent } from './type-client-chercheur/type-client-chercheur.component';



    import { ContributeurChercheurComponent } from './contributeur-chercheur/contributeur-chercheur.component';


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
                                    component: TypePaiementChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-abonnement',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatAbonnementChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'contract',
                            children: [
                                {
                                    path: 'list',
                                    component: ContractChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'signature',
                            children: [
                                {
                                    path: 'list',
                                    component: SignatureChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-contrat',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeContratChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'panier-item',
                            children: [
                                {
                                    path: 'list',
                                    component: PanierItemChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'categorie-image',
                            children: [
                                {
                                    path: 'list',
                                    component: CategorieImageChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'panier',
                            children: [
                                {
                                    path: 'list',
                                    component: PanierChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'offre-reduction',
                            children: [
                                {
                                    path: 'list',
                                    component: OffreReductionChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-contributeur',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeContributeurChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-panier',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatPanierChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-image',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatImageChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'client',
                            children: [
                                {
                                    path: 'list',
                                    component: ClientChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tag-bucket',
                            children: [
                                {
                                    path: 'list',
                                    component: TagBucketChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'state-bucket',
                            children: [
                                {
                                    path: 'list',
                                    component: StateBucketChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-image',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeImageChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'bucket',
                            children: [
                                {
                                    path: 'list',
                                    component: BucketChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'abonnement',
                            children: [
                                {
                                    path: 'list',
                                    component: AbonnementChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tag',
                            children: [
                                {
                                    path: 'list',
                                    component: TagChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'categorie-item',
                            children: [
                                {
                                    path: 'list',
                                    component: CategorieItemChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'image',
                            children: [
                                {
                                    path: 'list',
                                    component: ImageChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'paiement',
                            children: [
                                {
                                    path: 'list',
                                    component: PaiementChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'pack-abonnement',
                            children: [
                                {
                                    path: 'list',
                                    component: PackAbonnementChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-client',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeClientChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'contributeur',
                            children: [
                                {
                                    path: 'list',
                                    component: ContributeurChercheurComponent ,
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
export class ZeneratorChercheurRoutingModule { }
