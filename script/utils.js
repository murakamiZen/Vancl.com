// 获取第一个元素子节点
function getFirstChild(dom){
  if (dom.firstElementChild) {
    return dom.firstElementChild
  } else {
    return dom.firstChild
  }
}
// 获取最后一个元素子节点
function getLastChild(dom){
  if (dom.lastElementChild) {
    return dom.lastElementChild
  } else {
    return dom.lastChild
  }
}
// 获取下一个兄弟子节点
function getNextNode(dom){
  if (dom.nextElementSibling) {
    return dom.nextElementSibling
  } else {
    return dom.nextSibling
  }
}
// 获取上一个兄弟子节点
function getPrevNode(dom){
  if (dom.previousElementSibling) {
    return dom.previousElementSibling
  } else {
    return dom.previousSibling
  }
}
// 生成 min~max区间的随机整数
function randomInt(min,max){
  return Math.round(Math.random()*(max-min))+min
}
// 生成随机16进制颜色值
function randomColor(){
  var str = '0123456789abcdef'// 0-15
  var color = '#'
  for (var i = 0, len = 6; i < len; i++){
    var index = randomInt(0,15)
    color += str[index]
  }
  return color
}
// 生成n位随机验证码（数字、字母（大小））
function randomCode(n){
  var num = ''
  for (var i = 0, len = n; i < len; i++){
    do {
      var ascii = randomInt(48,122)
    } while(ascii>57&&ascii<65 || ascii>90&&ascii<97)
    num += String.fromCharCode(ascii)
  }
  return num
}
// 判断数组中是否包含某个值
function has(arr,val){
  for (var i = 0, len = arr.length; i < len; i++){
    if (arr[i] == val) {
      return true
    }
  }
  return false
}
// 数组去重
function norepeat(arr){
  var arr1 = []
  for (var i = 0, len = arr.length; i < len; i++){
    if (!has(arr1,arr[i])) {
      arr1.push(arr[i])
    }
  }
  return arr1
}
// 获取元素样式 兼容IE678
function getStyle(dom,attr){
  if (dom.currentStyle) {
    return dom.currentStyle[attr]
  } else {
    return getComputedStyle(dom)[attr]
  }
}

function byClass(oClass){
  
}

// 添加事件监听（兼容低本版IE）
function addEvent(dom,type,callback){
  if (dom.addEventListener) {
    dom.addEventListener(type,callback)
  } else {
    dom.attachEvent('on'+type,callback)
  }
}
// 移除事件监听（兼容低本版IE）
function removeEvent(dom,type,callback){
  if (dom.removeEventListener) {
    dom.removeEventListener(type,callback)
  } else {
    dom.detachEvent('on'+type,callback)
  }
}
// 事件委托
function on(parent,type,selector,callback){
  // 1.给父级绑定事件
  addEvent(parent,type,function (ev){//父级的事件处理函数
    var e = ev || event//事件对象
    var target = e.target || e.srcElement//事件源
    // 获取选择器第一个字符
    var selector_first = selector.substr(0,1)
    // 记录选择器第一个字符后面的内容
    var selector_last = null
    // 记录选择器类型（id class 标签）
    var selector_type = null
    // 根据第一个字符判断选择器类型
    switch(selector_first){
      case '.':
        selector_type = 'className'
        selector_last = selector.slice(1)//'tit'
        break
      case '#':
        selector_type = 'id'
        selector_last = selector.slice(1)//'tit'
        break
      default:
        selector_type = 'tagName'
        selector_last = selector.toUpperCase()//'EM'
    }
    // if (target.tagName === selector.toUpperCase()){
    //   callback()
    // }
    // 判断点击元素是否为你希望触发事件的元素
    if (target[selector_type] === selector_last){
      callback.call(target,e)
    }
  })
}

// 获取某个元素到最外层左侧/顶部的距离
function offset(dom,bool){
  var l = 0
  var t = 0
  var domBDL = dom.clientLeft
  var domBDT = dom.clientTop
  while(dom){
    l += dom.clientLeft+dom.offsetLeft
    t += dom.clientTop+dom.offsetTop
    dom = dom.offsetParent
  }
  // return [l,t]
  if (bool) {// 带自身边框
    return {left: l,top: t}
  } else {// 不带自身边框
    return {left: l-domBDL,top: t-domBDT}
  }
}

function $1(selector){
  return document.querySelector(selector)
}
function $2(selector){
  return document.querySelectorAll(selector)
}

