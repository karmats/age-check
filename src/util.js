function validateNumber(numString) {
    const num = parseInt(numString, 10);
    if (isNaN(num)) {
        throw new TypeError(`'${numString}' is not a number`)
    }
    return num;
}

/**
 * Sanity check for year input
 * 
 * @param   {string} yearString Year input as string
 * @returns {number} Year as number
 * @throws  {TypeError} If yearString cannot be cast to number
 * @throws  {RangeError} If year is not valid
 */
function validateYear(yearString) {
    const year = validateNumber(yearString);
    const thisYear = new Date().getUTCFullYear();
    let error = '';
    // Pretty unlikely that someone over 120 years wants to enter the site
    if (year < 1900) {
        error = `Are you really ${thisYear - year} years old?`
    } else if (year >= thisYear) {
        error = 'You are from the future?'
    }
    if (error.length) {
        throw new RangeError(error);
    }
    return year;
}

/**
 * Sanity check for month input
 * 
 * @param   {string} monthString Month input as string
 * @returns {number} Month as number
 * @throws  {TypeError} If monthString cannot be cast to number
 * @throws  {RangeError} If month is not valid
 */
function validateMonth(monthString) {
    const month = validateNumber(monthString);
    let error = '';
    if (month < 1 || month > 12) {
        error = 'Month must be between 1 - 12';
    }
    if (error.length) {
        throw new RangeError(error);
    }
    // Month - 1 because javsascript months starts with 0
    return month - 1;
}

/**
 * Sanity check for day input
 * 
 * @param   {string} dayString Day input as string
 * @returns {number} Day as number
 * @throws  {TypeError} If dayString cannot be cast to number
 * @throws  {RangeError} If day is not valid
 */
function validateDay(dayString) {
    const day = validateNumber(dayString);
    let error = '';
    if (day < 1 || day > 31) {
        error = 'Day must be between 1 - 31';
    }
    if (error.length) {
        throw new RangeError(error);
    }
    return day;
}

/**
 * @param {Date} dob Date of birth
 * @return {number} The age based on date of birth
 */
function age(dob) {
    const now = new Date();
    let age = now.getUTCFullYear() - dob.getUTCFullYear()
    // If birthday hasn't been in this year yet, substract one year
    if ((dob.getUTCMonth() > now.getUTCMonth()) ||
        (dob.getUTCMonth() === now.getUTCMonth() && dob.getUTCDate() > now.getUTCDate())) {
        age--;
    }
    return age;
}

export {
    validateYear,
    validateMonth,
    validateDay,
    age
}
