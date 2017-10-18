import { Component, OnInit } from '@angular/core';
import { HomeService } from '../_services/home.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private dataFromServer = "Fetching Data From Server throught JWT";

  constructor(private homeService:HomeService) { }

  ngOnInit() {
    this.homeService.getSecureData()
    .subscribe(result => {
      this.dataFromServer = result;
    });
  }
  

}
