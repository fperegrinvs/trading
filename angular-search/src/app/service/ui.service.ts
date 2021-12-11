import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UIService {

  private navigationStat: Subject<boolean> = new Subject<boolean>();
  private searchStat: Subject<boolean> = new Subject<boolean>();
  private overlayStat: Subject<boolean> = new Subject<boolean>();
  private approveCountChange: Subject<boolean> = new Subject<boolean>();

  toggleNavigation(isOpen: boolean) {
    this.navigationStat.next(isOpen);
    this.overlayStat.next(isOpen);
  }

  toggleSearch(isOpen: boolean) {
    this.searchStat.next(isOpen);
  }

  onNavigationToggled(): Observable<boolean> {
    return this.navigationStat.asObservable();
  }

  onOverlayToggled(): Observable<boolean> {
    return this.overlayStat.asObservable();
  }

  onSearchToggled(): Observable<boolean> {
    return this.searchStat.asObservable();
  }

  onApproveCountChanged(): Observable<boolean> {
    return this.approveCountChange.asObservable();
  }

  updateApproveCount(): void {
    this.approveCountChange.next();
  }
}
