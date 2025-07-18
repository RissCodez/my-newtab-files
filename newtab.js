const sectionIds = ['bookmarks', 'university', 'lifelists', 'phylogeny'];

function showSection(id) {
  console.log('showSection called with id:', id);
  sectionIds.forEach(sectionId => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    if (sectionId === id) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });
}

// Timer variables
let timerInterval;
const totalSeconds = 5 * 60;
let remainingSeconds = totalSeconds;
let isRunning = false;

function updateDisplay() {
  const display = document.getElementById('timer-display');
  if (!display) return;

  let minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
  let seconds = (remainingSeconds % 60).toString().padStart(2, '0');
  display.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timerInterval = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      alert('Time is up! Take a quick break!');
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  remainingSeconds = totalSeconds;
  updateDisplay();
}

// Make sure everything below waits until DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Show "bookmarks" section by default
  showSection('bookmarks');

  // Setup editable box
  const editable = document.getElementById('editable');
  if (editable) {
    const saved = localStorage.getItem('myEditableContent');
    if (saved) editable.innerHTML = saved;

    editable.addEventListener('input', () => {
      localStorage.setItem('myEditableContent', editable.innerHTML);
    });
  }

  // Initialize timer display
  updateDisplay();

  // OPTIONAL: If you're not using `onclick` in HTML, bind buttons in JS:
  const startBtn = document.querySelector('#startTimer') || document.querySelector('button[onclick*="startTimer"]');
  const pauseBtn = document.querySelector('#pauseTimer') || document.querySelector('button[onclick*="pauseTimer"]');
  const resetBtn = document.querySelector('#resetTimer') || document.querySelector('button[onclick*="resetTimer"]');

  if (startBtn) startBtn.addEventListener('click', startTimer);
  if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
  if (resetBtn) resetBtn.addEventListener('click', resetTimer);
});

// If you *must* support inline onclick in HTML buttons (not ideal), expose globally:
window.startTimer = startTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;
window.showSection = showSection;
