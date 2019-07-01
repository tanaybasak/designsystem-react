export const isValidDate = (str, format) => {
    if (str) {
        let tempDate, month, year;
        const regex = /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g;
        str = str.split('/');
        if (str.length === 3 && (str[0].length === 1 || str[1].length === 1)) {
            str[0].length === 1 ? str[0] = str[0].padStart(2, '0') : null;
            str[1].length === 1 ? str[1] = str[1].padStart(2, '0') : null;
        }
        switch (format) {
            case 'mm/dd/yyyy':
                tempDate = new Date(str[2], str[0] - 1, str[1]);
                year = str[2];
                month = str[0];
                break
            case 'dd/mm/yyyy':
                tempDate = new Date(str[2], str[1] - 1, str[0]);
                year = str[2];
                month = str[1];
                break;
        }
        if (tempDate && (tempDate.getMonth() + 1 === Number(month)) && regex.test(str.join('/')) && Number(year) > 999) {
            return true;
        }
        return false;
    }
    if (str === '') {
        return true;
    }
    return false;
};
