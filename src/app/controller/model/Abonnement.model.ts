import {EtatAbonnementVo} from './EtatAbonnement.model';
import {PackAbonnementVo} from './PackAbonnement.model';
import {ClientVo} from './Client.model';



export class AbonnementVo {

    public id: number;

    public dateDebut: Date;
    public dateFin: Date;
    public tarif: number;
    public reduction: number;
                public dateDebutMax: string ;
                public dateDebutMin: string ;
                public dateFinMax: string ;
                public dateFinMin: string ;
                public tarifMax: string ;
                public tarifMin: string ;
                public reductionMax: string ;
                public reductionMin: string ;
      public etatAbonnementVo: EtatAbonnementVo ;
      public clientVo: ClientVo ;
      public packAbonnementVo: PackAbonnementVo ;

}
