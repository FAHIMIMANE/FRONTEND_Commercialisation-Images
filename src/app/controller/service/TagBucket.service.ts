import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TagBucketVo} from '../model/TagBucket.model';
import {BucketVo} from '../model/Bucket.model';
import {TagVo} from '../model/Tag.model';


@Injectable({
  providedIn: 'root'
})
export class TagBucketService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/tagBucket/';
        })
    }
     private _tagBuckets: Array<TagBucketVo> ;
     private _selectedTagBucket: TagBucketVo;
     private _tagBucketSelections: Array<TagBucketVo>;
     private _createTagBucketDialog: boolean;
     private _editTagBucketDialog: boolean;
     private _viewTagBucketDialog: boolean;
     public editTagBucket$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTagBucket: TagBucketVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TagBucketVo>>(this.API);
    }

    public save(): Observable<TagBucketVo> {
         return this.http.post<TagBucketVo>(this.API, this.selectedTagBucket);
    }

    delete(tagBucket: TagBucketVo) {
         return this.http.delete<number>(this.API + 'id/' + tagBucket.id);
    }


    public edit(): Observable<TagBucketVo> {
        return this.http.put<TagBucketVo>(this.API, this.selectedTagBucket);
    }


     public findByCriteria(tagBucket:TagBucketVo):Observable<Array<TagBucketVo>>{
           return this.http.post<Array<TagBucketVo>>(this.API +'search', tagBucket);
    }

   public findByIdWithAssociatedList(tagBucket:TagBucketVo):Observable<TagBucketVo>{
         return this.http.get<TagBucketVo>(this.API + 'detail/id/' +tagBucket.id);
    }

    // getters and setters


    get tagBuckets(): Array<TagBucketVo> {
    if(this._tagBuckets==null){
    this._tagBuckets=new Array<TagBucketVo>();
    }
return this._tagBuckets;
       }

    set tagBuckets(value: Array<TagBucketVo>) {
        this._tagBuckets = value;
       }

    get selectedTagBucket(): TagBucketVo {
    if(this._selectedTagBucket==null){
    this._selectedTagBucket=new TagBucketVo();
    }
           return this._selectedTagBucket;
       }

    set selectedTagBucket(value: TagBucketVo) {
        this._selectedTagBucket = value;
       }

    get tagBucketSelections(): Array<TagBucketVo> {
    if(this._tagBucketSelections==null){
    this._tagBucketSelections=new Array<TagBucketVo>();
    }
        return this._tagBucketSelections;
       }


    set tagBucketSelections(value: Array<TagBucketVo>) {
        this._tagBucketSelections = value;
       }

    get createTagBucketDialog(): boolean {
        return this._createTagBucketDialog;
       }

    set createTagBucketDialog(value: boolean) {
        this._createTagBucketDialog = value;
       }

    get editTagBucketDialog(): boolean {
        return this._editTagBucketDialog;
       }

    set editTagBucketDialog(value: boolean) {
        this._editTagBucketDialog = value;
       }

    get viewTagBucketDialog(): boolean {
        return this._viewTagBucketDialog;
       }

    set viewTagBucketDialog(value: boolean) {
        this._viewTagBucketDialog = value;
       }

     get searchTagBucket(): TagBucketVo {
     if(this._searchTagBucket==null){
    this._searchTagBucket=new TagBucketVo();
    }
        return this._searchTagBucket;
    }

    set searchTagBucket(value: TagBucketVo) {
        this._searchTagBucket = value;
       }

}
