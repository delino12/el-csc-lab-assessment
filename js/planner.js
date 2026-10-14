// js/planner.js — Academic Planner

const STORAGE_KEY = 'academic_tasks';

let tasks = [];
let currentFilter = 'all';

// ── Persistence ──────────────────────────────────────────────────────────────
function loadTasks() {
  try {
    tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    tasks = [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// ── Task operations ───────────────────────────────────────────────────────────
function addTask(title, dueDate, category, priority) {
  tasks.push({
    id: Date.now(),
    title,
    dueDate,
    category,
    priority,
    completed: false,
    createdAt: new Date().toISOString()
  });
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    render();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  render();
}

// ── Render ────────────────────────────────────────────────────────────────────
function render() {
  renderList();
  renderStats();
}

function renderList() {
  const list = document.getElementById('task-list');
  if (!list) return;

  const visible = tasks.filter(t => {
    if (currentFilter === 'active')    return !t.completed;
    if (currentFilter === 'completed') return  t.completed;
    return true;
  });

  if (visible.length === 0) {
    list.innerHTML = '<li class="task-empty">No tasks here — add one above!</li>';
    return;
  }

  list.innerHTML = visible.map(t => `
    <li class="task-item ${t.completed ? 'task-done' : ''} priority-${t.priority}">
      <label class="task-check">
        <input type="checkbox" ${t.completed ? 'checked' : ''}
               onchange="toggleTask(${t.id})">
        <span class="checkmark"></span>
      </label>
      <div class="task-content">
        <span class="task-title">${escHtml(t.title)}</span>
        <span class="task-meta">
          ${t.category ? `<span class="task-category">${escHtml(t.category)}</span>` : ''}
          ${t.dueDate  ? `<span class="task-due">Due: ${fmtDate(t.dueDate)}</span>` : ''}
          <span class="priority-badge-${t.priority}">${t.priority}</span>
        </span>
      </div>
      <button class="task-delete" onclick="deleteTask(${t.id})" aria-label="Delete task">&#10005;</button>
    </li>
  `).join('');
}

function renderStats() {
  const total   = tasks.length;
  const done    = tasks.filter(t => t.completed).length;
  const pending = total - done;

  setText('stat-total',   total);
  setText('stat-done',    done);
  setText('stat-pending', pending);

  const pct      = total > 0 ? Math.round((done / total) * 100) : 0;
  const bar      = document.getElementById('progress-bar');
  const pctLabel = document.getElementById('progress-pct');
  if (bar)      { bar.style.width = pct + '%'; bar.setAttribute('aria-valuenow', pct); }
  if (pctLabel) pctLabel.textContent = pct + '%';
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function escHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function fmtDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('planner-app');
  if (!app) return;

  loadTasks();

  app.innerHTML = `
    <div class="planner-stats">
      <div class="planner-stat">
        <span id="stat-total"   class="stat-val">0</span>
        <span class="stat-lbl">Total</span>
      </div>
      <div class="planner-stat">
        <span id="stat-pending" class="stat-val accent-orange">0</span>
        <span class="stat-lbl">Pending</span>
      </div>
      <div class="planner-stat">
        <span id="stat-done"    class="stat-val accent-green">0</span>
        <span class="stat-lbl">Completed</span>
      </div>
    </div>

    <div class="progress-track" aria-label="Completion progress">
      <div id="progress-bar" class="progress-fill"
           role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <p id="progress-pct" class="progress-label">0%</p>

    <form id="task-form" class="task-form" novalidate>
      <div class="form-row">
        <div class="form-group grow">
          <label for="task-title">Task / Assignment *</label>
          <input id="task-title" name="title" type="text"
                 placeholder="e.g. Submit Data Structures assignment">
        </div>
        <div class="form-group">
          <label for="task-due">Due Date</label>
          <input id="task-due" name="dueDate" type="date">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="task-cat">Course / Category</label>
          <select id="task-cat" name="category">
            <option value="">— Select course —</option>
            <option>Data Structures</option>
            <option>Web Development</option>
            <option>Database Systems</option>
            <option>Operating Systems</option>
            <option>Software Engineering</option>
            <option>Mathematics</option>
            <option>Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="task-priority">Priority</label>
          <select id="task-priority" name="priority">
            <option value="low">Low</option>
            <option value="medium" selected>Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div class="form-group form-submit">
          <label class="sr-only">Submit</label>
          <button type="submit" class="btn btn-primary">Add Task</button>
        </div>
      </div>
      <p id="task-error" class="form-error" role="alert"></p>
    </form>

    <div class="task-filters">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="active">Active</button>
      <button class="filter-btn" data-filter="completed">Completed</button>
      <button class="btn-clear-done" id="clear-done">Clear Completed</button>
    </div>

    <ul id="task-list" class="task-list" aria-live="polite" aria-label="Task list"></ul>
  `;

  // Form submit
  document.getElementById('task-form').addEventListener('submit', e => {
    e.preventDefault();
    const form  = e.target;
    const title = form.elements['title'].value.trim();
    const errEl = document.getElementById('task-error');

    if (!title) {
      errEl.textContent = 'Please enter a task name.';
      form.elements['title'].focus();
      return;
    }
    errEl.textContent = '';
    addTask(
      title,
      form.elements['dueDate'].value,
      form.elements['category'].value,
      form.elements['priority'].value
    );
    form.reset();
    form.elements['priority'].value = 'medium';
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderList();
    });
  });

  // Clear completed
  document.getElementById('clear-done').addEventListener('click', clearCompleted);

  render();
});
