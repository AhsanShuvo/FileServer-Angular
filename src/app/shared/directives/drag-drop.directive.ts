import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core' ;

@Directive({
  selector:'[appDragDrop]'
})
export class DragDropDirective {

  @Output() fileDropped = new EventEmitter<any>();

  constructor(private el: ElementRef){}

  @HostListener('dragover', ['$event']) onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', ['$event']) public ondrop(evt){
    evt.preventDefault();
    evt.stopPropagation();
    const files = evt.dataTransfer.files; 
    if(files.length > 0){
      this.fileDropped.emit(files);
    } 
  }
}
