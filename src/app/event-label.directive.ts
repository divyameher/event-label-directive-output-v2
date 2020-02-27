import {
  Component,
  Pipe,
  PipeTransform,
  Directive,
  ElementRef,
  Input,
  HostListener,
  Output,
  EventEmitter
} from "@angular/core";

@Directive({
  selector: "[eventLabel]"
})
export class EventLabelDirective {
  constructor(private el: ElementRef) {}

  @Input() eventObj: any;
  @Output() displayEvent = new EventEmitter<any>();
  displayEventObj = {
    label: "",
    className: "",
    showBar: false
  };
  ngOnInit() {
    this.getLabel(this.eventObj);
  }
  // ngDoCheck() {
  //   this.getLabel(this.eventObj);
  // }
  // ngAfterContentInit() {
  //   this.getLabel(this.eventObj);
  // }
  // getDisplayDataFromEvent(event: any) {
  //   const isActivity = !!event.activity; // 1907
  //   const typeClassification = this.getTypeClassification(event);
  //   const isRequest = event.status === "Requested" || event.isTradeRequested;
  //   let requestLabel = null;
  //   let indicatorLabel = null;
  //   if (isRequest) {
  //     requestLabel = this.translateService.instant(
  //       this.requestMap[typeClassification]
  //     );
  //     if (event.location && event.location.configuration.isExtraShift) {
  //       indicatorLabel = "EXTRA";
  //     }
  //   } else {
  //     indicatorLabel = this.labelMap[typeClassification];
  //     if (indicatorLabel !== null) {
  //       indicatorLabel = this.translateService.instant(indicatorLabel);
  //     }
  //   }
  //   const displayEvent = {
  //       indicatorLabel: indicatorLabel,
  //       requestLabel: requestLabel,
  //       barType: isRequest
  //         ? BarbershopPoleType.STRIPED
  //         : BarbershopPoleType.NONE,
  //       color: this.typeColorMap[typeClassification]
  //     };
  //   return displayEvent;
  // }
  // getTypeClassification(event) {
  //   const config = event.activity
  //       ? event.activity.configuration
  //       : event.paycode.configuration;
  //   if (!config) {
  //     return EventTypeClassification.NONE;
  //   }
  //   if (event.isTradeRequested) {
  //     if (
  //       event.scheduleTradeStatus === String(ScheduleTradeStatus.WAITINGREVIEW)
  //     ) {
  //       if (event.scheduleTradeParticipant === String(TradeCode.ACCEPTOR)) {
  //         return EventTypeClassification.TRADE_PARTICIPANT_ACCEPTOR;
  //       } else {
  //         return EventTypeClassification.TRADE_PARTICIPANT_REQUESTOR;
  //       }
  //     } else if (
  //       event.scheduleTradeStatus === String(ScheduleTradeStatus.REQUESTED) &&
  //       (event.scheduleTradeParticipant === String(TradeCode.REQUESTOR) ||
  //         event.scheduleTradeParticipant === String(TradeCode.ACCEPTOR))
  //     ) {
  //       return EventTypeClassification.PENDING;
  //     }
  //   }
  //   if (event.source === "SelfScheduled") {
  //     return EventTypeClassification.SELF_SCHEDULED;
  //   }
  //   if (config.isOnCall) {
  //     return EventTypeClassification.ON_CALL;
  //   }
  //   if (event.location && event.location.configuration.isExtraShift) {
  //     return EventTypeClassification.EXTRA;
  //   }
  //   if (config.isTimeOff) {
  //     return EventTypeClassification.TIME_OFF;
  //   }
  //   return EventTypeClassification.NONE;
  // }
  getLabel(event: any) {
    let label = "";
    let className = "";
    let showBar = false;
    if (event.activity && event.activity.configuration) {
      if (event.activity.configuration.isOnCall) {
        label = "ON CALL";
        className = " orange";
        if (event.status == "Requested") {
          label = "On call request";
          className = " request";
        }
      } else if (event.activity.configuration.isTimeOff) {
        label = "TIME OFF";
        className = " purple";
        if (event.status == "Requested") {
          label = "Time off request";
          className = " request";
          showBar = true;
        }
      }
    }

    if (event.payCode && event.payCode.configuration) {
      if (event.payCode.configuration.isOnCall) {
        label = "ON CALL";
        className = " orange";
        if (event.status == "Requested") {
          label = "On call request";
          className = " request";
        }
      } else if (event.payCode.configuration.isTimeOff) {
        label = "TIME OFF";
        className = "purple";
        if (event.status == "Requested") {
          label = "Time off request";
          className = " request";
          showBar = true;
        }
      }
    }
    if (event.isTradeRequested && event.scheduleStatus == "Trade") {
      if (event.scheduleTradeStatus == "Requested") {
        label = "Trade request";
        className = "request";
        showBar = true;
      } else if (event.scheduleTradeStatus == "Accepted") {
        label = "Trade accepted";
        className = "request";
      }
    }
    this.displayEventObj.className = className;
    this.displayEventObj.label = label;
    this.displayEventObj.showBar = showBar;
    this.displayEvent.emit(this.displayEventObj);
  }
}
