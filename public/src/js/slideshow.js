class SlideShow {
  constructor(data) {
    console.log('data :>> ', data)
    if (new.target === SlideShow) {
      throw new Error('轮播类不能被实例化')
    }
    if (!this.init) {
      throw new Error(`${new.target.name}类必须定义 init 方法`)
    }
    if (!this.render) {
      throw new Error(`${new.target.name}类必须定义 render 方法`)
    }
    if (!this.bindEvents) {
      throw new Error(`${new.target.name}类必须定义 bindEvents 方法`)
    }
    if (!this.showNext) {
      throw new Error(`${new.target.name}类必须定义 showNext 方法`)
    }
    if (!this.handleClick) {
      throw new Error(`${new.target.name}类必须定义 handleClick 方法`)
    }
    if (data['container'] === undefined)
      throw new Error(`data 里未定义 container 的值`)
    this.data = {
      ...data,
      $rootElement: $(data.container),
      timer: null,
      duration: data.duration || 3000,
      autoChange: data.autoChange || false,
      stopOnClick: data.stopOnClick || false,
    }
  }
  // init() {
  //   this.render()
  //   this.bindEvents()
  // }
  // render() {}
  // setIndex() {}
  // bindEvents() {}
  // handleClick() {}
  // showPre() {}
  // showNext() {}
  // stopOnClick() {}
  showPre() {
    this.setIndex(
      this.data.currentIndex - 1 <= 0
        ? this.data.length
        : this.data.currentIndex - 1
    )
  }
  showNext() {
    this.setIndex(
      this.data.currentIndex - this.data.length >= 0
        ? 1
        : this.data.currentIndex + 1
    )
  }
  stopOnClick(stop = this.data.stopOnClick) {
    if (stop) {
      this.clearTimer()
    }
  }
  setTimer() {
    this.data.timer = setInterval(this.showNext.bind(this), this.data.duration)
  }
  clearTimer() {
    console.log('clear timer')
    clearInterval(this.data.timer)
    this.data.timer = null
  }
}
class FadedImgs extends SlideShow {
  constructor(data) {
    super(data)
  }
  setIndex(index) {
    this.data.currentIndex = index
    this.render()
  }
  bindEvents() {
    this.data.$rootElement.on('click', '[data-type="setImg"]', (e) => {
      const { index } = e.target.dataset
      console.log('key :>> ', index)
      if (index) {
        this.handleClick(index)
      }
    })
  }
  handleClick(index) {
    switch (true) {
      case typeof index === 'number' || /^\d+$/.test(index):
        this.setIndex(Number(index))
        break
      case index === 'pre':
        this.showPre()
        break
      case index === 'next':
        this.showNext()
        break
      default:
        return
    }
    if (this.data.timer && this.data.autoChange) {
      // 重置timer
      this.clearTimer()
      if (!this.data.stopOnClick) {
        this.setTimer()
      }
    }
    this.stopOnClick()
  }
  init() {
    this.render()
    this.bindEvents()
    if (this.data.autoChange) {
      this.setTimer()
    }
  }
  render() {
    this.data.$rootElement.empty()
    const dot_str = [1, 2, 3, 4].reduce(
      (pre, cur) =>
        pre +
        `<a data-index="${cur}" class="${
          cur === this.data.currentIndex ? 'active' : ''
        }" data-type="setImg"></a>`,
      ''
    )
    $(`<div class="img-wrap">
    <img src=${this.data.imgs[this.data.currentIndex - 1]} alt="" />
    <a class="slide slide--pre" data-index="pre" data-type="setImg"> < </a>
    <a class="slide slide--next" data-index="next" data-type="setImg"> > </a>
    <span class="slide-index">${this.data.currentIndex} / ${
      this.data.length
    }</span>
  </div>

  <div class="slide-panel">
    ${dot_str}
  </div>`).appendTo(this.data.$rootElement)
  }
}
class ScrollableImgs extends SlideShow {
  constructor(data) {
    super(data)
  }
  setIndex(index) {
    this.data.currentIndex = index
    this.data.$rootElement
      .find('img')
      .first()
      .css('margin-left', -1 * (index - 1) * 1000 + 'px')
    const $slidePanel = this.data.$rootElement.find('.slide-panel')
    $slidePanel.empty()
    $(
      [1, 2, 3, 4].reduce(
        (pre, cur) =>
          pre +
          `<a data-index="${cur}" class="${
            cur === this.data.currentIndex ? 'active' : ''
          }" data-type="setImg"></a>`,
        ''
      )
    ).appendTo($slidePanel)
  }
  bindEvents() {
    this.data.$rootElement.on('click', '[data-type="setImg"]', (e) => {
      const { index } = e.target.dataset
      console.log('key :>> ', index)
      if (index) {
        this.handleClick(index)
      }
    })
  }
  handleClick(index) {
    switch (true) {
      case typeof index === 'number' || /^\d+$/.test(index):
        this.setIndex(Number(index))
        break
      case index === 'pre':
        this.showPre()
        break
      case index === 'next':
        this.showNext()
        break
      default:
        return
    }
    if (this.data.timer && this.data.autoChange) {
      // 重置timer
      this.clearTimer()
      if (!this.data.stopOnClick) {
        this.setTimer()
      }
    }
    this.stopOnClick()
  }
  init() {
    this.render()
    this.bindEvents()
    if (this.data.autoChange) {
      this.setTimer()
    }
  }
  render() {
    this.data.$rootElement.empty()
    const dot_str = [1, 2, 3, 4].reduce(
      (pre, cur) =>
        pre +
        `<a data-index="${cur}" class="${
          cur === this.data.currentIndex ? 'active' : ''
        }" data-type="setImg"></a>`,
      ''
    )
    const img_str = this.data.imgs.reduce(
      (pre, cur) => pre + `<img src=${cur} alt="" />`,
      ''
    )
    $(`<div class="img-wrap">
    ${img_str}
    <a class="slide slide--pre" data-index="pre" data-type="setImg"> < </a>
    <a class="slide slide--next" data-index="next" data-type="setImg"> > </a>
  </div>

  <div class="slide-panel">
    ${dot_str}
  </div>`).appendTo(this.data.$rootElement)
  }
}
!(function () {
  const config = {
    autoChange: true,
    stopOnClick: true,
    duration: 3000,
  }
  try {
    const fadedImgs = new FadedImgs({
      container: '.container-fade',
      imgs: [
        '../src/img/01.jpg',
        '../src/img/02.jpg',
        '../src/img/03.jpg',
        '../src/img/04.jpg',
      ],
      length: 4,
      currentIndex: 1,
      timer: null,
      duration: config.duration,
      autoChange: config.autoChange,
      stopOnClick: config.stopOnClick,
    })
    const scrollableImgs = new ScrollableImgs({
      container: '.container-slide',
      imgs: [
        '../src/img/01.jpg',
        '../src/img/02.jpg',
        '../src/img/03.jpg',
        '../src/img/04.jpg',
      ],
      length: 4,
      currentIndex: 1,
      timer: null,
      duration: config.duration,
      autoChange: config.autoChange,
      stopOnClick: config.stopOnClick,
    })
    fadedImgs.init()
    scrollableImgs.init()
  } catch (error) {
    console.log('error :>> ', error)
    return
  }
})()
