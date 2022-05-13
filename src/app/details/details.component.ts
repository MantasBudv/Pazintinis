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
    minZoom: 1,
  }
  public polylineOptions = {
    strokeColor: '#32a1d0',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };
  public vertices: google.maps.LatLngLiteral[] = [
    { lng: 23.5095807, lat: 54 },
    { lng: 23.5095109, lat: 54 },
    { lng: 23.5094037, lat: 54 },
    { lng: 23.5092907, lat: 54 },
    { lng: 23.5092746, lat: 54 },
    { lng: 23.5092639, lat: 54 },
    { lng: 23.5091942, lat: 54 },
    { lng: 23.5089152, lat: 54 },
    { lng: 23.5089152, lat: 54 },
    { lng: 23.5089689, lat: 54 },
    { lng: 23.5091137, lat: 54 },
    { lng: 23.5093176, lat: 54 },
    { lng: 23.5095429, lat: 54.7449354 },
    { lng: 23.5098486, lat: 54.7447775 },
    { lng: 23.5102992, lat: 54.7446567 },
    { lng: 23.5108196, lat: 54.7445112 },
    { lng: 23.5117584, lat: 54.7442666 },
    { lng: 23.5160005, lat: 54.7418991 },
    { lng: 23.5165583, lat: 54.7418496 },
    { lng: 23.5169017, lat: 54.7417257 },
    { lng: 23.5170733, lat: 54.7414408 },
    { lng: 23.5170304, lat: 54.7409206 },
    { lng: 23.5170519, lat: 54.7406852 },
    { lng: 23.5175883, lat: 54.7400535 },
    { lng: 23.5176312, lat: 54.7396571 },
    { lng: 23.5172665, lat: 54.7383068 },
    { lng: 23.5159361, lat: 54.7365477 },
    { lng: 23.5140478, lat: 54.7355814 },
    { lng: 23.5128033, lat: 54.7355814 },
    { lng: 23.5116875, lat: 54.7360274 },
    { lng: 23.5103571, lat: 54.7365725 },
    { lng: 23.5090696, lat: 54.7371176 },
    { lng: 23.5076963, lat: 54.7376131 },
    { lng: 23.5069239, lat: 54.7382077 },
    { lng: 23.5062372, lat: 54.7385546 },
    { lng: 23.5055506, lat: 54.7386537 },
    { lng: 23.5047352, lat: 54.7386537 },
    { lng: 23.5039627, lat: 54.7387528 },
    { lng: 23.5022032, lat: 54.7391492 },
    { lng: 23.5012161, lat: 54.7395208 },
    { lng: 23.5005295, lat: 54.7398429 },
    { lng: 23.5001003, lat: 54.7404622 },
    { lng: 23.4993708, lat: 54.7415523 },
    { lng: 23.4988558, lat: 54.7424937 },
    { lng: 23.4981691, lat: 54.7428405 },
    { lng: 23.4955084, lat: 54.7428405 },
    { lng: 23.4950792, lat: 54.7440296 },
    { lng: 23.4949934, lat: 54.7451691 },
    { lng: 23.4967958, lat: 54.7451195 },
    { lng: 23.4992849, lat: 54.7451691 },
    { lng: 23.5011732, lat: 54.7440791 },
    { lng: 23.5028898, lat: 54.7440296 },
    { lng: 23.5040056, lat: 54.7440791 },
    { lng: 23.5042202, lat: 54.7448966 },
    { lng: 23.5040914, lat: 54.7455902 },
    { lng: 23.5040914, lat: 54.7464819 },
    { lng: 23.5041344, lat: 54.7471755 },
    { lng: 23.5039627, lat: 54.7474975 },
    { lng: 23.5043489, lat: 54.7476709 },
    { lng: 23.5079109, lat: 54.7473984 },
    { lng: 23.5088121, lat: 54.7474232 },
    { lng: 23.5094664, lat: 54.7474279 }
  ];
  public routeItem$: BehaviorSubject<any> = new BehaviorSubject({});
  public routeItemPath$: BehaviorSubject<any> = new BehaviorSubject([]);

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
          this.vertices.push(routeItem.directions);
          console.log(this.vertices);
        }
      }
    });
  }


}
