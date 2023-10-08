import {Component, OnInit} from '@angular/core';
import {ContributeurService} from 'src/app/controller/service/Contributeur.service';
import {ContributeurVo} from 'src/app/controller/model/Contributeur.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StateBucketVo} from 'src/app/controller/model/StateBucket.model';
import {StateBucketService} from 'src/app/controller/service/StateBucket.service';
import {BucketVo} from 'src/app/controller/model/Bucket.model';
import {BucketService} from 'src/app/controller/service/Bucket.service';

@Component({
  selector: 'app-contributeur-view-chercheur',
  templateUrl: './contributeur-view-chercheur.component.html',
  styleUrls: ['./contributeur-view-chercheur.component.css']
})
export class ContributeurViewChercheurComponent implements OnInit {

        selectedBuckets: BucketVo = new BucketVo();
        bucketsListe: Array<BucketVo> = [];

        myStateBuckets: Array<StateBucketVo> = [];


constructor(private datePipe: DatePipe, private contributeurService: ContributeurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private stateBucketService: StateBucketService
    ,private bucketService: BucketService
) {
}

// methods
ngOnInit(): void {
                this.selectedBuckets.stateBucketVo = new StateBucketVo();
                this.stateBucketService.findAll().subscribe((data) => this.stateBuckets = data);
}

hideViewDialog(){
    this.viewContributeurDialog  = false;
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

   get viewContributeurDialog(): boolean {
           return this.contributeurService.viewContributeurDialog;

       }
    set viewContributeurDialog(value: boolean) {
        this.contributeurService.viewContributeurDialog= value;
       }

       get selectedStateBucket(): StateBucketVo {
           return this.stateBucketService.selectedStateBucket;
       }
      set selectedStateBucket(value: StateBucketVo) {
        this.stateBucketService.selectedStateBucket = value;
       }
       get stateBuckets():Array<StateBucketVo> {
           return this.stateBucketService.stateBuckets;
       }
       set stateBuckets(value: Array<StateBucketVo>) {
        this.stateBucketService.stateBuckets = value;
       }
       get editStateBucketDialog(): boolean {
           return this.stateBucketService.editStateBucketDialog;
       }
      set editStateBucketDialog(value: boolean) {
        this.stateBucketService.editStateBucketDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
