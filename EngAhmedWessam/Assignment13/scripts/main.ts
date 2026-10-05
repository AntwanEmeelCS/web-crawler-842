import {
  InputTaskInfo,
  TaskInterface,
  TaskPriority,
  TaskStatus,
} from "./TaskInterface";
import localStorageWorker from "./localStorageWorker";

let TaskList: TaskInterface[] = [];
const localStorageVariableName: string = "TaskList";
const localStorageCounter: string = "TaskListNextID";
//modal works
let modal: HTMLElement | null = document.getElementById("modal-overlay");

let txtTitle: HTMLInputElement = document.getElementById(
  "task-title",
) as HTMLInputElement;
let dueDateElement: HTMLInputElement = document.getElementById(
  "task-due-date",
) as HTMLInputElement;
let taskPriorityList = document.getElementById(
  "task-priority",
)! as HTMLSelectElement;
let txtDesc: HTMLTextAreaElement = document.getElementById(
  "task-description",
) as HTMLTextAreaElement;

let titleError: HTMLElement | null = document.getElementById("title-error");

let btnAdd: HTMLElement | null = document.getElementById("add-task-btn");

function CloseAddTaskDialog(): void {
  modal?.classList.add("hidden");
}

function ModalCloseButtonHandler(): void {
  let btnClose: HTMLElement | null = document.getElementById("close-modal-btn");
  btnClose?.addEventListener("click", function () {
    CloseAddTaskDialog();
  });
}

function ModalCancelButtonHandler(): void {
  let btnCancel: HTMLElement | null = document.getElementById("cancel-btn");
  btnCancel?.addEventListener("click", function () {
    CloseAddTaskDialog();
  });
}

function ModalOverlayClickHandler(): void {
  modal?.addEventListener("click", function (e) {
    CloseAddTaskDialog();
    e.stopPropagation();
  });
}

function ModalClickHandler(): void {
  let taskModal: HTMLElement | null = document.getElementById("task-modal");
  taskModal?.addEventListener("click", function (e) {
    e.stopPropagation();
  });
}
function InitiateAddTask(): void {
  modal?.classList.remove("hidden");
  txtTitle.value = "";
  dueDateElement.value = "";
  taskPriorityList.value = "medium";
  txtDesc.value = "";
  let btnAdd: HTMLElement = document.getElementById(
    "submit-btn",
  ) as HTMLElement;
  btnAdd.innerHTML = `<i class="fa-solid fa-plus"></i>
  <span id="submit-btn-text">Add Task</span>`;
  AddTaskHandler();
}

function getTaskByID(taskId: number): TaskInterface | null {
  for (let index = 0; index < TaskList.length; index++) {
    const element = TaskList[index];
    if (element.id == taskId) {
      return TaskList[index];
    }
  }
  return null;
}

function addSaveTaskHandler(taskId: number): void {
  let btnSave: HTMLElement = document.getElementById(
    "submit-btn",
  ) as HTMLElement;
  btnSave.addEventListener("click", function (e) {
    e.preventDefault();
    let inputTitle = txtTitle.value;
    if (isValidTaskTitle(inputTitle)) {
      if (!titleError?.classList.contains("hidden")) {
        titleError?.classList.add("hidden");
      }
      let chosenDate: Date | null = dueDateElement.valueAsDate;
      if (isValidDueDate(chosenDate)) {
        const priority: TaskPriority =
          taskPriorityList.value.trim() as TaskPriority;

        const taskDescription = txtDesc.value.trim();

        let newInfo: InputTaskInfo = {
          taskTitle: inputTitle,
          taskDescription: taskDescription,
          taskPriority: priority,
          taskDueDate: dueDateElement.value,
        };

        updateTaskInfo(taskId, newInfo);
      } else {
        let dateError: HTMLElement | null =
          document.getElementById("date-error");
        dateError?.classList.remove("hidden");
      }
    } else {
      if (titleError?.classList.contains("hidden")) {
        titleError?.classList.remove("hidden");
      }
    }
  });
}

