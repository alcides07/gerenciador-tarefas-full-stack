import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteTarefaComponent } from './modal-delete-tarefa.component';

describe('ModalDeleteTarefaComponent', () => {
  let component: ModalDeleteTarefaComponent;
  let fixture: ComponentFixture<ModalDeleteTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeleteTarefaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeleteTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
