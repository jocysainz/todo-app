const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = [];

const renderTasks = (list = tasks) => {
  try {
    taskList.innerHTML = '';

    const recurseRender = (items, index = 0) => {
      if (index >= items.length) return;

      const task = items[index];
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';
      li.textContent = task.text;
      li.addEventListener('click', () => toggleComplete(task.text));

      const removeBtn = document.createElement('button');
      removeBtn.textContent = '✖';
      removeBtn.classList.add('removeBtn');
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeTask(task.text);
      });

      li.appendChild(removeBtn);
      taskList.appendChild(li);

      recurseRender(items, index + 1);
    };

    recurseRender(list);
  } catch (error) {
    console.error('Error rendering tasks:', error);
  }
};

const addTask = () => {
  try {
    const text = taskInput.value.trim();
    if (text === '' || _.includes(tasks.map(t => t.text), text)) return;

    tasks.push({ text, completed: false });
    taskInput.value = '';
    renderTasks();
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

const removeTask = (text) => {
  try {
    tasks = tasks.filter(task => task.text !== text);
    renderTasks();
  } catch (error) {
    console.error('Error removing task:', error);
  }
};

const toggleComplete = (text) => {
  try {
    const task = tasks.find(t => t.text === text);
    if (task) task.completed = !task.completed;
    renderTasks();
  } catch (error) {
    console.error('Error toggling task:', error);
  }
};

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
