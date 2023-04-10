import {FC} from 'react';
import {useDispatch} from 'react-redux';

import {setResponseModalAC} from '../../../app/app-reducer';
import {AppDispatchType, useAppSelector} from '../../../app/store';
import {appSelector} from '../../../app/use-app-selectors';
import errorImg from '../../../assets/image/error.svg';
import errorCross from '../../../assets/image/errorCross.svg';
import iconSuccessModal from '../../../assets/image/iconSuccessModal.svg'

import commonStyle from '../error/error-component.module.scss'
import styles from './response-modal.module.scss';

type ResponseModalType = {
    title: string | null
}

export const ResponseModal: FC<ResponseModalType> = ({title}) => {

    const dispatch = useDispatch<AppDispatchType>();
    const {responseModal} = useAppSelector(appSelector);

    const onClickHandler = () => {
        dispatch(setResponseModalAC(null));
    };

    return (
        <div data-test-id='error' className={responseModal === 'success' ? `${styles.errorCommon} ${commonStyle.errorCommon}` : commonStyle.errorCommon}>
            <div className={commonStyle.error}>
                <img className={ commonStyle.errorImg } src={ responseModal === 'success' ? iconSuccessModal : errorImg } alt='icon-modal'/>
                <span>{title}</span>
                <button data-test-id='alert-close' type='button' onClick={onClickHandler}>
                    <img src={errorCross} alt='error-cross' />
                </button>
            </div>
        </div>
    )
};
