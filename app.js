/* ================================================================
   app.js — Wanderlust Travel Planner
   All DOM manipulation, validation, and interactivity
================================================================ */

/* ================================================================
   SECTION 1 — UTILITY HELPERS
================================================================ */

/**
 * el(tag, opts) — Shorthand for document.createElement()
 * Creates an element and applies optional properties in one call.
 *
 * @param {string} tag   - HTML tag name e.g. 'div', 'input', 'button'
 * @param {object} opts  - Optional properties:
 *   cls         → className
 *   text        → textContent
 *   html        → innerHTML
 *   id          → element id
 *   type        → input type
 *   placeholder → input placeholder
 *   value       → input value
 *   min         → input min attribute
 *   attrs       → object of extra setAttribute() calls
 */
function el(tag, opts = {}) {
  const e = document.createElement(tag);
  if (opts.cls)         e.className    = opts.cls;
  if (opts.text)        e.textContent  = opts.text;
  if (opts.html)        e.innerHTML    = opts.html;
  if (opts.id)          e.id           = opts.id;
  if (opts.type)        e.type         = opts.type;
  if (opts.placeholder) e.placeholder  = opts.placeholder;
  if (opts.value)       e.value        = opts.value;
  if (opts.min)         e.min          = opts.min;
  if (opts.attrs) {
    for (const [k, v] of Object.entries(opts.attrs)) {
      e.setAttribute(k, v);
    }
  }
  return e;
}

/** Validate email format using a regular expression */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** Show an inline error message below a field */
function showError(errEl, msg) {
  errEl.textContent = msg;
  errEl.classList.add('visible');
}

/** Clear an inline error message */
function clearError(errEl, inputEl) {
  errEl.textContent = '';
  errEl.classList.remove('visible');
  if (inputEl) inputEl.classList.remove('error');
}


/* ================================================================
   SECTION 2 — AUTH (LOGIN / SIGN-UP)
   All form elements are built with createElement() + appendChild()
================================================================ */

const authBody  = document.getElementById('auth-body');
const tabLogin  = document.getElementById('tab-login');
const tabSignup = document.getElementById('tab-signup');
let   activeMode = 'login';  // 'login' | 'signup'

/* ── Build Login Form ── */
function buildLoginForm() {
  authBody.innerHTML = '';  // clear any previous content

  // ── Username field ──
  const grpUser = el('div', { cls: 'form-group' });
  grpUser.appendChild(el('label', { text: 'Username' }));
  const inpUser = el('input', { id: 'login-user', type: 'text', placeholder: 'e.g. explorer_jane' });
  const errUser = el('small', { cls: 'err-msg' });
  grpUser.appendChild(inpUser);
  grpUser.appendChild(errUser);

  // ── Email field ──
  const grpEmail = el('div', { cls: 'form-group' });
  grpEmail.appendChild(el('label', { text: 'Email' }));
  const inpEmail = el('input', { id: 'login-email', type: 'email', placeholder: 'you@example.com' });
  const errEmail = el('small', { cls: 'err-msg' });
  grpEmail.appendChild(inpEmail);
  grpEmail.appendChild(errEmail);

  // ── Password field ──
  const grpPass = el('div', { cls: 'form-group' });
  grpPass.appendChild(el('label', { text: 'Password' }));
  const inpPass = el('input', { id: 'login-pass', type: 'password', placeholder: '••••••••' });
  const errPass = el('small', { cls: 'err-msg' });
  grpPass.appendChild(inpPass);
  grpPass.appendChild(errPass);

  // ── Submit button ──
  const btnSubmit = el('button', { cls: 'btn btn-primary', text: 'Login & Explore →' });

  // Append all groups to auth body using appendChild()
  authBody.appendChild(grpUser);
  authBody.appendChild(grpEmail);
  authBody.appendChild(grpPass);
  authBody.appendChild(btnSubmit);

  /* ── addEventListener() for login submission ── */
  btnSubmit.addEventListener('click', function () {
    let valid = true;

    // Clear previous errors
    clearError(errUser,  inpUser);
    clearError(errEmail, inpEmail);
    clearError(errPass,  inpPass);

    // Validate: username required
    if (!inpUser.value.trim()) {
      showError(errUser, 'Username is required.');
      inpUser.classList.add('error');
      valid = false;
    }

    // Validate: email required + format
    if (!inpEmail.value.trim()) {
      showError(errEmail, 'Email is required.');
      inpEmail.classList.add('error');
      valid = false;
    } else if (!isValidEmail(inpEmail.value)) {
      showError(errEmail, 'Enter a valid email address.');
      inpEmail.classList.add('error');
      valid = false;
    }

    // Validate: password required + min length
    if (!inpPass.value.trim()) {
      showError(errPass, 'Password is required.');
      inpPass.classList.add('error');
      valid = false;
    } else if (inpPass.value.length < 6) {
      showError(errPass, 'Password must be at least 6 characters.');
      inpPass.classList.add('error');
      valid = false;
    }

    if (valid) {
      currentUser = inpUser.value.trim();
      alert('✅ Login Successful! Welcome, ' + currentUser + '!');
      showMainApp();  // hide login, show main app via DOM
    }
  });
}

