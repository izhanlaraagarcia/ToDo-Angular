import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-task.html',
  styleUrl: './edit-task.scss',
})
export class EditTask {
  @Input() taskToEdit: string = '';
  @Input() index!: number;
  @Output() taskEditedPattern = new EventEmitter<{
    index: number;
    newTitle: string;
  }>();

  newTask: string = '';

  ngOnInit() {
    this.newTask = this.taskToEdit;
  }

  editTask() {
    this.taskEditedPattern.emit({ index: this.index, newTitle: this.newTask });
  }
}
