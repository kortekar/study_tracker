const studyPlan = {
    months: [
        { name: "July 2024", days: 31, startDay: 1, daysStatus: Array(31).fill('not-studied') },
        { name: "August 2024", days: 31, startDay: 4, daysStatus: Array(31).fill('not-studied') },
        { name: "September 2024", days: 30, startDay: 0, daysStatus: Array(30).fill('not-studied') },
        { name: "October 2024", days: 31, startDay: 2, daysStatus: Array(31).fill('not-studied') },
        { name: "November 2024", days: 30, startDay: 5, daysStatus: Array(30).fill('not-studied') },
        { name: "December 2024", days: 31, startDay: 1, daysStatus: Array(31).fill('not-studied') }
    ]
};

let currentMonthIndex = 0;

function saveStudyPlan() {
    localStorage.setItem('studyPlan', JSON.stringify(studyPlan));
}

function loadStudyPlan() {
    const savedPlan = localStorage.getItem('studyPlan');
    if (savedPlan) {
        return JSON.parse(savedPlan);
    }
    return studyPlan;
}

function renderCalendar(monthIndex) {
    const container = document.getElementById('calendar-container');
    const month = studyPlan.months[monthIndex];
    let calendarHTML = `<h2>${month.name}</h2>
        <div class="calendar">
            <div class="header">Sun</div>
            <div class="header">Mon</div>
            <div class="header">Tue</div>
            <div class="header">Wed</div>
            <div class="header">Thu</div>
            <div class="header">Fri</div>
            <div class="header">Sat</div>`;

    for (let i = 0; i < month.startDay; i++) {
        calendarHTML += `<div></div>`;
    }

    for (let day = 1; day <= month.days; day++) {
        const dayStatus = month.daysStatus[day - 1];
        calendarHTML += `<div class="day ${dayStatus}" data-day="${day}">${day}</div>`;
    }

    calendarHTML += `</div>`;
    container.innerHTML = calendarHTML;
    updatePaginationButtons();
}

function updatePaginationButtons() {
    document.getElementById('prevBtn').disabled = currentMonthIndex === 0;
    document.getElementById('nextBtn').disabled = currentMonthIndex === studyPlan.months.length - 1;
}

function changeMonth(direction) {
    currentMonthIndex += direction;
    renderCalendar(currentMonthIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    Object.assign(studyPlan, loadStudyPlan());
    renderCalendar(currentMonthIndex);

    document.getElementById('calendar-container').addEventListener('click', (event) => {
        if (event.target.classList.contains('day')) {
            const day = event.target;
            const dayIndex = day.dataset.day - 1;
            const month = studyPlan.months[currentMonthIndex];

            if (day.classList.contains('not-studied')) {
                day.classList.remove('not-studied');
                day.classList.add('completed');
                month.daysStatus[dayIndex] = 'completed';
            } else if (day.classList.contains('completed')) {
                day.classList.remove('completed');
                day.classList.add('not-studied');
                month.daysStatus[dayIndex] = 'not-studied';
            }

            saveStudyPlan();
        }
    });
});



