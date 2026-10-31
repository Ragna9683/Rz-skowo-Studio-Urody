/* ==========================================================================
   Rzęskowo Wołomin — Core JS
   Fixed: Clickable service cards now scroll directly to the pricing section & filter portfolio
   ========================================================================== */


const portfolioData = [
    { id: 1, category: "lashes", title: "Stylizacja Rzęs 2D/3D", sub: "Subtelna elegancja", img: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=800&q=80" },
    { id: 2, category: "brows", title: "Laminacja Brwi", sub: "Idealny kształt i odżywienie", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80" },
    { id: 3, category: "nails", title: "Manicure Hybrydowy", sub: "Pudrowy róż & nude", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80" },
    { id: 4, category: "lashes", title: "Efekt Kim & Hollywood", sub: "Głębokie spojrzenie", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80" },
    { id: 5, category: "brows", title: "Henna Pudrowa", sub: "Geometria brwi", img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80" },
    { id: 6, category: "nails", title: "Przedłużanie Żelowe", sub: "Klasyczna elegancja", img: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80" },
    { id: 7, category: "makeup", title: "Makijaż Okolicznościowy", sub: "Rozświetlenie skóry", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80" },
    { id: 8, category: "lashes", title: "Lifting Rzęs + Botoks", sub: "Naturalne podkręcenie", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80" },
    { id: 9, category: "nails", title: "Nail Art & Zdobienia", sub: "Ręcznie malowane wzory", img: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80" },
    { id: 10, category: "brows", title: "Architektura Brwi", sub: "Perfekcyjny rysunek", img: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=800&q=80" },
    { id: 11, category: "lashes", title: "Mega Volume 4D-6D", sub: "Maksymalne zagęszczenie", img: "https://images.unsplash.com/photo-1502035618526-de35736579cd?auto=format&fit=crop&w=800&q=80" },
    { id: 12, category: "makeup", title: "Makijaż Ślubny", sub: "Nieskazitelna trwałość", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80" },
    { id: 13, category: "nails", title: "Pedicure SPA", sub: "Kompleksowa pielęgnacja", img: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80" },
    { id: 14, category: "brows", title: "Laminowanie + Koloryzacja", sub: "Efekt puszystych brwi", img: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80" },
    { id: 15, category: "lashes", title: "Rzęsy Mokry Efekt", sub: "Trend sezonu Wet Look", img: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80" },
    { id: 16, category: "makeup", title: "Pielęgnacja Twarzy", sub: "Głębokie nawilżenie", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80" }
];


const teamData = {
    1: {
        name: "Karolina Suchocka",
        role: "Założycielka & Master Stylist",
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        bio: "Karolina posiada ponad 11 lat doświadczenia w branży beauty. Jest autorką unikalnych technik przedłużania rzęs i geometrii brwi w Wołominie. Uczestniczka ponad 30 międzynarodowych konferencji i mistrzostw stylizacji.",
        skills: ["Stylizacja rzęs metodami 1:1 - 6D", "Instruktorka geometrii brwi", "Laminacja rzęs i botoks", "Zarządzanie standardami higieny"]
    },
    2: {
        name: "Paulina Nowak",
        role: "Senior Nail Artist",
        img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
        bio: "Paulina to prawdziwa artystka manicure z 6-letnim stażem. Specjalizuje się w manicure kombinowanym oraz trudnych rekonstrukcjach uszkodzonej płytki paznokcia.",
        skills: ["Manicure hybrydowy i żelowy", "Ręczne zdobienia Nail Art", "Pedicure podologiczny i SPA", "Przedłużanie na szablonie"]
    },
    3: {
        name: "Martyna Wiśniewska",
        role: "Brow & Lash Stylist",
        img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80",
        bio: "Martyna dba o to, by każde spojrzenie nabrało głębi. Jej pasją jest laminacja brwi oraz tworzenie naturalnego rysunku z użyciem henny pudrowej.",
        skills: ["Henna pudrowa z geometrią", "Laminacja brwi i rzęs", "Stylizacja rzęs objętościowych", "Dobór kształtu do anatomii twarzy"]
    },
    4: {
        name: "Anna Kowalczyk",
        role: "Make-up Artist & Kosmetolog",
        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        bio: "Anna odpowiada w naszym studiu za makijaże okolicznościowe i ślubne. Dzięki wykształceniu kosmetologicznemu idealnie przygotowuje skórę pod trwały make-up.",
        skills: ["Makijaż ślubny i wieczorowy", "Pielęgnacja nawilżająca twarzy", "Analiza kolorystyczna", "Zabiegi bankietowe przed wielkim wyjściem"]
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
            const cardHTML = `
                <div class="portfolio-item open-img-modal" data-img="${item.img}">
                    <img src="${item.img}" alt="${item.title}" loading="lazy">
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

            document.getElementById('team-modal-img').src = data.img;
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
