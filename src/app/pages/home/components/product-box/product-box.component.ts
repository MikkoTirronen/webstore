import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {
  constructor() { }
  
  @Input() fullWidthMode= false ;

  onAddToCart(): void{

  }
  ngOnInit(): void {
  }

}
