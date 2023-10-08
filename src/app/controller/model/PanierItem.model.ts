import {PanierVo} from './Panier.model';
import {ImageVo} from './Image.model';



export class PanierItemVo {

    public id: number;

    public prix: number;
    public reduction: number;
    public prixApresReduction: number;
                public prixMax: string ;
                public prixMin: string ;
                public reductionMax: string ;
                public reductionMin: string ;
                public prixApresReductionMax: string ;
                public prixApresReductionMin: string ;
      public imageVo: ImageVo ;
      public panierVo: PanierVo ;

}
