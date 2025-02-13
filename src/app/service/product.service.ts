import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly STORAGE_KEY = 'products';
  private products$ = new BehaviorSubject<Product[]>([
    {
      id: '1',
      name: 'Test Product',
      description: 'This is a test product',
      price: 99.99,
      imageUrl: 'https://unsplash.com/photos/gray-and-black-laptop-computer-on-surface-Im7lZjxeLhg',
      quantity: 10
    }
  ]);

  constructor(private StorageService: StorageService) {
    const savedProducts = this.StorageService.getItem<Product[]>(this.STORAGE_KEY);
    if (savedProducts) {
      this.products$.next(savedProducts);
    }
  }

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  addProduct(product: Product): void {
    const currentProducts = this.products$.getValue();
    this.products$.next([...currentProducts, product]);
    this.saveToStorage();
  }

  updateProduct(updatedProduct: Product): void {
    const currentProducts = this.products$.getValue();
    const index = currentProducts.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      currentProducts[index] = updatedProduct;
      this.products$.next([...currentProducts]);
      this.saveToStorage();
    }
  }

  deleteProduct(id: string): void {
    const currentProducts = this.products$.getValue();
    this.products$.next(currentProducts.filter(product => product.id !== id));
    this.saveToStorage();
  }

  private saveToStorage(): void {
    this.StorageService.setItem(this.STORAGE_KEY, this.products$.getValue());
  }
}