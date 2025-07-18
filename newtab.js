<script>
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
    window.onload = function() {
      showSection('bookmarks');
    }
</script>
    

    

<script>
  const editable = document.getElementById('editable');
  // Load saved content on page load
  if (localStorage.getItem('myEditableContent')) {
    editable.innerHTML = localStorage.getItem('myEditableContent');
  }
  
  // Save content on each input
  editable.addEventListener('input', () => {
    localStorage.setItem('myEditableContent', editable.innerHTML);
  });
</script>
    
    
    <script>
let timerInterval;
let totalSeconds = 5 * 60; // 25 minutes for a Pomodoro
let remainingSeconds = totalSeconds;
let isRunning = false;

function updateDisplay() {
  let minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
  let seconds = (remainingSeconds % 60).toString().padStart(2, '0');
  document.getElementById('timer-display').textContent = minutes + ':' + seconds;
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', updateDisplay);
</script>