import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCreateTarefaComponent } from './modal-create-and-update-tarefa.component';

describe('ModalCreateTarefaComponent', () => {
  let component: ModalCreateTarefaComponent;
  let fixture: ComponentFixture<ModalCreateTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreateTarefaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCreateTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
