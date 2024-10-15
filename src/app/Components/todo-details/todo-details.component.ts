import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css'
})
export class TodoDetailsComponent {
  @Input() task: {
    description?: string;
    createdAt?: string;
    deadlineDate?: string;
    completed?: boolean;
    completedAt?: string;
    tellStatus?: string;
  } | undefined;

  selectedTaskId: number | null = null;
  showDetails: boolean = false;

}
