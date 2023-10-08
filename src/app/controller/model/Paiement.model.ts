import {OffreReductionVo} from './OffreReduction.model';



export class PaiementVo {

    public id: number;

    public code: string;
    public montantHt: number;
    public montantTtc: number;
    public montantTva: number;
    public datePaiement: Date;
    public pourcentageReduction: number;
                public montantHtMax: string ;
                public montantHtMin: string ;
                public montantTtcMax: string ;
                public montantTtcMin: string ;
                public montantTvaMax: string ;
                public montantTvaMin: string ;
                public datePaiementMax: string ;
                public datePaiementMin: string ;
                public pourcentageReductionMax: string ;
                public pourcentageReductionMin: string ;
      public offreReductionVo: OffreReductionVo ;

}
