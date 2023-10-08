import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {OffreReductionVo} from '../model/OffreReduction.model';


@Injectable({
  providedIn: 'root'
})
export class OffreReductionService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/offreReduction/';
        })
    }
     private _offreReductions: Array<OffreReductionVo> ;
     private _selectedOffreReduction: OffreReductionVo;
     private _offreReductionSelections: Array<OffreReductionVo>;
     private _createOffreReductionDialog: boolean;
     private _editOffreReductionDialog: boolean;
     private _viewOffreReductionDialog: boolean;
     public editOffreReduction$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchOffreReduction: OffreReductionVo ;

    // methods

    public findAll(){
     return this.http.get<Array<OffreReductionVo>>(this.API);
    }

    public save(): Observable<OffreReductionVo> {
           return this.http.post<OffreReductionVo>(this.API, {...this.selectedOffreReduction,dateMax: moment(this.selectedOffreReduction.dateMax).format("YYYY-MM-DD")});
    }

    delete(offreReduction: OffreReductionVo) {
         return this.http.delete<number>(this.API + 'id/' + offreReduction.id);
    }


    public edit(): Observable<OffreReductionVo> {
        return this.http.put<OffreReductionVo>(this.API, this.selectedOffreReduction);
    }


     public findByCriteria(offreReduction:OffreReductionVo):Observable<Array<OffreReductionVo>>{
           return this.http.post<Array<OffreReductionVo>>(this.API +'search', offreReduction);
    }

   public findByIdWithAssociatedList(offreReduction:OffreReductionVo):Observable<OffreReductionVo>{
         return this.http.get<OffreReductionVo>(this.API + 'detail/id/' +offreReduction.id);
    }

    // getters and setters


    get offreReductions(): Array<OffreReductionVo> {
    if(this._offreReductions==null){
    this._offreReductions=new Array<OffreReductionVo>();
    }
return this._offreReductions;
       }

    set offreReductions(value: Array<OffreReductionVo>) {
        this._offreReductions = value;
       }

    get selectedOffreReduction(): OffreReductionVo {
    if(this._selectedOffreReduction==null){
    this._selectedOffreReduction=new OffreReductionVo();
    }
           return this._selectedOffreReduction;
       }

    set selectedOffreReduction(value: OffreReductionVo) {
        this._selectedOffreReduction = value;
       }

    get offreReductionSelections(): Array<OffreReductionVo> {
    if(this._offreReductionSelections==null){
    this._offreReductionSelections=new Array<OffreReductionVo>();
    }
        return this._offreReductionSelections;
       }


    set offreReductionSelections(value: Array<OffreReductionVo>) {
        this._offreReductionSelections = value;
       }

    get createOffreReductionDialog(): boolean {
        return this._createOffreReductionDialog;
       }

    set createOffreReductionDialog(value: boolean) {
        this._createOffreReductionDialog = value;
       }

    get editOffreReductionDialog(): boolean {
        return this._editOffreReductionDialog;
       }

    set editOffreReductionDialog(value: boolean) {
        this._editOffreReductionDialog = value;
       }

    get viewOffreReductionDialog(): boolean {
        return this._viewOffreReductionDialog;
       }

    set viewOffreReductionDialog(value: boolean) {
        this._viewOffreReductionDialog = value;
       }

     get searchOffreReduction(): OffreReductionVo {
     if(this._searchOffreReduction==null){
    this._searchOffreReduction=new OffreReductionVo();
    }
        return this._searchOffreReduction;
    }

    set searchOffreReduction(value: OffreReductionVo) {
        this._searchOffreReduction = value;
       }

}
