// ==========================================
// 1. GLOBAL VARIABLES
// ==========================================
let currentSelectedService = "";
let currentSelectedPrice = 0;
const sampleImg = "sample.png"; 

const serviceData = {
    "Logo & Branding": {
        count: 10,
        images: [
            "D:\\web 1\\stimage1.png", "post2.jpg", "post3.jpg", "post4.jpg", "post5.jpg",
            "post6.jpg", "post7.jpg", "post8.jpg", "post9.jpg", "post10.jpg"
        ]
    },
    "Social Media Posts": {
        count: 20,
        images: [
            "D:\\web 1\\stimage1.png", "post2.jpg", "post3.jpg", "post4.jpg", "post5.jpg",
            "post6.jpg", "post7.jpg", "post8.jpg", "post9.jpg", "post10.jpg",
            "post11.jpg", "post12.jpg", "post13.jpg", "post14.jpg", "post15.jpg",
            "post16.jpg", "post17.jpg", "post18.jpg", "post19.jpg", "post20.jpg"
        ]
    },
    "Flyers & Brochures": { count: 20, images: Array(20).fill(sampleImg) },
    "Cover Pages": { count: 20, images: Array(20).fill(sampleImg) },
    "Web Design": { count: 10, images: Array(10).fill(sampleImg) }
};

// ==========================================
// 2. MODAL CONTROLS
// ==========================================
const loginBtn = document.getElementById('loginBtn');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');

if (loginBtn) {
    loginBtn.addEventListener('click', () => modalOverlay.classList.add('active'));
}
if (closeModal) {
    closeModal.addEventListener('click', () => modalOverlay.classList.remove('active'));
}

window.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('active');
});

const showSignup = document.getElementById('showSignup');
if (showSignup) {
    showSignup.addEventListener('click', () => {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('signupSection').style.display = 'block';
    });
}

const showLogin = document.getElementById('showLogin');
if (showLogin) {
    showLogin.addEventListener('click', () => {
        document.getElementById('signupSection').style.display = 'none';
        document.getElementById('loginSection').style.display = 'block';
    });
}

// ==========================================
// 3. PAGE NAVIGATION LOGIC
// ==========================================
function hideAllSections() {
    const sections = [
        '#homeHero', '#homeServices', '#fullServicesPage', 
        '#portfolioDetail', '#orderFormSection', '#aboutSection', 
        '#portfolioSection', '#contactSection', '#trackingSection', 
        '#reviewsSection'
    ];
    sections.forEach(id => {
        const el = document.querySelector(id);
        if (el) el.style.display = 'none';
    });
}

function showHomePage() {
    hideAllSections();
    document.getElementById('homeHero').style.display = 'flex';
    document.getElementById('homeServices').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showServicesPage() {
    hideAllSections();
    document.getElementById('fullServicesPage').style.display = 'block';
    window.scrollTo(0, 0);
}

function showPortfolioPage() {
    hideAllSections();
    document.getElementById('portfolioSection').style.display = 'block';
    window.scrollTo(0, 0);
}

function showAboutPage() {
    hideAllSections();
    document.getElementById('aboutSection').style.display = 'block';
    window.scrollTo(0, 0);
}

function showContactPage() {
    hideAllSections();
    document.getElementById('contactSection').style.display = 'block';
    window.scrollTo(0, 0);
}

function showTracking() {
    hideAllSections();
    document.getElementById('trackingSection').style.display = 'block';
    window.scrollTo(0, 0);
}

function showReviews() {
    hideAllSections();
    document.getElementById('reviewsSection').style.display = 'block';
    window.scrollTo(0, 0);
}

// ==========================================
// 4. PORTFOLIO & ORDER LOGIC
// ==========================================
function showPortfolio(serviceName) {
    const data = serviceData[serviceName];
    if (!data) return;

    hideAllSections();
    
    const detailSection = document.getElementById('portfolioDetail');
    const grid = document.getElementById('portfolioGrid');
    const titleHeader = document.getElementById('detailTitle');
    
    detailSection.style.display = 'block';
    titleHeader.innerText = serviceName;
    grid.innerHTML = ""; 

    data.images.forEach((imgSrc, index) => {
        const item = document.createElement('div');
        item.className = 'card';
        item.style.marginBottom = "20px";
        item.innerHTML = `
            <img src="${imgSrc}" alt="Design ${index + 1}" style="width:100%; height:250px; object-fit: cover; border-radius: 10px;" onerror="this.src='https://via.placeholder.com/300?text=Image+Not+Found'">
            <div style="padding: 15px; text-align: center;">
                <p style="font-weight: bold; margin-bottom: 10px;">Design #${index + 1}</p>
                <button onclick="placeOrder('${serviceName}', ${index + 1})" class="submit-btn" style="padding: 8px; font-size: 0.8rem; cursor: pointer;">Place Order</button>
            </div>
        `;
        grid.appendChild(item);
    });
    window.scrollTo(0, 0);
}

function backToHome() {
    showHomePage();
}

function placeOrder(service, id) {
    const phone = "94704025586"; 
    const message = `Hello Ab Studio! I want to place an order for ${service} (Design ID: ${id})`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

function showOrderForm() {
    hideAllSections();
    document.getElementById('orderFormSection').style.display = 'block';
    window.scrollTo(0, 0);
}

function backToPortfolio() {
    hideAllSections();
    document.getElementById('portfolioDetail').style.display = 'block';
}

function processOrder(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const sizeInput = document.getElementById('designSize').value.toUpperCase();
    const formatInput = document.getElementById('fileFormat').value;
    
    let finalPrice = currentSelectedPrice || 0; 
    
    if (sizeInput.includes('A3')) {
        finalPrice = 1000;
    } else if (sizeInput.includes('A4')) {
        finalPrice = 750;
    }

    if (formatInput.includes('PSD')) {
        finalPrice += 250;
    }

    const url = `payment.html?service=${encodeURIComponent(currentSelectedService)}&price=${finalPrice}&name=${encodeURIComponent(fullName)}`;
    window.location.href = url;
}

function openOrderForm(serviceName, price) {
    currentSelectedService = serviceName;
    currentSelectedPrice = price;
    hideAllSections();
    const formSection = document.getElementById('orderFormSection');
    formSection.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 5. SEARCH & FILTERING
// ==========================================
function searchServices() {
    let input = document.getElementById('serviceSearch').value.toLowerCase();
    let cards = document.getElementsByClassName('service-item');
    
    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].querySelector('h3').innerText.toLowerCase();
        let desc = cards[i].querySelector('p').innerText.toLowerCase();
        
        if (title.includes(input) || desc.includes(input)) {
            cards[i].style.display = "block";
            cards[i].classList.add('show');
        } else {
            cards[i].style.display = "none";
            cards[i].classList.remove('show');
        }
    }
}

function filterPortfolio(category) {
    const items = document.querySelectorAll('#mainPortfolioGrid .portfolio-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    if(event) event.target.classList.add('active');

    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
            setTimeout(() => item.style.opacity = '1', 10);
        } else {
            item.style.opacity = '0';
            setTimeout(() => item.style.display = 'none', 300);
        }
    });
}

