const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

let isMenuOpen = false;
menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('max-h-0', 'pb-0');
        mobileMenu.classList.add('max-h-60', 'pb-4');
    } else {
        mobileMenu.classList.remove('max-h-60', 'pb-4');
        mobileMenu.classList.add('max-h-0', 'pb-0');
    }
});