/** 
* 运动函数
* 参数：
*   dom 要运动的元素
*   attrObj 属性参数对象
*   callback 运动完成的回调函数
* 支持功能：
*   支持多个带px单位的属性：left top right bottom marginLeft marginTop width height ...
*   支持运动到任意位置
*   支持透明度运动
*   支持滚动条运动
*   可以自定义速度
*   支持多元素运动
*   支持多属性同时运动
*   支持运动完成之后进行其他操作（回调函数）
*/
function animate(dom,attrObj,callback){
  // attrObj = {
  //   'width': 200,
  //   'height': 200,
  //   'left': 532,
  //   'top': 500
  // }
  // attrObj = {
  //   'width':{
  //     'current': parseInt(getComputedStyle(dom)['width']),
  //     'target': attrObj['width']
  //   },
  //   'height':{
  //     'current': parseInt(getComputedStyle(dom)['height']),
  //     'target': attrObj['height']
  //   },
  //   'opacity':{
  //     'current': parseInt(getComputedStyle(dom)['opacity']*100),
  //     'target': attrObj['opacity']*100
  //   },
  //   ...
  // }
  for(var key in attrObj){
    // 判断要运动的属性
    if (key === 'opacity') {
      var current = parseInt( getComputedStyle(dom)[key]*100 )
      var target = attrObj[key]*100
    } else if (key.indexOf('scroll') !== -1) {
      var current = dom[key]// wrap.scrollTop
      var target = attrObj[key]
    } else {
      var current = parseInt( getComputedStyle(dom)[key] )
      var target = attrObj[key]
    }
    attrObj[key] = {
      'current': current,
      'target': target
    }
  }

  /* // 判断要运动的属性
  if (attr === 'opacity') {
    // 属性的当前值
    var current = parseInt( getComputedStyle(dom)[attr]*100 )
    // 属性的目标值
    target *= 100
  // } else if (attr === 'scrollTop' || attr === 'scrollLeft') {
  } else if (attr.indexOf('scroll') !== -1) {
    // 属性的当前值
    var current = dom[attr]
  } else {
    // 属性的当前值
    var current = parseInt( getComputedStyle(dom)[attr] )
  } */

  clearInterval(dom.timer)
  dom.timer = setInterval(function (){
    for (var key in attrObj){
      // 当前属性 key
      // key属性的当前值 attrObj[key].current
      var current = attrObj[key].current
      // key属性的目标值 attrObj[key].target
      var target = attrObj[key].target

      // 持续变化的速度
      var speed = (target-current)/10
      // 根据运动方向进行取整
      speed = speed>0?Math.ceil(speed):Math.floor(speed)

      // 当前位置+速度
      attrObj[key].current+=speed

      // 临界值判断(运动停止条件：剩余运动量 <= 每次的运动量)
      if ( Math.abs(target-current) <= Math.abs(speed) ) {
        attrObj[key].current = target//到达目的地
        
        // 删除运动完成的属性
        delete attrObj[key]

        // 判断对象中是否还有其他属性
        for (var attr in attrObj){//{}
          // 能执行进来说明对象还有其他属性
          return false//终止当前函数执行
        }
        
        // 所有属性运动完成，清除计时器
        clearInterval(dom.timer)

        // 运动完成执行回调函数
        typeof callback === 'function'?callback():''
      } else {
        // 持续改变运动属性
        if (key === 'opacity') {
          dom.style[key] = attrObj[key].current/100
        } else if (key.indexOf('scroll') !== -1) {
          dom[key] = attrObj[key].current
        } else {
          dom.style[key] = attrObj[key].current + 'px'
        }
      }
    }
  },20)
}

// IE 6 7 8不支持
function byClass(oClass){
  var arr = []
  var tags = document.all||document.getElementsByTagName('*')
  var reg = new RegExp('\\b'+oClass+'\\b')
  for (var i = 0, len = tags.length; i < len; i++){
    if ( reg.test(tags[i].className) ){
      arr.push(tags[i])
    }
  }
  return arr
}

function ajax(options){
  // 1.创建数据交互对象（XMLHttpRequest）
  var xhr = new XMLHttpRequest()//除了IE56其他都支持

  var data = ''
  if (typeof options.data === 'string'){
    // 如果参数是字符串不做任何处理
    data = options.data
  }
  if (Object.prototype.toString.call(options.data) === '[object Object]'){
    // 如果参数是对象，转成参数字符串 'user=xiaocuo&pass=123456'
    for (var key in options.data){
      data += (key+'='+options.data[key]+'&')
    }
    // 'user=xiaocuo&pass=123456&'
    data = data.substring(0,data.length-1)
  }
  // console.log(data)//'user=xiaocuo&pass=123456'

  if (options.type.toLowerCase() === 'get') {
    // 2.初始化请求
    if (options.cache) {
      xhr.open(options.type,options.url+'?'+data,true)
    } else {
      xhr.open(options.type,options.url+'?'+data+'&_='+Date.now(),true)
    }
    // 3.发送请求
    xhr.send(null)
  } else if (options.type.toLowerCase() === 'post'){
    // 2.初始化请求
    xhr.open(options.type,options.url,true)
    // 设置请求头，模拟表单post提交数据
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    // 3.发送请求
    xhr.send(data)
  } else {
    alert('仅支持 get和post 请求方式！')
    return //结束执行
  }

  // 4.请求响应状态
  // xhr.readyState 属性值会从0-4发送变化
  // 当xhr.readyState属性发生变化时，会触发onreadystatechange事件
  xhr.onreadystatechange = function (){
    // console.log( xhr.readyState )//2 3 4
    if (xhr.readyState === 4) {//请求完成
      // 响应状态码 xhr.status
      if (xhr.status >=200 && xhr.status < 300) {// 响应就绪
        // 可以拿到数据了
        // xhr.responseText  接收文本字符串数据
        // xhr.responseXML  接收xml数据
        if (options.dataType === 'json') {
          var json = JSON.parse(xhr.responseText)
          options.success(json)
        } else if (options.dataType === 'xml') {
          options.success(xhr.responseXML)
        } else {
          options.success(xhr.responseText)
        }
      } else {
        options.error(xhr.status)
      }
    }
  }
}