// ==========================================
// 6. OTHER UTILITIES (Slider, Tracking, Contact)
// ==========================================
let currentIdx = 0;
const slider = document.getElementById('reviewSlider');
const reviewCards = document.querySelectorAll('.review-card');

function updateSlider() {
    if(slider) slider.style.transform = `translateX(-${currentIdx * 100}%)`;
}

function nextReview() {
    if(reviewCards.length > 0) {
        currentIdx = (currentIdx + 1) % reviewCards.length;
        updateSlider();
    }
}

function prevReview() {
    if(reviewCards.length > 0) {
        currentIdx = (currentIdx - 1 + reviewCards.length) % reviewCards.length;
        updateSlider();
    }
}

let reviewTimer = setInterval(nextReview, 5000);
if(slider) {
    slider.parentElement.addEventListener('mouseenter', () => clearInterval(reviewTimer));
    slider.parentElement.addEventListener('mouseleave', () => reviewTimer = setInterval(nextReview, 5000));
}

function trackOrder() {
    const id = document.getElementById('orderIDInput').value.trim().toUpperCase();
    const resultArea = document.getElementById('trackingResult');
    const msg = document.getElementById('trackMessage');
    const bar = document.getElementById('progressBar');
    
    const orders = {
        'AB-1001': { step: 2, status: 'ඔබේ නිර්මාණය දැනට සකස් වෙමින් පවතී...' },
        'AB-1002': { step: 4, status: 'නිර්මාණය අවසන්! ඔබට දැන් එය ලබා ගත හැක.' },
        'AB-1003': { step: 1, status: 'ඇණවුම ලැබුණා. ඉක්මනින් වැඩ ආරම්භ කරනු ඇත.' }
    };

    if (orders[id]) {
        resultArea.style.display = 'flex';
        msg.innerText = orders[id].status;
        const stepNum = orders[id].step;

        const progressWidth = ((stepNum - 1) / 3) * 100;
        bar.style.width = progressWidth + '%';

        for (let i = 1; i <= 4; i++) {
            const stepEl = document.getElementById('step' + i);
            stepEl.classList.remove('active', 'completed');
            if (i < stepNum) stepEl.classList.add('completed');
            if (i === stepNum) stepEl.classList.add('active');
        }
    } else {
        resultArea.style.display = 'none';
        msg.innerText = "කණගාටුයි, එවැනි ඇණවුම් අංකයක් සොයාගත නොහැකි විය.";
        msg.style.color = "red";
    }
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('ස්තූතියි! ඔබේ පණිවිඩය අප වෙත ලැබුණා. ඉක්මනින් සම්බන්ධ වන්නෙමු.');
        this.reset();
    });
}
function changeLanguage(lang) {
    // සියලුම data elements තෝරා ගැනීම
    const elements = document.querySelectorAll('[data-si]');
    
    elements.forEach(el => {
        if (lang === 'si') {
            el.innerText = el.getAttribute('data-si');
        } else {
            el.innerText = el.getAttribute('data-en');
        }
    });

    // බටන් වල active status එක වෙනස් කිරීම
    document.getElementById('btn-si').classList.toggle('active', lang === 'si');
    document.getElementById('id-en').classList.toggle('active', lang === 'en');
    
    // තෝරාගත් භාෂාව මතක තබා ගැනීම (Optional)
    localStorage.setItem('preferredLang', lang);
}

// පිටුව Load වන විට අවසන් වරට තෝරාගත් භාෂාව පෙන්වීම
window.onload = () => {
    const savedLang = localStorage.getItem('preferredLang') || 'si';
    changeLanguage(savedLang);
};
