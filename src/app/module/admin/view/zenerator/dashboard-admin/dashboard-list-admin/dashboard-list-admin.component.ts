import { Component, OnInit } from '@angular/core';
import {ChartModule} from 'primeng/chart';
import {Subscription} from 'rxjs';
import {ClientService} from '../../../../../../controller/service/Client.service';
import {ContributeurService} from '../../../../../../controller/service/Contributeur.service';
import {ImageService} from '../../../../../../controller/service/Image.service';
import Timeout = NodeJS.Timeout;

@Component({
  selector: 'app-dashboard-list-admin',
  templateUrl: './dashboard-list-admin.component.html',
  styleUrls: ['./dashboard-list-admin.component.scss']
})
export class DashboardListAdminComponent implements OnInit {
  data: any;
  nombretype: any;
  chartOptions: any;

  subscription: Subscription;


  private cltbNum: number;
  private contriNum: number;
  private imagecount: number;
  public imagecountIllustration: number;
  public imagecountVecteur: number;
  public imagecountPhotographie: number;
  // public table: Array<number>;

  constructor(private clientservice: ClientService ,
              private contributeurservice: ContributeurService,
              private imageservice: ImageService) {}
  ngOnInit(): void {
    this.imageservice.findillustration().subscribe(
        (data: number ) => {
          this.imagecountIllustration = data;
          console.log(this.imagecountIllustration);
        }
    );
    this.imageservice.findVecteur().subscribe(
        data => {
          this.imagecountVecteur = data;
          console.log(this.imagecountVecteur);
        }
    );
    this.imageservice.findPhotographie().subscribe(
        data => {
          this.imagecountPhotographie = data;
          console.log(this.imagecountPhotographie);
        }
    );
    setInterval(x =>
   // this.table = [this.imagecountVecteur, this.imagecountIllustration, this.imagecountPhotographie];
    this.data = {
      labels: ['Illustrations', 'Vecteurs', 'Photographies'],
      datasets: [
        {
          data: [this.imagecountIllustration, this.imagecountVecteur, this.imagecountPhotographie],
          backgroundColor: [
            '#FF6384',
            '#ac6bfa',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#ac6bfa',
            '#FFCE56'
          ]
        }
      ]
    }, 5000);


    this.clientservice.findAll().subscribe((elem) => {
      console.log(elem);
      this.cltbNum = elem.length;
    });
    this.contributeurservice.findAll().subscribe((elem) => {
      console.log(elem);
      this.contriNum = elem.length;
    });
    this.imageservice.findAll().subscribe((elem) => {
      console.log(elem);
      this.imagecount = elem.length;
    });

  }
}

