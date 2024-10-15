import { Injectable } from '@angular/core';

export interface Task { 
  id: number, 
  name: string, 
  description?: string, 
  completed: boolean, 
  completedAt?: string, 
  createdAt?: string, 
  deadlineDate?: string, 
  tellStatus?: string, 
  showDetails?: boolean 
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  list: Task[] = [];
  editTaskId: number | null = null;
  editedTask: string = '';
  currentDate: string = '';
  selectedTaskId: number | null = null;
  showDetails: boolean = false;

  constructor() {
    this.setCurrentDate();
    this.getTasks();
  }
  

  setCurrentDate() {
    this.currentDate = new Date().toDateString().split('T')[0];
  }

  addTask(name: string, description: string, deadline: string) {
    if (!name) {
        return { success: false, message: 'Please enter a task name at least' };
    }

    let deadlineDate: Date | undefined;
    if (deadline) {
        deadlineDate = new Date(deadline);
        if (isNaN(deadlineDate.getTime())) {
            return { success: false, message: 'Invalid deadline date' };
        }
    }

    this.list.push({
        id: this.list.length,
        name: name,
        description: description,
        completed: false,
        createdAt: new Date().toDateString(),
        deadlineDate: deadlineDate ? deadlineDate.toDateString() : undefined
    });

    this.saveTasks();
    this.updateTaskStatuses();

    return { success: true };
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.list));
  }

  getTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.list = JSON.parse(savedTasks);
      this.updateTaskStatuses();
    }
  }

  editTask(id: number) {
    const task = this.list.find(task => task.id === id);
    if (task) {
      this.editTaskId = id;
      this.editedTask = task.name;
    }
  }

  //save tasks when task is edited
  saveTask() {
    if (this.editedTask !== null) {
      const task = this.list.find(task => task.id === this.editTaskId);
      if (task) {
        task.name = this.editedTask;
        this.saveTasks();
      }
      this.editTaskId = null;
      this.editedTask = '';
    }
  }

  removeTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.list = this.list.filter(task => task.id !== id);
      this.saveTasks();
    }
  }

  cancel() {
    this.editTaskId = null;
  }

  toggleCompletion(task: { id: number, completed: boolean, completedAt?: string, deadline?: string, daysRemaining?: number }) {
    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date().toDateString() : undefined;
    this.saveTasks();
  }

  updateTaskStatuses() {
    this.list.forEach(task => {
      task.tellStatus = this.getTaskStatus(task);
    });
    this.saveTasks();
  }

  getTaskStatus(task: { deadlineDate?: string }): string {
    if (!task.deadlineDate) {
        return 'No deadline set';
    }

    const deadline = new Date(task.deadlineDate);
    const now = new Date(); // Get the current date and time

    // Set both dates to midnight to ignore the time part
    deadline.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    if (deadline < now) {
        return 'Late';
    }
    return 'On Time';
}


  toggleDetails(taskId: number): void {
    if (this.selectedTaskId === taskId) {
      // If the same task is clicked, toggle the details
      this.showDetails = !this.showDetails;
    } else {
      // If a different task is clicked, show the details for that task
      this.selectedTaskId = taskId;
      this.showDetails = true; // Show the details for the newly selected task
    }
  }  

  isDetailsVisible(taskId: number): boolean{
    return this.selectedTaskId === taskId && this.showDetails;
  }

  serviceFunction(){
    alert('task service is called');
  }
}
