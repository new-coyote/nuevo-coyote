import DateTime from 'luxon/src/datetime';

function setup() {
    /**
     * This handles the workshop previews
     */
    const workshops = document.querySelectorAll(`[data-workshop-instances]`);
    if (workshops && workshops.length > 0) {
        const allWorkshops = Array.from(workshops);
        const datedWorkshops = allWorkshops
            .filter(workshop => workshop.dataset.workshopInstances && workshop.dataset.workshopInstances.length > 0)
            .map(workshop => {
                // Build a list of all instances on this workshop and sort by date.
                workshop.instances = JSON.parse(workshop.dataset.workshopInstances)
                    .map(instance => {
                        // Forestry saves times w/ a "Z" which forces Luxon to parse them as UTC, which
                        // will sometimes result in the wrong date.
                        instance.date = DateTime.fromISO(instance.date.replace('Z', ''), { zone: 'America/Los_Angeles' });
                        return instance;
                    })
                    .sort((a, b) => a.date > b.date);

                // Find the next instance.
                workshop.next = workshop.instances.find(instance => instance.date.diffNow() > 0)

                // We want to add this to items with dates but not "next" dates, so make it a default.
                const header = workshop.querySelector(`header`)
                header.appendChild(document.createRange()
                    .createContextualFragment(`<span data-contact-for-more-info class="uppercase mt-3 tracking-wider text-xs inline-block py-1 border-b-4 border-clay text-teal font-bold"><a href="/contact/?subject=Workshop Inquiry: ${header.querySelector('h3').innerText}">Contact Us for more info</a></span>`));

                return workshop;
            })
            .filter(workshop => workshop.next);

            // Sort dated workshops by their next date, then add date info.
            datedWorkshops.sort((a, b) => {
                if (a.next.date > b.next.date) {
                    return -1;
                } else if (a.next.date < b.next.date) {
                    return 1;
                }
                return 0;
            })
            .map(workshop => {
                const header = workshop.querySelector(`header`);
                // Remove default.
                header.querySelector('[data-contact-for-more-info]').remove();
                // Add date info.
                header.appendChild(document.createRange()
                    .createContextualFragment(`<datetime class="uppercase mt-3 tracking-wider text-xs inline-block py-1 border-b-4 border-clay ">Next Workshop: <span class="block md:inline">${workshop.next.date.toLocaleString(DateTime.DATE_FULL)}</span></datetime>`));

                return workshop;
            })
            .forEach((workshop, index) => workshop.style.order = index + 1);

        const first = datedWorkshops.find(e => true);
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

        // Handle non-dated workshops.
        allWorkshops
            .filter(workshop => !datedWorkshops.includes(workshop))
            .forEach((workshop, index) => workshop.style.order = index + 1 + datedWorkshops.length);

    }

    /**
     * This handles the instances on single workshops.
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

export default setup;
