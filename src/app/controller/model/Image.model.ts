import {BucketVo} from './Bucket.model';
import {CategorieItemVo} from './CategorieItem.model';
import {ClientVo} from './Client.model';
import {TypeImageVo} from './TypeImage.model';



export class ImageVo {

    public id: number;

    public reference: string;
    public prix: number;
    public description: string;
    public extension: string;
    public taille: number;
    public resolution: number;
                public prixMax: string ;
                public prixMin: string ;
                public tailleMax: string ;
                public tailleMin: string ;
                public resolutionMax: string ;
                public resolutionMin: string ;
      public clientVo: ClientVo ;
      public bucketVo: BucketVo ;
      public typeImageVo: TypeImageVo ;
      public categorieItemsVo: Array<CategorieItemVo>;
  public  picByte: any;
}
