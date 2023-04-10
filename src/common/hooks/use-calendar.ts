import {useMemo, useState} from 'react';

import {
    utilCreateDate,
    utilCreateMonth,
    utilGetMonthNumberOfDay,
    utilGetMonthsNames,
    utilGetWeekDaysNames
} from '../utils/utils-for-date';


type UseCalendarType = {
    locale?: string,
    selectedDateInitial: Date
    firstWeekDay: number
}

const getYearsInterval = (year: number) => {
    const startYear = Math.floor(year / 10) * 10;

    return [...Array(10)].map((_, index) => startYear + index);
};

export const useCalendar = ({
                                locale = 'default',
                                selectedDateInitial: date,
                                firstWeekDay
                            }: UseCalendarType) => {

    const [mode, setMode] = useState<'days' | 'months' | 'years'>('days');
    const [selectedDate, setSelectedDate] = useState(utilCreateDate({date}));

    const [selectedMonth, setSelectedMonth] = useState(utilCreateMonth({
        date: new Date(selectedDate.year, selectedDate.monthIndex),
        locale
    }));
    const [selectedYear, setSelectedYear] = useState(selectedDate.year);

    const [selectedYearInterval, setSelectedYearInterval] = useState(getYearsInterval(selectedDate.year));
    const monthsNames = useMemo(() => utilGetMonthsNames(locale), [locale])

    const weekDaysNames = useMemo(() => utilGetWeekDaysNames(firstWeekDay, locale), [locale, firstWeekDay])

    const days = useMemo(() => selectedMonth.createMonthDays(), [selectedMonth])

    const calendarDays = useMemo(() => {
        const monthNumberOfDays = utilGetMonthNumberOfDay(selectedMonth.monthIndex, selectedYear)
        const prevMonthDay = utilCreateMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex - 1),
            locale
        }).createMonthDays()

        const nextMonthDay = utilCreateMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex + 1),
            locale
        }).createMonthDays()

        const firstDay = days[0]

        const lastDay = days[monthNumberOfDays - 1]

        const shiftIndex = firstWeekDay - 1

        const numberOfPrevDays = firstDay.dayNumberInWeek - 1 - shiftIndex < 0
            ? 7 - (firstWeekDay - firstDay.dayNumberInWeek)
            : firstDay.dayNumberInWeek - 1 - shiftIndex

        const numberOfNextDays =
            7 - lastDay.dayNumberInWeek + shiftIndex > 6
                ? 7 - lastDay.dayNumberInWeek - (7 - shiftIndex)
                : 7 - lastDay.dayNumberInWeek + shiftIndex;

        const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;

        const result = [];

        for (let i = 0; i < numberOfPrevDays; i += 1) {
            const inverted = numberOfPrevDays - i;

            result[i] = prevMonthDay[prevMonthDay.length - inverted];
        }

        for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i += 1) {
            result[i] = days[i - numberOfPrevDays];
        }

        for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i += 1) {
            result[i] = nextMonthDay[i - totalCalendarDays + numberOfNextDays];
        }

        return result;

            }, [selectedYear, selectedMonth.monthIndex, locale, days, firstWeekDay])

    // eslint-disable-next-line consistent-return
    const onClickArrow = (direction: 'down' | 'up') => {
        if (mode === 'years' && direction === 'up') {
            return setSelectedYearInterval(getYearsInterval(selectedYearInterval[0] - 10));
        }

        if (mode === 'years' && direction === 'down') {
            return setSelectedYearInterval(getYearsInterval(selectedYearInterval[0] + 10));
        }

        if (mode === 'months' && direction === 'up') {
            const year = selectedYear - 1;

            if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year));

            return setSelectedYear(selectedYear - 1);
        }

        if (mode === 'months' && direction === 'down') {
            const year = selectedYear + 1;

            if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year));

            return setSelectedYear(selectedYear + 1);
        }

        if (mode === 'days') {
            const monthIndex =
                direction === 'up' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;

            if (monthIndex === -1) {
                const year = selectedYear - 1;

                setSelectedYear(year);
                if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year));

                return setSelectedMonth(utilCreateMonth({ date: new Date(selectedYear - 1, 11), locale }));
            }

            if (monthIndex === 12) {
                const year = selectedYear + 1;

                setSelectedYear(year);
                if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year));

                return setSelectedMonth(utilCreateMonth({ date: new Date(year, 0), locale }));
            }

            setSelectedMonth(utilCreateMonth({ date: new Date(selectedYear, monthIndex), locale }));
        }
    };

    const setSelectedMonthByIndex = (monthIndex: number) => {
        setSelectedMonth(utilCreateMonth({ date: new Date(selectedYear, monthIndex), locale }));
    };

    return {
        state: {
            mode,
            calendarDays,
            weekDaysNames,
            monthsNames,
            selectedMonth,
            selectedYear,
            selectedYearInterval,
            selectedDate
        },
        functions: {
            onClickArrow,
            setMode,
            setSelectedDate,
            setSelectedMonthByIndex,
            setSelectedYear,
            setSelectedYearInterval,
            setSelectedMonth
        }
    }
}
