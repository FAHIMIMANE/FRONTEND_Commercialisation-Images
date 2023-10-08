import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ContractVo} from '../model/Contract.model';
import {TypeContratVo} from '../model/TypeContrat.model';
import {SignatureVo} from '../model/Signature.model';


@Injectable({
  providedIn: 'root'
})
export class ContractService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/contract/';
        })
    }
     private _contracts: Array<ContractVo> ;
     private _selectedContract: ContractVo;
     private _contractSelections: Array<ContractVo>;
     private _createContractDialog: boolean;
     private _editContractDialog: boolean;
     private _viewContractDialog: boolean;
     public editContract$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchContract: ContractVo ;

    // methods
    public archiver(contract: ContractVo): Observable<ContractVo> {
        return this.http.put<ContractVo>(this.API + 'archiver/' ,contract);
    }
    public desarchiver(contract: ContractVo): Observable<ContractVo> {
    return this.http.put<ContractVo>(this.API + 'desarchiver/' ,contract);
    }

    public findAll(){
     return this.http.get<Array<ContractVo>>(this.API);
    }

    public save(): Observable<ContractVo> {
           return this.http.post<ContractVo>(this.API, {...this.selectedContract,dateCreation: moment(this.selectedContract.dateCreation).format("YYYY-MM-DD")});
    }

    delete(contract: ContractVo) {
         return this.http.delete<number>(this.API + 'id/' + contract.id);
    }


    public edit(): Observable<ContractVo> {
        return this.http.put<ContractVo>(this.API, this.selectedContract);
    }


     public findByCriteria(contract:ContractVo):Observable<Array<ContractVo>>{
           return this.http.post<Array<ContractVo>>(this.API +'search', contract);
    }

   public findByIdWithAssociatedList(contract:ContractVo):Observable<ContractVo>{
         return this.http.get<ContractVo>(this.API + 'detail/id/' +contract.id);
    }

    // getters and setters


    get contracts(): Array<ContractVo> {
    if(this._contracts==null){
    this._contracts=new Array<ContractVo>();
    }
return this._contracts;
       }

    set contracts(value: Array<ContractVo>) {
        this._contracts = value;
       }

    get selectedContract(): ContractVo {
    if(this._selectedContract==null){
    this._selectedContract=new ContractVo();
    }
           return this._selectedContract;
       }

    set selectedContract(value: ContractVo) {
        this._selectedContract = value;
       }

    get contractSelections(): Array<ContractVo> {
    if(this._contractSelections==null){
    this._contractSelections=new Array<ContractVo>();
    }
        return this._contractSelections;
       }


    set contractSelections(value: Array<ContractVo>) {
        this._contractSelections = value;
       }

    get createContractDialog(): boolean {
        return this._createContractDialog;
       }

    set createContractDialog(value: boolean) {
        this._createContractDialog = value;
       }

    get editContractDialog(): boolean {
        return this._editContractDialog;
       }

    set editContractDialog(value: boolean) {
        this._editContractDialog = value;
       }

    get viewContractDialog(): boolean {
        return this._viewContractDialog;
       }

    set viewContractDialog(value: boolean) {
        this._viewContractDialog = value;
       }

     get searchContract(): ContractVo {
     if(this._searchContract==null){
    this._searchContract=new ContractVo();
    }
        return this._searchContract;
    }

    set searchContract(value: ContractVo) {
        this._searchContract = value;
       }

}
