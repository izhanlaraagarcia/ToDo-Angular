import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Components } from '../components';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {
  @Output() taskAddedParent = new EventEmitter<string>();
  newTask = '';

  addTask() {
    if (this.newTask.trim() !== '') {
      console.log(this.newTask);
      this.taskAddedParent.emit(this.newTask);
      this.newTask = '';
    }
  }
}