function InitiateEditTask(taskId: number): void {
  let task = getTaskByID(taskId) as TaskInterface;
  modal?.classList.remove("hidden");
  txtTitle.value = task.title;
  dueDateElement.value = task.dueDate;
  taskPriorityList.value = task.priority;
  txtDesc.value = task.description;
  let btnSave: HTMLElement = document.getElementById(
    "submit-btn",
  ) as HTMLElement;
  btnSave.innerHTML = `<i class="fa-solid fa-save"></i>
  <span id="submit-btn-text">Save Changes</span>`;
  addSaveTaskHandler(taskId);
}

function btnAddTaskHandler(): void {
  btnAdd?.addEventListener("click", function () {
    InitiateAddTask();
  });
}

function isValidTaskTitle(taskTitle: string): boolean {
  return taskTitle.length > 3;
}

function isValidDueDate(chosenDate: Date | null): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return chosenDate == null || chosenDate! >= today;
}

function GetPriorityBadge(priority: TaskPriority): string {
  switch (priority) {
    case "low":
      return `<span class="bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wide">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Low
          </span>`;
      break;
    case "medium":
      return `<span class="bg-amber-50 text-amber-600 text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wide">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Medium
          </span>`;
      break;

    case "high":
      return `<span class="bg-red-50 text-red-600 text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wide">
            <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            High Priority
          </span>`;
      break;
    default:
      return "";
      break;
  }
}

