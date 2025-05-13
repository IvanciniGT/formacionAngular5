import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteEscritorComponent } from './componente-escritor.component';

describe('ComponenteEscritorComponent', () => {
  let component: ComponenteEscritorComponent;
  let fixture: ComponentFixture<ComponenteEscritorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteEscritorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteEscritorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
