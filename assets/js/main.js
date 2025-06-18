const cards = document.querySelectorAll('#card-list .card');
const dotsContainer = document.getElementById('dots');
const arrowUp = document.getElementById('arrow-up');
const arrowDown = document.getElementById('arrow-down');
let currentIndex = 0;

const icons = [
    'assets/css/img/pictos/CDI.svg',
    'assets/css/img/pictos/security.svg',
    'assets/css/img/pictos/clipboard.svg',
    'assets/css/img/pictos/bookmarks.svg',
    'assets/css/img/pictos/balance.svg'
];

function renderDots(index) {
    dotsContainer.innerHTML = '';
    for (let i = index - 2; i <= index + 2; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        if (i === index) {
            dot.classList.add('active');
            if (icons[i]) {
                const img = document.createElement('img');
                img.src = icons[i];
                img.alt = `Icone ${i}`;
                dot.appendChild(img);
            }
        } else if (i === index - 1 || i === index + 1) {
            dot.classList.add('medium');
        } else if (i === index - 2 || i === index + 2) {
            dot.classList.add('small');
        }

        if (i >= 0 && i < cards.length) {
            dot.addEventListener('click', () => scrollToCard(i));
        } else {
            dot.style.opacity = 0;
        }

        dotsContainer.appendChild(dot);
    }
}

function scrollToCard(index) {
    if (index >= 0 && index < cards.length) {
        cards[index].scrollIntoView({ behavior: 'smooth' });
        currentIndex = index;
        renderDots(currentIndex);
    }
}

arrowUp.addEventListener('click', () => scrollToCard(currentIndex - 1));
arrowDown.addEventListener('click', () => scrollToCard(currentIndex + 1));

// IntersectionObserver basé sur le milieu de l'écran
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(cards).indexOf(entry.target);
            if (index !== -1 && index !== currentIndex) {
            currentIndex = index;
            renderDots(currentIndex);
            }
        }
        });
    },
    {
        root: null,
        threshold: 0.6 // Card visible à 60 % = active
    }
);

cards.forEach(card => observer.observe(card));
renderDots(currentIndex);