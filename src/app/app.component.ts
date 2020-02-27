import {
  Component,
  Pipe,
  PipeTransform,
  Directive,
  ElementRef,
  Input,
  HostListener
} from "@angular/core";
import { EventService } from "./event.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  events: any;
  displayEventObj:any;
  constructor(private eventService: EventService) {
    this.getEvents();
  }
  // ngOnInit(){
  //   this.getEvents();
  // }
  // ngDoCheck(){
  //    this.getEvents();
  // }
  // ngAfterContentInit(){
  //    this.getEvents();
  // }
  getEvents() {
    this.eventService.getEvents().subscribe((data: any) => {
      this.events = data;
      // console.log(this.events);
    });
  }
  displayEvent(displayEvent: any) {
    this.displayEventObj = displayEvent;
  }
}
