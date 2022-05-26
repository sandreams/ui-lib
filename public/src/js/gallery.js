!(function () {
  const gallery = {
    data: {
      $rootElement: $('.modal-content'),
      imgs: [
        {
          name: 'Northern Lights',
          url: '../src/img/01.jpg',
        },
        {
          name: 'Mountains and fjords',
          url: '../src/img/02.jpg',
        },
        {
          name: 'Nature and sunrise',
          url: '../src/img/03.jpg',
        },
        {
          name: 'Snowy Mountains',
          url: '../src/img/04.jpg',
        },
        {
          name: 'The Woods',
          url: '../src/img/05.jpg',
        },
        {
          name: 'Cinque Terre',
          url: '../src/img/06.jpg',
        },
      ],
      currentIndex: 1,
    },
    setOnView(index) {
      $('.slides')
        .eq(this.data.currentIndex - 1)
        .removeClass('on-view')
      $('.slides')
        .eq(index - 1)
        .addClass('on-view')
      this.data.currentIndex = index
      this.scrollLeft(index)
    },
    onClickPre() {
      const index =
        this.data.currentIndex === 1 ? 6 : this.data.currentIndex - 1
      this.setOnView(index)
      //   this.scrollLeft(index)
    },
    onClickNext() {
      const index =
        this.data.currentIndex === 6 ? 1 : this.data.currentIndex + 1
      this.setOnView(index)
      //   this.scrollLeft(index)
    },
    scrollLeft(index) {
      const clientWidth = $('.imgs-slides>.slide-col').get(0).clientWidth
      console.log('clientWidth :>> ', clientWidth)
      console.log(
        'left >>',
        Math.max(0, (index - 0.5) * clientWidth - 1.5 * clientWidth)
      )
      $('.imgs-slides')
        .get(0)
        .scrollTo({
          left: Math.max(0, (index - 0.5) * clientWidth - 1.5 * clientWidth),
          behavior: 'smooth',
        })
    },
    handleClick(index) {
      console.log('index :>> ', index)
      this.setOnView(index)
    },
    bindEvents() {
      this.data.$rootElement.on('click', '.click-handler', (e) => {
        e.preventDefault()
        if (!e.target.dataset || !e.target.dataset.key) {
          return
        }
        const { key } = e.target.dataset
        if (/^\d+$/.test(key)) {
          this.setOnView(Number(key))
        } else if (key === 'pre') {
          this.onClickPre()
        } else if (key === 'next') {
          this.onClickNext()
        }
      })
    },
    init() {
      const slides_wrap = this.data.imgs.reduce((pre, cur, index) => {
        return (
          pre +
          `<div class="slides ${
            this.data.currentIndex === index + 1 ? 'on-view' : ''
          }">
            <div class="num-text">${index + 1} / ${this.data.imgs.length}</div>
            <img src="${cur.url}" />
          </div>`
        )
      }, '')
      const img_wrap = this.data.imgs.reduce((pre, cur, index) => {
        return (
          pre +
          `<div class="slide-col">
          <img src="${cur.url}" alt="" class="hover-shadow click-handler ${
            this.data.currentIndex === index + 1 ? 'active' : ''
          }" data-key="${index + 1}" />
        </div>`
        )
      }, '')
      const template = `
      <div class="gallery-slides">
        ${slides_wrap}
      </div>
      <div class="controls">
        <a class="pre click-handler" href="#" data-key="pre"><</a>
        <span class="captain-text">${
          this.data.imgs[this.data.currentIndex - 1].name
        }</span>
        <a class="next click-handler" href="#" data-key="next">></a>
      </div>
      <div class="imgs-slides">
        ${img_wrap}
      </div>
    `
      $(template).appendTo(this.data.$rootElement)
      this.bindEvents()
    },
  }
  gallery.init()
})()
