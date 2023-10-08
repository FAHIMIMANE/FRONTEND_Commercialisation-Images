import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CategorieItemVo} from '../model/CategorieItem.model';
import {CategorieImageVo} from '../model/CategorieImage.model';
import {ImageVo} from '../model/Image.model';


@Injectable({
  providedIn: 'root'
})
export class CategorieItemService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/categorieItem/';
        })
    }
     private _categorieItems: Array<CategorieItemVo> ;
     private _selectedCategorieItem: CategorieItemVo;
     private _categorieItemSelections: Array<CategorieItemVo>;
     private _createCategorieItemDialog: boolean;
     private _editCategorieItemDialog: boolean;
     private _viewCategorieItemDialog: boolean;
     public editCategorieItem$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCategorieItem: CategorieItemVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CategorieItemVo>>(this.API);
    }

    public save(): Observable<CategorieItemVo> {
         return this.http.post<CategorieItemVo>(this.API, this.selectedCategorieItem);
    }

    delete(categorieItem: CategorieItemVo) {
         return this.http.delete<number>(this.API + 'id/' + categorieItem.id);
    }


    public edit(): Observable<CategorieItemVo> {
        return this.http.put<CategorieItemVo>(this.API, this.selectedCategorieItem);
    }


     public findByCriteria(categorieItem:CategorieItemVo):Observable<Array<CategorieItemVo>>{
           return this.http.post<Array<CategorieItemVo>>(this.API +'search', categorieItem);
    }

   public findByIdWithAssociatedList(categorieItem:CategorieItemVo):Observable<CategorieItemVo>{
         return this.http.get<CategorieItemVo>(this.API + 'detail/id/' +categorieItem.id);
    }

    // getters and setters


    get categorieItems(): Array<CategorieItemVo> {
    if(this._categorieItems==null){
    this._categorieItems=new Array<CategorieItemVo>();
    }
return this._categorieItems;
       }

    set categorieItems(value: Array<CategorieItemVo>) {
        this._categorieItems = value;
       }

    get selectedCategorieItem(): CategorieItemVo {
    if(this._selectedCategorieItem==null){
    this._selectedCategorieItem=new CategorieItemVo();
    }
           return this._selectedCategorieItem;
       }

    set selectedCategorieItem(value: CategorieItemVo) {
        this._selectedCategorieItem = value;
       }

    get categorieItemSelections(): Array<CategorieItemVo> {
    if(this._categorieItemSelections==null){
    this._categorieItemSelections=new Array<CategorieItemVo>();
    }
        return this._categorieItemSelections;
       }


    set categorieItemSelections(value: Array<CategorieItemVo>) {
        this._categorieItemSelections = value;
       }

    get createCategorieItemDialog(): boolean {
        return this._createCategorieItemDialog;
       }

    set createCategorieItemDialog(value: boolean) {
        this._createCategorieItemDialog = value;
       }

    get editCategorieItemDialog(): boolean {
        return this._editCategorieItemDialog;
       }

    set editCategorieItemDialog(value: boolean) {
        this._editCategorieItemDialog = value;
       }

    get viewCategorieItemDialog(): boolean {
        return this._viewCategorieItemDialog;
       }

    set viewCategorieItemDialog(value: boolean) {
        this._viewCategorieItemDialog = value;
       }

     get searchCategorieItem(): CategorieItemVo {
     if(this._searchCategorieItem==null){
    this._searchCategorieItem=new CategorieItemVo();
    }
        return this._searchCategorieItem;
    }

    set searchCategorieItem(value: CategorieItemVo) {
        this._searchCategorieItem = value;
       }

}
