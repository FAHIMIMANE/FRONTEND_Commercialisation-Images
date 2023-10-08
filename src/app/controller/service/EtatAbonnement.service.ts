import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatAbonnementVo} from '../model/EtatAbonnement.model';


@Injectable({
  providedIn: 'root'
})
export class EtatAbonnementService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatAbonnement/';
        })
    }
     private _etatAbonnements: Array<EtatAbonnementVo> ;
     private _selectedEtatAbonnement: EtatAbonnementVo;
     private _etatAbonnementSelections: Array<EtatAbonnementVo>;
     private _createEtatAbonnementDialog: boolean;
     private _editEtatAbonnementDialog: boolean;
     private _viewEtatAbonnementDialog: boolean;
     public editEtatAbonnement$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatAbonnement: EtatAbonnementVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtatAbonnementVo>>(this.API);
    }

    public save(): Observable<EtatAbonnementVo> {
         return this.http.post<EtatAbonnementVo>(this.API, this.selectedEtatAbonnement);
    }

    delete(etatAbonnement: EtatAbonnementVo) {
         return this.http.delete<number>(this.API + 'id/' + etatAbonnement.id);
    }


    public edit(): Observable<EtatAbonnementVo> {
        return this.http.put<EtatAbonnementVo>(this.API, this.selectedEtatAbonnement);
    }


     public findByCriteria(etatAbonnement:EtatAbonnementVo):Observable<Array<EtatAbonnementVo>>{
           return this.http.post<Array<EtatAbonnementVo>>(this.API +'search', etatAbonnement);
    }

   public findByIdWithAssociatedList(etatAbonnement:EtatAbonnementVo):Observable<EtatAbonnementVo>{
         return this.http.get<EtatAbonnementVo>(this.API + 'detail/id/' +etatAbonnement.id);
    }

    // getters and setters


    get etatAbonnements(): Array<EtatAbonnementVo> {
    if(this._etatAbonnements==null){
    this._etatAbonnements=new Array<EtatAbonnementVo>();
    }
return this._etatAbonnements;
       }

    set etatAbonnements(value: Array<EtatAbonnementVo>) {
        this._etatAbonnements = value;
       }

    get selectedEtatAbonnement(): EtatAbonnementVo {
    if(this._selectedEtatAbonnement==null){
    this._selectedEtatAbonnement=new EtatAbonnementVo();
    }
           return this._selectedEtatAbonnement;
       }

    set selectedEtatAbonnement(value: EtatAbonnementVo) {
        this._selectedEtatAbonnement = value;
       }

    get etatAbonnementSelections(): Array<EtatAbonnementVo> {
    if(this._etatAbonnementSelections==null){
    this._etatAbonnementSelections=new Array<EtatAbonnementVo>();
    }
        return this._etatAbonnementSelections;
       }


    set etatAbonnementSelections(value: Array<EtatAbonnementVo>) {
        this._etatAbonnementSelections = value;
       }

    get createEtatAbonnementDialog(): boolean {
        return this._createEtatAbonnementDialog;
       }

    set createEtatAbonnementDialog(value: boolean) {
        this._createEtatAbonnementDialog = value;
       }

    get editEtatAbonnementDialog(): boolean {
        return this._editEtatAbonnementDialog;
       }

    set editEtatAbonnementDialog(value: boolean) {
        this._editEtatAbonnementDialog = value;
       }

    get viewEtatAbonnementDialog(): boolean {
        return this._viewEtatAbonnementDialog;
       }

    set viewEtatAbonnementDialog(value: boolean) {
        this._viewEtatAbonnementDialog = value;
       }

     get searchEtatAbonnement(): EtatAbonnementVo {
     if(this._searchEtatAbonnement==null){
    this._searchEtatAbonnement=new EtatAbonnementVo();
    }
        return this._searchEtatAbonnement;
    }

    set searchEtatAbonnement(value: EtatAbonnementVo) {
        this._searchEtatAbonnement = value;
       }

}
