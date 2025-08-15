import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCompleteTarefaComponent } from './modal-complete-tarefa.component';

describe('ModalCompleteTarefaComponent', () => {
  let component: ModalCompleteTarefaComponent;
  let fixture: ComponentFixture<ModalCompleteTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCompleteTarefaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCompleteTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
