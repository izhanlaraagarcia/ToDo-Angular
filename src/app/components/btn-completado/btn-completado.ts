import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn-completado',
  imports: [],
  templateUrl: './btn-completado.html',
  styleUrl: './btn-completado.scss'
})
export class BTNCompletado {
  @Output() taskCompletedParent = new EventEmitter<void>();

  completatarTarea(){
    let count = 0;
    console.log("Tarea completada");
    if(count === 0) {
      this.taskCompletedParent.emit();
      count++;
    }
  }
}
