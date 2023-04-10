import * as animationData from '../../assets/layout/loader.json';

export const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  style: { height: '69px', width: '69px' },
};
export const styleFunction = () => {
  let style: any = {};

  if (window.innerWidth > 768) {
    style = {
      ...style,
      background: 'transparent',
      display: 'inline-block',
      position: 'fixed',
      top: '330px',
      zIndex: '200',
      height: '150px',
      width: '150px',
    };
  } else if (window.innerWidth > 320) {
    style = {
      ...style,
      background: 'transparent',
      display: 'inline-block',
      position: 'fixed',
      top: '240px',
      zIndex: '200',
      height: '96px',
      width: '96px',
    };
  } else {
    style = {
      ...style,
      background: 'transparent',
      display: 'inline-block',
      position: 'fixed',
      top: '270px',
      zIndex: '200',
      height: '48px',
      width: '48px',
    };
  }

  return style;
};
