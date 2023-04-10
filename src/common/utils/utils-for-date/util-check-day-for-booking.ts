import {utilCreateDate} from './util-create-date';

export const utilCheckDayForBooking = (date: Date) => {

    const today = new Date()

    if (utilCreateDate({date: today}).dayNumberInWeek === 1) {

        return date.getDate() === today.getDate() + 1 && (date.getMonth() === today.getMonth() || date.getMonth() === today.getMonth() + 1) && utilCreateDate({date}).dayNumberInWeek !== 1
    }
    if (utilCreateDate({date: today}).dayNumberInWeek === 7) {

        return date.getDate() === today.getDate() + 2 && (date.getMonth() === today.getMonth() || date.getMonth() === today.getMonth() + 1) && utilCreateDate({date}).dayNumberInWeek !== 7
    }
    if (utilCreateDate({date: today}).dayNumberInWeek === 6) {

        if (utilCreateDate({date}).dayNumberInWeek === 6 && date.getDate() === today.getDate() && date.getMonth() === today.getMonth()) {
            return true
        }

        return utilCreateDate({date}).dayNumberInWeek === 2 && date.getDate() === today.getDate() + 3 && (date.getMonth() === today.getMonth() || date.getMonth() === today.getMonth() + 1);


    }

    return (date.getDate() === today.getDate() + 1 || date.getDate() === today.getDate()) && (date.getMonth() === today.getMonth() || date.getMonth() === today.getMonth() + 1) && today.getMonth() === date.getMonth();

}

