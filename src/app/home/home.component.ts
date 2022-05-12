import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly httpClient: HttpClient
  ) {

  }

  public ngOnInit(): void {


     this.getTest();

  }

  public ngOnDestroy(): void {

  }

  public getTest(): Subscription {
    return this.httpClient.get(`/1`).subscribe((test) => {
      console.log(test);
    });
  }


}
