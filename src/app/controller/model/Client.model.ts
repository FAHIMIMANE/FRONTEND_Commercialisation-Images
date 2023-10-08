import {ImageVo} from './Image.model';
import {User} from './User.model';



export class ClientVo  extends User{


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
    public equivalenceAvecPanelErc: string;
    public baseHorizon: string;
    public role: string;
    public numeroDeTel: string;
    public codePostal: string;
    public rib: string;
                public createdAtMax: string ;
                public createdAtMin: string ;
                public updatedAtMax: string ;
                public updatedAtMin: string ;
      public imagesVo: Array<ImageVo>;

}
