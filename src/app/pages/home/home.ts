import { Component, Input, EventEmitter} from '@angular/core'; 
import { Components } from '../../components/components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Components],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  // @Input() taskAddedChild = new EventEmitter<string>();
  // @Input() taskEditedChild = new EventEmitter<string>();

  tasks: {text: string, completed: boolean}[] = [
    {text: 'Tarea 1', completed: false},
    {text: 'Tarea 2', completed: true},
    {text: 'Tarea 3', completed: false}
  ];

  onTaskAddedFromChild(newTask: string) {
    console.log("Recibido: ", newTask);
    if(newTask && newTask.trim() !== '') {
      this.tasks.push({text: newTask, completed: false});
    }
  }

  onTaskEditedFromChild(index: number, oldTask: string) {
    const updatedTask = prompt('Editar tarea:', oldTask);
    if (updatedTask !== null && updatedTask.trim() !== '') {
      this.tasks[index].text = updatedTask;
    }
  }

  onTaskDeletedFromChild(index: number) {
    console.log('Eliminando tarea...');
    this.tasks.splice(index, 1);
  }

  onCompleteTaskFromChild(event: {index: number, completed: boolean}) {
    this.tasks[event.index].completed = event.completed;
    console.log(`Tarea ${event.index} ${event.completed ? 'completada' : 'marcada como pendiente'}`);
  }

  getCompletedTasksCount(): number {
    return this.tasks.filter(task => task.completed).length;
  }
  onTaskCompletedFromChild(index: number) {
    this.onCompleteTaskFromChild({index: index, completed: !this.tasks[index].completed});
  }
}