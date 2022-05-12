import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public zoom = 15;
  public center: google.maps.LatLngLiteral = { lat: 54.9202826, lng: 23.9525806 };
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 8,
  }

  constructor() { }

  ngOnInit(): void {
  }

}
