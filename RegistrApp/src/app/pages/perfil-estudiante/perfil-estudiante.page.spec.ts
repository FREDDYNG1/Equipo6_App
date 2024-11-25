import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilEstudiantePage } from './perfil-estudiante.page';

describe('PerfilEstudiantePage', () => {
  let component: PerfilEstudiantePage;
  let fixture: ComponentFixture<PerfilEstudiantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
