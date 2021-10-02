import 'alpinejs';

window.nav = function () {
    function viewportLargerThanMobileWidth() {
        return window.innerWidth >= window.mobileWidth;
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
