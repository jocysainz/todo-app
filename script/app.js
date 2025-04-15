//get elements from the html
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

//list to store tasks
let tasks = [];

//show tasks on the screen
const renderTasks = (list = tasks) => {
  try {
    //clear the current task list
    taskList.innerHTML = '';

    //use recursion to go through tasks
    const recurseRender = (items, index = 0) => {
      if (index >= items.length) return;

      const task = items[index];

      //create list item for the task
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';
      li.textContent = task.text;

      //mark task complete when clicked
      li.addEventListener('click', () => toggleComplete(task.text));

      //create remove button
      const removeBtn = document.createElement('button');
      removeBtn.textContent = '✖';
      removeBtn.classList.add('removeBtn');

      //stop click from affecting parent
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeTask(task.text);
      });

      //add button to list item and list item to list
      li.appendChild(removeBtn);
      taskList.appendChild(li);

      //go to next task
      recurseRender(items, index + 1);
    };

    recurseRender(list);
  } catch (error) {
    console.error('Error rendering tasks:', error);
  }
};

//add a new task
const addTask = () => {
  try {
    const text = taskInput.value.trim();

    //don't add empty or duplicate tasks
    if (text === '' || _.includes(tasks.map(t => t.text), text)) return;

    //add task to the list
    tasks.push({ text, completed: false });
    taskInput.value = '';
    renderTasks();
  } catch (error) {
    console.error('error adding task:', error);
  }
};

//remove a task
const removeTask = (text) => {
  try {
    tasks = tasks.filter(task => task.text !== text);
    renderTasks();
  } catch (error) {
    console.error('error removing task:', error);
  }
};

//mark a task as done or not done
const toggleComplete = (text) => {
  try {
    const task = tasks.find(t => t.text === text);
    if (task) task.completed = !task.completed;
    renderTasks();
  } catch (error) {
    console.error('error toggling task:', error);
  }
};

//add task when button is clicked
addBtn.addEventListener('click', addTask);

//add task when enter key is pressed
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
