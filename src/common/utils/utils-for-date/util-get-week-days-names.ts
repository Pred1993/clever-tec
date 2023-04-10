import {utilCreateDate} from './util-create-date';

export const utilGetWeekDaysNames = (firstWeekDay: number, locale = 'default') => {
    const weekDaysNames: Array<{
        day: ReturnType<typeof utilCreateDate>['day'];
        dayShort: ReturnType<typeof utilCreateDate>['dayShort'];
    }> = Array.from({ length: 7 });

    const date = new Date();

    weekDaysNames.forEach((el, i) => {
        const { day, dayNumberInWeek, dayShort } = utilCreateDate({
            locale,
            date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + i)
        });

        weekDaysNames[dayNumberInWeek - 1] = { day, dayShort };
    });

    return [...weekDaysNames.slice(firstWeekDay - 1), ...weekDaysNames.slice(0, firstWeekDay - 1)]
}
