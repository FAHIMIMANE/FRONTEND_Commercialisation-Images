import {PanierItemVo} from './PanierItem.model';
import {EtatPanierVo} from './EtatPanier.model';



export class PanierVo {

    public id: number;

    public reference: string;
    public prixTotal: number;
                public prixTotalMax: string ;
                public prixTotalMin: string ;
      public etatPanierVo: EtatPanierVo ;
      public panierItemsVo: Array<PanierItemVo>;

}
