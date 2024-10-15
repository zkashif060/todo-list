import { Component, EventEmitter, Inject, inject, Output } from '@angular/core';
import { TaskService } from '../../task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ CommonModule, FormsModule, CalendarModule, CardModule, ButtonModule, DialogModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  
  title = '';
  description = '';
  deadline = '';
  showModal = false;
  visible: boolean = false;


  @Output() taskAdded = new EventEmitter<{ title: string; description: string; deadline: string }>();
  @Output() closeIt = new EventEmitter<void>();

  constructor(public taskService: TaskService){}

  addTask() {
    const result = this.taskService.addTask(this.title, this.description, this.deadline);
    
    if (result.success) {
      this.taskAdded.emit();
      this.closeModal();
    } else {
      alert(result.message); // Show the alert from the service
    }
  }

  closeModal() {
    this.showModal = false; // This hides the modal in the component
    this.closeIt.emit();    // Emit the close event
  }

  showDialog(){
    this.visible = true;
  }
}

