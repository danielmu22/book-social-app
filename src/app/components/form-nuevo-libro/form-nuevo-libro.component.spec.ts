import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNuevoLibroComponent } from './form-nuevo-libro.component';

describe('FormNuevoLibroComponent', () => {
  let component: FormNuevoLibroComponent;
  let fixture: ComponentFixture<FormNuevoLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNuevoLibroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNuevoLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
