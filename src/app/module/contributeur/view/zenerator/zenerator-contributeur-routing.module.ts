
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';



    import { TypePaiementContributeurComponent } from './type-paiement-contributeur/type-paiement-contributeur.component';



    import { EtatAbonnementContributeurComponent } from './etat-abonnement-contributeur/etat-abonnement-contributeur.component';



    import { ContractContributeurComponent } from './contract-contributeur/contract-contributeur.component';



    import { SignatureContributeurComponent } from './signature-contributeur/signature-contributeur.component';



    import { TypeContratContributeurComponent } from './type-contrat-contributeur/type-contrat-contributeur.component';



    import { PanierItemContributeurComponent } from './panier-item-contributeur/panier-item-contributeur.component';



    import { CategorieImageContributeurComponent } from './categorie-image-contributeur/categorie-image-contributeur.component';



    import { PanierContributeurComponent } from './panier-contributeur/panier-contributeur.component';



    import { ChercheurContributeurComponent } from './chercheur-contributeur/chercheur-contributeur.component';



    import { OffreReductionContributeurComponent } from './offre-reduction-contributeur/offre-reduction-contributeur.component';



    import { TypeContributeurContributeurComponent } from './type-contributeur-contributeur/type-contributeur-contributeur.component';



    import { EtatPanierContributeurComponent } from './etat-panier-contributeur/etat-panier-contributeur.component';



    import { EtatImageContributeurComponent } from './etat-image-contributeur/etat-image-contributeur.component';



    import { ClientContributeurComponent } from './client-contributeur/client-contributeur.component';



    import { TagBucketContributeurComponent } from './tag-bucket-contributeur/tag-bucket-contributeur.component';



    import { StateBucketContributeurComponent } from './state-bucket-contributeur/state-bucket-contributeur.component';



    import { TypeImageContributeurComponent } from './type-image-contributeur/type-image-contributeur.component';



    import { BucketContributeurComponent } from './bucket-contributeur/bucket-contributeur.component';



    import { AbonnementContributeurComponent } from './abonnement-contributeur/abonnement-contributeur.component';



    import { TagContributeurComponent } from './tag-contributeur/tag-contributeur.component';



    import { CategorieItemContributeurComponent } from './categorie-item-contributeur/categorie-item-contributeur.component';



    import { ImageContributeurComponent } from './image-contributeur/image-contributeur.component';



    import { PaiementContributeurComponent } from './paiement-contributeur/paiement-contributeur.component';



    import { PackAbonnementContributeurComponent } from './pack-abonnement-contributeur/pack-abonnement-contributeur.component';



    import { TypeClientContributeurComponent } from './type-client-contributeur/type-client-contributeur.component';



    import { ContributeurContributeurComponent } from './contributeur-contributeur/contributeur-contributeur.component';


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
                                    component: TypePaiementContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-abonnement',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatAbonnementContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'contract',
                            children: [
                                {
                                    path: 'list',
                                    component: ContractContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'signature',
                            children: [
                                {
                                    path: 'list',
                                    component: SignatureContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-contrat',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeContratContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'panier-item',
                            children: [
                                {
                                    path: 'list',
                                    component: PanierItemContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'categorie-image',
                            children: [
                                {
                                    path: 'list',
                                    component: CategorieImageContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'panier',
                            children: [
                                {
                                    path: 'list',
                                    component: PanierContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'offre-reduction',
                            children: [
                                {
                                    path: 'list',
                                    component: OffreReductionContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-contributeur',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeContributeurContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-panier',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatPanierContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-image',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatImageContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'client',
                            children: [
                                {
                                    path: 'list',
                                    component: ClientContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tag-bucket',
                            children: [
                                {
                                    path: 'list',
                                    component: TagBucketContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'state-bucket',
                            children: [
                                {
                                    path: 'list',
                                    component: StateBucketContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-image',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeImageContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'bucket',
                            children: [
                                {
                                    path: 'list',
                                    component: BucketContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'abonnement',
                            children: [
                                {
                                    path: 'list',
                                    component: AbonnementContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tag',
                            children: [
                                {
                                    path: 'list',
                                    component: TagContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'categorie-item',
                            children: [
                                {
                                    path: 'list',
                                    component: CategorieItemContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'image',
                            children: [
                                {
                                    path: 'list',
                                    component: ImageContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'paiement',
                            children: [
                                {
                                    path: 'list',
                                    component: PaiementContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'pack-abonnement',
                            children: [
                                {
                                    path: 'list',
                                    component: PackAbonnementContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-client',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeClientContributeurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'contributeur',
                            children: [
                                {
                                    path: 'list',
                                    component: ContributeurContributeurComponent ,
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
export class ZeneratorContributeurRoutingModule { }
