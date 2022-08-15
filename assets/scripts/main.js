import 'alpinejs';
import workshopInstanceSetup from './workshopInstances';
import contactSetup from './contact'
import newsletterSetup from './newsletter'

workshopInstanceSetup();
contactSetup();
newsletterSetup();

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
