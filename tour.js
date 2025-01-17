const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,
    autoplay: true,
});


const buttons = document.querySelectorAll('.navbarButton_park');
const sections = document.querySelectorAll('section');

let lastClickedButton = null; 


const updateActiveButton = () => {
    let currentSection = null;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            currentSection = section;
        }
    });

    if (currentSection) {
        buttons.forEach(button => {
            const targetId = button.parentElement.getAttribute('href');

            if (targetId === `#${currentSection.id}`) {
                button.classList.add('active');
                lastClickedButton = button;
            } else {
                button.classList.remove('active');
            }
        });
    }
};


buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); 

        lastClickedButton = button; 

        buttons.forEach(btn => btn.classList.remove('active')); 
        button.classList.add('active');

        const targetId = button.parentElement.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50, 
                behavior: 'smooth'
            });

            setTimeout(updateActiveButton, 500); 
        }
    });
});


window.addEventListener('scroll', () => {
    updateActiveButton();

    if (lastClickedButton) {
        lastClickedButton.classList.add('active');
    }
});

updateActiveButton();

const navbar = document.querySelector('.middleNavbar_park');
const section4 = document.querySelector('#section4_park');

window.addEventListener('scroll', () => {
    const section4Rect = section4.getBoundingClientRect(); // 현재 뷰포트에서의 위치 가져오기

    if (section4Rect.top <= 0) { // 화면 상단에 도달하면 숨기기
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
});