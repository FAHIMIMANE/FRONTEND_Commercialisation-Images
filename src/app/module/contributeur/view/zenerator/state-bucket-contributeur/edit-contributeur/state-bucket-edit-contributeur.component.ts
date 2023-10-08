import {Component, OnInit} from '@angular/core';
import {StateBucketService} from 'src/app/controller/service/StateBucket.service';
import {StateBucketVo} from 'src/app/controller/model/StateBucket.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-state-bucket-edit-contributeur',
  templateUrl: './state-bucket-edit-contributeur.component.html',
  styleUrls: ['./state-bucket-edit-contributeur.component.css']
})
export class StateBucketEditContributeurComponent implements OnInit {


constructor(private datePipe: DatePipe, private stateBucketService: StateBucketService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
) {
}

// methods
ngOnInit(): void {
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.stateBucketService.edit().subscribe(stateBucket=>{
    const myIndex = this.stateBuckets.findIndex(e => e.id === this.selectedStateBucket.id);
    this.stateBuckets[myIndex] = this.selectedStateBucket;
    this.editStateBucketDialog = false;
    this.selectedStateBucket = new StateBucketVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editStateBucketDialog  = false;
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

   get editStateBucketDialog(): boolean {
           return this.stateBucketService.editStateBucketDialog;

       }
    set editStateBucketDialog(value: boolean) {
        this.stateBucketService.editStateBucketDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
