import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoDetailsComponent } from '../todo-details/todo-details.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../task.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';


@Component({
  selector: 'app-all',
  standalone: true,
  imports: [ CommonModule, TodoDetailsComponent, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabelModule ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css',
})
export class AllComponent {

  constructor(public taskService: TaskService){}

  get allTasks(){
    return this.taskService.list;
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
