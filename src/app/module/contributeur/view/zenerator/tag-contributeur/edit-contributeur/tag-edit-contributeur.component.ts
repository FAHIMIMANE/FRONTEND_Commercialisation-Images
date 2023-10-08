import {Component, OnInit} from '@angular/core';
import {TagService} from 'src/app/controller/service/Tag.service';
import {TagVo} from 'src/app/controller/model/Tag.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-tag-edit-contributeur',
  templateUrl: './tag-edit-contributeur.component.html',
  styleUrls: ['./tag-edit-contributeur.component.css']
})
export class TagEditContributeurComponent implements OnInit {


constructor(private datePipe: DatePipe, private tagService: TagService
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
    this.tagService.edit().subscribe(tag=>{
    const myIndex = this.tags.findIndex(e => e.id === this.selectedTag.id);
    this.tags[myIndex] = this.selectedTag;
    this.editTagDialog = false;
    this.selectedTag = new TagVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTagDialog  = false;
}

// getters and setters

get tags(): Array<TagVo> {
    return this.tagService.tags;
       }
set tags(value: Array<TagVo>) {
        this.tagService.tags = value;
       }

 get selectedTag(): TagVo {
           return this.tagService.selectedTag;
       }
    set selectedTag(value: TagVo) {
        this.tagService.selectedTag = value;
       }

   get editTagDialog(): boolean {
           return this.tagService.editTagDialog;

       }
    set editTagDialog(value: boolean) {
        this.tagService.editTagDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
