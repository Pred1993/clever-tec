import {utilCheckDateIsEqual} from './util-check-date-is-equal';

export const utilCheckIsDay = (date: Date) => {
    const today = new Date()

    return utilCheckDateIsEqual(today, date);
}


