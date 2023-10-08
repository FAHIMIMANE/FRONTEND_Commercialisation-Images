import { Component, OnInit } from '@angular/core';
import {ChartModule} from 'primeng/chart';
import {Subscription} from 'rxjs';
import {ClientService} from '../../../../../controller/service/Client.service';
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
 // config: AppConfig;
  constructor() {}

      number: any;
  ngOnInit(): void {

  }

}