/* ── Build Sign-Up Form ── */
function buildSignupForm() {
  authBody.innerHTML = '';

  // Username
  const grpUser = el('div', { cls: 'form-group' });
  grpUser.appendChild(el('label', { text: 'Username' }));
  const inpUser = el('input', { type: 'text', placeholder: 'Choose a username' });
  const errUser = el('small', { cls: 'err-msg' });
  grpUser.appendChild(inpUser);
  grpUser.appendChild(errUser);

  // Email
  const grpEmail = el('div', { cls: 'form-group' });
  grpEmail.appendChild(el('label', { text: 'Email' }));
  const inpEmail = el('input', { type: 'email', placeholder: 'you@example.com' });
  const errEmail = el('small', { cls: 'err-msg' });
  grpEmail.appendChild(inpEmail);
  grpEmail.appendChild(errEmail);

  // Password
  const grpPass = el('div', { cls: 'form-group' });
  grpPass.appendChild(el('label', { text: 'Password' }));
  const inpPass = el('input', { type: 'password', placeholder: 'Min. 6 characters' });
  const errPass = el('small', { cls: 'err-msg' });
  grpPass.appendChild(inpPass);
  grpPass.appendChild(errPass);

  // Button
  const btnSubmit = el('button', { cls: 'btn btn-primary', text: 'Create Account →' });

  authBody.appendChild(grpUser);
  authBody.appendChild(grpEmail);
  authBody.appendChild(grpPass);
  authBody.appendChild(btnSubmit);

  /* ── addEventListener() for signup ── */
  btnSubmit.addEventListener('click', function () {
    let valid = true;
    [errUser, errEmail, errPass].forEach(e => e.classList.remove('visible'));
    [inpUser, inpEmail, inpPass].forEach(i => i.classList.remove('error'));

    if (!inpUser.value.trim()) {
      showError(errUser, 'Username is required.');
      inpUser.classList.add('error');
      valid = false;
    }
    if (!inpEmail.value.trim()) {
      showError(errEmail, 'Email is required.');
      inpEmail.classList.add('error');
      valid = false;
    } else if (!isValidEmail(inpEmail.value)) {
      showError(errEmail, 'Enter a valid email address.');
      inpEmail.classList.add('error');
      valid = false;
    }
    if (!inpPass.value.trim()) {
      showError(errPass, 'Password is required.');
      inpPass.classList.add('error');
      valid = false;
    } else if (inpPass.value.length < 6) {
      showError(errPass, 'Password must be at least 6 characters.');
      inpPass.classList.add('error');
      valid = false;
    }

    if (valid) {
      currentUser = inpUser.value.trim();
      alert('🎉 Account Created! Welcome aboard, ' + currentUser + '!');
      showMainApp();
    }
  });
}

/* ── Tab toggle — addEventListener() ── */
tabLogin.addEventListener('click', function () {
  activeMode = 'login';
  tabLogin.classList.add('active');     // classList.add()
  tabSignup.classList.remove('active'); // classList.remove()
  buildLoginForm();
});

tabSignup.addEventListener('click', function () {
  activeMode = 'signup';
  tabSignup.classList.add('active');
  tabLogin.classList.remove('active');
  buildSignupForm();
});

// Render the login form on page load
buildLoginForm();


/* ================================================================
   SECTION 3 — MAIN APP: SHOW / HIDE (DOM toggle)
================================================================ */

let currentUser = '';

/**
 * showMainApp — hides login section and reveals the main app
 * by manipulating display style and classList via DOM methods
 */
function showMainApp() {
  // Hide login using DOM style property
  document.getElementById('login-section').style.display = 'none';

  // Show main app and navbar
  document.getElementById('main-app').style.display = 'block';
  document.getElementById('navbar').style.display   = 'flex';

  // Personalise the hero banner text
  document.getElementById('hero-greeting').textContent = 'Welcome back, ' + currentUser + ' 👋';
  document.getElementById('hero-name').textContent     = 'Ready for your next adventure?';

  // Build all inner sections via JS
  buildDashboard();
  buildPlannerForm();
  buildChecklist();

  // Default to Home section
  showSection('home');
}

