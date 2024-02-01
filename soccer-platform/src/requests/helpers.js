export function convertDateToYYYYMMDD(dateString) {
    try {
        // Parse the input date string
        const date = new Date(dateString);

        // Extract the year, month, and day
        const year = date.getFullYear();
        let month = date.getMonth() + 1; // getMonth() returns a zero-based index
        let day = date.getDate();

        // Pad the month and day with leading zeros if necessary
        month = month.toString().padStart(2, '0');
        day = day.toString().padStart(2, '0');

        // Format and return the date in yyyy-MM-dd format
        return `${year}-${month}-${day}`;
    } catch (error) {
        console.error("Error converting date:", error);
        return null; // or handle error as appropriate
    }
}

export function getDayOfWeek(dateStr) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Crearea unui nou obiect Date din șirul de dată primit
    const date = new Date(dateStr);

    // Obținerea indexului zilei săptămânii (0 = Sunday, 1 = Monday, etc.)
    const dayIndex = date.getDay();

    // Returnarea numelui zilei săptămânii
    return days[dayIndex];
}

export function areDatesInSameMonthAndYear(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth();
}

export function formatDate(date) {
    console.log('......', date);
    const dateTarget = date? date: new Date();
    const day = String(dateTarget.getDate()).padStart(2, '0');
    const month = String(dateTarget.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = dateTarget.getFullYear();
    return `${day}.${month}.${year}`;
}

export function stringToDate(dateStr) {
    const parts = dateStr.split('.');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    return `${year}-${month}-${day}`;
}

export function setToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
};

