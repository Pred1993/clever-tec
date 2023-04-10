import {utilCreateDate} from './util-create-date';


export const utilGetMonthsNames = (locale = 'default') => {
    const monthsNames: Array<{
        month: ReturnType<typeof utilCreateDate>['month'];
        monthShort: ReturnType<typeof utilCreateDate>['monthShort'];
        monthIndex: ReturnType<typeof utilCreateDate>['monthIndex'];
        date: ReturnType<typeof utilCreateDate>['date'];
    }> = Array.from({ length: 12 });

    const d = new Date();

    monthsNames.forEach((el, i) => {
        const { month, monthIndex, monthShort, date } = utilCreateDate({
            locale,
            date: new Date(d.getFullYear(), d.getMonth() + i, 1)
        });

        monthsNames[monthIndex] = { month, monthIndex, monthShort, date };
    });

    return monthsNames;
};