function ClassifyTaskList(): void {
  let todoDiv: HTMLElement = document.getElementById("tasks-todo")!;
  let todoCartoona: string | undefined = ``;
  let todoCount: number = 0;
  let inprogressDiv: HTMLElement =
    document.getElementById("tasks-in-progress")!;
  let inprogressCartoona: string | undefined = ``;
  let inprogressCount: number = 0;
  let completedDiv: HTMLElement = document.getElementById("tasks-completed")!;
  let completedCartoona: string = ``;
  let completedCount: number = 0;
  for (let index = 0; index < TaskList.length; index++) {
    const element: TaskInterface = TaskList[index];
    switch (element.status) {
      case "todo":
        todoCartoona += `<div class="group bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200  " data-task-id="${element.id}">
        <!-- Top Bar -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-slate-300"></span>
            <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider">#${element.id}</span>
          </div>
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="edit-btn text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors" data-task-id="${element.id}" title="Edit task">
              <i class="fa-solid fa-pen text-xs pointer-events-none"></i>
            </button>
            <button class="delete-btn text-slate-400 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors" data-task-id="${element.id}" title="Delete task">
              <i class="fa-solid fa-trash-can text-xs pointer-events-none"></i>
            </button>
          </div>
        </div>

        <!-- Title -->
        <h3 class="font-semibold text-slate-800 mb-2 leading-snug ">
          ${element.title}
        </h3>

        <!-- Description -->
        
          <p class="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">
            ${element.description}
          </p>
        

        <!-- Tags Row -->
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <!-- Priority Badge -->
          ${GetPriorityBadge(element.priority)}
        </div>

        <!-- Meta Info -->
        <div class="flex items-center gap-3 text-xs text-slate-400 pb-3 mb-3 border-b border-slate-100">
          
            <div class="flex items-center gap-1.5 ">
              <i class="fa-regular fa-calendar"></i>
              <span>${element.dueDate}</span>
            </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-2">
          
        <button class="status-btn btnStartTask text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-amber-100 text-amber-700 hover:bg-amber-200" data-task-id="${element.id}" data-status="in-progress">
          <i class="fa-solid fa-play pointer-events-none"></i> <span class="pointer-events-none">Start</span>
        </button>
      
        <button class="status-btn btnCompleteTask text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-emerald-100 text-emerald-700 hover:bg-emerald-200" data-task-id="${element.id}" data-status="completed">
          <i class="fa-solid fa-check pointer-events-none"></i> <span class="pointer-events-none">Complete</span>
        </button>
      
        </div>
      </div>`;
        todoCount++;
        break;
      case "in-progress":
        inprogressCartoona += `<div class="group bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200  " data-task-id="${element.id}">
        <!-- Top Bar -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-400"></span>
            <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider">#${element.id}</span>
          </div>
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="edit-btn text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors" data-task-id="${element.id}" title="Edit task">
              <i class="fa-solid fa-pen text-xs pointer-events-none"></i>
            </button>
            <button class="delete-btn text-slate-400 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors" data-task-id="${element.id}" title="Delete task">
              <i class="fa-solid fa-trash-can text-xs pointer-events-none"></i>
            </button>
          </div>
        </div>

        <!-- Title -->
        <h3 class="font-semibold text-slate-800 mb-2 leading-snug ">
          ${element.title}
        </h3>

        <!-- Description -->
        
          <p class="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">
            ${element.description}
          </p>
        

        <!-- Tags Row -->
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <!-- Priority Badge -->
          ${GetPriorityBadge(element.priority)}
        </div>

        <!-- Meta Info -->
        <div class="flex items-center gap-3 text-xs text-slate-400 pb-3 mb-3 border-b border-slate-100">
          
            <div class="flex items-center gap-1.5 ">
              <i class="fa-regular fa-calendar"></i>
              <span>${element.dueDate}</span>
            </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-2">
          
        <button class="status-btn btnToDoTask text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-700" data-task-id="${element.id}" data-status="todo">
          <i class="fa-solid fa-arrow-rotate-left pointer-events-none"></i> <span class="pointer-events-none">To Do</span>
        </button>
      
        <button class="status-btn btnCompleteTask text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-emerald-100 text-emerald-700 hover:bg-emerald-200" data-task-id="${element.id}" data-status="completed">
          <i class="fa-solid fa-check pointer-events-none"></i> <span class="pointer-events-none">Complete</span>
        </button>
      
        </div>
      </div>`;
        inprogressCount++;
        break;

      case "completed":
        completedCartoona += `<div class="group bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200  opacity-75" data-task-id="${element.id}">
        <!-- Top Bar -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider">#${element.id}</span>
          </div>
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="edit-btn text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors" data-task-id="${element.id}" title="Edit task">
              <i class="fa-solid fa-pen text-xs pointer-events-none"></i>
            </button>
            <button class="delete-btn text-slate-400 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors" data-task-id="${element.id}" title="Delete task">
              <i class="fa-solid fa-trash-can text-xs pointer-events-none"></i>
            </button>
          </div>
        </div>

        <!-- Title -->
        <h3 class="font-semibold text-slate-800 mb-2 leading-snug line-through">
          ${element.title}
        </h3>

        <!-- Description -->
        
          <p class="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">
            ${element.description}
          </p>
        

        <!-- Tags Row -->
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <!-- Priority Badge -->
          ${GetPriorityBadge(element.priority)}
         
            <span class="bg-emerald-100 text-emerald-600 text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
              <i class="fa-solid fa-check"></i>
              Done
            </span>
          
        </div>

        <!-- Meta Info -->
        <div class="flex items-center gap-3 text-xs text-slate-400 pb-3 mb-3 border-b border-slate-100">
          
            <div class="flex items-center gap-1.5 ">
              <i class="fa-regular fa-calendar"></i>
              <span>${element.dueDate}</span>
            </div>
        
        </div>
        
        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-2">
          
        <button class="status-btn btnToDoTask text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-700" data-task-id="${element.id}" data-status="todo">
          <i class="fa-solid fa-arrow-rotate-left pointer-events-none"></i> <span class="pointer-events-none">To Do</span>
        </button>
      
        <button class="status-btn btnStartTask text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-amber-100 text-amber-700 hover:bg-amber-200" data-task-id="${element.id}" data-status="in-progress">
          <i class="fa-solid fa-play pointer-events-none"></i> <span class="pointer-events-none">Start</span>
        </button>
      
        </div>
      </div>`;
        completedCount++;
        break;

      default:
        break;
    }
  }
  todoDiv.innerHTML = todoCartoona;
  inprogressDiv.innerHTML = inprogressCartoona;
  completedDiv.innerHTML = completedCartoona;
  //------update total count-----------
  let todoTaskCount: HTMLElement = document.getElementById(
    "todotaskCount",
  ) as HTMLElement;
  todoTaskCount.innerHTML = `${todoCount} Tasks`;
  let inprogressTaskCount: HTMLElement = document.getElementById(
    "inprogressTaskCount",
  ) as HTMLElement;
  inprogressTaskCount.innerHTML = `${inprogressCount} Tasks`;
  let completedTaskCount: HTMLElement = document.getElementById(
    "completedTaskCount",
  ) as HTMLElement;
  completedTaskCount.innerHTML = `${completedCount} Tasks`;
}

