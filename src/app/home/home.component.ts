import { ChangeDetection } from '@angular/cli/lib/config/workspace-schema';
import { HttpClient } from '@angular/common/http';
import {AfterViewInit,ChangeDetectorRef, Component,OnDestroy, OnInit,ViewChild } from '@angular/core'; import {GoogleMap, MapMarker } from '@angular/google-maps'; import { Router } from '@angular/router'; import {BehaviorSubject, debounceTime, filter,Subscription } from 'rxjs'; import { routes } from '../../assets/Pazintiniai_takai';

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
  constructor(private readonly router: Router, private http: HttpClient, private readonly cdr: ChangeDetectorRef) { }

  public ngOnInit(): void {

    this.subscription.add(this.getMarkers());

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
  }

  public ngAfterViewInit(): void {
    this.map.boundsChanged.pipe(debounceTime(500)).subscribe((map) => {
      for(let i = 0; i < this.markers$.value.length; i++) {
        const mark = new google.maps.LatLng(this.markers$.value[i].position.lat, this.markers$.value[i].position.lng)
        this.markers$.value[i].visible = this.map.getBounds()?.contains(mark);
      }
      this.filterVisibleMarkers();
    })
  }

  public markerClick(event: any, index: number): void {
    this.router.navigateByUrl(`${index}`);
  }

  public findMarkerIndex(marker: any): void {
    let route = 0;
    for(let i = 0; i < this.markers$.value.length; i++) {
      if (this.markers$.value[i].title === marker.title) {
        route = i;
        break;
      }
    }
    this.router.navigateByUrl(route.toString());
  }

  private addMarker(route: any) {
    this.markers$.value.push({
      position: {
        lat: route.coordinates[1],
        lng: route.coordinates[0],
      },
      title: route.name,
      options: { animation: google.maps.Animation.DROP },
      distance: route.distance,
      time: route.time
    })
  }

  private addMarkerAPI(route: any) {
    this.markers$.value.push({
      position: {
        lat: route.position.lat,
        lng: route.position.lng,
      },
      title: route.title,
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
  }

  private getMarkers(): Subscription {
    return this.http.get<any>('https://c235-213-197-157-70.eu.ngrok.io/').pipe(filter((data) => !!data)).subscribe((data) => {
      data.forEach((route: any) => {
       this.addMarkerAPI(route);
     });
     setTimeout(() => {
      this.cdr.detectChanges();
    },0)


    });
  }

}
