export const dateTransform = (date: string) => {
    const dateObj = new Date(date);
    
    if (isNaN(dateObj.getTime())) {
        return "Invalid Date";
    }

    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const hour = String(dateObj.getUTCHours()).padStart(2, '0');
    const minute = String(dateObj.getUTCMinutes()).padStart(2, '0');
    const second = String(dateObj.getUTCSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}