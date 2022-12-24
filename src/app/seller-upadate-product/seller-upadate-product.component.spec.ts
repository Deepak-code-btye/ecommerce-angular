import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUpadateProductComponent } from './seller-upadate-product.component';

describe('SellerUpadateProductComponent', () => {
  let component: SellerUpadateProductComponent;
  let fixture: ComponentFixture<SellerUpadateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerUpadateProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerUpadateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
