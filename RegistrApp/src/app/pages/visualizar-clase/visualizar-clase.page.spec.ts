import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarClasePage } from './visualizar-clase.page';

describe('VisualizarClasePage', () => {
  let component: VisualizarClasePage;
  let fixture: ComponentFixture<VisualizarClasePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarClasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
