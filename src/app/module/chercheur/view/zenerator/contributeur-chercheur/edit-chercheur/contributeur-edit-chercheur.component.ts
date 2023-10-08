import {Component, OnInit} from '@angular/core';
import {ContributeurService} from 'src/app/controller/service/Contributeur.service';
import {ContributeurVo} from 'src/app/controller/model/Contributeur.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {StateBucketVo} from 'src/app/controller/model/StateBucket.model';
import {StateBucketService} from 'src/app/controller/service/StateBucket.service';
import {BucketVo} from 'src/app/controller/model/Bucket.model';
import {BucketService} from 'src/app/controller/service/Bucket.service';

@Component({
  selector: 'app-contributeur-edit-chercheur',
  templateUrl: './contributeur-edit-chercheur.component.html',
  styleUrls: ['./contributeur-edit-chercheur.component.css']
})
export class ContributeurEditChercheurComponent implements OnInit {

        selectedBuckets: BucketVo = new BucketVo();
        bucketsListe: Array<BucketVo> = [];

        myStateBuckets: Array<StateBucketVo> = [];


constructor(private datePipe: DatePipe, private contributeurService: ContributeurService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private stateBucketService: StateBucketService
 ,       private bucketService: BucketService
) {
}

// methods
ngOnInit(): void {
                this.selectedBuckets.stateBucketVo = new StateBucketVo();
                this.stateBucketService.findAll().subscribe((data) => this.stateBuckets = data);
}
        addBuckets() {
        if( this.selectedContributeur.bucketsVo == null ){
            this.selectedContributeur.bucketsVo = new Array<BucketVo>();
        }
        this.selectedContributeur.bucketsVo.push(this.selectedBuckets);
        this.selectedBuckets = new BucketVo();
        }

       deleteBuckets(p: BucketVo) {
        this.selectedContributeur.bucketsVo.forEach((element, index) => {
            if (element === p) { this.selectedContributeur.bucketsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedContributeur.createdAt = DateUtils.toDate(this.selectedContributeur.createdAt);
            this.selectedContributeur.updatedAt = DateUtils.toDate(this.selectedContributeur.updatedAt);
    this.contributeurService.edit().subscribe(contributeur=>{
    const myIndex = this.contributeurs.findIndex(e => e.id === this.selectedContributeur.id);
    this.contributeurs[myIndex] = this.selectedContributeur;
    this.editContributeurDialog = false;
    this.selectedContributeur = new ContributeurVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatestateBucket(stateBucket: string) {
                      const isPermistted = await this.roleService.isPermitted('StateBucket', 'add');
                       if(isPermistted){
         this.selectedStateBucket = new StateBucketVo();
        this.createStateBucketDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editContributeurDialog  = false;
}

// getters and setters

get contributeurs(): Array<ContributeurVo> {
    return this.contributeurService.contributeurs;
       }
set contributeurs(value: Array<ContributeurVo>) {
        this.contributeurService.contributeurs = value;
       }

 get selectedContributeur(): ContributeurVo {
           return this.contributeurService.selectedContributeur;
       }
    set selectedContributeur(value: ContributeurVo) {
        this.contributeurService.selectedContributeur = value;
       }

   get editContributeurDialog(): boolean {
           return this.contributeurService.editContributeurDialog;

       }
    set editContributeurDialog(value: boolean) {
        this.contributeurService.editContributeurDialog = value;
       }

       get selectedStateBucket(): StateBucketVo {
           return this.stateBucketService.selectedStateBucket;
       }
      set selectedStateBucket(value: StateBucketVo) {
        this.stateBucketService.selectedStateBucket = value;
       }
       get stateBuckets(): Array<StateBucketVo> {
           return this.stateBucketService.stateBuckets;
       }
       set stateBuckets(value: Array<StateBucketVo>) {
        this.stateBucketService.stateBuckets = value;
       }
       get createStateBucketDialog(): boolean {
           return this.stateBucketService.createStateBucketDialog;
       }
      set createStateBucketDialog(value: boolean) {
        this.stateBucketService.createStateBucketDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
