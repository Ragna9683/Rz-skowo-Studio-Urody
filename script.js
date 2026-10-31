/* ==========================================================================
   Rzęskowo Wołomin — Core JS
   Fixed: Clickable service cards now scroll directly to the pricing section & filter portfolio
   ========================================================================== */


const portfolioData = [
    { id: 1, category: "lashes", title: "Stylizacja rzęs", sub: "Tu pojawi się zdjęcie realizacji", img: null },
    { id: 2, category: "brows", title: "Henna pudrowa z geometrią", sub: "Tu pojawi się zdjęcie realizacji", img: null },
    { id: 3, category: "nails", title: "Manicure hybrydowy", sub: "Tu pojawi się zdjęcie realizacji", img: null },
    { id: 4, category: "makeup", title: "Makijaż okolicznościowy", sub: "Tu pojawi się zdjęcie realizacji", img: null },
    { id: 5, category: "lashes", title: "Koreańska laminacja rzęs", sub: "Tu pojawi się zdjęcie realizacji", img: null },
    { id: 6, category: "brows", title: "Laminacja brwi", sub: "Tu pojawi się zdjęcie realizacji", img: null },
    { id: 7, category: "nails", title: "Przedłużenie żelowe", sub: "Tu pojawi się zdjęcie realizacji", img: null },
    { id: 8, category: "makeup", title: "Makijaż ślubny", sub: "Tu pojawi się zdjęcie realizacji", img: null }
];


const teamData = {
    1: {
        name: "Karolina",
        initials: "K",
        role: "Stylizacja rzęs",
        bio: "Zajmuje się stylizacją rzęs.",
        skills: ["Zakładanie i przedłużanie rzęs", "Uzupełnianie rzęs"]
    },
    2: {
        name: "Ewelina",
        initials: "E",
        role: "Stylizacja rzęs",
        bio: "Zajmuje się stylizacją rzęs.",
        skills: ["Zakładanie i przedłużanie rzęs", "Uzupełnianie rzęs"]
    },
    3: {
        name: "Klaudia Oleksiak",
        initials: "KO",
        role: "Stylistka brwi i rzęs",
        bio: "Brwi i rzęsy: laminacja, farbka i regulacja.",
        skills: ["Laminacja brwi + farbka", "Klasyczna farbka brwi + regulacja", "Laminacja koreańska rzęs", "Komplet: laminacja brwi i rzęs", "Uzupełnianie rzęs"]
    },
    4: {
        name: "Weronika Pszczółkowska",
        initials: "WP",
        role: "Stylistka paznokci",
        bio: "Paznokcie: manicure hybrydowy i stylizacje akrylowe.",
        skills: ["Manicure hybrydowy", "Manicure hybrydowy z bazą wzmacniającą", "Przedłużenie i uzupełnienie akrylowe", "Utwardzenie naturalnej płytki", "Naprawa paznokcia"]
    },
    5: {
        name: "Weronika Pokrywko",
        initials: "WP",
        role: "Stylistka paznokci",
        bio: "Studentka II roku kosmetologii. Jej pasją jest stylizacja paznokci, a ukończone szkolenia dotyczą manicure hybrydowego i żelowego. Chętnie podejmuje się odważnych stylizacji i ozdób.",
        skills: ["Manicure hybrydowy z bazą wzmacniającą", "Przedłużenie i uzupełnienie żelowe", "Pedicure klasyczny, hybrydowy i SPA", "Utwardzenie płytki żelem"]
    },
    6: {
        name: "Martyna Zęgota",
        initials: "MZ",
        role: "Makijaż",
        bio: "Makijaż podkreślający naturalne piękno, dopasowany do urody i okazji.",
        skills: ["Makijaż okolicznościowy", "Makijaż ślubny", "Makijaż próbny ślubny"]
    }
};

