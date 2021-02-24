
define(['jquery'], function($){
  //数据下载
  function download(){
    $.ajax({
      type: 'get',
      url: '../data/goodsList.json',
      success: function(arr){
        for ( var i = 0, len = arr.length; i < len; i++ ) {
          $(`
            <li class="listItem">
              <a href="javascript:void(0);"><div class="img"><img src="${arr[i].imgurl}"  alt="" ><div class="addGoods" data-id="${arr[i].id}">加入购物车</div></div></a>
              <h3><a href="./goodsDetail.html">${arr[i].title}</a></h3>
              <div class="itemPrice">
                <span>售价￥${arr[i].originPrice}</span>
                <span>充值购买相当于￥${arr[i].salePrice}</span>
              </div>
            </li>
          `).appendTo('.list')
        }
      },
      error: function(msg){
        console.log(msg)
      }
    })
  }
  // 图片延迟加载
  $('.list').on('load', function(){
    $(function() {
      $("img").lazyload({
        effect: "fadeIn"
      })
    })
  });

  // 数据加载完成后点击加入购物车添加事件
  $('.list').on('click','.listItem .addGoods',function (){
    // 存储商品id和数量
    // "goods"=>"[{'id':'abc4','num':2},{'id':'abc2','num':1}]"
    var id = $(this).attr('data-id') //当前点击商品的id
    var goodsArr = [] //购物车数据的数组
    if (localStorage.getItem('goods')) {
      goodsArr = JSON.parse( localStorage.getItem('goods') )
    }
    var flag = false
    
    $.each(goodsArr, function(index, item){
      if (item.id === id){
      item.num++
      flag = true
      }
    })  
    if (!flag) {
      goodsArr.push({"id":id,"num":1})
      console.log(111);
      console.log(goodsArr);
    }
    // 数据更新到本地存储
    localStorage.setItem('goods', JSON.stringify(goodsArr))
    alert('加入购物车成功！')
  })

  // 点击商品图片下面标题进入详情页   
  $('.list').on('click','.listItem h3',function (){
    $('.listItem h3 a').href = './goodsDetail.html'
  })
   
  // 头部添加
  function header(){
    $(`
      <div id="title">
        <div class="tit-main">
          <div class="content">
            <span class="welcome">您好，欢迎光临凡客诚品！</span>
            <span class="login">登录</span>
            <span>|</span>
            <span class="register">注册</span>
            <span class="myOrder">我的订单</span>
            <span class="notice">网站公告</span>
            <a href="#" class="weibo"></a>
            <a href="#" class="wechat"></a>
            <img src="../image/weixin.png" alt="" class="qrcode">
          </div>
        </div>
      </div>

      <div id="search">
        <div class="srh-main">
          <div class="content">
            <div class="srh-btn">
              <input type="text" placeholder="搜“休闲裤”，体验与众不同">
              <button class="seek">搜索</button>
              <button class="shopCart">购物车（1）</button> 
            </div>      
            <div class="hot-srh">
              <ul>
                <li>热门搜索：</li>
                <li>免烫衬衫</li>
                <li>外套</li>
                <li>针织衫</li>
                <li>卫衣</li>
                <li>休闲裤</li>
                <li>帆布鞋</li>
                <li>羽绒服</li>
              </ul>
            </div> 
            <div class="cartGoods">
              <div class="content">
                <h3>最近加入的商品：</h3>
                <div class="goods-detail">
                  <img src="./image/36x36.jpg" alt="">
                  <div>
                    <span>休闲衬衫 法兰绒 男款 藏青色</span> <br>
                    <span>￥158.00 X 1</span>
                  </div>
                  <p>删除</p>
                </div>
                <div class="total">
                  <div>
                    <span>共计(未计算促销折扣)</span> <br>
                    <span>￥158</span>
                  </div>
                  <button class="checkCart">查看购物车(1件)</button>
                </div>
              </div>
            </div>   
          </div>
        </div>
      </div>
    `).appendTo('#header')
  }
      
  // 尾部添加
  function footer(){
    $(`
      <div id="help">
        <div class="help-main">
          <div class="helpTop">
              <div class="helpTop1">
                <img src="./image/onlinecustomer.png" alt=""> <br>
                <button> 7X9小时在线客服 </button>
              </div>
              <div class="helpTop2">
                <img src="./image/seven.png" alt=""> <br>
                <span>7天内退货</span> <br>
                <span>购物满199元免运费</span>
              </div>
              <div class="helpTop3">
                <img src="./image/fkqrcode.jpg" alt=""> <br>
                <span>扫描下载凡客客户端</span>
              </div>
          </div>
          <div class="helpBottom">
            <ul>
              <li>关于凡客</li>
              <li>新手指南</li>
              <li>配送范围及时间</li>
              <li>支付</li>
              <li>售后服务</li>
              <li>帮助中心</li>
            </ul>
          </div>
        </div>
      </div> 
      <div id="copyright">
        <div class="copy-main">
          <div class="copyContent">
            <span>Copyright 2007 - 2020 vancl.com All Rights Reserved京ICP备08000757号 京公网安备11011502002400号 出版物经营许可证新出发京批字第直110138号</span> <br>
            <span>凡客诚品（北京）科技有限公司</span>
          </div>
          <div class="copyLogo">
            <span class="logo1"></span>
            <span class="logo2"></span>
            <span class="logo3"></span>
          </div>
        </div>
      </div>
    `).appendTo('#footer')
  }
  
  return{
    download: download,
    footer: footer,
    header: header
  }
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

// 导航栏
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
    getScrollTop = $(document).scrollTop() == 0
    ? $(window).scrollTop()
    : $(document).scrollTop()
    return getScrollTop
  }
  // 设置滚动条位置
  var setTop = (top)=>{
    $(document).scrollTop() == 0
      ? $(window).scrollTop(top) 
      : $(document).scrollTop( top) 
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
      }, 20);
  }) 
})();







