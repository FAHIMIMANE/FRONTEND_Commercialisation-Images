import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatPanierVo} from '../model/EtatPanier.model';


@Injectable({
  providedIn: 'root'
})
export class EtatPanierService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatPanier/';
        })
    }
     private _etatPaniers: Array<EtatPanierVo> ;
     private _selectedEtatPanier: EtatPanierVo;
     private _etatPanierSelections: Array<EtatPanierVo>;
     private _createEtatPanierDialog: boolean;
     private _editEtatPanierDialog: boolean;
     private _viewEtatPanierDialog: boolean;
     public editEtatPanier$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatPanier: EtatPanierVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtatPanierVo>>(this.API);
    }

    public save(): Observable<EtatPanierVo> {
         return this.http.post<EtatPanierVo>(this.API, this.selectedEtatPanier);
    }

    delete(etatPanier: EtatPanierVo) {
         return this.http.delete<number>(this.API + 'id/' + etatPanier.id);
    }


    public edit(): Observable<EtatPanierVo> {
        return this.http.put<EtatPanierVo>(this.API, this.selectedEtatPanier);
    }


     public findByCriteria(etatPanier:EtatPanierVo):Observable<Array<EtatPanierVo>>{
           return this.http.post<Array<EtatPanierVo>>(this.API +'search', etatPanier);
    }

   public findByIdWithAssociatedList(etatPanier:EtatPanierVo):Observable<EtatPanierVo>{
         return this.http.get<EtatPanierVo>(this.API + 'detail/id/' +etatPanier.id);
    }

    // getters and setters


    get etatPaniers(): Array<EtatPanierVo> {
    if(this._etatPaniers==null){
    this._etatPaniers=new Array<EtatPanierVo>();
    }
return this._etatPaniers;
       }

    set etatPaniers(value: Array<EtatPanierVo>) {
        this._etatPaniers = value;
       }

    get selectedEtatPanier(): EtatPanierVo {
    if(this._selectedEtatPanier==null){
    this._selectedEtatPanier=new EtatPanierVo();
    }
           return this._selectedEtatPanier;
       }

    set selectedEtatPanier(value: EtatPanierVo) {
        this._selectedEtatPanier = value;
       }

    get etatPanierSelections(): Array<EtatPanierVo> {
    if(this._etatPanierSelections==null){
    this._etatPanierSelections=new Array<EtatPanierVo>();
    }
        return this._etatPanierSelections;
       }


    set etatPanierSelections(value: Array<EtatPanierVo>) {
        this._etatPanierSelections = value;
       }

    get createEtatPanierDialog(): boolean {
        return this._createEtatPanierDialog;
       }

    set createEtatPanierDialog(value: boolean) {
        this._createEtatPanierDialog = value;
       }

    get editEtatPanierDialog(): boolean {
        return this._editEtatPanierDialog;
       }

    set editEtatPanierDialog(value: boolean) {
        this._editEtatPanierDialog = value;
       }

    get viewEtatPanierDialog(): boolean {
        return this._viewEtatPanierDialog;
       }

    set viewEtatPanierDialog(value: boolean) {
        this._viewEtatPanierDialog = value;
       }

     get searchEtatPanier(): EtatPanierVo {
     if(this._searchEtatPanier==null){
    this._searchEtatPanier=new EtatPanierVo();
    }
        return this._searchEtatPanier;
    }

    set searchEtatPanier(value: EtatPanierVo) {
        this._searchEtatPanier = value;
       }

}