function jsonp(options){
  // 把success添加为全局方法hehe
  window[options.jsonpCallback] = options.success

  // 格式data数据
  var data = ''
  if (typeof options.data === 'string') {
    data = options.data
  }
  if (Object.prototype.toString.call(options.data) === '[object Object]') {
    for (var key in options.data){
      data += (key+'='+options.data[key]+'&')
    }
    data = data.substring(0,data.length-1)
  }

  // 动态添加script标签
  var oScript = document.createElement('script')
  oScript.src = options.url+'?'+options.jsonp+'='+options.jsonpCallback+'&'+data
  // 'http://suggestion.baidu.com/su?cb=hehe&wd='+ipt.value
  document.body.appendChild(oScript)
  // 数据加载完成删除 script 标签
  oScript.onload = function (){
    document.body.removeChild(oScript)
  }
}

function promiseAjax(options){
  return new Promise(function (resolve,reject){
    // 1.创建数据交互对象（XMLHttpRequest）
    var xhr = new XMLHttpRequest()//除了IE56其他都支持

    var data = ''
    if (typeof options.data === 'string'){
      // 如果参数是字符串不做任何处理
      data = options.data
    }
    if (Object.prototype.toString.call(options.data) === '[object Object]'){
      // 如果参数是对象，转成参数字符串 'user=xiaocuo&pass=123456'
      for (var key in options.data){
        data += (key+'='+options.data[key]+'&')
      }
      // 'user=xiaocuo&pass=123456&'
      data = data.substring(0,data.length-1)
    }
    // console.log(data)//'user=xiaocuo&pass=123456'

    if (options.type.toLowerCase() === 'get') {
      // 2.初始化请求
      if (options.cache) {
        xhr.open(options.type,options.url+'?'+data,true)
      } else {
        xhr.open(options.type,options.url+'?'+data+'&_='+Date.now(),true)
      }
      // 3.发送请求
      xhr.send(null)
    } else if (options.type.toLowerCase() === 'post'){
      // 2.初始化请求
      xhr.open(options.type,options.url,true)
      // 设置请求头，模拟表单post提交数据
      xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
      // 3.发送请求
      xhr.send(data)
    } else {
      alert('仅支持 get和post 请求方式！')
      return //结束执行
    }

    // 4.请求响应状态
    // xhr.readyState 属性值会从0-4发送变化
    // 当xhr.readyState属性发生变化时，会触发onreadystatechange事件
    xhr.onreadystatechange = function (){
      // console.log( xhr.readyState )//2 3 4
      if (xhr.readyState === 4) {//请求完成
        // 响应状态码 xhr.status
        if (xhr.status >=200 && xhr.status < 300) {// 响应就绪
          // 可以拿到数据了
          // xhr.responseText  接收文本字符串数据
          // xhr.responseXML  接收xml数据
          if (options.dataType === 'json') {
            var json = JSON.parse(xhr.responseText)
            resolve(json)
          } else if (options.dataType === 'xml') {
            resolve(xhr.responseXML)
          } else {
            resolve(xhr.responseText)
          }
        } else {
          reject(xhr.status)
        }
      }
    }
  })
}

// 获取url中的某个参数值
function getQueryString(key){
  var url = location.href;
  var searchStr = url.split('?')[1];
  var reg = new RegExp('[&]?'+key+'=([^&#]*)[&]?','i');
  var arr = searchStr.match(reg);
  return (RegExp.$1);
}

// 封装设置cookie
function setCookie(options){
  if (!options.key || !options.val) {
    throw new Error('设置失败，缺少必须参数！')
  }
  // 可选参数的默认值
  options.domain = options.domain||''
  options.path = options.path||''
  options.days = options.days||0
  // 判断是否设置有效期
  if (options.days === 0){//不设置有效期
    document.cookie = options.key+'='+escape(options.val)+'; domain='+options.domain+'; path='+options.path
  } else {//设置有效期
    var d = new Date()
    d.setDate(d.getDate()+options.days)
    document.cookie = options.key+'='+escape(options.val)+'; domain='+options.domain+'; path='+options.path+'; expires='+d
  }
}

// 封装获取cookie
function getCookie(key){
  var arr = document.cookie.split('; ')
  // ["user1=xiaoming", "user3=xiaodong"]
  for (var i = 0, len = arr.length; i < len; i++){
    var arr2 = arr[i].split('=')// ["user1","xiaoming"]
    if (arr2[0]===key) {
      // return arr2[1]
      return unescape(arr2[1])
    }
  }
  return null//没有数据
}

// 删除cookie
// cookie过期会被浏览器删除
function removeCookie(key){
  setCookie({
    'key': key,
    'val': '123',
    days: -2
  })
}
