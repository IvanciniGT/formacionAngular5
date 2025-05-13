import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteLectorComponent } from './componente-lector.component';

describe('ComponenteLectorComponent', () => {
  let component: ComponenteLectorComponent;
  let fixture: ComponentFixture<ComponenteLectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteLectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteLectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
