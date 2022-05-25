!(function () {
  const bindEvents = () => {
    $('.side-nav').each(function () {
      const target = this
      $(this).on('click', '.nav-close', function (e) {
        e.preventDefault()
        $(target).removeClass('on-view')
      })
      $(this).on('click', '.modal-box', function (e) {
        e.preventDefault()
        $(target).removeClass('on-view')
      })
    })
  }
  bindEvents()
})()
