//tambah to do
//listener ini akn jalankan dom ketika semua elemen html dimuat
//saat selesai di muat kita siapkan elemen for utk tangani sumbit yang dijalanin fungsi addToDo()
document.addEventListener('DOMContentLoaded', function (){
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function(event){
        //preventdefault yg didapat dari object akan menyimpan memori dg baik dari yang hilang saat di muat ulang
        event.preventDefault();
        addTodo();
    });
});

function addTodo() {
  const textTodo = document.getElementById('title').value;
  const timestamp = document.getElementById('date').value;
   
    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false);
    todos.push(todoObject);
   
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  function generateId() {
    return +new Date();
  }
   
  function generateTodoObject(id, task, timestamp, isCompleted) {
    return {
      id,
      task,
      timestamp,
      isCompleted
    }
  }
  /*variabel yang berisi array  yang akan menampung object berup adata to do*/
  const todos = [];
  /*mendefinisikam custom event spt perpindahan todo (dari incomplete menjadi complete, dan sebaliknya), menambah todo dan hapus todo.*/
  const RENDER_EVENT = 'render-todo';  

  /*listener untuk menampilkan  array todos menggunakan console log*/
  document.addEventListener(RENDER_EVENT,function(){
    /*console.log(todos); #step 2 untuk menampilkan beberapa todo yang tersimpan pada array*/
    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML = '';
    /*untuk memastikan agar container dari todo bersih sebelum diperbarui, maka kita perlu membersihkannya dengan memanggil property innerHTML = "". Sehingga dengan mengatur property tersebut, tidak terjadi duplikasi data ketika menambahkan elemen DOM yang baru dengan append() */
    for (const todoItem of todos) {
        const todoElement = makeTodo(todoItem);
        uncompletedTODOList.append(todoElement);
    }
  });


//pindah to do
function makeTodo(todoObject) {
    const textTitle = document.createElement('h2');
    textTitle.innerText = todoObject.task;
   
    const textTimestamp = document.createElement('p');
    textTimestamp.innerText = todoObject.timestamp;
   
    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimestamp);
   
    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `todo-${todoObject.id}`);
    
    //mau kasih task check uncheck atau trash
  if (todoObject.isCompleted) {
    const undoButton = document.createElement('button');
    undoButton.classList.add('undo-button');
 
    undoButton.addEventListener('click', function () {
      undoTaskFromCompleted(todoObject.id);
    });
 
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
 
    trashButton.addEventListener('click', function () {
      removeTaskFromCompleted(todoObject.id);
    });
 
    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');
    
    checkButton.addEventListener('click', function () {
      addTaskToCompleted(todoObject.id);
    });
    
    container.append(checkButton);
  }
  return container;

  }

  //check button nya agar bisa jalan
  function addTaskToCompleted (todoId) {
    const todoTarget = findTodos(todoId);
   
    if (todoTarget == null) return;
   
    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  function findTodos(todoId){
    for (const todoItem of todos){
      if (todoItem.id === todoId){
        return todoItem;
      }
    }
    return null;
  }

  

//hapus to do