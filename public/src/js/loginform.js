!(function () {
  const loginForm = {
    data: {
      $rootElement: $('.container'),
      $btn: $('.btn'),
      $loginModal: $('.login-modal'),
    },
    init() {
      this.bindEvents()
    },
    bindEvents() {
      this.data.$btn.on('click', () => {
        this.openDialog()
      })
      this.data.$loginModal.on('click', (e) => {
        e.stopPropagation()
        if (e.target.id === 'login-modal') {
          this.closeDialog()
        }
      })
      $('.close').on('click', (e) => {
        this.closeDialog()
      })
    },
    openDialog() {
      this.data.$loginModal.css('display', 'block')
    },
    closeDialog() {
      this.data.$loginModal.css('display', 'none')
    },
  }
  loginForm.init()
})()
