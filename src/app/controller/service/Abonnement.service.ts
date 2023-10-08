import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {AbonnementVo} from '../model/Abonnement.model';
import {EtatAbonnementVo} from '../model/EtatAbonnement.model';
import {PackAbonnementVo} from '../model/PackAbonnement.model';
import {ClientVo} from '../model/Client.model';


@Injectable({
  providedIn: 'root'
})
export class AbonnementService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/abonnement/';
        })
    }
     private _abonnements: Array<AbonnementVo> ;
     private _selectedAbonnement: AbonnementVo;
     private _abonnementSelections: Array<AbonnementVo>;
     private _createAbonnementDialog: boolean;
     private _editAbonnementDialog: boolean;
     private _viewAbonnementDialog: boolean;
     public editAbonnement$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchAbonnement: AbonnementVo ;

    // methods

    public findAll(){
     return this.http.get<Array<AbonnementVo>>(this.API);
    }

    public save(): Observable<AbonnementVo> {
           return this.http.post<AbonnementVo>(this.API, {...this.selectedAbonnement,dateFin: moment(this.selectedAbonnement.dateFin).format("YYYY-MM-DD")});
    }

    delete(abonnement: AbonnementVo) {
         return this.http.delete<number>(this.API + 'id/' + abonnement.id);
    }


    public edit(): Observable<AbonnementVo> {
        return this.http.put<AbonnementVo>(this.API, this.selectedAbonnement);
    }


     public findByCriteria(abonnement:AbonnementVo):Observable<Array<AbonnementVo>>{
           return this.http.post<Array<AbonnementVo>>(this.API +'search', abonnement);
    }

   public findByIdWithAssociatedList(abonnement:AbonnementVo):Observable<AbonnementVo>{
         return this.http.get<AbonnementVo>(this.API + 'detail/id/' +abonnement.id);
    }

    // getters and setters


    get abonnements(): Array<AbonnementVo> {
    if(this._abonnements==null){
    this._abonnements=new Array<AbonnementVo>();
    }
return this._abonnements;
       }

    set abonnements(value: Array<AbonnementVo>) {
        this._abonnements = value;
       }

    get selectedAbonnement(): AbonnementVo {
    if(this._selectedAbonnement==null){
    this._selectedAbonnement=new AbonnementVo();
    }
           return this._selectedAbonnement;
       }

    set selectedAbonnement(value: AbonnementVo) {
        this._selectedAbonnement = value;
       }

    get abonnementSelections(): Array<AbonnementVo> {
    if(this._abonnementSelections==null){
    this._abonnementSelections=new Array<AbonnementVo>();
    }
        return this._abonnementSelections;
       }


    set abonnementSelections(value: Array<AbonnementVo>) {
        this._abonnementSelections = value;
       }

    get createAbonnementDialog(): boolean {
        return this._createAbonnementDialog;
       }

    set createAbonnementDialog(value: boolean) {
        this._createAbonnementDialog = value;
       }

    get editAbonnementDialog(): boolean {
        return this._editAbonnementDialog;
       }

    set editAbonnementDialog(value: boolean) {
        this._editAbonnementDialog = value;
       }

    get viewAbonnementDialog(): boolean {
        return this._viewAbonnementDialog;
       }

    set viewAbonnementDialog(value: boolean) {
        this._viewAbonnementDialog = value;
       }

     get searchAbonnement(): AbonnementVo {
     if(this._searchAbonnement==null){
    this._searchAbonnement=new AbonnementVo();
    }
        return this._searchAbonnement;
    }

    set searchAbonnement(value: AbonnementVo) {
        this._searchAbonnement = value;
       }

}
