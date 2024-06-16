function setup() {

	const form = document.querySelector('form[name="contact"]');
	if (form) {
		const params = new URLSearchParams(document.location.search);
		const subject = params.get('subject');
		if (subject) {
			const subjectField = form.querySelector('input[type="hidden"][name="subject"]');
			if (subjectField) {
				subjectField.value = subject;
			}
		}
	}
}

export default setup;
