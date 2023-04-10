import {utilCreateDate} from './util-create-date';
import {utilGetMonthNumberOfDay} from './util-get-month-number-of-day';

type UtilCreateMonthType = {
    date?: Date,
    locale?: string
}

export const utilCreateMonth = (params?: UtilCreateMonthType) => {
    const date = params?.date ?? new Date();
    const locale = params?.locale ?? 'default';

    const d = utilCreateDate({ date, locale });
    const { month: monthName, year, monthNumber, monthIndex } = d;

    const getDay = (dayNumber: number) =>
        utilCreateDate({ date: new Date(year, monthIndex, dayNumber), locale });

    const createMonthDays = () => {
        const days = [];

        for (let i = 0; i <= (utilGetMonthNumberOfDay(monthIndex, year) - 1); i += 1) {
            days[i] = getDay(i + 1);
        }

        return days;
    };

    return {
        getDay,
        monthName,
        monthIndex,
        monthNumber,
        year,
        createMonthDays
    };
}
