import 'alpinejs';
const mobileWidth = Number(require('../../tailwind.config').theme.extend.screens.nav.replace('px', ''));

window.nav = function() {
    function viewportLargerThanMobileWidth() {
        return window.innerWidth >= mobileWidth;
    }

    return {
        open: false,
        forceOpen: viewportLargerThanMobileWidth(),
        toggle() {
            this.open = !this.open;
        },
        resize() {
            this.forceOpen = viewportLargerThanMobileWidth();
        }
    }
}
