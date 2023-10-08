import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {SignatureVo} from '../model/Signature.model';
import {ContributeurVo} from '../model/Contributeur.model';
import {ContractVo} from '../model/Contract.model';


@Injectable({
  providedIn: 'root'
})
export class SignatureService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/signature/';
        })
    }
     private _signatures: Array<SignatureVo> ;
     private _selectedSignature: SignatureVo;
     private _signatureSelections: Array<SignatureVo>;
     private _createSignatureDialog: boolean;
     private _editSignatureDialog: boolean;
     private _viewSignatureDialog: boolean;
     public editSignature$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchSignature: SignatureVo ;

    // methods

    public findAll(){
     return this.http.get<Array<SignatureVo>>(this.API);
    }

    public save(): Observable<SignatureVo> {
           return this.http.post<SignatureVo>(this.API, {...this.selectedSignature,dateSignature: moment(this.selectedSignature.dateSignature).format("YYYY-MM-DD")});
    }

    delete(signature: SignatureVo) {
         return this.http.delete<number>(this.API + 'id/' + signature.id);
    }


    public edit(): Observable<SignatureVo> {
        return this.http.put<SignatureVo>(this.API, this.selectedSignature);
    }


     public findByCriteria(signature:SignatureVo):Observable<Array<SignatureVo>>{
           return this.http.post<Array<SignatureVo>>(this.API +'search', signature);
    }

   public findByIdWithAssociatedList(signature:SignatureVo):Observable<SignatureVo>{
         return this.http.get<SignatureVo>(this.API + 'detail/id/' +signature.id);
    }

    // getters and setters


    get signatures(): Array<SignatureVo> {
    if(this._signatures==null){
    this._signatures=new Array<SignatureVo>();
    }
return this._signatures;
       }

    set signatures(value: Array<SignatureVo>) {
        this._signatures = value;
       }

    get selectedSignature(): SignatureVo {
    if(this._selectedSignature==null){
    this._selectedSignature=new SignatureVo();
    }
           return this._selectedSignature;
       }

    set selectedSignature(value: SignatureVo) {
        this._selectedSignature = value;
       }

    get signatureSelections(): Array<SignatureVo> {
    if(this._signatureSelections==null){
    this._signatureSelections=new Array<SignatureVo>();
    }
        return this._signatureSelections;
       }


    set signatureSelections(value: Array<SignatureVo>) {
        this._signatureSelections = value;
       }

    get createSignatureDialog(): boolean {
        return this._createSignatureDialog;
       }

    set createSignatureDialog(value: boolean) {
        this._createSignatureDialog = value;
       }

    get editSignatureDialog(): boolean {
        return this._editSignatureDialog;
       }

    set editSignatureDialog(value: boolean) {
        this._editSignatureDialog = value;
       }

    get viewSignatureDialog(): boolean {
        return this._viewSignatureDialog;
       }

    set viewSignatureDialog(value: boolean) {
        this._viewSignatureDialog = value;
       }

     get searchSignature(): SignatureVo {
     if(this._searchSignature==null){
    this._searchSignature=new SignatureVo();
    }
        return this._searchSignature;
    }

    set searchSignature(value: SignatureVo) {
        this._searchSignature = value;
       }

}
