class FadeAnimation {
  constructor({ display = 'block', duration = 600 }) {
    this._display = display;
    this._duration = duration;
  }

  show(element = null) {
    if (!element || !(element instanceof HTMLElement)) return;

    element.style.display = this._display;

    setTimeout(() => {
      element.style.opacity = 1;
      element.style.visibility = 'visible';
    }, 0);
  }

  hide(element = null) {
    if (!element || !(element instanceof HTMLElement)) return;

    element.style.opacity = 0;
    element.style.visibility = 'hidden';

    setTimeout(() => {
      element.style.display = 'none';
    }, this._duration);
  }

  static getAnimationClass() {
    return 'fade-animation';
  }
}


export { FadeAnimation };
