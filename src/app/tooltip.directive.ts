import { Directive, HostListener, OnInit, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements OnInit{

  constructor(private el: ElementRef, private renderer:Renderer2) { }
  /*Create tooltip*/
  ngOnInit() {
      let span=this.renderer.createElement('span');
      const text = this.renderer.createText("Tooltip");
      this.renderer.appendChild(span, text);
      this.renderer.addClass(span, 'tooltiptext');
      const parent = this.el.nativeElement.parentNode;
      const refChild = this.el.nativeElement;
      this.renderer.insertBefore(parent, span, refChild);
   }
  /*Show a tooltip when button is clicked*/
  @HostListener('click', ['$event'])
    clickEvent(event) {
      event.preventDefault();
      event.stopPropagation();
      this.hideAllTooltip();
      (this.el.nativeElement.parentNode.querySelector('.tooltiptext')).style.display='block';
       ((this.el.nativeElement.parentNode.querySelector('.tooltiptext')) as HTMLElement).innerHTML = this.el.nativeElement.getAttribute('appTooltipText');
    }
    /*Hide all Tooltip when Esc key is pressed*/
    @HostListener('document:keydown.escape', ['$escevent']) onKeydownHandler(evt: KeyboardEvent) {
      this.hideAllTooltip();
    }
    /*Hide all Tooltip when click anywhere outside of tooltip button*/
    @HostListener('document:click', ['$anyevent'])
      documentClick(event: MouseEvent) {
        this.hideAllTooltip();
    }
    @HostListener('window:scroll', ['$scrollevent']) 
      scrollHandler(event) {
        if(document.documentElement.scrollTop == 0){
          var toolTips = document.querySelectorAll('.tooltiptext');
          toolTips.forEach(function(tooltip) {
            (tooltip as HTMLElement).style.bottom='106%';
            (tooltip as HTMLElement).style.top='-3em';
          });
        }else{
          var toolTips = document.querySelectorAll('.tooltiptext');
          toolTips.forEach(function(tooltip) {
            (tooltip as HTMLElement).style.top='67%';
            (tooltip as HTMLElement).style.bottom='';
          });
        }
      }
    /*function to hide all Tooltip*/
    hideAllTooltip(){
      var toolTips = document.querySelectorAll('.tooltiptext');
      toolTips.forEach(function(tooltip) {
        (tooltip as HTMLElement).style.display='none';
      });
    }
     /*Destroy tooltip*/
    ngOnDestroy(){
      var toolTips = document.querySelectorAll('.tooltiptext');
      toolTips.forEach(function(tooltip) {
        (tooltip as HTMLElement).remove;
      });
    }

}
