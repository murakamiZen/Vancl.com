
// 微信hover
(function(){

  $('#header').on('mouseenter', '.wechat', function(){        
    $qrcode = $('.qrcode')
    $qrcode.show(); 
  });

  $('#header').on('mouseleave', '.wechat', function(){
    $qrcode = $('.qrcode')
    $qrcode.hide();  
  })
})();

// 购物车hover
(function(){
  
  $('#header').on('mouseenter', '.shopCart', function(){        
    $cartGoods = $('.cartGoods')
    $cartGoods.show(); 
  });

  $('#header').on('mouseleave', '.shopCart', function(){
    $cartGoods = $('.cartGoods')
    $cartGoods.hide();  
  })
})();



// 导航栏hover
// (function(){
//   $('#header').on('mouseenter', '.navList>li', function(e){  
//     $target = $(e.target)
//     $target.children().show()  // 或者是 $target.find('ul').show()
//   });
//   $('#header').on('mouseleave', '.navList ul', function(e){  
//     $target = $(e.target)
//     $target.children().hide()
    
//   })
// })();

// 导航栏hover
(function(){
  $('#header').on('mouseenter', '.navList>li', function(e){  
    $target = $(e.target)
    // console.log( $target.find('ul') );
    $target.children().show()  // 或者是 $target.find('ul').show()
    
  });
  // $('#header').on('mousemove', '.navList>li', function(e){  
  //   $target = $(e.target)
  //   console.log( $('.navList>li').children()  );  //  ==   $target
  // });
  $('#header').on('mouseleave', '.navList', function(e){  
    $target = $(e.target)
    console.log($target.context.className);
    let classList = [...$target.context.classList]
    if (classList.includes('class1') || classList.includes('class2')) {
    $('.navList>li ul').hide()

    }
  })

    
})();


// 轮播图
(function banner(){
  var swiper = new Swiper('.swiper-container', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

})();


// 回到顶部
(function toTop(){
  $toTop = $('.toTop')
  $timer = null
  $toTop.click(()=>{
      // 滚动条运动 
      $timer = setInterval(() => {
          var backTop = getTop()
          var speedTop = backTop / 10
          setTop(backTop - speedTop)
          // 检测鼠标滚轮是否滚动
          $(window).on( 'mousewheel',(delta)=>{
            if(delta != 0){
              clearInterval($timer)
            }
          })
          if(backTop == 0){
            clearInterval($timer)
          }
      }, 20);
  }) 
  // 获取滚动条位置
  var getTop = ()=>{
      getScrollTop = document.documentElement.scrollTop == 0
      ? document.body.scrollTop
      : document.documentElement.scrollTop
      return getScrollTop
  }
  // 获取滚动条位置
  var setTop = (top)=>{
      document.documentElement.scrollTop == 0
      ? document.body.scrollTop = top
      : document.documentElement.scrollTop = top
  }
})();




// 底部删除悬浮栏
(function delFloat(){
  $del = $('.del')
  $scan = $('.scan')
  $del.on('click',function(){
    $scan.remove()
  })
})();
