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
