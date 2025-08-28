import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BTNCompletado } from './btn-completado';

describe('BTNCompletado', () => {
  let component: BTNCompletado;
  let fixture: ComponentFixture<BTNCompletado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BTNCompletado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BTNCompletado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
