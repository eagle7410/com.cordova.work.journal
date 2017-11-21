
const DateToString = (date) => {
    if (!date || typeof date !== 'object')
        return date;

    let d = date;
    let m = d.getMonth() + 1;
    let day = d.getDate();


    if (m < 10) {
        m = '0' + m;
    }

    if (day < 10) {
        day = '0' + day;
    }

    return d.getFullYear()+'-'+m +'-' +day;
};

export {
    DateToString
};
