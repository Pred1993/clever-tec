import {useAppSelector} from '../../../app/store';
import {profileUserInformSelector} from '../../../app/use-app-selectors';
import {CommonEmptyContainer} from '../common-empty-container';
import {SwiperForHistory} from '../swiper-for-history';

export const HistoryBooks = () => {

    const {history} = useAppSelector(profileUserInformSelector);

    if (!history) {
        return <div>{true}</div>
    }

    return history.books ?
        <SwiperForHistory historyBooks={history.books}/>
        : <CommonEmptyContainer text1='Вы не читали книг' text2='из нашей библиотеки '/>
};
