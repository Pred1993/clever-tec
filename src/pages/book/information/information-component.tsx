import { useAppSelector } from '../../../app/store';
import {bookSelector} from '../../../app/use-app-selectors';
import { authorsOrCategoriesBook } from '../../../common/utils/utils-autors-or-categories';

import styles from './information-component.module.scss';

export const InformationComponent = () => {

  const book = useAppSelector(bookSelector);

  return (
    <div className={styles.informationContainer}>
      <h5>Подробная информация</h5>
      <div className={styles.border}>{true}</div>
      <div className={styles.information}>
        <div className={styles.wrapperContainer1}>
          <div className={styles.line}>
            <div>Издательство</div>
            <div>{book.publish}</div>
          </div>
          <div className={styles.line}>
            <div>Год издания</div>
            <div>{book.issueYear}</div>
          </div>
          <div className={styles.line}>
            <div>Страниц</div>
            <div>{book.pages}</div>
          </div>
          <div className={styles.line}>
            <div>Переплёт</div>
            <div>{book.cover}</div>
          </div>
          <div className={styles.line}>
            <div>Формат</div>
            <div>{book.format}</div>
          </div>
        </div>
        <div className={styles.wrapperContainer2}>
          <div className={styles.line}>
            <div>Жанр</div>
            <div>{authorsOrCategoriesBook(book.categories)}</div>
          </div>
          <div className={styles.line}>
            <div>Вес</div>
            <div>{book.weight}</div>
          </div>
          <div className={styles.line}>
            <div>ISBN</div>
            <div>{book.ISBN}</div>
          </div>
          <div className={styles.line}>
            <div>Изготовитель</div>
            <div>{book.producer}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
