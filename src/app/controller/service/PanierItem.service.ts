import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PanierItemVo} from '../model/PanierItem.model';
import {PanierVo} from '../model/Panier.model';
import {ImageVo} from '../model/Image.model';


@Injectable({
    providedIn: 'root'
})
export class PanierItemService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/panierItem/';
        });
    }

    private _panierItems: Array<PanierItemVo>;
    private _panier: PanierVo;
    private _selectedPanierItem: PanierItemVo;
    private _panierItemSelections: Array<PanierItemVo>;
    private _createPanierItemDialog: boolean;
    private _editPanierItemDialog: boolean;
    private _viewPanierItemDialog: boolean;
    public editPanierItem$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchPanierItem: PanierItemVo;

    // methods

    public findAll() {
        return this.http.get<Array<PanierItemVo>>(this.API);
    }

    public save(): Observable<PanierItemVo> {
        return this.http.post<PanierItemVo>(this.API, this.selectedPanierItem);
    }

    delete(panierItem: PanierItemVo) {
        return this.http.delete<number>(this.API + 'id/' + panierItem.id);
    }


    public edit(): Observable<PanierItemVo> {
        return this.http.put<PanierItemVo>(this.API, this.selectedPanierItem);
    }


    public findByCriteria(panierItem: PanierItemVo): Observable<Array<PanierItemVo>> {
        return this.http.post<Array<PanierItemVo>>(this.API + 'search', panierItem);
    }

    public findByIdWithAssociatedList(panierItem: PanierItemVo): Observable<PanierItemVo> {
        return this.http.get<PanierItemVo>(this.API + 'detail/id/' + panierItem.id);
    }

    // getters and setters


    get panierItems(): Array<PanierItemVo> {
        if (this._panierItems == null) {
            this._panierItems = new Array<PanierItemVo>();
        }
        return this._panierItems;
    }

    set panierItems(value: Array<PanierItemVo>) {
        this._panierItems = value;
    }

    get selectedPanierItem(): PanierItemVo {
        if (this._selectedPanierItem == null) {
            this._selectedPanierItem = new PanierItemVo();
        }
        return this._selectedPanierItem;
    }

    set selectedPanierItem(value: PanierItemVo) {
        this._selectedPanierItem = value;
    }

    get panierItemSelections(): Array<PanierItemVo> {
        if (this._panierItemSelections == null) {
            this._panierItemSelections = new Array<PanierItemVo>();
        }
        return this._panierItemSelections;
    }


    set panierItemSelections(value: Array<PanierItemVo>) {
        this._panierItemSelections = value;
    }

    get createPanierItemDialog(): boolean {
        return this._createPanierItemDialog;
    }

    set createPanierItemDialog(value: boolean) {
        this._createPanierItemDialog = value;
    }

    get editPanierItemDialog(): boolean {
        return this._editPanierItemDialog;
    }

    set editPanierItemDialog(value: boolean) {
        this._editPanierItemDialog = value;
    }

    get viewPanierItemDialog(): boolean {
        return this._viewPanierItemDialog;
    }

    set viewPanierItemDialog(value: boolean) {
        this._viewPanierItemDialog = value;
    }

    get searchPanierItem(): PanierItemVo {
        if (this._searchPanierItem == null) {
            this._searchPanierItem = new PanierItemVo();
        }
        return this._searchPanierItem;
    }

    set searchPanierItem(value: PanierItemVo) {
        this._searchPanierItem = value;
    }


    get panier(): PanierVo {
        if (this._panier == null) {
            this._panier = new PanierVo();
        }
        return this._panier;
    }

    set panier(value: PanierVo) {
        this._panier = value;
    }
}