function addEditTaskHandler(): void {
  let btnEdit: NodeListOf<Element> = document.querySelectorAll(".edit-btn");
  for (let index = 0; index < btnEdit.length; index++) {
    const element = btnEdit[index];
    let taskID: string = element.getAttribute("data-task-id") as string;
    element.addEventListener("click", function (e) {
      InitiateEditTask(parseInt(taskID));
      e.stopPropagation();
    });
  }
}

function deleteTaskByID(taskId: number): void {
  for (let index = 0; index < TaskList.length; index++) {
    const element = TaskList[index];
    if (element.id == taskId) {
      TaskList.splice(index, 1);
    }
  }
}

function addDeleteTaskHandler() {
  let btnDelete: NodeListOf<Element> = document.querySelectorAll(".delete-btn");

  for (let index = 0; index < btnDelete.length; index++) {
    const element = btnDelete[index];
    let taskID: string = element.getAttribute("data-task-id") as string;
    element.addEventListener("click", function (e) {
      console.log(taskID);

      deleteTaskByID(parseInt(taskID));
      localStorageWorker.addUpdateVariable(
        localStorageVariableName,
        TaskList,
        true,
      );
      RefreshGUI();
      e.stopPropagation();
    });
  }
}

function setTaskStatusByID(taskId: number, newStatus: TaskStatus): void {
  for (let index = 0; index < TaskList.length; index++) {
    const element = TaskList[index];
    if (element.id == taskId) {
      TaskList[index].status = newStatus;
    }
  }
}

function addStartTaskHandler(): void {
  let btnStartTask: NodeListOf<Element> =
    document.querySelectorAll(".btnStartTask");

  for (let index = 0; index < btnStartTask.length; index++) {
    const element = btnStartTask[index];
    let taskID: string = element.getAttribute("data-task-id") as string;
    element.addEventListener("click", function (e) {
      console.log(taskID);
      setTaskStatusByID(parseInt(taskID), "in-progress");

      localStorageWorker.addUpdateVariable(
        localStorageVariableName,
        TaskList,
        true,
      );
      RefreshGUI();
      e.stopPropagation();
    });
  }
}

function addCompleteTaskHandler(): void {
  let btnCompleteTask: NodeListOf<Element> =
    document.querySelectorAll(".btnCompleteTask");

  for (let index = 0; index < btnCompleteTask.length; index++) {
    const element = btnCompleteTask[index];
    let taskID: string = element.getAttribute("data-task-id") as string;
    element.addEventListener("click", function (e) {
      console.log(taskID);
      setTaskStatusByID(parseInt(taskID), "completed");

      localStorageWorker.addUpdateVariable(
        localStorageVariableName,
        TaskList,
        true,
      );
      RefreshGUI();
      e.stopPropagation();
    });
  }
}

