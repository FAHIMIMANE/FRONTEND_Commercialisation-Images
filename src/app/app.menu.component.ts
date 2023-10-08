import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './controller/service/Auth.service';

import {
    trigger,
    state,
    style,
    transition,
    animate,
} from '@angular/animations';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { RoleService } from './controller/service/role.service';
@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    animations: [
        trigger('inline', [
            state(
                'hidden',
                style({
                    height: '0px',
                    overflow: 'hidden',
                })
            ),
            state(
                'visible',
                style({
                    height: '*',
                })
            ),
            state(
                'hiddenAnimated',
                style({
                    height: '0px',
                    overflow: 'hidden',
                })
            ),
            state(
                'visibleAnimated',
                style({
                    height: '*',
                })
            ),
            transition(
                'visibleAnimated => hiddenAnimated',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            ),
            transition(
                'hiddenAnimated => visibleAnimated',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            ),
        ]),
    ],
})
export class AppMenuComponent implements OnInit {
    model: any[];
    modelsuperadmin: any[];
    modelanonymous: any[];
    modelchercheur: any[];
    modeladmin: any[];
    modelclient: any[];
    modelcontributeur: any[];
    constructor(public app: AppComponent,
                public appMain: AppMainComponent,
                private roleService: RoleService,
                private authService: AuthService,
                private router: Router) {}

