# 📖 Ejemplos de Código - Comunicación entre Componentes

Este archivo contiene ejemplos detallados de los conceptos implementados en el proyecto ToDo Angular.

## 🔄 Comunicación Parent-Child

### 1. **Emisión de Eventos (@Output)**

#### Componente Hijo (AddTask)
```typescript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-task',
  // ...
})
export class AddTask {
  @Output() taskAddedParent = new EventEmitter<string>();
  newTask = '';

  addTask() {
    if (this.newTask.trim() !== '') {
      // Emite el evento al componente padre
      this.taskAddedParent.emit(this.newTask);
      this.newTask = '';
    }
  }
}
```

#### Template del Hijo
```html
<input [(ngModel)]="newTask" placeholder="Nueva tarea" />
<button (click)="addTask()">Agregar</button>
```

### 2. **Recepción de Eventos en el Padre**

#### Componente Padre (Home)
```typescript
export class Home {
  tasks: {text: string, completed: boolean}[] = [];

  // Método que recibe el evento del hijo
  onTaskAddedFromChild(newTask: string) {
    if(newTask && newTask.trim() !== '') {
      this.tasks.push({text: newTask, completed: false});
    }
  }
}
```

#### Template del Padre
```html
<!-- Escucha el evento taskAddedParent del hijo -->
<app-components (taskAddedParent)="onTaskAddedFromChild($event)"></app-components>
```

## 🔗 Componente Intermediario

### Patrón de Comunicación en Cadena

```typescript
// Components.ts - Actúa como intermediario
export class Components {
  @Output() taskAddedParent = new EventEmitter<string>();
  @Input() tasks: {text: string, completed: boolean}[] = [];

  // Recibe del hijo y reenvía al padre
  onTaskAdded(task: any) {
    console.log('INTERMEDIARIO: Recibido de AddTask, emitiendo al padre ->', task);
    this.taskAddedParent.emit(task);
  }
}
```

```html
<!-- components.html -->
<!-- Recibe de AddTask y reenvía a Home -->
<app-add-task (taskAddedParent)="onTaskAdded($event)"></app-add-task>
```

## 📊 Manejo de Estados Complejos

### Estructura de Datos Tipada

```typescript
// Definición del tipo de tarea
interface Task {
  text: string;
  completed: boolean;
}

// En el componente
tasks: Task[] = [
  {text: 'Tarea 1', completed: false}, 
  {text: 'Tarea 2', completed: true}, 
  {text: 'Tarea 3', completed: false}
];
```

### Operaciones CRUD

```typescript
// CREATE - Agregar tarea
onTaskAddedFromChild(newTask: string) {
  this.tasks.push({text: newTask, completed: false});
}

// READ - Obtener tareas completadas
getCompletedTasksCount(): number {
  return this.tasks.filter(task => task.completed).length;
}

// UPDATE - Editar tarea
onTaskEditedFromChild(index: number, oldTask: string) {
  const updatedTask = prompt('Editar tarea:', oldTask);
  if (updatedTask !== null && updatedTask.trim() !== '') {
    this.tasks[index].text = updatedTask;
  }
}

// UPDATE - Completar/Descompletar tarea
onTaskCompletedFromChild(index: number) {
  this.tasks[index].completed = !this.tasks[index].completed;
}

// DELETE - Eliminar tarea
onTaskDeletedFromChild(index: number) {
  this.tasks.splice(index, 1);
}
```

## 🎨 Data Binding Avanzado

### Two-Way Binding con Validación

```html
<input 
  [(ngModel)]="newTask" 
  placeholder="Nueva tarea"
  [disabled]="isLoading"
  (keyup.enter)="addTask()"
  maxlength="100"
/>

<button 
  (click)="addTask()"
  [disabled]="!newTask || newTask.trim() === ''"
>
  Agregar
</button>
```

### Binding Condicional

```html
<li *ngFor="let task of tasks; let i = index" 
    [class.completed]="task.completed">
  
  <span [class.completed-text]="task.completed">
    {{ task.text }}
  </span>
  
  <button (click)="onTaskCompletedFromChild(i)">
    <span *ngIf="!task.completed">✅ Completar</span>
    <span *ngIf="task.completed">↩️ Deshacer</span>
  </button>
</li>
```

## 🔧 Patrones de Comunicación

### 1. **Patrón Emisor-Receptor**

```typescript
// Hijo emite
@Output() dataChanged = new EventEmitter<DataType>();

emitData() {
  this.dataChanged.emit(this.data);
}

// Padre recibe
onDataChanged(data: DataType) {
  this.processData(data);
}
```

### 2. **Patrón de Validación**

```typescript
// Validación antes de emitir
addTask() {
  if (this.newTask.trim() !== '') {  // Validación
    this.taskAddedParent.emit(this.newTask);
    this.newTask = '';
  }
}

// Validación al recibir
onTaskAddedFromChild(newTask: string) {
  if(newTask && newTask.trim() !== '') {  // Re-validación
    this.tasks.push({text: newTask, completed: false});
  }
}
```

### 3. **Patrón de Estado Compartido**

```typescript
// Componente intermediario mantiene referencia
export class Components {
  @Input() tasks: Task[] = [];  // Referencia compartida

  onTaskDeleted(index: number) {
    this.tasks.splice(index, 1);  // Modifica directamente
  }
}
```

## 🎯 Mejores Prácticas Implementadas

### ✅ **Tipado Fuerte**
```typescript
// Definir interfaces claras
interface TaskEvent {
  index: number;
  completed: boolean;
}

@Output() taskCompleted = new EventEmitter<TaskEvent>();
```

### ✅ **Validación de Datos**
```typescript
// Siempre validar antes de procesar
if (newTask && newTask.trim() !== '') {
  // Procesar datos válidos
}
```

### ✅ **Nomenclatura Descriptiva**
```typescript
// Nombres claros y descriptivos
onTaskAddedFromChild()     // ✅ Claro
onTaskCompletedFromChild() // ✅ Claro
handleEvent()              // ❌ Vago
```

### ✅ **Separación de Responsabilidades**
- **AddTask**: Solo maneja la adición de tareas
- **Components**: Solo actúa como intermediario
- **Home**: Solo maneja el estado principal

## 🧪 Testing (Próximas Implementaciones)

### Ejemplo de Test para Comunicación

```typescript
describe('AddTask Component', () => {
  it('should emit task when addTask is called', () => {
    const component = new AddTask();
    spyOn(component.taskAddedParent, 'emit');
    
    component.newTask = 'Test Task';
    component.addTask();
    
    expect(component.taskAddedParent.emit).toHaveBeenCalledWith('Test Task');
  });
});
```

## 📝 Notas de Desarrollo

### Errores Comunes Evitados

1. **Inconsistencia de tipos**: Mantener coherencia entre `string[]` y `Task[]`
2. **Eventos vacíos**: Siempre emitir datos útiles en los eventos
3. **Mutación directa**: Usar métodos apropiados para modificar arrays
4. **Validación faltante**: Validar datos tanto en hijo como en padre

### Debugging Tips

```typescript
// Agregar logs para rastrear el flujo de datos
console.log('HIJO: Emitiendo ->', data);
console.log('INTERMEDIARIO: Recibido ->', data);
console.log('PADRE: Procesando ->', data);
```

---

Este proyecto demuestra los **fundamentos esenciales** de Angular para la comunicación entre componentes y el manejo de estado en aplicaciones pequeñas a medianas.