/**
 * showSection — shows one section and hides others
 * Uses classList.add() / classList.remove()
 */
function showSection(name) {
  const sections = ['home', 'planner', 'checklist'];
  sections.forEach(function (s) {
    const sec = document.getElementById('section-' + s);
    if (s === name) {
      sec.classList.add('active');
    } else {
      sec.classList.remove('active');
    }
  });

  // Sync nav-link active states
  const navMap = { home: 'nav-home', planner: 'nav-planner', checklist: 'nav-checklist' };
  Object.values(navMap).forEach(id => document.getElementById(id).classList.remove('active'));
  document.getElementById(navMap[name]).classList.add('active');
}

/* ── Navigation addEventListener() calls ── */
document.getElementById('nav-home').addEventListener('click',      function () { showSection('home'); });
document.getElementById('nav-planner').addEventListener('click',   function () { showSection('planner'); });
document.getElementById('nav-checklist').addEventListener('click', function () { showSection('checklist'); });

/* ── Logout button ── */
document.getElementById('btn-logout').addEventListener('click', function () {
  if (!confirm('Log out of Wanderlust?')) return;

  // Hide app & navbar, show login again using DOM
  document.getElementById('main-app').style.display    = 'none';
  document.getElementById('navbar').style.display       = 'none';
  document.getElementById('login-section').style.display = 'flex';

  // Reset state
  currentUser = '';
  tripCount   = 0;
  taskItems   = [];

  // Reset tabs to login
  activeMode = 'login';
  tabLogin.classList.add('active');
  tabSignup.classList.remove('active');
  buildLoginForm();
});


/* ================================================================
   SECTION 4 — DASHBOARD STATS
   Stat cards are created via createElement() and appendChild()
================================================================ */

let tripCount = 0;

/** Build the dashboard stats grid dynamically */
function buildDashboard() {
  const container = document.getElementById('dashboard-stats');
  container.innerHTML = '';

  const statsData = [
    { icon: '✈️', label: 'Trips Planned',  id: 'stat-trips', value: tripCount },
    { icon: '📋', label: 'Tasks in List',  id: 'stat-tasks', value: taskItems.length },
    { icon: '✅', label: 'Tasks Completed',id: 'stat-done',  value: taskItems.filter(t => t.done).length },
    { icon: '🌏', label: 'Destinations',   id: 'stat-dest',  value: tripCount },
  ];

  statsData.forEach(function (s) {
    // Create card using createElement()
    const card  = el('div', { cls: 'stat-card' });
    const icon  = el('div', { cls: 'stat-icon',  text: s.icon });
    const val   = el('div', { cls: 'stat-value', text: String(s.value), id: s.id });
    const label = el('div', { cls: 'stat-label', text: s.label });

    // Build card using appendChild()
    card.appendChild(icon);
    card.appendChild(val);
    card.appendChild(label);
    container.appendChild(card);
  });
}

/** Update stat numbers after changes (trips added, tasks toggled) */
function updateDashboardStats() {
  const tripEl  = document.getElementById('stat-trips');
  const taskEl  = document.getElementById('stat-tasks');
  const doneEl  = document.getElementById('stat-done');
  const destEl  = document.getElementById('stat-dest');

  if (tripEl) tripEl.textContent = tripCount;
  if (taskEl) taskEl.textContent = taskItems.length;
  if (doneEl) doneEl.textContent = taskItems.filter(t => t.done).length;
  if (destEl) destEl.textContent = tripCount;
}


/* ================================================================
   SECTION 5 — PLAN YOUR TRIP FORM
   Entire form is built via DOM methods, validated before submission
================================================================ */

