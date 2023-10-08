import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ContributeurVo} from '../model/Contributeur.model';
import {BucketVo} from '../model/Bucket.model';


@Injectable({
    providedIn: 'root'
})
export class ContributeurService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/contributeur/';
        });
    }

    private _contributeurs: Array<ContributeurVo>;
    private _selectedContributeur: ContributeurVo;
    private _contributeurSelections: Array<ContributeurVo>;
    private _createContributeurDialog: boolean;
    private _editContributeurDialog: boolean;
    private _viewContributeurDialog: boolean;
    public editContributeur$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchContributeur: ContributeurVo;
    private _switchChercheurDialog: boolean;

    // methods

    public findAll(): Observable<Array<ContributeurVo>> {
        return this.http.get<Array<ContributeurVo>>(this.API);
    }

    public save(): Observable<ContributeurVo> {
        return this.http.post<ContributeurVo>(this.API, {
            ...this.selectedContributeur,
            updatedAt: moment(this.selectedContributeur.updatedAt).format('YYYY-MM-DD')
        });
    }

    delete(contributeur: ContributeurVo) {
        return this.http.delete<number>(this.API + 'id/' + contributeur.id);
    }


    public edit(): Observable<ContributeurVo> {
        return this.http.put<ContributeurVo>(this.API, this.selectedContributeur);
    }


    public findByCriteria(contributeur: ContributeurVo): Observable<Array<ContributeurVo>> {
        return this.http.post<Array<ContributeurVo>>(this.API + 'search', contributeur);
    }

    public findByIdWithAssociatedList(contributeur: ContributeurVo): Observable<ContributeurVo> {
        return this.http.get<ContributeurVo>(this.API + 'detail/id/' + contributeur.id);
    }

    // getters and setters


    get contributeurs(): Array<ContributeurVo> {
        if (this._contributeurs == null) {
            this._contributeurs = new Array<ContributeurVo>();
        }
        return this._contributeurs;
    }

    set contributeurs(value: Array<ContributeurVo>) {
        this._contributeurs = value;
    }

    get selectedContributeur(): ContributeurVo {
        if (this._selectedContributeur == null) {
            this._selectedContributeur = new ContributeurVo();
        }
        return this._selectedContributeur;
    }

    set selectedContributeur(value: ContributeurVo) {
        this._selectedContributeur = value;
    }

    get contributeurSelections(): Array<ContributeurVo> {
        if (this._contributeurSelections == null) {
            this._contributeurSelections = new Array<ContributeurVo>();
        }
        return this._contributeurSelections;
    }


    set contributeurSelections(value: Array<ContributeurVo>) {
        this._contributeurSelections = value;
    }

    get createContributeurDialog(): boolean {
        return this._createContributeurDialog;
    }

    set createContributeurDialog(value: boolean) {
        this._createContributeurDialog = value;
    }

    get editContributeurDialog(): boolean {
        return this._editContributeurDialog;
    }

    set editContributeurDialog(value: boolean) {
        this._editContributeurDialog = value;
    }

    get viewContributeurDialog(): boolean {
        return this._viewContributeurDialog;
    }

    set viewContributeurDialog(value: boolean) {
        this._viewContributeurDialog = value;
    }

    get searchContributeur(): ContributeurVo {
        if (this._searchContributeur == null) {
            this._searchContributeur = new ContributeurVo();
        }
        return this._searchContributeur;
    }

    set searchContributeur(value: ContributeurVo) {
        this._searchContributeur = value;
    }

    get switchChercheurDialog(): boolean {
        return this._switchChercheurDialog;
    }

    set switchChercheurDialog(value: boolean) {
        this._switchChercheurDialog = value;
    }
}
