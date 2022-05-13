import {AfterViewInit, Component,OnDestroy, OnInit,ViewChild } from '@angular/core'; import {GoogleMap, MapMarker } from '@angular/google-maps'; import {BehaviorSubject, debounceTime, filter,Subscription } from 'rxjs'; import { routes } from '../../assets/Pazintiniai_takai';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
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
  public markers$: BehaviorSubject<any> = new BehaviorSubject([]);
  public visibleMarkers$: BehaviorSubject<any> = new BehaviorSubject([]);

  private readonly subscription = new Subscription();
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

  public ngAfterViewInit(): void {
    this.map.boundsChanged.pipe(debounceTime(500)).subscribe((map) => {
      for(let i = 0; i < this.markers$.value.length; i++) {
        const mark = new google.maps.LatLng(this.markers$.value[i].position.lat, this.markers$.value[i].position.lng)
        this.markers$.value[i].visible = this.map.getBounds()?.contains(mark);
        console.log(this.map.getBounds()?.contains(mark));
      }
      this.filterVisibleMarkers();
    })
  }

  // TODO change this one, but it works +-
  click(event: google.maps.MapMouseEvent) {

  }

  public markerClick(event: any, index: number): void {
    console.log(event, index);
  }

  addMarker(route: any) {
    this.markers$.value.push({
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
      distance: route.distance,
      time: route.time
    })
  }

  private filterVisibleMarkers(): void {
    const visibleMarkers = [];
    for(let i = 0; i < this.markers$.value.length; i++) {
      const mark = this.markers$.value[i];
      if (mark.visible) {
        visibleMarkers.push(mark);
      }
    }
    this.visibleMarkers$.next(visibleMarkers);
    console.log(visibleMarkers);
  }
}
