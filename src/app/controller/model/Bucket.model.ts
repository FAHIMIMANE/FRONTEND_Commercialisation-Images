import {StateBucketVo} from './StateBucket.model';
import {ContributeurVo} from './Contributeur.model';
import {ImageVo} from './Image.model';



export class BucketVo {

    public id: number;

    public nom: string;
    public dateCreation: Date;
    public libelle: string;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public stateBucketVo: StateBucketVo ;
      public contributeurVo: ContributeurVo ;
      public imagesVo: Array<ImageVo>;

}
