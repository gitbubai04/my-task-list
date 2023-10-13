export function DateFormat(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

export function calculateAge(birthdate) {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();

    if (isNaN(birthDate.getTime())) {
        // Handle invalid birthdate
        return 'Invalid Date';
    }

    const age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}

export function formatName(name) {
    if (name) {
        const parts = name.split(' ');
        const initials = parts.map(part => part[0]).join('');
        return initials;
    } else {
        return '';
    }
}
