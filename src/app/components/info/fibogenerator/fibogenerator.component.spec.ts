import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FibogeneratorComponent } from './fibogenerator.component';

describe('FibogeneratorComponent', () => {
  let component: FibogeneratorComponent;
  let fixture: ComponentFixture<FibogeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FibogeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FibogeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
