import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatImageVo} from '../model/EtatImage.model';


@Injectable({
  providedIn: 'root'
})
export class EtatImageService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatImage/';
        })
    }
     private _etatImages: Array<EtatImageVo> ;
     private _selectedEtatImage: EtatImageVo;
     private _etatImageSelections: Array<EtatImageVo>;
     private _createEtatImageDialog: boolean;
     private _editEtatImageDialog: boolean;
     private _viewEtatImageDialog: boolean;
     public editEtatImage$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatImage: EtatImageVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtatImageVo>>(this.API);
    }

    public save(): Observable<EtatImageVo> {
         return this.http.post<EtatImageVo>(this.API, this.selectedEtatImage);
    }

    delete(etatImage: EtatImageVo) {
         return this.http.delete<number>(this.API + 'id/' + etatImage.id);
    }


    public edit(): Observable<EtatImageVo> {
        return this.http.put<EtatImageVo>(this.API, this.selectedEtatImage);
    }


     public findByCriteria(etatImage:EtatImageVo):Observable<Array<EtatImageVo>>{
           return this.http.post<Array<EtatImageVo>>(this.API +'search', etatImage);
    }

   public findByIdWithAssociatedList(etatImage:EtatImageVo):Observable<EtatImageVo>{
         return this.http.get<EtatImageVo>(this.API + 'detail/id/' +etatImage.id);
    }

    // getters and setters


    get etatImages(): Array<EtatImageVo> {
    if(this._etatImages==null){
    this._etatImages=new Array<EtatImageVo>();
    }
return this._etatImages;
       }

    set etatImages(value: Array<EtatImageVo>) {
        this._etatImages = value;
       }

    get selectedEtatImage(): EtatImageVo {
    if(this._selectedEtatImage==null){
    this._selectedEtatImage=new EtatImageVo();
    }
           return this._selectedEtatImage;
       }

    set selectedEtatImage(value: EtatImageVo) {
        this._selectedEtatImage = value;
       }

    get etatImageSelections(): Array<EtatImageVo> {
    if(this._etatImageSelections==null){
    this._etatImageSelections=new Array<EtatImageVo>();
    }
        return this._etatImageSelections;
       }


    set etatImageSelections(value: Array<EtatImageVo>) {
        this._etatImageSelections = value;
       }

    get createEtatImageDialog(): boolean {
        return this._createEtatImageDialog;
       }

    set createEtatImageDialog(value: boolean) {
        this._createEtatImageDialog = value;
       }

    get editEtatImageDialog(): boolean {
        return this._editEtatImageDialog;
       }

    set editEtatImageDialog(value: boolean) {
        this._editEtatImageDialog = value;
       }

    get viewEtatImageDialog(): boolean {
        return this._viewEtatImageDialog;
       }

    set viewEtatImageDialog(value: boolean) {
        this._viewEtatImageDialog = value;
       }

     get searchEtatImage(): EtatImageVo {
     if(this._searchEtatImage==null){
    this._searchEtatImage=new EtatImageVo();
    }
        return this._searchEtatImage;
    }

    set searchEtatImage(value: EtatImageVo) {
        this._searchEtatImage = value;
       }

}
