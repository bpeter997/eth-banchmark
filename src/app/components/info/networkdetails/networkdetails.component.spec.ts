import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkdetailsComponent } from './networkdetails.component';

describe('NetworkdetailsComponent', () => {
  let component: NetworkdetailsComponent;
  let fixture: ComponentFixture<NetworkdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
