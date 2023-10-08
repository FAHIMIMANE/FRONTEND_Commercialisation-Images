
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';



    import { TypePaiementClientComponent } from './type-paiement-client/type-paiement-client.component';



    import { EtatAbonnementClientComponent } from './etat-abonnement-client/etat-abonnement-client.component';



    import { ContractClientComponent } from './contract-client/contract-client.component';



    import { SignatureClientComponent } from './signature-client/signature-client.component';



    import { TypeContratClientComponent } from './type-contrat-client/type-contrat-client.component';



    import { PanierItemClientComponent } from './panier-item-client/panier-item-client.component';



    import { CategorieImageClientComponent } from './categorie-image-client/categorie-image-client.component';



    import { PanierClientComponent } from './panier-client/panier-client.component';



    import { ChercheurClientComponent } from './chercheur-client/chercheur-client.component';



    import { OffreReductionClientComponent } from './offre-reduction-client/offre-reduction-client.component';



    import { TypeContributeurClientComponent } from './type-contributeur-client/type-contributeur-client.component';



    import { EtatPanierClientComponent } from './etat-panier-client/etat-panier-client.component';



    import { EtatImageClientComponent } from './etat-image-client/etat-image-client.component';



    import { ClientClientComponent } from './client-client/client-client.component';



    import { TagBucketClientComponent } from './tag-bucket-client/tag-bucket-client.component';



    import { StateBucketClientComponent } from './state-bucket-client/state-bucket-client.component';



    import { TypeImageClientComponent } from './type-image-client/type-image-client.component';



    import { BucketClientComponent } from './bucket-client/bucket-client.component';



    import { AbonnementClientComponent } from './abonnement-client/abonnement-client.component';



    import { TagClientComponent } from './tag-client/tag-client.component';



    import { CategorieItemClientComponent } from './categorie-item-client/categorie-item-client.component';



    import { ImageClientComponent } from './image-client/image-client.component';



    import { PaiementClientComponent } from './paiement-client/paiement-client.component';



    import { PackAbonnementClientComponent } from './pack-abonnement-client/pack-abonnement-client.component';



    import { TypeClientClientComponent } from './type-client-client/type-client-client.component';



    import { ContributeurClientComponent } from './contributeur-client/contributeur-client.component';


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
                                    component: TypePaiementClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-abonnement',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatAbonnementClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'contract',
                            children: [
                                {
                                    path: 'list',
                                    component: ContractClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'signature',
                            children: [
                                {
                                    path: 'list',
                                    component: SignatureClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-contrat',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeContratClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'panier-item',
                            children: [
                                {
                                    path: 'list',
                                    component: PanierItemClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'categorie-image',
                            children: [
                                {
                                    path: 'list',
                                    component: CategorieImageClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'panier',
                            children: [
                                {
                                    path: 'list',
                                    component: PanierClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'offre-reduction',
                            children: [
                                {
                                    path: 'list',
                                    component: OffreReductionClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-contributeur',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeContributeurClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-panier',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatPanierClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-image',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatImageClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'client',
                            children: [
                                {
                                    path: 'list',
                                    component: ClientClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tag-bucket',
                            children: [
                                {
                                    path: 'list',
                                    component: TagBucketClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'state-bucket',
                            children: [
                                {
                                    path: 'list',
                                    component: StateBucketClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-image',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeImageClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'bucket',
                            children: [
                                {
                                    path: 'list',
                                    component: BucketClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'abonnement',
                            children: [
                                {
                                    path: 'list',
                                    component: AbonnementClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tag',
                            children: [
                                {
                                    path: 'list',
                                    component: TagClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'categorie-item',
                            children: [
                                {
                                    path: 'list',
                                    component: CategorieItemClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'image',
                            children: [
                                {
                                    path: 'list',
                                    component: ImageClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'paiement',
                            children: [
                                {
                                    path: 'list',
                                    component: PaiementClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'pack-abonnement',
                            children: [
                                {
                                    path: 'list',
                                    component: PackAbonnementClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-client',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeClientClientComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'contributeur',
                            children: [
                                {
                                    path: 'list',
                                    component: ContributeurClientComponent ,
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
export class ZeneratorClientRoutingModule { }
