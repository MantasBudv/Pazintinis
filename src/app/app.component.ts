import { Component,ElementRef,HostListener,OnInit,ViewChild } from '@angular/core';
import { NgxHowlerService } from 'ngx-howler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pazintinis';
  @ViewChild('audioOption') audioPlayerRef!: ElementRef;

  ngOnInit() {
    this.howl.register('dev', {
      src: ['../assets/1.mp3'],
      html5: true
    }).subscribe(status => {

    });
  }

  @HostListener('document:click')
  play() {
    this.howl.get('dev').play();
  }

  constructor(private readonly howl: NgxHowlerService) {

  }
}
