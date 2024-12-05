import { Component, Inject, input, OnInit } from '@angular/core';
import { RouterOutlet, ROUTES } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AllComponent } from './Components/all/all.component';
import { ActiveComponent } from './Components/active/active.component';
import { CompletedComponent } from './Components/completed/completed.component';
import { RouterModule } from '@angular/router';
import { TaskService } from './task.service';
import { AddTaskComponent } from "./Components/add-task/add-task.component";
import { GetApiComponent } from './Components/get-api/get-api.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { CloudinaryModule } from '@cloudinary/ng';
import {Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CloudinaryModule,
    RouterOutlet, 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    AllComponent,
    ActiveComponent, 
    CompletedComponent, 
    RouterModule, 
    AddTaskComponent,
    GetApiComponent,
    ButtonModule,
    CardModule,
    InputTextModule,
    MenubarModule,
    TabViewModule,
    TabMenuModule,
    RippleModule,
    TabMenuModule,
    DialogModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'To Do List App';
  newTaskName = '';
  newTaskDeadline = '';
  showModal = false; // Control modal visibility
  items: MenuItem[] = [
    {
      label: 'All',
      routerLink: '/all',
      routerLinkActiveOptions: { exact: true },
      routerLinkActive: 'hover-effect',
    },
    {
      label: 'Active',
      routerLink: '/active',
      routerLinkActiveOptions: { exact: true },
      routerLinkActive: 'hover-effect',
    },
    {
      label: 'Completed',
      routerLink: '/completed',
      routerLinkActiveOptions: { exact: true },
      routerLinkActive: 'hover-effect',
    },
    {
      label: 'Image Upload',
      routerLink: '/getApi',
      routerLinkActiveOptions: { exact: true },
      routerLinkActive: 'hover-effect',
    }
  ];
  

  activeMenu(event: any): void {
    let node: HTMLElement;

    // Determine the clicked element
    if (event.target.tagName === 'A') {
      node = event.target;
    } else {
      node = event.target.closest('a'); // Handles nested elements inside the link
    }

    // Remove active class from all menu items
    const menuItems = document.getElementsByClassName('ui-menuitem-link');
    for (let i = 0; i < menuItems.length; i++) {
      menuItems[i].classList.remove('active');
    }

    // Add active class to the clicked menu item
    if (node) {
      node.classList.add('active');
    }
  }


  ngOnInit(): void {
      
  }

  
  constructor(private taskService: TaskService) {}

  openModal() {
    console.log("Opening modal");
    this.showModal = true; 
  }

  closeModal() {
    console.log("Closing modal");
    this.showModal = false; // Set to false to hide the modal
  }

  addTask(title: string, description: string, deadline: string) {
    console.log("Adding task", title, description, deadline); // Log the task details
    this.taskService.addTask(title, description, deadline);
    this.closeModal(); 
  }
}