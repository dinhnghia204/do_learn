// --- To-do List LocalStorage & Sync ---
const TODO_KEY = 'dolearn_todos';
let todos = [];

function saveTodos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function loadTodos() {
  const data = localStorage.getItem(TODO_KEY);
  todos = data ? JSON.parse(data) : [];
}

function syncTodosToServer() {
  // Ví dụ: gửi todos lên server
  fetch('https://your-server.com/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todos)
  })
  .then(res => res.json())
  .then(data => console.log('Đã sync server:', data))
  .catch(err => console.error('Sync lỗi:', err));
}

function renderTodos() {
  const list = document.getElementById('to_do_list');
  list.innerHTML = '';
  todos.forEach((todo, idx) => {
    const div = document.createElement('div');
    div.className = 'todo-card';
    div.style.opacity = todo.done ? '0.6' : '1';
    div.innerHTML = `
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;width:100%;">
        <label style="flex:1;display:flex;align-items:center;gap:8px;word-break:break-word;">
          <input type="checkbox" data-idx="${idx}" class="done-checkbox" ${todo.done ? 'checked' : ''}>
          <span style="color:${todo.done ? '#888' : '#222'};font-size:1em;${todo.done ? 'text-decoration:line-through;' : ''};word-break:break-word;white-space:pre-wrap;">${todo.text}</span>
        </label>
        <button data-idx="${idx}" class="del-btn" style="flex-shrink:0;">Xóa</button>
      </div>
    `;
    list.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadTodos();
  renderTodos();
});

document.getElementById('add_item').onclick = function() {
  const input = document.getElementById('input');
  const val = input.value.trim();
  if (!val) return;
  todos.push({
    text: val,
    done: false
  });
  saveTodos();
  renderTodos();
  input.value = '';
  // syncTodosToServer(); // Bỏ comment nếu muốn sync tự động
};

document.getElementById('input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const val = this.value.trim();
    if (!val) return;
    todos.push({
      text: val,
      done: false
    });
    saveTodos();
    renderTodos();
    this.value = '';
    // syncTodosToServer();
  }
});

document.getElementById('to_do_list').onclick = function(e) {
  const idx = +e.target.dataset.idx;
  if (e.target.classList.contains('del-btn')) {
    todos.splice(idx, 1);
    saveTodos();
    renderTodos();
    // syncTodosToServer();
  }
  // Xử lý tích vào checkbox
  if (e.target.classList.contains('done-checkbox')) {
    todos[idx].done = e.target.checked;
    saveTodos();
    renderTodos();
  }
};

document.getElementById('to_do_list').addEventListener('change', function(e) {
  // Đã loại bỏ chức năng phân loại ưu tiên
});