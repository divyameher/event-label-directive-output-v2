import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { EventLabelDirective } from "./event-label.directive";
import { EventService } from "./event.service";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, EventLabelDirective],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule {}
