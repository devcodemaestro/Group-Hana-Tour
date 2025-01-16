const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,
    autoplay: true,
    });


    const buttons = document.querySelectorAll('.navbarButton_park');
const sections = document.querySelectorAll('section');

const updateActiveButton = () => {
    let currentSection = null;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            currentSection = section;
        }
    });

    buttons.forEach(button => {
        const targetId = button.parentElement.getAttribute('href'); 
        if (currentSection && targetId === `#${currentSection.id}`) {
            button.classList.add('active'); 
        } else {
            button.classList.remove('active');
        }   
    });
};

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

window.addEventListener('scroll', updateActiveButton);

updateActiveButton();

const navbar = document.querySelector('.middleNavbar_park');
const section4 = document.querySelector('#section4_park');

window.addEventListener('scroll', () => {
const section4Start = section4.offsetTop;
const currentScroll = window.scrollY;

if (currentScroll >= section4Start) {
    navbar.classList.add('hidden');
}else {
    navbar.classList.remove('hidden');
}
});