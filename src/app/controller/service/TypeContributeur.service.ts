import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeContributeurVo} from '../model/TypeContributeur.model';


@Injectable({
  providedIn: 'root'
})
export class TypeContributeurService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeContributeur/';
        })
    }
     private _typeContributeurs: Array<TypeContributeurVo> ;
     private _selectedTypeContributeur: TypeContributeurVo;
     private _typeContributeurSelections: Array<TypeContributeurVo>;
     private _createTypeContributeurDialog: boolean;
     private _editTypeContributeurDialog: boolean;
     private _viewTypeContributeurDialog: boolean;
     public editTypeContributeur$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeContributeur: TypeContributeurVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypeContributeurVo>>(this.API);
    }

    public save(): Observable<TypeContributeurVo> {
         return this.http.post<TypeContributeurVo>(this.API, this.selectedTypeContributeur);
    }

    delete(typeContributeur: TypeContributeurVo) {
         return this.http.delete<number>(this.API + 'id/' + typeContributeur.id);
    }


    public edit(): Observable<TypeContributeurVo> {
        return this.http.put<TypeContributeurVo>(this.API, this.selectedTypeContributeur);
    }


     public findByCriteria(typeContributeur:TypeContributeurVo):Observable<Array<TypeContributeurVo>>{
           return this.http.post<Array<TypeContributeurVo>>(this.API +'search', typeContributeur);
    }

   public findByIdWithAssociatedList(typeContributeur:TypeContributeurVo):Observable<TypeContributeurVo>{
         return this.http.get<TypeContributeurVo>(this.API + 'detail/id/' +typeContributeur.id);
    }

    // getters and setters


    get typeContributeurs(): Array<TypeContributeurVo> {
    if(this._typeContributeurs==null){
    this._typeContributeurs=new Array<TypeContributeurVo>();
    }
return this._typeContributeurs;
       }

    set typeContributeurs(value: Array<TypeContributeurVo>) {
        this._typeContributeurs = value;
       }

    get selectedTypeContributeur(): TypeContributeurVo {
    if(this._selectedTypeContributeur==null){
    this._selectedTypeContributeur=new TypeContributeurVo();
    }
           return this._selectedTypeContributeur;
       }

    set selectedTypeContributeur(value: TypeContributeurVo) {
        this._selectedTypeContributeur = value;
       }

    get typeContributeurSelections(): Array<TypeContributeurVo> {
    if(this._typeContributeurSelections==null){
    this._typeContributeurSelections=new Array<TypeContributeurVo>();
    }
        return this._typeContributeurSelections;
       }


    set typeContributeurSelections(value: Array<TypeContributeurVo>) {
        this._typeContributeurSelections = value;
       }

    get createTypeContributeurDialog(): boolean {
        return this._createTypeContributeurDialog;
       }

    set createTypeContributeurDialog(value: boolean) {
        this._createTypeContributeurDialog = value;
       }

    get editTypeContributeurDialog(): boolean {
        return this._editTypeContributeurDialog;
       }

    set editTypeContributeurDialog(value: boolean) {
        this._editTypeContributeurDialog = value;
       }

    get viewTypeContributeurDialog(): boolean {
        return this._viewTypeContributeurDialog;
       }

    set viewTypeContributeurDialog(value: boolean) {
        this._viewTypeContributeurDialog = value;
       }

     get searchTypeContributeur(): TypeContributeurVo {
     if(this._searchTypeContributeur==null){
    this._searchTypeContributeur=new TypeContributeurVo();
    }
        return this._searchTypeContributeur;
    }

    set searchTypeContributeur(value: TypeContributeurVo) {
        this._searchTypeContributeur = value;
       }

}
