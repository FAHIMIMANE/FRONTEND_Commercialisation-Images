import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PackAbonnementVo} from '../model/PackAbonnement.model';


@Injectable({
  providedIn: 'root'
})
export class PackAbonnementService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/packAbonnement/';
        })
    }
     private _packAbonnements: Array<PackAbonnementVo> ;
     private _selectedPackAbonnement: PackAbonnementVo;
     private _packAbonnementSelections: Array<PackAbonnementVo>;
     private _createPackAbonnementDialog: boolean;
     private _editPackAbonnementDialog: boolean;
     private _viewPackAbonnementDialog: boolean;
     public editPackAbonnement$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPackAbonnement: PackAbonnementVo ;

    // methods

    public findAll(){
     return this.http.get<Array<PackAbonnementVo>>(this.API);
    }

    public save(): Observable<PackAbonnementVo> {
           return this.http.post<PackAbonnementVo>(this.API, {...this.selectedPackAbonnement,dateMax: moment(this.selectedPackAbonnement.dateMax).format("YYYY-MM-DD")});
    }

    delete(packAbonnement: PackAbonnementVo) {
         return this.http.delete<number>(this.API + 'id/' + packAbonnement.id);
    }


    public edit(): Observable<PackAbonnementVo> {
        return this.http.put<PackAbonnementVo>(this.API, this.selectedPackAbonnement);
    }


     public findByCriteria(packAbonnement:PackAbonnementVo):Observable<Array<PackAbonnementVo>>{
           return this.http.post<Array<PackAbonnementVo>>(this.API +'search', packAbonnement);
    }

   public findByIdWithAssociatedList(packAbonnement:PackAbonnementVo):Observable<PackAbonnementVo>{
         return this.http.get<PackAbonnementVo>(this.API + 'detail/id/' +packAbonnement.id);
    }

    // getters and setters


    get packAbonnements(): Array<PackAbonnementVo> {
    if(this._packAbonnements==null){
    this._packAbonnements=new Array<PackAbonnementVo>();
    }
return this._packAbonnements;
       }

    set packAbonnements(value: Array<PackAbonnementVo>) {
        this._packAbonnements = value;
       }

    get selectedPackAbonnement(): PackAbonnementVo {
    if(this._selectedPackAbonnement==null){
    this._selectedPackAbonnement=new PackAbonnementVo();
    }
           return this._selectedPackAbonnement;
       }

    set selectedPackAbonnement(value: PackAbonnementVo) {
        this._selectedPackAbonnement = value;
       }

    get packAbonnementSelections(): Array<PackAbonnementVo> {
    if(this._packAbonnementSelections==null){
    this._packAbonnementSelections=new Array<PackAbonnementVo>();
    }
        return this._packAbonnementSelections;
       }


    set packAbonnementSelections(value: Array<PackAbonnementVo>) {
        this._packAbonnementSelections = value;
       }

    get createPackAbonnementDialog(): boolean {
        return this._createPackAbonnementDialog;
       }

    set createPackAbonnementDialog(value: boolean) {
        this._createPackAbonnementDialog = value;
       }

    get editPackAbonnementDialog(): boolean {
        return this._editPackAbonnementDialog;
       }

    set editPackAbonnementDialog(value: boolean) {
        this._editPackAbonnementDialog = value;
       }

    get viewPackAbonnementDialog(): boolean {
        return this._viewPackAbonnementDialog;
       }

    set viewPackAbonnementDialog(value: boolean) {
        this._viewPackAbonnementDialog = value;
       }

     get searchPackAbonnement(): PackAbonnementVo {
     if(this._searchPackAbonnement==null){
    this._searchPackAbonnement=new PackAbonnementVo();
    }
        return this._searchPackAbonnement;
    }

    set searchPackAbonnement(value: PackAbonnementVo) {
        this._searchPackAbonnement = value;
       }

}
