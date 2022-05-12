import { Component, OnInit } from '@angular/core'; import { MapMarker } from '@angular/google-maps'; import { routes } from '../../assets/Pazintiniai_takai';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

  click(event: google.maps.MapMouseEvent) {
    // console.log(event)
  }

  public markerClick(event: any, index: number): void {
    console.log(event, index);
  }

  addMarker(route: any) {
    this.markers.push({
      position: {
        lat: route.geometry.coordinates[1],
        lng: route.geometry.coordinates[0],
      },
      // label: {
      //   color: 'red',
      //   text: route.properties.Name,
      // },
      title: route.properties.Name,
      options: { animation: google.maps.Animation.DROP },
    })
  }
}
