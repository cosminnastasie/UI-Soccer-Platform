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

// // Example usage:
// const inputDate = "Thu Jan 04 2024 00:00:00 GMT+0200 (Ora standard a Europei de Est)";
// const formattedDate = convertDateToYYYYMMDD(inputDate);
// console.log(formattedDate); // Output: 2024-01-04
