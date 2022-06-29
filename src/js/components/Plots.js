class Plots {
  constructor({ container = null, blockFocus = null } = {}) {
    this._container =
      typeof container === "string" ? document.querySelector(container) : null;

    this._blockFocus =
      Object.prototype.toString.call(blockFocus) === "[object Object]"
        ? blockFocus
        : null;

    this._plots = this._container?.querySelectorAll(".plots-location__plot");

    this._popups = this._container?.querySelectorAll(".plots-popup__item");
  }

  _listEvents = {
    desctop: {
      pointerenter: (e) => {
        if (this._checkRelatedTarget(e, "plot", "popup")) return;

        this.show(e.target, e);
      },
      pointerleave: (e) => {
        if (this._checkRelatedTarget(e, "plot", "popup")) {
          this._leaveWithPopup(e);

          return;
        }

        this.hide(e.target);
      },
      focus: (e) => {
        this._focusEvent = true;

        if (this._checkRelatedTarget(e, "plot", "popup")) return;

        this.hide(this.getOpenElement());

        this._focusElement = e.target.closest("[data-plot]");

        this.show(e.target, e);

        this._blockFocus.toggleBlock();

        setTimeout(() => {
          this._focusEvent = false;
        }, 100);
      },
    },
    mobile: {
      pointerdown: (e) => {
        this.hide(this.getOpenElement());

        this.show(e.target, e);
      },
    },
  };

  _listAvailableDevices = ["desctop", "mobile", "all", "test"];

  _currentDevice;

  _focusElement;

  _focusEvent;

  init() {
    if (!this._container) throw new Error("Container incorrect");

    if (!this._blockFocus) throw new Error("BlockFocus incorrect");

    this._currentDevice = this._checkDevice();

    this._setEvents(this.getEventsOnDevice(this._currentDevice));

    window.addEventListener("resize", () => {
      this.hide(this.getOpenElement());
    });

    window.addEventListener("scroll", (e) => {
      if (this._focusEvent) return;

      this.hide(this.getOpenElement());
    });

    this._popups.forEach((popup) => {
      let plot = this.getPlot(popup.dataset.popup),
        popupClose = popup.querySelector(".plots-popup__close");

      popupClose.addEventListener("pointerdown", () => {
        this.hide(plot);
      });

      popupClose.addEventListener("keydown", (e) => {
        if (e.code !== "Enter") return;

        this.hide(plot);

        this._focusElement.focus();
      });
    });
  }

  show(element = null, event = null) {
    if (!element || !event) return;

    let plot = element.closest("[data-plot]"),
      plotId = plot.dataset.plot,
      popup = this.getPopup(plotId),
      coord = this._getCoord(event);

    if (!popup) return;

    popup.style.display = "block";
    plot.dataset.open = "true";

    this._setCoord(popup, coord);
    this._toggleClassPosition(popup, this._getPosition(popup, coord));
  }

  hide(element = null) {
    if (!element) return;

    let plot = element.closest("[data-plot]"),
      plotId = plot.dataset.plot,
      popup = this.getPopup(plotId);

    if (!popup) return;

    popup.style.display = "none";
    plot.dataset.open = "false";

    this._toggleClassPosition(popup);

    if (element === this._focusElement) {
      this._blockFocus.unblock();
    }
  }

  getPopup(id = null) {
    if (typeof id !== "string" && typeof id !== "number") return undefined;

    let rezult = Array.from(this._popups).find(
      (popup) => popup.dataset.popup == id
    );

    return rezult || undefined;
  }

  getPlot(id) {
    if (typeof id !== "string" && typeof id !== "number") return undefined;

    let rezult = Array.from(this._plots).find(
      (plot) => plot.dataset.plot == id
    );

    return rezult || undefined;
  }

  getOpenElement() {
    let rezult = Array.from(this._plots).find(
      (plot) => plot.dataset.open === "true"
    );

    return rezult || undefined;
  }

  getEventsOnDevice(device) {
    return this._listEvents[device]
      ? Object.assign(this._listEvents["all"] ?? {}, this._listEvents[device])
      : this._listEvents["all"];
  }

  getListAvailableDevices() {
    return this._listAvailableDevices.filter((item) => item !== "test");
  }

  addDevice(device, events) {
    if (typeof device !== "string") throw new Error("Invalid type passed");

    if (Object.prototype.toString.call(events) !== "[object Object]")
      throw new Error("Invalid type passed");

    if (!this._listAvailableDevices.find((item) => item === device))
      throw new Error("This value is not in the list of devices");

    if (this._listEvents[device])
      throw new Error("This device has already been added.");

    this._listEvents[device] = events;

    this._setEvents(events);
  }

  addEvents(device, events) {
    if (typeof device !== "string") throw new Error("Invalid type passed");

    if (Object.prototype.toString.call(events) !== "[object Object]")
      throw new Error("Invalid type passed");

    if (!this._listEvents[device])
      throw new Error("This device has not been added");

    Object.assign(this._listEvents[device], events);

    this._setEvents(events);
  }

  _checkRelatedTarget(e, dataTarget, dataRelatedTarget) {
    let relatedTarget = e.relatedTarget?.closest(`[data-${dataRelatedTarget}]`),
      relatedTargetId = relatedTarget?.dataset[dataRelatedTarget],
      targetId = e.target.closest(`[data-${dataTarget}]`).dataset[dataTarget];

    if (!relatedTarget || relatedTargetId !== targetId) return;

    return true;
  }

  _leaveWithPopup(e) {
    let popup = e.relatedTarget?.closest("[data-popup]");

    popup.addEventListener(
      "pointerleave",
      (event) => {
        if (this._checkRelatedTarget(event, "popup", "plot")) return;

        this.hide(e.target);
      },
      {
        once: true,
      }
    );
  }

  _getCoord(event) {
    if (event.x && event.y) {
      return {
        left: event.x,
        top: event.y,
        right: document.documentElement.clientWidth - event.x,
        bottom: document.documentElement.clientHeight - event.y,
      };
    }

    let { bottom, left, right, top, height, width } =
      event.target.getBoundingClientRect();

    return {
      left: left + width / 2,
      top: top + height / 2,
      right: right + width / 2,
      bottom: bottom + height / 2,
    };
  }

  _setCoord(element, { left, top }) {
    element.style.left = `${left}px`;

    element.style.top = `${top}px`;
  }

  _checkDevice() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return "mobile";
    } else {
      return "desctop";
    }
  }

  _setEvents(events) {
    for (let key in events) {
      this._plots.forEach((plot) => {
        plot.addEventListener(key, events[key]);
      });
    }
  }

  _toggleClassPosition(element, selector = null) {
    if (selector) {
      element.classList.add(selector);

      return;
    }

    let removeClass = element.classList[element.classList.length - 1];

    if (removeClass === "plots-popup__item") return;

    element.classList.remove(removeClass);
  }

  _getPosition(plotContent, { top, left, right, bottom }) {
    let contentStyle = window.getComputedStyle(plotContent),
      contentWidth = parseFloat(contentStyle.width),
      contentHeight = plotContent.scrollHeight;

    return this._checkPosition({
      contentWidth,
      contentHeight,
      left,
      top,
      right,
      bottom,
    });
  }

  _checkPosition({ contentWidth, contentHeight, left, top, right, bottom }) {
    let arr = [
      this._top({ contentWidth, contentHeight, left, top, right }),
      this._bottom({ contentWidth, contentHeight, left, right, bottom }),
      this._right({ contentWidth, contentHeight, top, right, bottom }),
      this._left({ contentWidth, contentHeight, left, top, bottom }),
    ];

    return arr.find((item) => item) ?? "center";
  }

  _top({ contentWidth, contentHeight, left, top, right }) {
    if (top > contentHeight) {
      let aside = contentWidth / 2;

      if (aside < left && aside < right) {
        return "top-center";
      }

      if (aside > left && aside < right) {
        return "top-right";
      }

      if (aside < left && aside > right) {
        return "top-left";
      }

      return false;
    }

    return false;
  }

  _bottom({ contentWidth, contentHeight, left, right, bottom }) {
    if (bottom > contentHeight) {
      let aside = contentWidth / 2;

      if (aside < left && aside < right) {
        return "bottom-center";
      }

      if (aside > left && aside < right) {
        return "bottom-right";
      }

      if (aside < left && aside > right) {
        return "bottom-left";
      }

      return false;
    }

    return false;
  }

  _right({ contentWidth, contentHeight, top, right, bottom }) {
    if (right > contentWidth) {
      let aside = contentHeight / 2;

      if (aside < bottom && aside < top) {
        return "right-center";
      }

      return false;
    }

    return false;
  }

  _left({ contentWidth, contentHeight, left, top, bottom }) {
    if (left > contentWidth) {
      let aside = contentHeight / 2;

      if (aside < bottom && aside < top) {
        return "left-center";
      }

      return false;
    }

    return false;
  }
}

export { Plots };
