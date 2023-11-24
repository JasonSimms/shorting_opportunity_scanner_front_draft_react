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

// Cookie Functions
export function setCookie(name, payload, days = 1){
    let date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    let expires = "; expires=" + date.toUTCString();

    document.cookie = name + "=" + (payload || "") + expires + "; path=/";
}

export function getCookie(name){
    let nameEQ = name + "=";
    let cookies = document.cookie.split(';');
    for(let i=0;i < cookies.length;i++) {
        let c = cookies[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
       }
       return null;
}