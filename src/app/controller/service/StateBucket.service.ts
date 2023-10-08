import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {StateBucketVo} from '../model/StateBucket.model';


@Injectable({
  providedIn: 'root'
})
export class StateBucketService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/stateBucket/';
        })
    }
     private _stateBuckets: Array<StateBucketVo> ;
     private _selectedStateBucket: StateBucketVo;
     private _stateBucketSelections: Array<StateBucketVo>;
     private _createStateBucketDialog: boolean;
     private _editStateBucketDialog: boolean;
     private _viewStateBucketDialog: boolean;
     public editStateBucket$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchStateBucket: StateBucketVo ;

    // methods

    public findAll(){
     return this.http.get<Array<StateBucketVo>>(this.API);
    }

    public save(): Observable<StateBucketVo> {
         return this.http.post<StateBucketVo>(this.API, this.selectedStateBucket);
    }

    delete(stateBucket: StateBucketVo) {
         return this.http.delete<number>(this.API + 'id/' + stateBucket.id);
    }


    public edit(): Observable<StateBucketVo> {
        return this.http.put<StateBucketVo>(this.API, this.selectedStateBucket);
    }


     public findByCriteria(stateBucket:StateBucketVo):Observable<Array<StateBucketVo>>{
           return this.http.post<Array<StateBucketVo>>(this.API +'search', stateBucket);
    }

   public findByIdWithAssociatedList(stateBucket:StateBucketVo):Observable<StateBucketVo>{
         return this.http.get<StateBucketVo>(this.API + 'detail/id/' +stateBucket.id);
    }

    // getters and setters


    get stateBuckets(): Array<StateBucketVo> {
    if(this._stateBuckets==null){
    this._stateBuckets=new Array<StateBucketVo>();
    }
return this._stateBuckets;
       }

    set stateBuckets(value: Array<StateBucketVo>) {
        this._stateBuckets = value;
       }

    get selectedStateBucket(): StateBucketVo {
    if(this._selectedStateBucket==null){
    this._selectedStateBucket=new StateBucketVo();
    }
           return this._selectedStateBucket;
       }

    set selectedStateBucket(value: StateBucketVo) {
        this._selectedStateBucket = value;
       }

    get stateBucketSelections(): Array<StateBucketVo> {
    if(this._stateBucketSelections==null){
    this._stateBucketSelections=new Array<StateBucketVo>();
    }
        return this._stateBucketSelections;
       }


    set stateBucketSelections(value: Array<StateBucketVo>) {
        this._stateBucketSelections = value;
       }

    get createStateBucketDialog(): boolean {
        return this._createStateBucketDialog;
       }

    set createStateBucketDialog(value: boolean) {
        this._createStateBucketDialog = value;
       }

    get editStateBucketDialog(): boolean {
        return this._editStateBucketDialog;
       }

    set editStateBucketDialog(value: boolean) {
        this._editStateBucketDialog = value;
       }

    get viewStateBucketDialog(): boolean {
        return this._viewStateBucketDialog;
       }

    set viewStateBucketDialog(value: boolean) {
        this._viewStateBucketDialog = value;
       }

     get searchStateBucket(): StateBucketVo {
     if(this._searchStateBucket==null){
    this._searchStateBucket=new StateBucketVo();
    }
        return this._searchStateBucket;
    }

    set searchStateBucket(value: StateBucketVo) {
        this._searchStateBucket = value;
       }

}
