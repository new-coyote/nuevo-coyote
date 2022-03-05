import 'alpinejs';
import workshopInstanceSetup from './workshopInstances';
import contactSetup from './contact'

workshopInstanceSetup();
contactSetup()

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
