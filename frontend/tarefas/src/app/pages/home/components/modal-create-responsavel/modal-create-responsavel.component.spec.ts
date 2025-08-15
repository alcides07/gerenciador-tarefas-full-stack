import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateResponsavelComponent } from './modal-create-responsavel.component';

describe('ModalCreateResponsavelComponent', () => {
  let component: ModalCreateResponsavelComponent;
  let fixture: ComponentFixture<ModalCreateResponsavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreateResponsavelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
