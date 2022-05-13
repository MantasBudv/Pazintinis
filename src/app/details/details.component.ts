import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  public zoom = 10;
  public center: google.maps.LatLngLiteral = { lat: 54.9202826, lng: 23.9525806 };
  public options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 8,
  }
  public polylineOptions = {
    path: [],
    strokeColor: '#32a1d0',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };
  public routeItem$: BehaviorSubject<any> = new BehaviorSubject({});

  private readonly subscription = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
  ) {

  }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.setIndividualRoute(id);

    this.subscription.add(this.initMap());

  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public setIndividualRoute(routeId: any): void {
   if(routes[routeId]) {
     this.routeItem$.next(routes[routeId]);
   }
  }

  private initMap(): Subscription {
    return this.routeItem$.subscribe(routeItem => {

      if(routeItem) {
        this.center = {
          lat: routeItem.coordinates[1],
          lng: routeItem.coordinates[0],
        };

        if(routeItem.directions && routeItem.directions.length) {

          routeItem.directions.forEach((coordinates: any) => {
          })
        }
      }
    });
  }


}
