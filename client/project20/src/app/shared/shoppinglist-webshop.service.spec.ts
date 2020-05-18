import { TestBed } from '@angular/core/testing';

import { ShoppinglistWebshopService } from './shoppinglist-webshop.service';

describe('ShoppinglistWebshopService', () => {
  let service: ShoppinglistWebshopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppinglistWebshopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
