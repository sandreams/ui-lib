!(function () {
  const toggleSwitch = {
    data: {
      $rootElement: $('.switch-container'),
      isActive: false,
    },
    init() {
      this.render()
      this.data.$rootElement.on('click', (e) => {
        e.stopPropagation()
        const $ck = this.data.$rootElement.find('input[type="checkbox"]')
        this.data.isActive = $ck.get(0).checked
      })
    },
    // toggle() {
    //   this.data.isActive = !this.data.isActive
    //   $('.toggle-switch').toggleClass('switch-on')
    // },
    render() {
      this.data.$rootElement.empty()
      $(`<label style="font-weight:bold;margin-right: 10px">手风琴模式</label><label class="switch">
      <input type="checkbox">
      <span class="slider"></span>
    </label>`).appendTo(this.data.$rootElement)
    },
  }
  const accordion = {
    data: {
      $rootElement: $('.container'),
      $btn: $('.accordion'),
    },
    init() {
      this.bindEvents()
    },
    toggle($selctor) {
      $selctor.removeClass('active')
      $selctor.find('.panel').css('height', 0)
    },
    bindEvents() {
      this.data.$btn.on('click', (e) => {
        if (e.currentTarget) {
          const $accordion = $(e.currentTarget)
          const $panel = $accordion.find('.panel')
          if ($accordion.hasClass('active')) {
            this.toggle($accordion)
          } else {
            const clientHeight = $accordion
              .find('.panel-content')
              .get(0).clientHeight
            if (toggleSwitch.data.isActive === true) {
              // 开启了手风琴模式，则会收起其他
              this.toggle($('.accordion.active'))
            }
            $accordion.addClass('active')
            $panel.css('height', 18 + clientHeight + 'px')
            console.log('siblings', $accordion.find('.panel.active'))
          }
        }
      })
    },
  }
  accordion.init()
  toggleSwitch.init()
})()
