import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {BucketVo} from '../model/Bucket.model';
import {StateBucketVo} from '../model/StateBucket.model';
import {ContributeurVo} from '../model/Contributeur.model';
import {ImageVo} from '../model/Image.model';


@Injectable({
  providedIn: 'root'
})
export class BucketService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/bucket/';
        })
    }
     private _buckets: Array<BucketVo> ;
     private _selectedBucket: BucketVo;
     private _bucketSelections: Array<BucketVo>;
     private _createBucketDialog: boolean;
     private _editBucketDialog: boolean;
     private _viewBucketDialog: boolean;
     public editBucket$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchBucket: BucketVo ;

    // methods

    public findAll(){
     return this.http.get<Array<BucketVo>>(this.API);
    }

    public save(): Observable<BucketVo> {
           return this.http.post<BucketVo>(this.API, {...this.selectedBucket,dateCreation: moment(this.selectedBucket.dateCreation).format("YYYY-MM-DD")});
    }

    delete(bucket: BucketVo) {
         return this.http.delete<number>(this.API + 'id/' + bucket.id);
    }


    public edit(): Observable<BucketVo> {
        return this.http.put<BucketVo>(this.API, this.selectedBucket);
    }


     public findByCriteria(bucket:BucketVo):Observable<Array<BucketVo>>{
           return this.http.post<Array<BucketVo>>(this.API +'search', bucket);
    }

   public findByIdWithAssociatedList(bucket:BucketVo):Observable<BucketVo>{
         return this.http.get<BucketVo>(this.API + 'detail/id/' +bucket.id);
    }

    // getters and setters


    get buckets(): Array<BucketVo> {
    if(this._buckets==null){
    this._buckets=new Array<BucketVo>();
    }
return this._buckets;
       }

    set buckets(value: Array<BucketVo>) {
        this._buckets = value;
       }

    get selectedBucket(): BucketVo {
    if(this._selectedBucket==null){
    this._selectedBucket=new BucketVo();
    }
           return this._selectedBucket;
       }

    set selectedBucket(value: BucketVo) {
        this._selectedBucket = value;
       }

    get bucketSelections(): Array<BucketVo> {
    if(this._bucketSelections==null){
    this._bucketSelections=new Array<BucketVo>();
    }
        return this._bucketSelections;
       }


    set bucketSelections(value: Array<BucketVo>) {
        this._bucketSelections = value;
       }

    get createBucketDialog(): boolean {
        return this._createBucketDialog;
       }

    set createBucketDialog(value: boolean) {
        this._createBucketDialog = value;
       }

    get editBucketDialog(): boolean {
        return this._editBucketDialog;
       }

    set editBucketDialog(value: boolean) {
        this._editBucketDialog = value;
       }

    get viewBucketDialog(): boolean {
        return this._viewBucketDialog;
       }

    set viewBucketDialog(value: boolean) {
        this._viewBucketDialog = value;
       }

     get searchBucket(): BucketVo {
     if(this._searchBucket==null){
    this._searchBucket=new BucketVo();
    }
        return this._searchBucket;
    }

    set searchBucket(value: BucketVo) {
        this._searchBucket = value;
       }

}
