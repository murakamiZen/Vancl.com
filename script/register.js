$(function (){
  $validate = $('.validate') // 验证码图片
  $registerNow = $('.registerNow') // 立即注册按钮
  $ipts = $('.login .userInfo > div > input') // 所有input输入框
  $read = $('.userInfo .btn p input') // 服务条款阅读单选框
  $tips1 = $('.userInfo .tipsVerifyCode') // 验证码提示文字
  $tips2_5 = $('.login .userInfo span') // 其余提示文字
  var save = null // 用于保存密码
  var arr = [] // 记录验证结果

  // 验证码请求
  var verifyCode = {str: "", imgUrl: ""} // 验证码接口验证对象
  code()
  
  function code() {
    $.ajax({
      type: "get",
      url: "https://www.mxnzp.com/api/verifycode/code?",
      // url: "https://www.mxnzp.com/api/verifycode/code?len=5&type=0&app_id=cgdhozkmnhjnpdsm&app_secret=cVBDWnBaalM2ajZaajNEVFgvRExPQT09" 
      data: {len: 5, type: 0, app_id: "nttxhsqjojeennjq", app_secret: "TEVZWHdqMy9kN1lUcHlkZUR0RGt3dz09"},
      dataType: "json",
      timeout: 5000,
      success: function (json) {
        verifyCode.str = json.data.verifyCode // 验证文本
        verifyCode.imgUrl = json.data.verifyCodeImgUrl
        $('.validate').attr("src", verifyCode.imgUrl)
        console.log(verifyCode.str ); // -----测试
      },
      error: function (err) {
        console.log(err.status)
      }
    })    
  }

  // 用户点击图片重新请求验证码
  $validate.click(function (){
    code()
  })

  $read.click(function (){
    if ($(this).prop('checked')){
      $registerNow.css('background','#b52024')
    } else {
      $registerNow.css('background','#9A9A9A')
    }  
  })

  $ipts.click(function (){
    $(this).siblings('span').css('display','block')
    $(this).siblings('p').css('display','block')
  })

  $ipts.eq(0).blur(function (){
    var val = $(this).val().replace(/\s+/g,'')
    if (val) { // 用户输入了值
      $tips1.css('display','none')
      // 判断
      if (val === verifyCode.str){
        arr[0] = 1
      } else {
        arr[0] = 0
      }
    } else { // 用户什么都没输入
      arr[0] = 0
      $tips1.css('display','block')
    }
  })

  $ipts.eq(1).blur(function (){
    var val = $(this).val().replace(/\s+/g,'')
    var reg = /^1[3456789]\d{9}$/
    if (!val){
      $tips2_5.eq(0).css('display','none')
    } else {
      if (reg.test(val)) {
        $tips2_5.eq(0).css('display','none')
        arr[1] = 1
      } else {
        arr[1] = 0
        $tips2_5.eq(0).css('display','block')
      }
    } 
  })

  $ipts.eq(2).blur(function (){
    var val = $(this).val().replace(/\s+/g,'')
    var reg = /^\w{0,6}$/
    if (reg.test(val)) { // 六位数的数字字母下划线
      $tips2_5.eq(1).css('display','none')
      arr[2] = 1
    } else {
      arr[2] = 0
      $tips2_5.eq(1).css('display','block')
    }
  })

  $ipts.eq(3).blur(function (){
    var val = $(this).val().replace(/\s+/g,'')//去掉空格
    var reg = /^\w{6,16}$/

    if (!val){ //用户没有输入
      $tips2_5.eq(2).css('display','none')
      arr[3] = 0
    } else {
      if (reg.test(val)) { // 基本判断是否是6-16位数字字母下划线(应分三个区段逐步提示用户)
        $tips2_5.eq(2).css('display','none')
        arr[3] = 1
        save = val // 保存用户输入的密码
      } else {
        arr[3] = 0
        $tips2_5.eq(2).css('display','block')
      }
    }
    
  })

  $ipts.eq(4).blur(function (){
    var confirmVal = $(this).val()  // 密码可以用空格，无需帮用户去除
    var designVal = $ipts.eq(3).val()
    if (confirmVal === designVal) { 
      $tips2_5.eq(3).css('display','none')
      arr[4] = 1
    } else {
      arr[4] = 0
      $tips2_5.eq(3).css('display','block')
    }
  })
  
  console.log(arr); // -----测试

  $registerNow.click(function (){
    // 判断，只要有一个验证不通过就阻止用户注册
    for (var i = 0, len = arr.length; i < len; i++){
      if (arr[i] === 0) {
        alert('请根据提示正确输入')
        return false
      }
    }
    setTimeout(function (){
      alert('注册成功,正在跳转登录页~~')
      location.href = './login.html'
    },2000)
  })


  // 监听回退事件
  window.addEventListener("popstate", function(e) {
    $read.prop('checked',false)
    // 帮用户将密码重新填充
    $ipts.eq(3).val(save)
    $ipts.eq(4).val(save)
  }, false);

  // 禁止回退页面
  // function pushHistory() { 
  //   var state = {title: "title",url: "#"};
  //   window.history.pushState(state, "title", "#"); 
  // }

})