function buildPlannerForm() {
  const container = document.getElementById('planner-form-container');
  container.innerHTML = '';

  // Two-column grid wrapper
  const grid = el('div', { cls: 'trip-grid' });

  // ── Name field ──
  const grpName = el('div', { cls: 'form-group' });
  grpName.appendChild(el('label', { text: 'Full Name' }));
  const inpName = el('input', { id: 'trip-name', type: 'text', placeholder: 'Your full name' });
  const errName = el('small', { cls: 'err-msg' });
  grpName.appendChild(inpName);
  grpName.appendChild(errName);

  // ── Email field ──
  const grpEmail = el('div', { cls: 'form-group' });
  grpEmail.appendChild(el('label', { text: 'Email' }));
  const inpEmail = el('input', { id: 'trip-email', type: 'email', placeholder: 'you@example.com' });
  const errEmail = el('small', { cls: 'err-msg' });
  grpEmail.appendChild(inpEmail);
  grpEmail.appendChild(errEmail);

  // ── Destination (full width) ──
  const grpDest = el('div', { cls: 'form-group full' });
  grpDest.appendChild(el('label', { text: 'Destination' }));
  const inpDest = el('input', { id: 'trip-dest', type: 'text', placeholder: 'e.g. Santorini, Greece' });
  const errDest = el('small', { cls: 'err-msg' });
  grpDest.appendChild(inpDest);
  grpDest.appendChild(errDest);

  // ── Travel Date (full width) ──
  const grpDate = el('div', { cls: 'form-group full' });
  grpDate.appendChild(el('label', { text: 'Travel Date' }));
  const inpDate = el('input', { id: 'trip-date', type: 'date' });
  inpDate.min   = new Date().toISOString().split('T')[0];  // prevent past dates at browser level too
  const errDate = el('small', { cls: 'err-msg' });
  grpDate.appendChild(inpDate);
  grpDate.appendChild(errDate);

  // Append all to grid using appendChild()
  grid.appendChild(grpName);
  grid.appendChild(grpEmail);
  grid.appendChild(grpDest);
  grid.appendChild(grpDate);

  // ── Submit button ──
  const btnSubmit = el('button', { cls: 'btn btn-gold', text: '🗺️ Plan My Trip' });

  // ── Success message div (hidden until valid submission) ──
  const successMsg = el('div', { cls: 'success-msg', id: 'planner-success' });

  container.appendChild(grid);
  container.appendChild(btnSubmit);
  container.appendChild(successMsg);

  /* ── addEventListener() for planner submission ── */
  btnSubmit.addEventListener('click', function () {
    let valid = true;

    // Clear previous error states
    [errName, errEmail, errDest, errDate].forEach(e => e.classList.remove('visible'));
    [inpName, inpEmail, inpDest, inpDate].forEach(i => i.classList.remove('error'));
    successMsg.classList.remove('visible');

    // Validate Name
    if (!inpName.value.trim()) {
      showError(errName, 'Name is required.');
      inpName.classList.add('error');
      valid = false;
    }

    // Validate Email
    if (!inpEmail.value.trim()) {
      showError(errEmail, 'Email is required.');
      inpEmail.classList.add('error');
      valid = false;
    } else if (!isValidEmail(inpEmail.value)) {
      showError(errEmail, 'Enter a valid email address.');
      inpEmail.classList.add('error');
      valid = false;
    }

    // Validate Destination
    if (!inpDest.value.trim()) {
      showError(errDest, 'Please enter a destination.');
      inpDest.classList.add('error');
      valid = false;
    }

    // Validate Travel Date — must not be empty or in the past
    if (!inpDate.value) {
      showError(errDate, 'Please select a travel date.');
      inpDate.classList.add('error');
      valid = false;
    } else {
      const chosen = new Date(inpDate.value);
      const now    = new Date();
      now.setHours(0, 0, 0, 0);  // normalize to midnight
      if (chosen < now) {
        showError(errDate, 'Travel date cannot be in the past.');
        inpDate.classList.add('error');
        valid = false;
      }
    }

    if (valid) {
      const dest    = inpDest.value.trim();
      const dateStr = new Date(inpDate.value).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });

      // Dynamically update success message text content
      successMsg.textContent = `Trip to ${dest} planned for ${dateStr}! Have a wonderful journey!`;
      successMsg.classList.add('visible');  // classList.add() to show

      // Increment trip counter and refresh dashboard
      tripCount++;
      updateDashboardStats();

      // Reset all fields
      [inpName, inpEmail, inpDest, inpDate].forEach(i => i.value = '');
    }
  });
}


/* ================================================================
   SECTION 6 — TRIP CHECKLIST
   Tasks created with createElement(), deleted with removeChild(),
   completed with classList.toggle()
================================================================ */

/**
 * taskItems — in-memory array of task objects
 * Each item: { id: number, text: string, done: boolean }
 */
let taskItems    = [];
let taskIdCounter = 0;

// Default tasks pre-loaded on first open
const DEFAULT_TASKS = ['Passport', 'Tickets', 'Hotel Booking', 'Packing'];

