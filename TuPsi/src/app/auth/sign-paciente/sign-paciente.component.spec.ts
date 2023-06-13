import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignPacienteComponent } from './sign-paciente.component';

describe('SignPacienteComponent', () => {
  let component: SignPacienteComponent;
  let fixture: ComponentFixture<SignPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
