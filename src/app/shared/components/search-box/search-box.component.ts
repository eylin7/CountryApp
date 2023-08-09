import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime} from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit,  OnDestroy{


  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();


  @Output()
  public onDebounce = new EventEmitter<string>();

  emitValue(value: string): void {
    this.onValue.emit(value);
  }
  onKeyPress(seachTerm: string) {
  this.debouncer.next(seachTerm);
  }
  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
   .pipe(
      debounceTime(300)
    )
   .subscribe(value => {
    this.onDebounce.emit( value);

   })
  }
  // EL onDestroy se llama cuando queremos destruir componentes y todos las subcripciones y eso nos ayuda a tener menos carga en memoria de nuestra app!
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();

  }
}