document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('lines-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        let step = 0;
        function drawLines() {
            ctx.clearRect(0, 0, width, height);
            step += 0.005;

          
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(155, 44, 59, 0.25)';
            for (let x = 0; x < width; x += 10) {
                let y = Math.sin(x * 0.002 + step) * 80 + Math.cos(x * 0.001 + step) * 40 + height * 0.4;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

           
            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = 'rgba(44, 82, 130, 0.2)';
            for (let x = 0; x < width; x += 10) {
                let y = Math.cos(x * 0.0025 - step) * 100 + Math.sin(x * 0.0015 + step) * 50 + height * 0.6;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            requestAnimationFrame(drawLines);
        }
        drawLines();
    }

    /* --- RENDER PORTFOLIO (16 ITEMS) --- */
    const portfolioGrid = document.getElementById('portfolio-grid');
    function renderPortfolio(category = 'all') {
        if (!portfolioGrid) return;
        portfolioGrid.innerHTML = '';

        const filtered = category === 'all' 
            ? portfolioData 
            : portfolioData.filter(item => item.category === category);

        filtered.forEach(item => {
            const media = item.img ? `<img src="${item.img}" alt="${item.title}" loading="lazy">` : '';
            const classes = item.img ? 'portfolio-item open-img-modal' : 'portfolio-item portfolio-item--tile';
            const dataImg = item.img ? ` data-img="${item.img}"` : '';
            const cardHTML = `
                <div class="${classes}" data-cat="${item.category}"${dataImg}>
                    ${media}
                    <div class="portfolio-item__overlay">
                        <h4>${item.title}</h4>
                        <span>${item.sub}</span>
                    </div>
                </div>
            `;
            portfolioGrid.insertAdjacentHTML('beforeend', cardHTML);
        });

        initImageModal();
    }
    renderPortfolio('all');

    /* --- PORTFOLIO FILTER BUTTONS --- */
    const filterBtns = document.querySelectorAll('.portfolio-filters .filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPortfolio(btn.dataset.filter);
        });
    });

    /* --- CLICKABLE SERVICE CARDS (SCROLL TO PRICING & FILTER PORTFOLIO) --- */
    document.querySelectorAll('.service-card[data-service-trigger]').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const filterTarget = card.dataset.serviceTrigger;
            
          
            const targetFilterBtn = document.querySelector(`.filter-btn[data-filter="${filterTarget}"]`);
            if (targetFilterBtn) {
                targetFilterBtn.click();
            }

        
            const pricingSection = document.getElementById('pricing');
            if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* --- TEAM MEMBER MODAL --- */
    const teamModal = document.getElementById('team-modal');
    const teamModalOverlay = document.getElementById('team-modal-overlay');
    const teamModalClose = document.getElementById('team-modal-close');

    document.querySelectorAll('.team-card[data-team-id]').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.teamId;
            const data = teamData[id];
            if (!data) return;

            document.getElementById('team-modal-avatar').textContent = data.initials;
            document.getElementById('team-modal-name').textContent = data.name;
            document.getElementById('team-modal-role').textContent = data.role;
            document.getElementById('team-modal-bio').textContent = data.bio;

            const skillsList = document.getElementById('team-modal-skills');
            skillsList.innerHTML = '';
            data.skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                skillsList.appendChild(li);
            });

            teamModal.classList.add('active');
        });
    });

    function closeTeamModal() { if (teamModal) teamModal.classList.remove('active'); }
    if (teamModalClose) teamModalClose.onclick = closeTeamModal;
    if (teamModalOverlay) teamModalOverlay.onclick = closeTeamModal;

    /* --- IMAGE ZOOM MODAL --- */
    const imageModal = document.getElementById('image-modal');
    const imageModalOverlay = document.getElementById('image-modal-overlay');
    const imageModalClose = document.getElementById('image-modal-close');
    const imageModalImg = document.getElementById('image-modal-img');

    function initImageModal() {
        document.querySelectorAll('.open-img-modal').forEach(item => {
            item.addEventListener('click', () => {
                const img = item.dataset.img;
                if (imageModalImg) imageModalImg.src = img;
                if (imageModal) imageModal.classList.add('active');
            });
        });
    }

    function closeImageModal() { if (imageModal) imageModal.classList.remove('active'); }
    if (imageModalClose) imageModalClose.onclick = closeImageModal;
    if (imageModalOverlay) imageModalOverlay.onclick = closeImageModal;

    /* --- MOBILE BURGER MENU --- */
    const burgerBtn = document.getElementById('burger-menu-btn');
    const mainNav = document.getElementById('main-nav');
    if (burgerBtn && mainNav) {
        burgerBtn.addEventListener('click', () => mainNav.classList.toggle('active'));
        
        
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mainNav.classList.remove('active'));
        });
    }
});
