export const transformSportName = (name: string) => {
    return name
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .trim() // Remove leading/trailing spaces
        .split(' ') // Split into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
        .join(' '); // Join words back together
}