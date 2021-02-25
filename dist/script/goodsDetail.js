
// 图片延迟加载
$(function lazyLoad() {
  $("img").lazyload({
    effect: "fadeIn"
  })
});

// 顶部悬浮栏
(function topFloat(){
  $topFloat = $('.topFloat') 
  $(window).scroll( function(){
    if($(window).scrollTop() >= 850){
      // $topFloat.css('display','block')
      // $topFloat.show()
      $topFloat.fadeIn('slow')
    } else {
      // $topFloat.css('display','none')
      // $topFloat.hide()
      $topFloat.fadeOut('slow')
    }  
  })
})();

// 右侧悬浮栏
(function rightFloat(){
  $rightFloat = $('.rightFloat')
  $tab = $('.tab')
  // 保存当前坐标状态
  var $flag = 0 
  $tab.click( ()=>{
    var leftValue = $rightFloat.offset().left
    // 判断已改变坐标
    if( $flag != 0 ){
      $rightFloat.animate( {right: '-276px'}, 'slow')
      $flag = 0           
    }else if( leftValue = '1595px'){  // 悬浮栏隐藏状态，执行以下函数
      $rightFloat.animate( {right: '0px'}, 'slow' )
      $flag = 1
    }
    // 给外面返回最新坐标
    return $flag
  });

  // enter+click 切换效果：
  // $tab.mouseenter( ()=>{
  //     $rightFloat.animate( {right: '0px'}, 'slow' )    
  // });
  // $tab.click( ()=>{
  //     $rightFloat.animate( {right: '-276px'}, 'slow')   
  // });
})();


// 登录注册跳转
(function loginRegister(){
  $('#header').on('click', '.login', ()=>{
    location.href = './login.html'
  })
  $('#header').on('click', '.register', ()=>{
    location.href = './register.html'
  })
})();

// 微信hover
(function wechat(){
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
(function shoppingCart(){
  $('#header').on('click', '.checkCart', ()=>{
    location.href = './shoppingCar.html'
  })
  $('#header').on('mouseenter', '.shopCart', function(){        
    $('.cartGoods').show(); 
  })
  $('#header').on('mouseleave', '.shopCart', function(){
    $('.cartGoods').hide(); 
  })
  $('#header').on('mouseleave', '.cartGoods', function(){
        $('.cartGoods').hide(); 
    })
  $('#header').on('mouseenter', '.cartGoods', function(){        
    $('.cartGoods').show(); 
  })
})();

// 导航栏hover
(function navigator(){
  $('.home').click( ()=>{
    location.href = './index.html'
  })
  $('.class2 li').click( ()=>{
    location.href = './goodsList.html'
  })
  $('.navList .class1').hover(
    function(e){
      $target = $(e.target)
      $target.children().show() 
    },
    function(){
      $('.navList .class2').hide()
    }
  )
})();

// 左侧选项按钮上下切换图片
(function upperUnder(){
  $upper = $('.upper')
  $under = $('.under')
  $optList = $('.optList')
  $upper.click( ()=>{
    $optList.animate({
      top: '0',
    })
  }) 
  $under.click( ()=>{
    $optList.animate({
      top: '-407',
    })
  }) 
})();

// 点击左侧选项切换展示图及放大镜图
(function picSwitch(){
  $lis = $('.optList li')
  $lis.each( ()=>{
    $lis.mouseenter( (e)=>{
      $showImg = $('.pic .showImg')
      $bigImg = $('.bigPic img')
      $('.optList').find('.show').removeClass('show')
      $(e.target).addClass('show')
      // console.log( $(e.target).prop('id') ); // 获取点击元素的类名
      $id = $(e.target).prop('id')
      $showImg.attr('src', '../image/pic'+ $id +'.jpg')
      $bigImg.attr('src', '../image/pic'+ $id +'.jpg')
    })
  })
})();

// 放大镜
(function Magnify(){
  $pic = $('.pic')
  $mask = $('.mask')
  $bigPic= $('.bigPic')
  $img= $('.bigPic img')
  $pic.mouseenter(()=>{
    $mask.css( 'display','block');
    $bigPic.css('display','block');
  })
  $pic.mouseleave(()=>{
    $mask.css('display','none');
    $bigPic.css('display','none');
  })
  $pic.mousemove( (e)=>{
    var mask_left = e.pageX - $pic.offset().left - $mask.width() /2
    var mask_top = e.pageY - $pic.offset().top - $mask.height() /2

    if (mask_left <= 0){
      mask_left = 0
    }
    if (mask_left >= ($pic.width() - $mask.width())){
      mask_left = ($pic.width() - $mask.width())
    }
    if (mask_top <= 0){
      mask_top = 0
    }
    if ( mask_top >= ($pic.height() - $mask.height() ) ){
      mask_top = ( $pic.height() - $mask.height() )
    }

    $mask.css({'left': mask_left + 'px', 'top': mask_top + 'px' })
 
    var scaleX = mask_left/($pic.width() - $mask.width() )
    var scaleY = mask_top/($pic.height() - $mask.height() )

    var img_left = ($img.width() - $bigPic.width())*scaleX
    var img_top = ($img.height() - $bigPic.height())*scaleY

    $img.css({'left': -img_left + 'px', 'top': -img_top + 'px' })
  })
})();

// 右侧图片点击效果
( function clickPic(){
  // 选择颜色
  $lis = $('.colorList li')
  $lis.each( ()=>{
    $lis.click( (e)=>{
      $('.colorList').find('.show').removeClass('show')
      if($(e.target).is('span')){
        $(e.target).closest('li').addClass('show')
      } else {
        $(e.target).addClass('show')
      }
    })
  })
  // 选择尺码
  $lis = $('.sizeList li')
  $lis.each( ()=>{
    $lis.click( (e)=>{
      $('.sizeList').find('.show').removeClass('show')
      $(e.target).addClass('show')
    })
  })
})();

// 回到顶部
(function toTop(){
  $toTop = $('.toTop')
  $timer = null
  // logo显示
  $(window).scroll( function(e){
    if($(window).scrollTop() >= 200){
      $toTop.css('display','block')
    }   
  });
  $(window).scroll( function(){
    if($(window).scrollTop() < 200){
      $toTop.css('display','none')
    } 
  });
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
  // 滚动条运动 
  $toTop.click(()=>{ 
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
      }, 25);
  }) 
})();