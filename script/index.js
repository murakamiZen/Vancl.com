
// 图片延迟加载
$(function lazyLoad() {
  $("img").lazyload({
    effect: "fadeIn"
  })
});

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
  $('#header').on('click', '.home', ()=>{
    location.href = './index.html'
  })

  $('#header').on('click', '.class2 li', ()=>{
      location.href = './goodsList.html'
  })

  $('#header').on('mouseenter', '.navList>li', function(e){  
    $target = $(e.target)
    $target.children().show()  // 或者是 $target.find('ul').show()
  })
  $('#header').on('mouseleave', '.navList>li', function(e){  
    $target = $(e.target)
    $('.navList>li ul').hide()
  })

  $('#header').on('mouseenter', '.navList ul li', function(e){  
    $target = $(e.target)
    $target.show()
  })
  $('#header').on('mouseleave', '.navList ul li', function(e){  
    $target = $(e.target)
    $('.navList>li ul').hide()
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

// 跳转到详情页
(function toDetail(){
  $imgs = $('.goods-main img')
  $imgs.each( ()=>{
    $imgs.click( ()=>{
      location.href = './goodsDetail.html'
    })
  })
})();

// 渲染数据延迟加载
// $(function (){
//   $('.bestGoods').on('load','.bestGoods img', function(){   
//     $(function() {
//       $("img").lazyload({
//         effect: "fadeIn"
//       })
//     });
//   })
// })();

