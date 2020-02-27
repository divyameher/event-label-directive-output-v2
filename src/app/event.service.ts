import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class EventService {
  constructor(private http: HttpClient) {}
  eventUrl = "assets/event.json";

  getEvents() {
    return this.http.get(this.eventUrl);
  }
}
