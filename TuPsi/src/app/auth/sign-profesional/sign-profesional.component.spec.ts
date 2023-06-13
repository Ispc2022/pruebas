import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignProfesionalComponent } from './sign-profesional.component';

describe('SignProfesionalComponent', () => {
  let component: SignProfesionalComponent;
  let fixture: ComponentFixture<SignProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignProfesionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
