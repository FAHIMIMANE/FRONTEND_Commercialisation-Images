import {TypeContratVo} from './TypeContrat.model';
import {SignatureVo} from './Signature.model';



export class ContractVo {

    public id: number;

    public dateDebut: Date;
    public dateFin: Date;
    public objet: string;
    public contenu: string;
    public reference: string;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
                public dateDebutMax: string ;
                public dateDebutMin: string ;
                public dateFinMax: string ;
                public dateFinMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public typeContratVo: TypeContratVo ;
      public signaturesVo: Array<SignatureVo>;

}
