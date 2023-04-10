import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {AppDispatchType, useAppSelector} from '../../../app/store';
import {userIdSelector} from '../../../app/use-app-selectors';
import iconArrowDown from '../../../assets/image/icon-arrow-down.svg'
import iconArrowUp from '../../../assets/image/icon-arrow-up.svg'
import {addBookingTC, deleteBookingTC, editBookingTC} from '../../../pages/book/book-reducer';
import {useCalendar} from '../../hooks/use-calendar';
import {utilCheckDateIsEqual, utilCheckDayForBooking,utilCheckIsDay, utilCreateMonth} from '../../utils/utils-for-date';
import {ButtonComponent} from '../button';
import {SelectComponent} from '../select';

import styles from './calendar-component.module.scss'

type CalendarComponentType = {
    bookId: string
    callBack: (e: React.MouseEvent) => void
    userBooked: boolean
    bookingId: number | undefined
    dateOrder: string | null
    clickDate: boolean
    setClickDate: (clickDate: boolean) => void
}

export const CalendarComponent: FC<CalendarComponentType> = ({
                                                                 bookId,
                                                                 callBack,
                                                                 userBooked,
                                                                 bookingId,
                                                                 dateOrder,
                                                                 clickDate,
                                                                 setClickDate
                                                             }) => {

    const firstWeekDay = 2
    const locale = 'default'
    const selectedDateInitial = new Date();
    const initialValue = new Date().toLocaleDateString(locale, {month: 'long'})

    const dispatch = useDispatch<AppDispatchType>();
    const userId = useAppSelector(userIdSelector);

    const [disabled, setDisabled] = useState(true);
    const [isSelectedDay, setIsSelectedDay] = useState(dateOrder ? new Date(dateOrder) : new Date());

    // conversion into "2022-11-23T00:00:00.000Z" format
    const requestFormat = new Date(isSelectedDay);

    requestFormat.setHours(requestFormat.getHours() + 3);
    const isoDate = requestFormat.toISOString();
    //

    const {state, functions} = useCalendar({locale, selectedDateInitial, firstWeekDay})

    const options = state.monthsNames.map((el => `${(el.month)[0].toUpperCase() + (el.month).slice(1)} ${state.selectedYear}`))

    const [value, onChangeOption] = useState<string>(`${initialValue[0].toUpperCase() + initialValue.slice(1)} ${state.selectedYear}`);

    const disabledButtonBooked = [styles.buttonCommon,
        disabled ? styles.buttonDisabled : styles.buttonBooking,
    ].join(' ')

    const onChangeOptionHandler = (param: string) => {
        onChangeOption(param)
        const findMonth = state.monthsNames.find((el) => el.month === param.split(' ')[0].toLowerCase())

        if (findMonth) {
            functions.setSelectedMonth(utilCreateMonth({date: new Date(state.selectedYear, findMonth.monthIndex)}))
        }
    }
const data = {order: true,
    dateOrder: isoDate,
    book: bookId,
    customer: userId.toString()}

    const onClickHandlerBooking = (e: React.MouseEvent) => {
        callBack(e)
        if (!dateOrder) {
            dispatch(addBookingTC({
                data
            }))
        }
        if (dateOrder && bookingId) {
            dispatch(editBookingTC({
                data
            }, bookingId.toString()))
        }
    }

    const onClickHandlerDelete = (e: React.MouseEvent) => {
        callBack(e)
        if (bookingId) {
            dispatch(deleteBookingTC({
                data: {
                    order: true,
                    dateOrder: isoDate,
                    book: bookId,
                    customer: userId.toString()
                }
            }, bookingId.toString()))
        }
    }


    useEffect(() => {
        onChangeOption(`${(state.selectedMonth.monthName)[0].toUpperCase() + (state.selectedMonth.monthName).slice(1)} ${state.selectedYear}`)

    }, [state.selectedMonth, state.selectedYear]);

    return (

        <div className={styles.commonContainer}>
            <div className={styles.calendarComponent} data-test-id='calendar'>
                <div className={styles.header}>

                    <SelectComponent options={options} value={value}
                                     onChangeOption={onChangeOptionHandler}/>

                    <div className={styles.arrowContainer}>
                        <ButtonComponent data-test-id='button-prev-month' className={styles.arrow}
                                         onClick={() => functions.onClickArrow('up')}>
                            <img src={iconArrowUp} alt="arrow-up"/>
                        </ButtonComponent>
                        <ButtonComponent data-test-id='button-next-month' className={styles.arrow}
                                         onClick={() => functions.onClickArrow('down')}>
                            <img src={iconArrowDown} alt="arrow-down"/>
                        </ButtonComponent>
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.weekNames}>
                        {state.weekDaysNames.map((el) => <div key={el.dayShort}>
                            {(el.dayShort)[0].toUpperCase() + (el.dayShort).slice(1)}
                        </div>)}
                    </div>
                    <div className={styles.days}>
                        {state.calendarDays.map((el) => {

                            const weekend = (el.dayNumberInWeek === 7 || el.dayNumberInWeek === 1) && state.selectedMonth.monthIndex === el.monthIndex
                            const isToday = utilCheckIsDay(el.date)
                            const isBooking = utilCheckDayForBooking(el.date)
                            const disabledDays = !isBooking
                            const isSelect = utilCheckDateIsEqual(isSelectedDay, el.date)


                            const onclickHandler = () => {

                                setClickDate(true)
                                if (!dateOrder) {
                                    setDisabled(false)
                                }
                                if (dateOrder) {
                                    if (isSelect) {
                                        setDisabled(true)
                                    } else setDisabled(false)
                                }
                                setIsSelectedDay(el.date)
                            }
                            const initialClass = [styles.day,
                                isToday ? styles.today : '',
                                weekend ? (isToday ? styles.dayWeekendIsActive : styles.dayWeekend) : '',
                                isBooking && styles.isBooking
                            ].join(' ')

                            const touchClass = [styles.day,
                                weekend ? (isToday ? styles.dayWeekendIsActive : styles.dayWeekend) : '',
                                isBooking ? (isToday ? (isSelect ? styles.selectedDay : styles.today) : (isSelect ? styles.selectedDay : styles.isBooking)) : '',
                            ].join(' ')

                            return <button data-test-id='day-button' disabled={disabledDays}
                                           type='button'
                                           onClick={onclickHandler}
                                           className={clickDate ? touchClass : initialClass}
                                           key={`${el.dayNumber}-${el.monthIndex}`}
                            >{el.dayNumber}</button>
                        })}
                    </div>
                </div>
            </div>
            <ButtonComponent data-test-id='booking-button'
                             disabled={disabled}
                             className={disabledButtonBooked}
                             onClick={onClickHandlerBooking}>
                Забронировать
            </ButtonComponent>
            {userBooked &&
                <ButtonComponent data-test-id='booking-cancel-button'
                                 className={`${styles.buttonCommon} ${styles.buttonEdit}`}
                                 onClick={onClickHandlerDelete}>
                    Отменить бронь
                </ButtonComponent>}
        </div>
    );
}

