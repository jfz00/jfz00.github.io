/* MISFITS XIII — Interactions
   Hover effects, character card reveal, glitch triggers
*/

document.addEventListener('DOMContentLoaded', () => {

    // ===== Glitch background trigger on hover =====
    const cards = document.querySelectorAll('.character-card, .npc-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('triggered');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('triggered');
        });
    });

    // ===== Boot-in animation stagger =====
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach((el, i) => {
        el.style.animationDelay = `${i * 0.1}s`;
    });

    // ===== Keyboard navigation (arrow keys) =====
    document.addEventListener('keydown', (e) => {
        const grid = document.querySelector('.character-grid, .npc-grid');
        if (!grid) return;
        const cards = Array.from(grid.querySelectorAll('.character-card, .npc-card'));
        const currentIndex = cards.findIndex(c => c === document.activeElement);
        
        if (e.key === 'ArrowRight' && currentIndex < cards.length -1) {
            cards[currentIndex + 1]?.focus();
        }
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            cards[currentIndex -1]?.focus();
        }
    });

    // ===== Search filter =====
    const searchInput = document.querySelector('#search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const allCards = document.querySelectorAll('.character-card, .npc-card');
            allCards.forEach(card => {
                const name = card.querySelector('.character-card-name, .npc-card-name')?.textContent?.toLowerCase() || '';
                if (name.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // ===== Random glitch on title (easter egg) =====
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        let glitchCount = 0;
        heroTitle.addEventListener('click', () => {
            glitchCount++;
            if (glitchCount >= 5) {
                document.body.style.animation = 'background-glitch 0.1s ease-in';
                heroTitle.style.animation = 'logo-glitch 0.7s ease-in-out';
            }
        });
    }
});
