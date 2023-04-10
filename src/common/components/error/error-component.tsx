import { useDispatch } from 'react-redux';

import { setAppErrorAC } from '../../../app/app-reducer';
import { AppDispatchType } from '../../../app/store';
import errorImg from '../../../assets/image/error.svg';
import errorCross from '../../../assets/image/errorCross.svg';

import styles from './error-component.module.scss';

export const ErrorComponent = () => {
  const dispatch = useDispatch<AppDispatchType>();

  const onClickHandler = () => {
    dispatch(setAppErrorAC(null));
  };

  return (
    <div data-test-id='error' className={styles.errorCommon}>
      <div className={styles.error}>
        <img className={styles.errorImg} src={errorImg} alt='error-img' />
        <span>Что-то пошло не так. Обновите страницу через некоторое время.</span>
        <button type='button' onClick={onClickHandler}>
          <img src={errorCross} alt='error-cross' />
        </button>
      </div>
    </div>
  );
};
