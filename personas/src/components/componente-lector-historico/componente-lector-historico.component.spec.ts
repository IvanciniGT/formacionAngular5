import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteLectorHistoricoComponent } from './componente-lector-historico.component';

describe('ComponenteLectorHistoricoComponent', () => {
  let component: ComponenteLectorHistoricoComponent;
  let fixture: ComponentFixture<ComponenteLectorHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteLectorHistoricoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteLectorHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
