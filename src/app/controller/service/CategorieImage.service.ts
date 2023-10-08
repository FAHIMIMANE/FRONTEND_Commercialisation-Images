import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CategorieImageVo} from '../model/CategorieImage.model';


@Injectable({
  providedIn: 'root'
})
export class CategorieImageService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/categorieImage/';
        })
    }
     private _categorieImages: Array<CategorieImageVo> ;
     private _selectedCategorieImage: CategorieImageVo;
     private _categorieImageSelections: Array<CategorieImageVo>;
     private _createCategorieImageDialog: boolean;
     private _editCategorieImageDialog: boolean;
     private _viewCategorieImageDialog: boolean;
     public editCategorieImage$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCategorieImage: CategorieImageVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CategorieImageVo>>(this.API);
    }

    public save(): Observable<CategorieImageVo> {
         return this.http.post<CategorieImageVo>(this.API, this.selectedCategorieImage);
    }

    delete(categorieImage: CategorieImageVo) {
         return this.http.delete<number>(this.API + 'id/' + categorieImage.id);
    }


    public edit(): Observable<CategorieImageVo> {
        return this.http.put<CategorieImageVo>(this.API, this.selectedCategorieImage);
    }


     public findByCriteria(categorieImage:CategorieImageVo):Observable<Array<CategorieImageVo>>{
           return this.http.post<Array<CategorieImageVo>>(this.API +'search', categorieImage);
    }

   public findByIdWithAssociatedList(categorieImage:CategorieImageVo):Observable<CategorieImageVo>{
         return this.http.get<CategorieImageVo>(this.API + 'detail/id/' +categorieImage.id);
    }

    // getters and setters


    get categorieImages(): Array<CategorieImageVo> {
    if(this._categorieImages==null){
    this._categorieImages=new Array<CategorieImageVo>();
    }
return this._categorieImages;
       }

    set categorieImages(value: Array<CategorieImageVo>) {
        this._categorieImages = value;
       }

    get selectedCategorieImage(): CategorieImageVo {
    if(this._selectedCategorieImage==null){
    this._selectedCategorieImage=new CategorieImageVo();
    }
           return this._selectedCategorieImage;
       }

    set selectedCategorieImage(value: CategorieImageVo) {
        this._selectedCategorieImage = value;
       }

    get categorieImageSelections(): Array<CategorieImageVo> {
    if(this._categorieImageSelections==null){
    this._categorieImageSelections=new Array<CategorieImageVo>();
    }
        return this._categorieImageSelections;
       }


    set categorieImageSelections(value: Array<CategorieImageVo>) {
        this._categorieImageSelections = value;
       }

    get createCategorieImageDialog(): boolean {
        return this._createCategorieImageDialog;
       }

    set createCategorieImageDialog(value: boolean) {
        this._createCategorieImageDialog = value;
       }

    get editCategorieImageDialog(): boolean {
        return this._editCategorieImageDialog;
       }

    set editCategorieImageDialog(value: boolean) {
        this._editCategorieImageDialog = value;
       }

    get viewCategorieImageDialog(): boolean {
        return this._viewCategorieImageDialog;
       }

    set viewCategorieImageDialog(value: boolean) {
        this._viewCategorieImageDialog = value;
       }

     get searchCategorieImage(): CategorieImageVo {
     if(this._searchCategorieImage==null){
    this._searchCategorieImage=new CategorieImageVo();
    }
        return this._searchCategorieImage;
    }

    set searchCategorieImage(value: CategorieImageVo) {
        this._searchCategorieImage = value;
       }

}
