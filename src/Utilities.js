/* Reusable and testable utility functions */

// Function to format timestamps in dd-mm-yy
export function formatDate(timestamp) {
    const date = new Date(timestamp);
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }).format(date);
  
    return formattedDate;
  }