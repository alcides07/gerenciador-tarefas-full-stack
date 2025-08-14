import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Tarefa } from '../../../../interfaces/models/tarefa';
import formatDataISOToddMMyyyy from '../../../../utils/formatDataISO';

@Component({
  selector: 'app-table',
  imports: [NzDividerModule, NzTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() tarefas: Tarefa[] = [];
  formatarData(dataISO: string): string {
    return formatDataISOToddMMyyyy(dataISO);
  }
}
