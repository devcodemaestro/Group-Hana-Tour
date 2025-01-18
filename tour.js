const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,
    autoplay: true,
});


document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.middleNavbar_park');
    const buttons = document.querySelectorAll('.navbarButton_park');
    const sections = document.querySelectorAll('section');
    const section4 = document.querySelector('#section4_park');

    if (!navbar || !section4) {
        console.error('navbar 또는 section4를 찾을 수 없습니다.');
        return;
    }

    const section4OffsetTop = section4.offsetTop;
    let lastClickedButton = null;
    let isScrolling = false;

    const updateActiveButton = () => {
        if (isScrolling) return; // 스크롤 중이면 실행 안 함

        let currentSection = sections[0]; // 기본적으로 첫 번째 섹션을 선택

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 4) {
                currentSection = section;
            }
        });

        buttons.forEach(button => {
            const targetId = button.parentElement.getAttribute('href');
            if (targetId === `#${currentSection.id}`) {
                button.classList.add('active');
                lastClickedButton = button; // 스크롤 시에도 active 유지
            } else {
                button.classList.remove('active');
            }
        });

        // 🚀 네비게이션 바 숨기기 기능 개선 (PC & 모바일 모두 지원)
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
            // 페이지의 가장 아래쪽 도달하면 네비게이션 바 숨김
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
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
                isScrolling = true; // 스크롤 중 상태 설정

                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: 'smooth'
                });

                setTimeout(() => {
                    isScrolling = false; // 스크롤이 끝난 후 다시 업데이트 허용
                    updateActiveButton();
                }, 600);
            }
        });
    });

    window.addEventListener('scroll', updateActiveButton);
});