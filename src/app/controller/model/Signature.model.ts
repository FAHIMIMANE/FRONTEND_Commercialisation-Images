import {ContributeurVo} from './Contributeur.model';
import {ContractVo} from './Contract.model';



export class SignatureVo {

    public id: number;

    public dateSignature: Date;
                public dateSignatureMax: string ;
                public dateSignatureMin: string ;
      public contributeurVo: ContributeurVo ;
      public contractVo: ContractVo ;

}
