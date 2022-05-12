import { Component, OnInit,ViewChild } from '@angular/core'; import {GoogleMap, MapMarker } from '@angular/google-maps'; import {debounceTime, filter } from 'rxjs'; import { routes } from '../../assets/Pazintiniai_takai';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('map') map!: GoogleMap;
  public zoom = 10;
  public center: google.maps.LatLngLiteral = { lat: 54.9202826, lng: 23.9525806 };
  public options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 8,
  }
  public markers: any = [];

  constructor() { }

  public ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
    routes.forEach((route) => {
      this.addMarker(route);
    })
  }

  // TODO change this one, but it works +-
  click(event: google.maps.MapMouseEvent) {
    this.map.boundsChanged.pipe(debounceTime(100)).subscribe((map) => {
      this.markers.forEach((marker: any) => {
        const mark = new google.maps.LatLng(marker.position.lat, marker.position.lng)
        console.log(this.map.getBounds()?.contains(mark));
      });
    })
  }

  public markerClick(event: any, index: number): void {
    console.log(event, index);
  }

  addMarker(route: any) {
    this.markers.push({
      position: {
        lat: route.coordinates[1],
        lng: route.coordinates[0],
      },
      // label: {
      //   color: 'red',
      //   text: route.properties.Name,
      // },
      title: route.name,
      options: { animation: google.maps.Animation.DROP },
    })
  }
}
