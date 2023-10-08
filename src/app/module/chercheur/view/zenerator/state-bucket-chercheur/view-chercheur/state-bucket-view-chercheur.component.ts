import {Component, OnInit} from '@angular/core';
import {StateBucketService} from 'src/app/controller/service/StateBucket.service';
import {StateBucketVo} from 'src/app/controller/model/StateBucket.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-state-bucket-view-chercheur',
  templateUrl: './state-bucket-view-chercheur.component.html',
  styleUrls: ['./state-bucket-view-chercheur.component.css']
})
export class StateBucketViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private stateBucketService: StateBucketService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewStateBucketDialog  = false;
}

// getters and setters

get stateBuckets(): Array<StateBucketVo> {
    return this.stateBucketService.stateBuckets;
       }
set stateBuckets(value: Array<StateBucketVo>) {
        this.stateBucketService.stateBuckets = value;
       }

 get selectedStateBucket(): StateBucketVo {
           return this.stateBucketService.selectedStateBucket;
       }
    set selectedStateBucket(value: StateBucketVo) {
        this.stateBucketService.selectedStateBucket = value;
       }

   get viewStateBucketDialog(): boolean {
           return this.stateBucketService.viewStateBucketDialog;

       }
    set viewStateBucketDialog(value: boolean) {
        this.stateBucketService.viewStateBucketDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
