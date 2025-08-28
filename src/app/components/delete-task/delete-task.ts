import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-task',
  imports: [],
  templateUrl: './delete-task.html',
  styleUrl: './delete-task.scss'
})
export class DeleteTask {
  @Output() taskDeletedParent = new EventEmitter<number>();
}
