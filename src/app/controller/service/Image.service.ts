import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ImageVo} from '../model/Image.model';
import {BucketVo} from '../model/Bucket.model';
import {CategorieItemVo} from '../model/CategorieItem.model';
import {ClientVo} from '../model/Client.model';
import {TypeImageVo} from '../model/TypeImage.model';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';



@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private API = '';
    imageDetailListScan: AngularFireList<any>;

    constructor(  private firebase: AngularFireDatabase, private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/image/';
        });
        this.getImageDetailListScan();
    }

    private _images: Array<ImageVo>;
    private _panier: Array<ImageVo>;
    private _selectedImage: ImageVo;
    private _imageSelections: Array<ImageVo>;
    private _createImageDialog: boolean;
    private _panierDialog: boolean;
    private _editImageDialog: boolean;
    private _viewImageDialog: boolean;
    public editImage$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchImage: ImageVo;
    private imageDetails: AngularFireList<any>;
    // methods

    public findAll(): Observable<Array<ImageVo>> {
        return this.http.get<Array<ImageVo>>(this.API);
    }

    public save(): Observable<ImageVo> {
        return this.http.post<ImageVo>(this.API, this.selectedImage);
    }

    delete(image: ImageVo) {
        return this.http.delete<number>(this.API + 'id/' + image.id);
    }


    public edit(): Observable<ImageVo> {
        return this.http.put<ImageVo>(this.API, this.selectedImage);
    }


    public findByCriteria(image: ImageVo): Observable<Array<ImageVo>> {
        return this.http.post<Array<ImageVo>>(this.API + 'search', image);
    }

    public findByIdWithAssociatedList(image: ImageVo): Observable<ImageVo> {
        return this.http.get<ImageVo>(this.API + 'detail/id/' + image.id);
    }
    public findVecteur(){
        return this.http.get<number>('http://localhost:8036/api/admin/image/countImageByType/typeImage/code/Vecteurs');
    }
    public findillustration(){
        return this.http.get<number>('http://localhost:8036/api/admin/image/countImageByType/typeImage/code/Illustrations');
    }
    public findPhotographie(){
        return this.http.get<number>('http://localhost:8036/api/admin/image/countImageByType/typeImage/code/Photographies');
    }


    // getters and setters


    get images(): Array<ImageVo> {
        if (this._images == null) {
            this._images = new Array<ImageVo>();
        }
        return this._images;
    }

    set images(value: Array<ImageVo>) {
        this._images = value;
    }

    get selectedImage(): ImageVo {
        if (this._selectedImage == null) {
            this._selectedImage = new ImageVo();
        }
        return this._selectedImage;
    }

    set selectedImage(value: ImageVo) {
        this._selectedImage = value;
    }

    get imageSelections(): Array<ImageVo> {
        if (this._imageSelections == null) {
            this._imageSelections = new Array<ImageVo>();
        }
        return this._imageSelections;
    }


    get panier(): Array<ImageVo> {
        if (this._panier == null) {
            this._panier = new Array<ImageVo>();
        }
        return this._panier;
    }

    set panier(value: Array<ImageVo>) {
        this._panier = value;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set imageSelections(value: Array<ImageVo>) {
        this._imageSelections = value;
    }

    get createImageDialog(): boolean {
        return this._createImageDialog;
    }

    set createImageDialog(value: boolean) {
        this._createImageDialog = value;
    }

    get panierDialog(): boolean {
        return this._panierDialog;
    }

    set panierDialog(value: boolean) {
        this._panierDialog = value;
    }

    get editImageDialog(): boolean {
        return this._editImageDialog;
    }

    set editImageDialog(value: boolean) {
        this._editImageDialog = value;
    }

    get viewImageDialog(): boolean {
        return this._viewImageDialog;
    }

    set viewImageDialog(value: boolean) {
        this._viewImageDialog = value;
    }

    get searchImage(): ImageVo {
        if (this._searchImage == null) {
            this._searchImage = new ImageVo();
        }
        return this._searchImage;
    }

    set searchImage(value: ImageVo) {
        this._searchImage = value;
    }

  public  getOne() {


            return this.http.get<ImageVo>( this.API + '/Screenshotfrom2022-05-2322-17-01png');
        }
    getImageDetailListScan() {
        this.imageDetailListScan = this.firebase.list('imageDetails');
    }
    insertImageDetails(imageDetails) {
        this.imageDetailListScan.push(imageDetails);
    }
}
