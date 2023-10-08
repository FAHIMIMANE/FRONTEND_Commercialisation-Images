import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PanierVo} from '../model/Panier.model';
import {PanierItemVo} from '../model/PanierItem.model';
import {EtatPanierVo} from '../model/EtatPanier.model';


@Injectable({
  providedIn: 'root'
})
export class PanierService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/panier/';
        })
    }
     private _paniers: Array<PanierVo> ;
     private _selectedPanier: PanierVo;
     private _panierSelections: Array<PanierVo>;
     private _createPanierDialog: boolean;
     private _editPanierDialog: boolean;
     private _viewPanierDialog: boolean;
     public editPanier$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPanier: PanierVo ;

    // methods

    public findAll(){
     return this.http.get<Array<PanierVo>>(this.API);
    }

    public save(): Observable<PanierVo> {
         return this.http.post<PanierVo>(this.API, this.selectedPanier);
    }

    delete(panier: PanierVo) {
         return this.http.delete<number>(this.API + 'id/' + panier.id);
    }


    public edit(): Observable<PanierVo> {
        return this.http.put<PanierVo>(this.API, this.selectedPanier);
    }


     public findByCriteria(panier:PanierVo):Observable<Array<PanierVo>>{
           return this.http.post<Array<PanierVo>>(this.API +'search', panier);
    }

   public findByIdWithAssociatedList(panier:PanierVo):Observable<PanierVo>{
         return this.http.get<PanierVo>(this.API + 'detail/id/' +panier.id);
    }

    // getters and setters


    get paniers(): Array<PanierVo> {
    if(this._paniers==null){
    this._paniers=new Array<PanierVo>();
    }
return this._paniers;
       }

    set paniers(value: Array<PanierVo>) {
        this._paniers = value;
       }

    get selectedPanier(): PanierVo {
    if (this._selectedPanier == null){
    this._selectedPanier = new PanierVo();
    }
    return this._selectedPanier;
       }

    set selectedPanier(value: PanierVo) {
        this._selectedPanier = value;
       }

    get panierSelections(): Array<PanierVo> {
    if(this._panierSelections==null){
    this._panierSelections=new Array<PanierVo>();
    }
        return this._panierSelections;
       }


    set panierSelections(value: Array<PanierVo>) {
        this._panierSelections = value;
       }

    get createPanierDialog(): boolean {
        return this._createPanierDialog;
       }

    set createPanierDialog(value: boolean) {
        this._createPanierDialog = value;
       }

    get editPanierDialog(): boolean {
        return this._editPanierDialog;
       }

    set editPanierDialog(value: boolean) {
        this._editPanierDialog = value;
       }

    get viewPanierDialog(): boolean {
        return this._viewPanierDialog;
       }

    set viewPanierDialog(value: boolean) {
        this._viewPanierDialog = value;
       }

     get searchPanier(): PanierVo {
     if(this._searchPanier==null){
    this._searchPanier=new PanierVo();
    }
        return this._searchPanier;
    }

    set searchPanier(value: PanierVo) {
        this._searchPanier = value;
       }

}
