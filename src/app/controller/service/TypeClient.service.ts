import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeClientVo} from '../model/TypeClient.model';


@Injectable({
  providedIn: 'root'
})
export class TypeClientService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeClient/';
        })
    }
     private _typeClients: Array<TypeClientVo> ;
     private _selectedTypeClient: TypeClientVo;
     private _typeClientSelections: Array<TypeClientVo>;
     private _createTypeClientDialog: boolean;
     private _editTypeClientDialog: boolean;
     private _viewTypeClientDialog: boolean;
     public editTypeClient$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeClient: TypeClientVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypeClientVo>>(this.API);
    }

    public save(): Observable<TypeClientVo> {
         return this.http.post<TypeClientVo>(this.API, this.selectedTypeClient);
    }

    delete(typeClient: TypeClientVo) {
         return this.http.delete<number>(this.API + 'id/' + typeClient.id);
    }


    public edit(): Observable<TypeClientVo> {
        return this.http.put<TypeClientVo>(this.API, this.selectedTypeClient);
    }


     public findByCriteria(typeClient:TypeClientVo):Observable<Array<TypeClientVo>>{
           return this.http.post<Array<TypeClientVo>>(this.API +'search', typeClient);
    }

   public findByIdWithAssociatedList(typeClient:TypeClientVo):Observable<TypeClientVo>{
         return this.http.get<TypeClientVo>(this.API + 'detail/id/' +typeClient.id);
    }

    // getters and setters


    get typeClients(): Array<TypeClientVo> {
    if(this._typeClients==null){
    this._typeClients=new Array<TypeClientVo>();
    }
return this._typeClients;
       }

    set typeClients(value: Array<TypeClientVo>) {
        this._typeClients = value;
       }

    get selectedTypeClient(): TypeClientVo {
    if(this._selectedTypeClient==null){
    this._selectedTypeClient=new TypeClientVo();
    }
           return this._selectedTypeClient;
       }

    set selectedTypeClient(value: TypeClientVo) {
        this._selectedTypeClient = value;
       }

    get typeClientSelections(): Array<TypeClientVo> {
    if(this._typeClientSelections==null){
    this._typeClientSelections=new Array<TypeClientVo>();
    }
        return this._typeClientSelections;
       }


    set typeClientSelections(value: Array<TypeClientVo>) {
        this._typeClientSelections = value;
       }

    get createTypeClientDialog(): boolean {
        return this._createTypeClientDialog;
       }

    set createTypeClientDialog(value: boolean) {
        this._createTypeClientDialog = value;
       }

    get editTypeClientDialog(): boolean {
        return this._editTypeClientDialog;
       }

    set editTypeClientDialog(value: boolean) {
        this._editTypeClientDialog = value;
       }

    get viewTypeClientDialog(): boolean {
        return this._viewTypeClientDialog;
       }

    set viewTypeClientDialog(value: boolean) {
        this._viewTypeClientDialog = value;
       }

     get searchTypeClient(): TypeClientVo {
     if(this._searchTypeClient==null){
    this._searchTypeClient=new TypeClientVo();
    }
        return this._searchTypeClient;
    }

    set searchTypeClient(value: TypeClientVo) {
        this._searchTypeClient = value;
       }

}
