import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando: boolean = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) { 
    this.cargarProducto();
  }

  private cargarProducto() {
    return new Promise<void>( (resolve, reject) => {
      this.http.get('https://angular-html-4ea23-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe( (resp: any) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });
  }

  getProducto (id: string) {
    return this.http.get(`https://angular-html-4ea23-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string){
    if(this.productos.length === 0){
      this.cargarProducto().then(() => this.filtrarProductos(termino));
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    termino = termino.toLowerCase();
    this.productosFiltrado = this.productos.filter(prod => prod.categoria?.includes(termino) || prod.titulo?.toLowerCase().includes(termino));
    console.log(this.productosFiltrado);
  }
}
