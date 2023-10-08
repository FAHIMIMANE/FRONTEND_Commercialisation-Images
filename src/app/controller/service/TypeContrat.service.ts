import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeContratVo} from '../model/TypeContrat.model';


@Injectable({
  providedIn: 'root'
})
export class TypeContratService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeContrat/';
        })
    }
     private _typeContrats: Array<TypeContratVo> ;
     private _selectedTypeContrat: TypeContratVo;
     private _typeContratSelections: Array<TypeContratVo>;
     private _createTypeContratDialog: boolean;
     private _editTypeContratDialog: boolean;
     private _viewTypeContratDialog: boolean;
     public editTypeContrat$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeContrat: TypeContratVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypeContratVo>>(this.API);
    }

    public save(): Observable<TypeContratVo> {
         return this.http.post<TypeContratVo>(this.API, this.selectedTypeContrat);
    }

    delete(typeContrat: TypeContratVo) {
         return this.http.delete<number>(this.API + 'id/' + typeContrat.id);
    }


    public edit(): Observable<TypeContratVo> {
        return this.http.put<TypeContratVo>(this.API, this.selectedTypeContrat);
    }


     public findByCriteria(typeContrat:TypeContratVo):Observable<Array<TypeContratVo>>{
           return this.http.post<Array<TypeContratVo>>(this.API +'search', typeContrat);
    }

   public findByIdWithAssociatedList(typeContrat:TypeContratVo):Observable<TypeContratVo>{
         return this.http.get<TypeContratVo>(this.API + 'detail/id/' +typeContrat.id);
    }

    // getters and setters


    get typeContrats(): Array<TypeContratVo> {
    if(this._typeContrats==null){
    this._typeContrats=new Array<TypeContratVo>();
    }
return this._typeContrats;
       }

    set typeContrats(value: Array<TypeContratVo>) {
        this._typeContrats = value;
       }

    get selectedTypeContrat(): TypeContratVo {
    if(this._selectedTypeContrat==null){
    this._selectedTypeContrat=new TypeContratVo();
    }
           return this._selectedTypeContrat;
       }

    set selectedTypeContrat(value: TypeContratVo) {
        this._selectedTypeContrat = value;
       }

    get typeContratSelections(): Array<TypeContratVo> {
    if(this._typeContratSelections==null){
    this._typeContratSelections=new Array<TypeContratVo>();
    }
        return this._typeContratSelections;
       }


    set typeContratSelections(value: Array<TypeContratVo>) {
        this._typeContratSelections = value;
       }

    get createTypeContratDialog(): boolean {
        return this._createTypeContratDialog;
       }

    set createTypeContratDialog(value: boolean) {
        this._createTypeContratDialog = value;
       }

    get editTypeContratDialog(): boolean {
        return this._editTypeContratDialog;
       }

    set editTypeContratDialog(value: boolean) {
        this._editTypeContratDialog = value;
       }

    get viewTypeContratDialog(): boolean {
        return this._viewTypeContratDialog;
       }

    set viewTypeContratDialog(value: boolean) {
        this._viewTypeContratDialog = value;
       }

     get searchTypeContrat(): TypeContratVo {
     if(this._searchTypeContrat==null){
    this._searchTypeContrat=new TypeContratVo();
    }
        return this._searchTypeContrat;
    }

    set searchTypeContrat(value: TypeContratVo) {
        this._searchTypeContrat = value;
       }

}
