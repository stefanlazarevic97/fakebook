const formatDate = (dateStr) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const date = new Date(dateStr);

    const day = date.getDate();
    let suffix = suffixes[0];

    if (day <= 3 || (day >= 21 && day <= 23)) {
        suffix = suffixes[day] || suffixes[0];
    }

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthName = monthNames[date.getMonth()];

    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;

    return `${monthName} ${day}${suffix}, ${year} at ${hours}:${minutes} ${amOrPm}`;
}

export default formatDate;