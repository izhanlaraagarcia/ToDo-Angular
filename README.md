# 📝 ToDo Angular - Proyecto de Práctica

Un proyecto de práctica en Angular que implementa una aplicación de gestión de tareas (ToDo List) con enfoque en la **comunicación entre componentes** y las mejores prácticas de Angular.

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)

## 🎯 Objetivos de Aprendizaje

Este proyecto está diseñado para practicar y demostrar:

- ✅ **Comunicación entre componentes** (Parent-Child)
- ✅ **@Input y @Output decorators**
- ✅ **EventEmitter** para emisión de eventos
- ✅ **Data binding** (Two-way binding con ngModel)
- ✅ **Directivas estructurales** (*ngFor, *ngIf)
- ✅ **Standalone components** (Angular 14+)
- ✅ **SCSS** para estilos modulares
- ✅ **Responsive design**
- ✅ **TypeScript** con tipado fuerte

## 🏗️ Arquitectura del Proyecto

```
src/app/
├── pages/
│   └── home/                    # Componente principal (Parent)
│       ├── home.ts
│       ├── home.html
│       └── home.scss
├── components/
│   ├── components.ts            # Componente intermediario
│   ├── components.html
│   ├── components.scss
│   ├── add-task/               # Componente hijo para agregar tareas
│   │   ├── add-task.ts
│   │   ├── add-task.html
│   │   └── add-task.scss
│   ├── edit-task/              # Componente hijo para editar tareas
│   ├── delete-task/            # Componente hijo para eliminar tareas
│   └── btn-completado/         # Componente hijo para completar tareas
└── services/                   # Servicios (futuras implementaciones)
```

## 🔄 Flujo de Comunicación entre Componentes

### Diagrama de Comunicación

```
┌─────────────────────────────────────────────────────────────┐
│                        HOME (Parent)                        │
│  - Mantiene el estado principal (tasks[])                  │
│  - Recibe eventos de componentes hijos                     │
│  - Actualiza la lista de tareas                            │
└─────────────────┬───────────────────────────────────────────┘
                  │ @Input: tasks
                  │ @Output: taskAddedParent, taskCompletedParent
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   COMPONENTS (Intermediary)                 │
│  - Actúa como puente entre Home y componentes específicos  │
│  - Redistribuye eventos y datos                            │
└─────────────────┬───────────────────────────────────────────┘
                  │ @Output: taskAddedParent
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    ADD-TASK (Child)                         │
│  - Maneja el input del usuario                             │
│  - Emite evento cuando se agrega una tarea                 │
│  - Valida datos antes de emitir                            │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Funcionalidades Implementadas

### ✨ Gestión de Tareas
- **Agregar tareas** con validación de entrada
- **Editar tareas** existentes con prompt
- **Eliminar tareas** de la lista
- **Marcar como completadas** con toggle
- **Contador dinámico** de tareas totales y completadas

### 🎨 Interfaz de Usuario
- **Diseño moderno** con gradientes y sombras
- **Animaciones CSS** suaves y profesionales
- **Responsive design** para móviles y tablets
- **Estados visuales** para tareas completadas
- **Iconos emoji** para mejor UX

## 🔧 Conceptos Técnicos Implementados

### 1. **@Input y @Output**

#### En el componente hijo (AddTask):
```typescript
@Output() taskAddedParent = new EventEmitter<string>();

addTask() {
  if (this.newTask.trim() !== '') {
    this.taskAddedParent.emit(this.newTask);  // Emite al padre
    this.newTask = '';
  }
}
```

#### En el componente padre (Home):
```typescript
tasks: {text: string, completed: boolean}[] = [];

onTaskAddedFromChild(newTask: string) {
  if(newTask && newTask.trim() !== '') {
    this.tasks.push({text: newTask, completed: false});  // Recibe del hijo
  }
}
```

### 2. **Event Binding en Templates**

#### En el template padre:
```html
<app-components (taskAddedParent)="onTaskAddedFromChild($event)"></app-components>
```

#### En el template hijo:
```html
<button (click)="addTask()">Agregar</button>
```

### 3. **Two-Way Data Binding**

```html
<input [(ngModel)]="newTask" placeholder="Nueva tarea" />
```

### 4. **Directivas Estructurales**

```html
<li *ngFor="let t of tasks; let i = index" [class.completed]="t.completed">
  <span *ngIf="!t.completed">✅</span>
  <span *ngIf="t.completed">✅</span>
</li>
```

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (v16 o superior)
- Angular CLI (v15 o superior)

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/todo-angular.git
cd todo-angular
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
ng serve
```

4. **Abrir en el navegador**
```
http://localhost:4200
```

## 📚 Conceptos de Angular Practicados

### 🔗 **Comunicación Parent-Child**
- **@Input()**: Pasar datos del padre al hijo
- **@Output()**: Emitir eventos del hijo al padre
- **EventEmitter**: Crear y emitir eventos personalizados

### 🎯 **Data Binding**
- **Interpolation**: `{{ variable }}`
- **Property Binding**: `[property]="value"`
- **Event Binding**: `(event)="method()"`
- **Two-way Binding**: `[(ngModel)]="variable"`

### 🏗️ **Componentes Standalone**
- Componentes independientes sin módulos
- Imports directos en el decorador @Component
- Mejor tree-shaking y performance

### 🎨 **Estilos y CSS**
- **SCSS** con variables CSS personalizadas
- **BEM methodology** para nomenclatura de clases
- **Responsive design** con media queries
- **Animaciones CSS** para mejor UX

### 📦 **Interfaz de Usuario**

![Interfaz de Usuario]([/ToDo-Angular/src/app/assets/images/image.png](https://github.com/izhanlaraagarcia/ToDo-Angular/blob/main/src/app/assets/images/image.png?raw=true))


## 🔍 Estructura de Datos

### Modelo de Tarea
```typescript
interface Task {
  text: string;      // Descripción de la tarea
  completed: boolean; // Estado de completado
}
```

### Estado del Componente Home
```typescript
tasks: {text: string, completed: boolean}[] = [
  {text: 'Tarea 1', completed: false}, 
  {text: 'Tarea 2', completed: true}, 
  {text: 'Tarea 3', completed: false}
];
```

## 🎓 Lecciones Aprendidas

### ✅ **Buenas Prácticas Implementadas**
- **Separación de responsabilidades** entre componentes
- **Validación de datos** antes de procesar
- **Tipado fuerte** con TypeScript
- **Nomenclatura descriptiva** para métodos y variables
- **Manejo de estados** de forma predecible

### 🔧 **Patrones de Diseño**
- **Component Communication Pattern**: Flujo unidireccional de datos
- **Event-Driven Architecture**: Comunicación basada en eventos
- **Separation of Concerns**: Cada componente tiene una responsabilidad específica

## 🚀 Próximas Mejoras

- [ ] Implementar **servicios** para manejo de estado global
- [ ] Agregar **persistencia** con localStorage
- [ ] Implementar **routing** para múltiples vistas
- [ ] Agregar **testing** unitario y de integración
- [ ] Implementar **drag & drop** para reordenar tareas
- [ ] Agregar **categorías** y **filtros**

## 🤝 Contribuciones

Este es un proyecto de práctica, pero las contribuciones son bienvenidas para:
- Mejorar la documentación
- Agregar nuevas funcionalidades
- Optimizar el código existente
- Corregir bugs

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Tu Nombre** - [GitHub](https://github.com/izhanlaraagarcia)

---

⭐ **¡Dale una estrella al proyecto si te ayudó a aprender Angular!** ⭐
#
