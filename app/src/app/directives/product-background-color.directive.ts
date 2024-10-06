import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
  selector: '[appProductBackgroundColor]',
  standalone: true
})
export class ProductBackgroundColorDirective implements OnChanges {
  @Input() productId!: string;

  private productColors: { [key: string]: string } = {};

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.productId) {
      if (!this.productColors[this.productId]) {
        this.productColors[this.productId] = this.getRandomColor();
      }

      const color = this.productColors[this.productId];
      this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
    }
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
