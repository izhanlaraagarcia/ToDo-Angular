import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AddTask } from './add-task/add-task';
import { EditTask } from './edit-task/edit-task';
import { DeleteTask } from './delete-task/delete-task';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [AddTask, EditTask, DeleteTask],
  templateUrl: './components.html',
  styleUrl: './components.scss',
})
export class Components {
    @Output() taskAddedParent = new EventEmitter<string>();
    @Output() taskCompletedParent = new EventEmitter<{index: number, completed: boolean}>();
    @Input() tasks: {text: string, completed: boolean}[] = [];

  onTaskAdded(task: any) {
    console.log('INTERMEDIARIO: Recibido de AddTask, emitiendo al padre ->', task);
    this.taskAddedParent.emit(task);  }

  onTaskEdited(event: { index: number; newTitle: string }) {
    this.taskAddedParent.emit(event.newTitle);
    this.tasks[event.index].text = event.newTitle;
  }

  onTaskDeleted(index: number) {
    this.taskAddedParent.emit();
    this.tasks.splice(index, 1);
  }

  onCompleteTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.taskCompletedParent.emit({index: index, completed: this.tasks[index].completed});
    console.log(`Tarea ${index} ${this.tasks[index].completed ? 'completada' : 'marcada como pendiente'}`);
  }
}