/** Build the checklist section UI */
function buildChecklist() {
  const container = document.getElementById('checklist-container');
  container.innerHTML = '';

  // ── Input + Add Button Row ──
  const inputRow = el('div', { cls: 'checklist-input-row' });
  const taskInput = el('input', {
    id: 'task-input',
    type: 'text',
    placeholder: 'Add a new task, e.g. Currency Exchange…'
  });
  const btnAdd = el('button', { id: 'btn-add-task', text: '+ Add Task' });
  inputRow.appendChild(taskInput);
  inputRow.appendChild(btnAdd);

  // Inline error for empty task input
  const inputErr = el('div', {
    cls: 'input-error-toast',
    id: 'task-input-err',
    text: 'Task cannot be empty.'
  });

  // ── Task Meta Row (counters) ──
  const taskMeta    = el('div', { cls: 'task-meta' });
  const taskCounter = el('span', { id: 'task-counter', text: '0 tasks' });
  const taskDone    = el('span', { id: 'task-done-count', text: '0 completed' });
  taskMeta.appendChild(taskCounter);
  taskMeta.appendChild(taskDone);

  // ── Task List ──
  const taskList = el('ul', { id: 'task-list' });

  // Append all parts to container using appendChild()
  container.appendChild(inputRow);
  container.appendChild(inputErr);
  container.appendChild(taskMeta);
  container.appendChild(taskList);

  /* ── addEventListener() for Add Task button ── */
  btnAdd.addEventListener('click', function () {
    const val = taskInput.value.trim();

    if (!val) {
      // Show inline error — no alert()
      inputErr.classList.add('visible');
      taskInput.classList.add('error');
      taskInput.focus();
      return;
    }

    // Clear error state
    inputErr.classList.remove('visible');
    taskInput.classList.remove('error');

    addTask(val);
    taskInput.value = '';
    taskInput.focus();
  });

  /* ── addEventListener() — allow Enter key to add task ── */
  taskInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') btnAdd.click();
  });

  /* ── addEventListener() — clear error as user types ── */
  taskInput.addEventListener('input', function () {
    if (taskInput.value.trim()) {
      inputErr.classList.remove('visible');
      taskInput.classList.remove('error');
    }
  });

  // Pre-populate with default example tasks
  DEFAULT_TASKS.forEach(function (t) { addTask(t); });
}

/**
 * addTask(text) — Creates a task list item using createElement()
 * and appends it to #task-list using appendChild()
 */
function addTask(text) {
  const id = ++taskIdCounter;
  taskItems.push({ id: id, text: text, done: false });

  const list = document.getElementById('task-list');

  // Remove empty-state placeholder if it exists
  const emptyState = list.querySelector('.empty-state');
  if (emptyState) list.removeChild(emptyState);  // removeChild()

  // ── Build task <li> using createElement() ──
  const li = el('li', { cls: 'task-item', id: 'task-' + id });

  const taskText    = el('span', { cls: 'task-text', text: text });
  const btnComplete = el('button', { cls: 'btn-complete', text: '✓' });
  const btnDelete   = el('button', { cls: 'btn-delete',   text: '✕' });

  btnComplete.title = 'Mark complete';
  btnDelete.title   = 'Remove task';

  // Assemble task item using appendChild()
  li.appendChild(taskText);
  li.appendChild(btnComplete);
  li.appendChild(btnDelete);

  // Append to list using appendChild()
  list.appendChild(li);

  /* ── addEventListener() — Complete button ── */
  btnComplete.addEventListener('click', function () {
    const item = taskItems.find(function (t) { return t.id === id; });
    if (item) item.done = !item.done;

    li.classList.toggle('completed');  // classList.toggle() for line-through
    updateTaskCounters();
    updateDashboardStats();
  });

  /* ── addEventListener() — Delete button ── */
  btnDelete.addEventListener('click', function () {
    list.removeChild(li);  // removeChild() removes the task from DOM

    // Remove from data array
    taskItems = taskItems.filter(function (t) { return t.id !== id; });

    // Show empty state if no tasks remain
    if (taskItems.length === 0) {
      const empty = el('li', { cls: 'empty-state' });
      empty.appendChild(el('span', { text: '📦' }));
      empty.appendChild(document.createTextNode('Your checklist is empty. Add tasks above!'));
      list.appendChild(empty);
    }

    updateTaskCounters();
    updateDashboardStats();
  });

  updateTaskCounters();
  updateDashboardStats();
}

/** Updates the task counter display dynamically */
function updateTaskCounters() {
  const counterEl = document.getElementById('task-counter');
  const doneEl    = document.getElementById('task-done-count');
  if (!counterEl) return;

  const total     = taskItems.length;
  const completed = taskItems.filter(function (t) { return t.done; }).length;

  counterEl.textContent = total + (total === 1 ? ' task' : ' tasks');
  doneEl.textContent    = completed + ' completed';
}
