// --- Live Terminal Simulator ---
const terminalBody = document.getElementById('terminal-body');
const commands = [
  "Initializing IoT protocols...",
  "Connecting to RES Lab server...",
  "System Ready"
];
let cmdIndex = 0;

function typeLine(text, onComplete) {
  const line = document.createElement('div');
  line.className = 'term-line active';
  line.innerHTML = `<span class="prompt">root@faris:~# </span><span class="text"></span><span class="cursor"></span>`;
  terminalBody.appendChild(line);

  const textSpan = line.querySelector('.text');
  const cursor = line.querySelector('.cursor');
  let charIndex = 0;

  const typeInterval = setInterval(() => {
    textSpan.textContent += text.charAt(charIndex);
    charIndex++;
    if (charIndex >= text.length) {
      clearInterval(typeInterval);
      cursor.remove(); // remove cursor from finished line
      setTimeout(onComplete, 600); // pause before next line
    }
  }, 50); // typing speed
}

function runTerminal() {
  if (cmdIndex < commands.length) {
    typeLine(commands[cmdIndex], runTerminal);
    cmdIndex++;
  } else {
    // Add blinking cursor at the end
    const finalLine = document.createElement('div');
    finalLine.className = 'term-line active';
    finalLine.innerHTML = `<span class="prompt">root@faris:~# </span><span class="cursor"></span>`;
    terminalBody.appendChild(finalLine);
  }
}

// Start terminal animation after a slight delay
setTimeout(runTerminal, 1500);

// --- Project Filter ---
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      // Reset animation
      card.style.display = 'none';
      card.classList.remove('fade-in');

      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        // Force reflow
        void card.offsetWidth;
        card.style.display = 'flex';
        card.classList.add('fade-in');
      }
    });
  });
});

// --- Mobile Navigation ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-visible');
  });

  // Close menu when clicking a link
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-visible');
    });
  });
}