function addSetTaskToDoHandler(): void {
  let btnSetToDo: NodeListOf<Element> =
    document.querySelectorAll(".btnToDoTask");

  for (let index = 0; index < btnSetToDo.length; index++) {
    const element = btnSetToDo[index];
    let taskID: string = element.getAttribute("data-task-id") as string;
    element.addEventListener("click", function (e) {
      console.log(taskID);
      setTaskStatusByID(parseInt(taskID), "todo");

      localStorageWorker.addUpdateVariable(
        localStorageVariableName,
        TaskList,
        true,
      );
      RefreshGUI();
      e.stopPropagation();
    });
  }
}

function addTaskCardFunctionality(): void {
  addEditTaskHandler();
  addDeleteTaskHandler();
  addStartTaskHandler();
  addCompleteTaskHandler();
  addSetTaskToDoHandler();
}

function RefreshGUI(): void {
  ClassifyTaskList();
  addTaskCardFunctionality();
}

function getNextID(): number {
  if (localStorageWorker.variableExists(localStorageCounter)) {
    return localStorageWorker.getVariableContent(localStorageCounter) as number;
  } else {
    localStorageWorker.addUpdateVariable(localStorageCounter, 2, true);
    return 1;
  }
}

function AddTaskHandler(): void {
  let btnAdd: HTMLElement | null = document.getElementById("submit-btn");
  btnAdd?.addEventListener("click", function (e) {
    e.preventDefault();

    let inputTitle = txtTitle.value;
    if (isValidTaskTitle(inputTitle)) {
      if (!titleError?.classList.contains("hidden")) {
        titleError?.classList.add("hidden");
      }
      let chosenDate: Date | null = dueDateElement.valueAsDate;
      if (isValidDueDate(chosenDate)) {
        const taskPriority: TaskPriority =
          taskPriorityList.value.trim() as TaskPriority;

        const taskDescription = txtDesc.value.trim();

        let nextID: number = getNextID();
        let new_task: TaskInterface = {
          id: nextID,
          title: inputTitle,
          description: taskDescription,
          status: "todo",
          priority: taskPriority,
          dueDate: dueDateElement.value,
          createdAt: new Date().toISOString(),
        };

        TaskList.push(new_task);
        localStorageWorker.addUpdateVariable(
          localStorageVariableName,
          TaskList,
          true,
        );
        localStorageWorker.addUpdateVariable(
          localStorageCounter,
          nextID + 1,
          true,
        );
        modal?.classList.add("hidden");
        alert("Task Added Successfully!");
        RefreshGUI();
      } else {
        let dateError: HTMLElement | null =
          document.getElementById("date-error");
        dateError?.classList.remove("hidden");
      }
    } else {
      if (titleError?.classList.contains("hidden")) {
        titleError?.classList.remove("hidden");
      }
    }
  });
}

function updateTaskInfo(taskId: number, newInfo: InputTaskInfo) {
  let elementToUpdate: TaskInterface = getTaskByID(taskId) as TaskInterface;
  elementToUpdate.title = newInfo.taskTitle;
  elementToUpdate.description = newInfo.taskDescription;
  elementToUpdate.dueDate = newInfo.taskDueDate;
  elementToUpdate.priority = newInfo.taskPriority;
  localStorageWorker.addUpdateVariable(
    localStorageVariableName,
    TaskList,
    true,
  );
  modal?.classList.add("hidden");
  alert("Task Updated Successfully");
  RefreshGUI();
}

function LoadStoredTasks(): void {
  if (localStorageWorker.variableExists(localStorageVariableName)) {
    TaskList = localStorageWorker.getVariableContent(localStorageVariableName);
  }
}

function main(): void {
  //one time
  btnAddTaskHandler();
  ModalCloseButtonHandler();
  ModalCancelButtonHandler();
  ModalOverlayClickHandler();
  ModalClickHandler();
  LoadStoredTasks();
  //multiple times
  RefreshGUI();
}

main();
