import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoDetailsComponent } from '../todo-details/todo-details.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../task.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [ CommonModule, TodoDetailsComponent, FormsModule, ReactiveFormsModule, FloatLabelModule, ButtonModule ],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.css'
})
export class CompletedComponent {

  constructor(public taskService: TaskService){}

  get completedTasks(){
    return this.taskService.list.filter(task => task.completed);
  }

  toggleCompletion(task: any){
    this.taskService.toggleCompletion(task);
  }

  editTask(id: number){
    this.taskService.editTask(id);
  }

  saveTask(){
    this.taskService.saveTask();
  }

  removeTask(id:number){
    this.taskService.removeTask(id);
  }

  cancel(){
    this.taskService.cancel();
  }

  toggleDetails(taskId: number): void{
    this.taskService.toggleDetails(taskId);
  }

  isDetailsVisible(taskId: number): boolean | null{
    return this.taskService.isDetailsVisible(taskId);
  }
}
