!(function () {
  const bindEvents = () => {
    $('.side-nav').each(function () {
      const target = this
      $(this).on('click', '.nav-close', function (e) {
        e.preventDefault()
        $(target).removeClass('on-view')
      })
    })
    // $('.side-nav').on('click', '.nav-close',  function (e) {
    //   //   e.preventDefault()
    //   console.log('this :>> ', this)
    //   console.log('e.currentTarget :>> ', e.currentTarget)
    //   console.log('e.target :>> ', e.target)
    // })
  }
  //   const showLeft = () => {
  //     console.log('left')
  //   }
  //   const showRight = () => {
  //     console.log('right')
  //   }
  bindEvents()
})()
