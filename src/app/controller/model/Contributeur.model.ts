import {BucketVo} from './Bucket.model';
import {User} from './User.model';



export class ContributeurVo  extends User{


    public numeroMatricule: string;
    public emailPrincipale: string;
    public resume: string;
    public credentialsNonExpired: null | boolean;
    public enabled: null | boolean;
    public accountNonExpired: null | boolean;
    public accountNonLocked: null | boolean;
    public passwordChanged: null | boolean;
    public createdAt: Date;
    public updatedAt: Date;
    public username: string;
    public password: string;
    public prenom: string;
    public nom: string;
    public cin: string;
    public numeroTelephone: string;
    public adresse: string;
    public codePostale: string;
                public createdAtMax: string ;
                public createdAtMin: string ;
                public updatedAtMax: string ;
                public updatedAtMin: string ;
      public bucketsVo: Array<BucketVo>;

}
