import DateTime from 'luxon/src/datetime';

export default function setup() {
    /**
     * This handles the workshop previews
     */
    const events = Array.from(document.querySelectorAll(`[data-instances]`));
    if (events && events.length > 0) {
        const datedEvents = events
            .filter(event => event.dataset.instances && event.dataset.instances.length > 0)
            .map(event => {
                // Build a list of all instances on this event and sort by date.
                event.instances = JSON.parse(event.dataset.instances)
                    .map(instance => {
                        // Forestry saves times w/ a "Z" which forces Luxon to parse them as UTC, which
                        // will sometimes result in the wrong date.
                        instance.date = DateTime.fromISO(instance.date.replace('Z', ''), { zone: 'America/Los_Angeles' });
                        return instance;
                    })
                    .sort((a, b) => a.date > b.date);

                // Find the next instance.
                event.next = event.instances.find(instance => instance.date.diffNow() > 0)

                // We want to add this to items with dates but not "next" dates, so make it a default.
                const contactSubject = event.dataset.contactSubject || 'Event Inquiry';
                const header = event.querySelector(`header`)
                header.appendChild(document.createRange()
                    .createContextualFragment(`<span data-contact-for-more-info class="uppercase mt-3 tracking-wider text-xs inline-block py-1 border-b-4 border-clay text-teal font-bold"><a href="/contact/?subject=${contactSubject}: ${header.querySelector('h3').innerText}">Contact Us for more info</a></span>`));

                return event;
            })
            .filter(event => event.next);

            // Sort dated events by their next date, then add date info.
            datedEvents.sort((a, b) => {
                if (a.next.date > b.next.date) {
                    return -1;
                } else if (a.next.date < b.next.date) {
                    return 1;
                }
                return 0;
            })
            .map(event => {
                const nextText = event.dataset.nextText || 'Next Event';
                const header = event.querySelector(`header`);
                // Remove default.
                header.querySelector('[data-contact-for-more-info]').remove();
                // Add date info.
                header.appendChild(document.createRange()
                    .createContextualFragment(`<datetime class="uppercase mt-3 tracking-wider text-xs inline-block py-1 border-b-4 border-clay ">${nextText}: <span class="block md:inline">${event.next.date.toLocaleString(DateTime.DATE_FULL)}</span></datetime>`));

                return event;
            })
            .forEach((event, index) => event.style.order = index + 1);

        const first = datedEvents.find(e => true);
        if (first) {
            // Add first-item styles
            first.classList.remove('border-clay')
            first.classList.add('md:col-span-2', 'border-orange')

            // Modify image to be wider
            const firstImage = first.querySelector('img');
            if (firstImage) {
                firstImage.src = firstImage.src.replace('w_400', 'w_800')
            }
        }

        // Handle non-dated events.
        events
            .filter(event => !datedEvents.includes(event))
            .forEach((event, index) => event.style.order = index + 1 + datedEvents.length);

    }

    /**
     * This handles the instances on single events.
     */
    // const singleInstances = document.querySelector(`.workshop-instances`);
    // if (singleInstances) {
    //     const instanceTimes = singleInstances.querySelectorAll(`time`);
    //     let counter = 1;
    //     const next = Array.from(instanceTimes)
    //         .sort((a, b) => a.dateTime > b.dateTime)
    //         .map(time => {
    //             time.order = counter;
    //             counter++;
    //             return time;
    //         })
    //         .map(time => {
    //             const listWrapper = time.parentElement;
    //             time.inPast = DateTime.fromISO(time.dateTime).diffNow() < 0;
    //             listWrapper.style.order = time.inPast ? time.order + instanceTimes.length : time.order;
    //             listWrapper.classList.add(time.inPast ? `past` : `upcomming`);
    //             return time;
    //         })
    //         .filter(time => !time.inPast)
    //         .reduce((acc, cur) => {
    //             if (null === acc) {
    //                 return cur; // first item
    //             }
    //             return cur.order < acc.order ? cur : acc;
    //         }, null);
    //     if (next) {
    //         next.parentElement.classList.add(`next`);
    //     }
    // }
}