    ngOnInit() {
        this.model = this.modelclient;
        this.authService.loadInfos();


        this.modelchercheur =
            [
                {
                    label: 'Paiement',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste paiement',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/paiement/list']
                        },
                    ]
                },
                {
                    label: 'Categories',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste categorie image',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/categorie-image/list']
                        },
                    ]
                },
                {
                    label: 'Contributeurs',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste contributeur',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/contributeur/list']
                        },
                    ]
                },
                {
                    label: 'TypeClient',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste type client',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/type-client/list']
                        },
                    ]
                },
                {
                    label: 'Images',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste image',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/image/list']
                        },
                    ]
                },
                {
                    label: 'TypePaiement',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste type paiement',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/type-paiement/list']
                        },
                    ]
                },
                {
                    label: 'Offre reduction',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste offre reduction',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/offre-reduction/list']
                        },
                    ]
                },
                {
                    label: 'Abonnement',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste abonnement',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/abonnement/list']
                        },
                    ]
                },
                {
                    label: 'TypeImage',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste type image',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/type-image/list']
                        },
                    ]
                },
                {
                    label: 'Chercheur',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste chercheur',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/chercheur/list']
                        },
                    ]
                },
                {
                    label: 'CategorieItem',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste categorie item',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/categorie-item/list']
                        },
                    ]
                },
                {
                    label: 'Bucket',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste tag bucket',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/tag-bucket/list']
                        },
                        {
                            label: 'Liste state bucket',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/state-bucket/list']
                        },
                        {
                            label: 'Liste bucket',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/bucket/list']
                        },
                        {
                            label: 'Liste tag',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/tag/list']
                        },
                    ]
                },
                {
                    label: 'Pack abonnement',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste pack abonnement',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/pack-abonnement/list']
                        },
                    ]
                },
                {
                    label: 'Panier',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste panier item',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/panier-item/list']
                        },
                        {
                            label: 'Liste panier',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/panier/list']
                        },
                        {
                            label: 'Liste etat panier',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/etat-panier/list']
                        },
                    ]
                },
                {
                    label: 'Etat abonnement',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste etat abonnement',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/etat-abonnement/list']
                        },
                    ]
                },
                {
                    label: 'EtatImage',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste etat image',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/etat-image/list']
                        },
                    ]
                },
                {
                    label: 'Client',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste client',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/client/list']
                        },
                    ]
                },
                {
                    label: 'Contrat',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste contract',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/contract/list']
                        },
                        {
                            label: 'Liste signature',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/signature/list']
                        },
                        {
                            label: 'Liste type contrat',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/type-contrat/list']
                        },
                    ]
                },
                {
                    label: 'TypeContributeur',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste type contributeur',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/zenerator/type-contributeur/list']
                        },
                    ]
                },
            ];
        this.modeladmin =
            [
                /* {
                   label: 'Paiement',
                   icon: 'pi pi-th-large',
                   items: [
                       {
                         label: 'Liste paiement',
                         icon: 'pi pi-fw pi-plus-circle',
                         routerLink: ['/app/admin/zenerator/paiement/list']
                       },
                   ]
                 },*/
                {
                    label: 'Categories',
                    icon: 'pi pi-clone',
                    items: [
                        {
                            label: 'Liste categorie image',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/zenerator/categorie-image/list']
                        },
                    ]
                },
                {
                    label: 'Contributeurs',
                    icon: 'pi pi-users',
                    items: [
                        {
                            label: 'Liste contributeur',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/zenerator/contributeur/list']
                        },
                    ]
                },
                {
                    label: 'Dashboard',
                    icon: 'pi pi-bars',
                    items: [
                        {
                            label: 'dashboard',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/zenerator/dashboard/list']
                        },
                    ]
                },
                {
                    label: 'TypeClient',
                    icon: 'pi pi-th-large',
                    items: [
                        {
                            label: 'Liste type client',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/zenerator/type-client/list']
                        },
                    ]
                },
                {
                    label: 'Images',
                    icon: 'pi pi-images',
                    items: [
                        {
                            label: 'Liste image',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/zenerator/image/list']
                        },
                    ]
                },
                /*  {
                    label: 'TypePaiement',
                    icon: 'pi pi-th-large',
                    items: [
                        {
                          label: 'Liste type paiement',
                          icon: 'pi pi-fw pi-plus-circle',
                          routerLink: ['/app/admin/zenerator/type-paiement/list']
                        },
                    ]
                  },*/
                /*{
                  label: 'Offre reduction',
                  icon: 'pi pi-wallet',
                  items: [
                      {
                        label: 'Liste offre reduction',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/admin/zenerator/offre-reduction/list']
                      },
                  ]
                },*/
                /*{
                  label: 'Abonnement',
                  icon: 'pi pi-wallet',
                  items: [
                      {
                        label: 'Liste abonnement',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/admin/zenerator/abonnement/list']
                      },
                  ]
                },*/
                {
                    label: 'TypeImage',
                    icon: 'pi pi-th-large',
                    items: [
                        {
                            label: 'Liste type image',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/zenerator/type-image/list']
                        },
                    ]
                },
                /*  {
                    label: 'Chercheur',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                          label: 'Liste chercheur',
                          icon: 'pi pi-fw pi-plus-circle',
                          routerLink: ['/app/admin/zenerator/chercheur/list']
                        },
                    ]
                  },*/
                {
                    label: 'CategorieItem',
                    icon: 'pi pi-credit-card',
                    items: [
                        {
                            label: 'Liste categorie item',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/zenerator/categorie-item/list']
                        },
                    ]
                },
                /*  {
                    label: 'Bucket',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                          label: 'Liste tag bucket',
                          icon: 'pi pi-fw pi-plus-circle',
                          routerLink: ['/app/admin/zenerator/tag-bucket/list']
                        },
                        {
                          label: 'Liste state bucket',
                          icon: 'pi pi-fw pi-plus-circle',
                          routerLink: ['/app/admin/zenerator/state-bucket/list']
                        },
                        {
                          label: 'Liste bucket',
                          icon: 'pi pi-fw pi-plus-circle',
                          routerLink: ['/app/admin/zenerator/bucket/list']
                        },
                        {
                          label: 'Liste tag',
                          icon: 'pi pi-fw pi-plus-circle',
                          routerLink: ['/app/admin/zenerator/tag/list']
                        },
                    ]
                  },*/
                /*{
                  label: 'Pack abonnement',
                  icon: 'pi pi-wallet',
                  items: [
                      {
                        label: 'Liste pack abonnement',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/admin/zenerator/pack-abonnement/list']
                      },
                  ]
                },*/
                {
                    label: 'Panier',
                    icon: 'pi pi-shopping-cart',
                    items: [
                        {
                            label: 'Liste panier item',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/zenerator/panier-item/list']
                        },
                        {
                            label: 'Liste panier',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/zenerator/panier/list']
                        },
                        {
                            label: 'Liste etat panier',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/zenerator/etat-panier/list']
                        },
                    ]
                },
                /*{
                  label: 'Etat abonnement',
                  icon: 'pi pi-wallet',
                  items: [
                      {
                        label: 'Liste etat abonnement',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/admin/zenerator/etat-abonnement/list']
                      },
                  ]
                },*/
                {
                    label: 'EtatImage',
                    icon: 'pi pi-check-square',
                    items: [
                        {
                            label: 'Liste etat image',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/zenerator/etat-image/list']
                        },
                    ]
                },
                {
                    label: 'Client',
                    icon: 'pi pi-users',
                    items: [
                        {
                            label: 'Liste client',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/zenerator/client/list']
                        },
                    ]
                },
                {
                    label: 'Contrat',
                    icon: 'pi pi-file',
                    items: [
                        {
                            label: 'Liste contract',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/zenerator/contract/list']
                        },
                        {
                            label: 'Liste signature',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/zenerator/signature/list']
                        },
                        {
                            label: 'Liste type contrat',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/zenerator/type-contrat/list']
                        },
                    ]
                },
                {
                    label: 'TypeContributeur',
                    icon: 'pi pi-th-large',
                    items: [
                        {
                            label: 'Liste type contributeur',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/zenerator/type-contributeur/list']
                        },
                    ]
                },
            ];
        this.modelclient =
            [
                // {
                //   label: 'Paiement',
                //   icon: 'pi pi-wallet',
                //   items: [
                //       {
                //         label: 'Liste paiement',
                //         icon: 'pi pi-fw pi-plus-circle',
                //         routerLink: ['/app/client/zenerator/paiement/list']
                //       },
                //   ]
                // },
                /*  {
                    label: 'Categories',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                          label: 'Liste categorie image',
                          icon: 'pi pi-fw pi-plus-circle',
                          routerLink: ['/app/client/zenerator/categorie-image/list']
                        },
                    ]
                  },*/
                // {
                //   label: 'Contributeurs',
                //   icon: 'pi pi-wallet',
                //   items: [
                //       {
                //         label: 'Liste contributeur',
                //         icon: 'pi pi-fw pi-plus-circle',
                //         routerLink: ['/app/client/zenerator/contributeur/list']
                //       },
                //   ]
                // },
                // {
                //   label: 'TypeClient',
                //   icon: 'pi pi-wallet',
                //   items: [
                //       {
                //         label: 'Liste type client',
                //         icon: 'pi pi-fw pi-plus-circle',
                //         routerLink: ['/app/client/zenerator/type-client/list']
                //       },
                //   ]
                // },
                {
                    label: 'Images',
                    icon: 'pi pi-images',
                    items: [
                        {
                            label: 'Liste image',
                            icon: 'pi pi-image',
                            routerLink: ['/app/client/zenerator/image/list']
                        },
                    ]
                },
                // {
                //   label: 'TypePaiement',
                //   icon: 'pi pi-wallet',
                //   items: [
                //       {
                //         label: 'Liste type paiement',
                //         icon: 'pi pi-fw pi-plus-circle',
                //         routerLink: ['/app/client/zenerator/type-paiement/list']
                //       },
                //   ]
                // },
                /*  {
                    label: 'Offre reduction',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                          label: 'Liste offre reduction',
                          icon: 'pi pi-fw pi-plus-circle',
                          routerLink: ['/app/client/zenerator/offre-reduction/list']
                        },
                    ]
                  },
                  {
                    label: 'Abonnement',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                          label: 'Liste abonnement',
                          icon: 'pi pi-fw pi-plus-circle',
                          routerLink: ['/app/client/zenerator/abonnement/list']
                        },
                    ]
                  },
                  {
                    label: 'TypeImage',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                          label: 'Liste type image',
                          icon: 'pi pi-fw pi-plus-circle',
                          routerLink: ['/app/client/zenerator/type-image/list']
                        },
                    ]
                  },*/
                // {
                //   label: 'Chercheur',
                //   icon: 'pi pi-wallet',
                //   items: [
                //       {
                //         label: 'Liste chercheur',
                //         icon: 'pi pi-fw pi-plus-circle',
                //         routerLink: ['/app/client/zenerator/chercheur/list']
                //       },
                //   ]
                // },
                /* {
                   label: 'CategorieItem',
                   icon: 'pi pi-wallet',
                   items: [
                       {
                         label: 'Liste categorie item',
                         icon: 'pi pi-fw pi-plus-circle',
                         routerLink: ['/app/client/zenerator/categorie-item/list']
                       },
                   ]
                 },*/
                // {
                //   label: 'Bucket',
                //   icon: 'pi pi-wallet',
                //   items: [
                //       {
                //         label: 'Liste tag bucket',
                //         icon: 'pi pi-fw pi-plus-circle',
                //         routerLink: ['/app/client/zenerator/tag-bucket/list']
                //       },
                //       {
                //         label: 'Liste state bucket',
                //         icon: 'pi pi-fw pi-plus-circle',
                //         routerLink: ['/app/client/zenerator/state-bucket/list']
                //       },
                //       {
                //         label: 'Liste bucket',
                //         icon: 'pi pi-fw pi-plus-circle',
                //         routerLink: ['/app/client/zenerator/bucket/list']
                //       },
                //       {
                //         label: 'Liste tag',
                //         icon: 'pi pi-fw pi-plus-circle',
                //         routerLink: ['/app/client/zenerator/tag/list']
                //       },
                //   ]
                // },
                /*   {
                     label: 'Pack abonnement',
                     icon: 'pi pi-wallet',
                     items: [
                         {
                           label: 'Liste pack abonnement',
                           icon: 'pi pi-fw pi-plus-circle',
                           routerLink: ['/app/client/zenerator/pack-abonnement/list']
                         },
                     ]
                   },
                   {
                     label: 'Panier',
                     icon: 'pi pi-wallet',
                     items: [
                         {
                           label: 'Liste panier item',
                           icon: 'pi pi-fw pi-plus-circle',
                           routerLink: ['/app/client/zenerator/panier-item/list']
                         },
                         {
                           label: 'Liste panier',
                           icon: 'pi pi-fw pi-plus-circle',
                           routerLink: ['/app/client/zenerator/panier/list']
                         },
                         {
                           label: 'Liste etat panier',
                           icon: 'pi pi-fw pi-plus-circle',
                           routerLink: ['/app/client/zenerator/etat-panier/list']
                         },
                     ]
                   },
                   {
                     label: 'Etat abonnement',
                     icon: 'pi pi-wallet',
                     items: [
                         {
                           label: 'Liste etat abonnement',
                           icon: 'pi pi-fw pi-plus-circle',
                           routerLink: ['/app/client/zenerator/etat-abonnement/list']
                         },
                     ]
                   },
                   {
                     label: 'EtatImage',
                     icon: 'pi pi-wallet',
                     items: [
                         {
                           label: 'Liste etat image',
                           icon: 'pi pi-fw pi-plus-circle',
                           routerLink: ['/app/client/zenerator/etat-image/list']
                         },
                     ]
                   },*/
                // {
                //   label: 'Client',
                //   icon: 'pi pi-wallet',
                //   items: [
                //       {
                //         label: 'Liste client',
                //         icon: 'pi pi-fw pi-plus-circle',
                //         routerLink: ['/app/client/zenerator/client/list']
                //       },
                //   ]
                // },
                // {
                //   label: 'Contrat',
                //   icon: 'pi pi-wallet',
                //   items: [
                //       {
                //         label: 'Liste contract',
                //         icon: 'pi pi-fw pi-plus-circle',
                //         routerLink: ['/app/client/zenerator/contract/list']
                //       },
                //       {
                //         label: 'Liste signature',
                //         icon: 'pi pi-fw pi-plus-circle',
                //         routerLink: ['/app/client/zenerator/signature/list']
                //       },
                //       {
                //         label: 'Liste type contrat',
                //         icon: 'pi pi-fw pi-plus-circle',
                //         routerLink: ['/app/client/zenerator/type-contrat/list']
                //       },
                //   ]
                // },
                // {
                //   label: 'TypeContributeur',
                //   icon: 'pi pi-wallet',
                //   items: [
                //       {
                //         label: 'Liste type contributeur',
                //         icon: 'pi pi-fw pi-plus-circle',
                //         routerLink: ['/app/client/zenerator/type-contributeur/list']
                //       },
                //   ]
                // },
            ];
        this.modelcontributeur =
            [
                /*{
                  label: 'Paiement',
                  icon: 'pi pi-wallet',
                  items: [
                      {
                        label: 'Liste paiement',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/paiement/list']
                      },
                  ]
                },*/
                {
                    label: 'Categories',
                    icon: 'pi pi-folder-open',
                    items: [
                        {
                            label: 'Liste categorie image',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/contributeur/zenerator/categorie-image/list']
                        },
                    ]
                },
                /*{
                  label: 'Contributeurs',
                  icon: 'pi pi-wallet',
                  items: [
                      {
                        label: 'Liste contributeur',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/contributeur/list']
                      },
                  ]
                },*/
                /*{
                  label: 'TypeClient',
                  icon: 'pi pi-wallet',
                  items: [
                      {
                        label: 'Liste type client',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/type-client/list']
                      },
                  ]
                },*/
                {
                    label: 'Images',
                    icon: 'pi pi-image',
                    items: [
                        {
                            label: 'Liste image',
                            icon: 'pi pi-folder-open',
                            routerLink: ['/app/contributeur/zenerator/image/list']
                        },
                    ]
                },
                /*{
                  label: 'TypePaiement',
                  icon: 'pi pi-wallet',
                  items: [
                      {
                        label: 'Liste type paiement',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/type-paiement/list']
                      },
                  ]
                },*/
                /*{
                  label: 'Offre reduction',
                  icon: 'pi pi-wallet',
                  items: [
                      {
                        label: 'Liste offre reduction',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/offre-reduction/list']
                      },
                  ]
                },*/
                /*{
                  label: 'Abonnement',
                  icon: 'pi pi-wallet',
                  items: [
                      {
                        label: 'Liste abonnement',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/abonnement/list']
                      },
                  ]
                },*/
                {
                    label: 'TypeImage',
                    icon: 'pi pi-th-large',
                    items: [
                        {
                            label: 'Liste type image',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/contributeur/zenerator/type-image/list']
                        },
                    ]
                },
                /*{
                  label: 'Chercheur',
                  icon: 'pi pi-wallet',
                  items: [
                      {
                        label: 'Liste chercheur',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/chercheur/list']
                      },
                  ]
                },*/
                /*  {
                    label: 'CategorieItem',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                          label: 'Liste categorie item',
                          icon: 'pi pi-fw pi-plus-circle',
                          routerLink: ['/app/contributeur/zenerator/categorie-item/list']
                        },
                    ]
                  },*/
                /*{
                  label: 'Bucket',
                  icon: 'pi pi-wallet',
                  items: [
                      {
                        label: 'Liste tag bucket',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/tag-bucket/list']
                      },
                      {
                        label: 'Liste state bucket',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/state-bucket/list']
                      },
                      {
                        label: 'Liste bucket',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/bucket/list']
                      },
                      {
                        label: 'Liste tag',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/tag/list']
                      },
                  ]
                },
                {
                  label: 'Pack abonnement',
                  icon: 'pi pi-wallet',
                  items: [
                      {
                        label: 'Liste pack abonnement',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/pack-abonnement/list']
                      },
                  ]
                },*/
                /*{
                  label: 'Panier',
                  icon: 'pi pi-wallet',
                  items: [
                      {
                        label: 'Liste panier item',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/panier-item/list']
                      },
                      {
                        label: 'Liste panier',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/panier/list']
                      },
                      {
                        label: 'Liste etat panier',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/etat-panier/list']
                      },
                  ]
                },*/
                /*{
                  label: 'Etat abonnement',
                  icon: 'pi pi-wallet',
                  items: [
                      {
                        label: 'Liste etat abonnement',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/etat-abonnement/list']
                      },
                  ]
                },*/
                // {
                //     label: 'EtatImage',
                //     icon: 'pi pi-check-square',
                //     items: [
                //         {
                //             label: 'Liste etat image',
                //             icon: 'pi pi-fw pi-plus-circle',
                //             routerLink: ['/app/contributeur/zenerator/etat-image/list']
                //         },
                //     ]
                // },
                /*{
                  label: 'Client',
                  icon: 'pi pi-wallet',
                  items: [
                      {
                        label: 'Liste client',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/client/list']
                      },
                  ]
                },*/
                /*{
                  label: 'Contrat',
                  icon: 'pi pi-wallet',
                  items: [
                      {
                        label: 'Liste contract',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/contract/list']
                      },
                      {
                        label: 'Liste signature',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/signature/list']
                      },
                      {
                        label: 'Liste type contrat',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/contributeur/zenerator/type-contrat/list']
                      },
                  ]
                },*/
                /*   {
                     label: 'TypeContributeur',
                     icon: 'pi pi-wallet',
                     items: [
                         {
                           label: 'Liste type contributeur',
                           icon: 'pi pi-fw pi-plus-circle',
                           routerLink: ['/app/contributeur/zenerator/type-contributeur/list']
                         },
                     ]
                   },*/
            ];
        if (this.authService.authenticated) {
            if (this.authService.authenticatedUser.roles) {

                this.authService.authenticatedUser.roles.forEach(role => {
                    const roleName: string = this.getRole(role);
                    this.roleService._role.next(roleName.toUpperCase());
                    eval('this.model = this.model' + this.getRole(role));
                });
            }
            if (this.authService.authenticatedUser.roles[0] === 'ROLE_CONTRIBUTEUR'){
                this.model = this.modelcontributeur;
            }else if (this.authService.authenticatedUser.roles[0] === 'ROLE_ADMIN'){
                this.model = this.modeladmin;
            }else if (this.authService.authenticatedUser.roles[0] === 'ROLE_CLIENT'){
                this.model = this.modelclient;
            }

        }
    }
    getRole(text){
        const [role, ...rest] = text.split('_');
        return rest.join('').toLowerCase();
    }
    onMenuClick(event) {
        this.appMain.onMenuClick(event);
    }
}
