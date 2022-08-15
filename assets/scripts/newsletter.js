import Cookies from "js-cookie";

function setup() {
	const popup = document.querySelector('[data-newsletter-popup]');
	const hasOpened = Cookies.get('newsletter_popup_closed');
	if (!popup || hasOpened) {
		return;
	}
	const submitButton = popup.querySelector('button[type=submit]');
	const closeButton = popup.querySelector('button[data-newsletter-popup-close]');
	addEventListener('DOMContentLoaded', () => {
		popup.show();
	} );

	const closePopup = () => {
		Cookies.set('newsletter_popup_closed', 1, { expires: 7 });
		popup.close();
	}
	submitButton.addEventListener('click', closePopup)
	closeButton.addEventListener('click', closePopup)
}

export default setup;
