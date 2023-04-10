import facebookIcon from '../../../assets/image/facebookIcon.svg';
import inIcon from '../../../assets/image/inIcon.svg';
import instagramIcon from '../../../assets/image/instaIcon.svg';
import vkIcon from '../../../assets/image/vkIcon.svg';

import styleContainer from '../../styles/container.module.scss';
import styles from './footer-component.module.scss';

export const FooterComponent = () => (
    <div className={styles.footerContainer}>
        <footer className={`${styleContainer.container} ${styles.footer}`}>
            <div className={styles.text}>
                <p>© 2020-2023 Cleverland. <br className={styles.br}/> Все права защищены.</p>
            </div>
            <div className={styles.icons}>
                <img src={facebookIcon} alt="facebook-icon"/>
                <img src={instagramIcon} alt="instagram-icon"/>
                <img src={vkIcon} alt="vk-icon"/>
                <img src={inIcon} alt="in-icon"/>
            </div>
        </footer>
    </div>
);


