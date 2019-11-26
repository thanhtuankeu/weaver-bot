import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import {Subscription} from 'rxjs';

@Component({
  templateUrl: 'draggable-cards.component.html',
  styleUrls: ['../../../../../node_modules/dragula/dist/dragula.min.css', './draggable-cards.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DraggableCardsComponent implements OnDestroy {

  GROUP_1 = 'GROUP_ONE';
  subs = new Subscription();

  constructor(private dragulaService: DragulaService) {
    dragulaService.createGroup(this.GROUP_1, {
      moves: function (el, container, handle) {
        return handle.className === 'card-header drag';
      }
    });

    this.subs.add(this.dragulaService.drag(this.GROUP_1).subscribe(({el, source}) => {
      this.onDrag({el, source});
    }));
    this.subs.add(this.dragulaService.drop(this.GROUP_1).subscribe(({el, source}) => {
      this.onDrop({el, source});
    }));
    this.subs.add(this.dragulaService.over(this.GROUP_1).subscribe(({el, source, container}) => {
      this.onOver({el, source, container});
    }));
    this.subs.add(this.dragulaService.out(this.GROUP_1).subscribe(({el, source, container}) => {
      this.onOut({el, source, container});
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  private onDrag(args) {
    const {el} = args;
    this.removeClass(el, 'ex-moved');
  }

  private onDrop(args) {
    const {el} = args;
    this.addClass(el, 'ex-moved');
  }

  private onOver(args) {
    const {container} = args;
    this.addClass(container, 'ex-over');
  }

  private onOut(args) {
    const {container} = args;
    this.removeClass(container, 'ex-over');
  }
}
