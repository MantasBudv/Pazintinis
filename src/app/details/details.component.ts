import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

import { routes } from '../../assets/Pazintiniai_takai';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  @ViewChild('map') map!: GoogleMap;
  public zoom = 13;
  public center: google.maps.LatLngLiteral = { lat: 54.7449354, lng: 23.5095429 };
  public options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 1,
  }
  public polylineOptions = {
    strokeColor: '#32a1d0',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };
  public vertices: google.maps.LatLngLiteral[] = [];
  public routeItem$: BehaviorSubject<any> = new BehaviorSubject({});
  public routeItemPath$: BehaviorSubject<any> = new BehaviorSubject([]);
  public markers$: BehaviorSubject<any> = new BehaviorSubject([]);

  private readonly subscription = new Subscription();
  private isRefresh: boolean = false;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
  ) {

  }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.setIndividualRoute(id);

    this.subscription.add(this.initMap());

    this.center = { lat: this.routeItem$.value.coordinates[1], lng: this.routeItem$.value.coordinates[0] }

  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public setIndividualRoute(routeId: any): void {
   if(routes[routeId]) {
     this.routeItem$.next(routes[routeId]);
     this.addMarker(routes[routeId]);
   }
  }

  public addMarker(route: any) {
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


  private initMap(): Subscription {
    return this.routeItem$.subscribe(routeItem => {
        if(routeItem) {
          if(routeItem.directions && routeItem.directions.length) {
            this.routeItemPath$.next(routeItem.directions);

            setTimeout(() => {
              this.cdr.detectChanges();
            },0)

          }
        }
    });
  }



}
