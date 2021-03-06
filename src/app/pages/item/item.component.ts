import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcion = {};
  id: string = '';

  constructor( private route: ActivatedRoute,
               public _productoService: ProductosService ) { }

  ngOnInit(): void {
    this.route.params.subscribe( parameters => {
      this._productoService.getProducto(parameters['id'])
        .subscribe(( producto: ProductoDescripcion ) => {
          this.id = parameters['id'];
          this.producto = producto;
        })
    })
  }

}
