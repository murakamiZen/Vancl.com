define(function (){
 
  //数据下载
  function download(){
    $.ajax({
      type: 'get',
      url: '../data/index.json',
      success: function(arr){
        for ( var i = 0, len = arr.length; i < len; i++ ) {
          $(`
          <li> 
            <a href="./goodsDetail.html">
              <img original="${arr[i].imgurl}" src="${arr[i].imgurl}" alt="" id="${arr[i].id}">
            </a>
          </li>
          `).prependTo('.lastImg')
        }
      },
      error: function(msg){
        console.log(msg)
      }
    })
  }
  
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
    fn1: download,
    fn2: header,
    fn3: footer
  }
})