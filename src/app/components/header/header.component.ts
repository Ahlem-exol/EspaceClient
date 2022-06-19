import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { DomController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input('scrollArea') scrollArea: any;
  @Input('headerHeight') headerHeight: number;
  newHeaderHeight: any;
  scrollSub: Subscription;

  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    public domCtrl: DomController
  ) {}

  ngOnDestroy(): void {
    if (this.scrollSub) this.scrollSub.unsubscribe();
  }

  ngOnInit() {}
  ngAfterViewInit() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'hight',
      this.headerHeight + 'px'
    );
    this.scrollArea.ionScroll.subscribe((event) => {
      console.log(event.detail.scrollTop);
      this.resizeHeader(event);
    });
  }

  resizeHeader(event) {
    this.domCtrl.write(() => {
      this.newHeaderHeight = this.headerHeight - event.detail.scrollTop;
      if (this.newHeaderHeight < 0) this.newHeaderHeight = 0;
      this.renderer.setStyle(
        this.element.nativeElement,
        'height',
        this.newHeaderHeight + 'px'
      );
    });
  }
}
