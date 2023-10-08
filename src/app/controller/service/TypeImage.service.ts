import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeImageVo} from '../model/TypeImage.model';


@Injectable({
  providedIn: 'root'
})
export class TypeImageService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeImage/';
        })
    }
     private _typeImages: Array<TypeImageVo> ;
     private _selectedTypeImage: TypeImageVo;
     private _typeImageSelections: Array<TypeImageVo>;
     private _createTypeImageDialog: boolean;
     private _editTypeImageDialog: boolean;
     private _viewTypeImageDialog: boolean;
     public editTypeImage$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeImage: TypeImageVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypeImageVo>>(this.API);
    }

    public save(): Observable<TypeImageVo> {
         return this.http.post<TypeImageVo>(this.API, this.selectedTypeImage);
    }

    delete(typeImage: TypeImageVo) {
         return this.http.delete<number>(this.API + 'id/' + typeImage.id);
    }


    public edit(): Observable<TypeImageVo> {
        return this.http.put<TypeImageVo>(this.API, this.selectedTypeImage);
    }


     public findByCriteria(typeImage:TypeImageVo):Observable<Array<TypeImageVo>>{
           return this.http.post<Array<TypeImageVo>>(this.API +'search', typeImage);
    }

   public findByIdWithAssociatedList(typeImage:TypeImageVo):Observable<TypeImageVo>{
         return this.http.get<TypeImageVo>(this.API + 'detail/id/' +typeImage.id);
    }

    // getters and setters


    get typeImages(): Array<TypeImageVo> {
    if(this._typeImages==null){
    this._typeImages=new Array<TypeImageVo>();
    }
return this._typeImages;
       }

    set typeImages(value: Array<TypeImageVo>) {
        this._typeImages = value;
       }

    get selectedTypeImage(): TypeImageVo {
    if(this._selectedTypeImage==null){
    this._selectedTypeImage=new TypeImageVo();
    }
           return this._selectedTypeImage;
       }

    set selectedTypeImage(value: TypeImageVo) {
        this._selectedTypeImage = value;
       }

    get typeImageSelections(): Array<TypeImageVo> {
    if(this._typeImageSelections==null){
    this._typeImageSelections=new Array<TypeImageVo>();
    }
        return this._typeImageSelections;
       }


    set typeImageSelections(value: Array<TypeImageVo>) {
        this._typeImageSelections = value;
       }

    get createTypeImageDialog(): boolean {
        return this._createTypeImageDialog;
       }

    set createTypeImageDialog(value: boolean) {
        this._createTypeImageDialog = value;
       }

    get editTypeImageDialog(): boolean {
        return this._editTypeImageDialog;
       }

    set editTypeImageDialog(value: boolean) {
        this._editTypeImageDialog = value;
       }

    get viewTypeImageDialog(): boolean {
        return this._viewTypeImageDialog;
       }

    set viewTypeImageDialog(value: boolean) {
        this._viewTypeImageDialog = value;
       }

     get searchTypeImage(): TypeImageVo {
     if(this._searchTypeImage==null){
    this._searchTypeImage=new TypeImageVo();
    }
        return this._searchTypeImage;
    }

    set searchTypeImage(value: TypeImageVo) {
        this._searchTypeImage = value;
       }

}
