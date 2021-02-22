$(function (){
  
  if (localStorage.getItem('goods')) {
    var goodsArr = JSON.parse(localStorage.getItem('goods'))

    $.ajax({
      type: 'get',
      url: '../data/goodsList.json',
      dataType: 'json',
      cache: false,
      success: function (json){
        var domStr = ''
        $.each(json,function (index,item){
          $.each(goodsArr,function (i,obj){
            if (item.id === obj.id){
              domStr += 
              `
              <tr class="selected">
                <td class="white-space-w"></td>
                <td class="choose"><input type="checkbox" data-id="${item.id}"></td>
                <td class="photo"><img src="${item.imgurl}" alt=""></td>
                <td class="goodsInfo">${item.title}</td>
                <td class="size">L</td>
                <td class="price">￥${item.salePrice}</td>
                <td class="num"><div><a class="decrease">-</a><input type="text" value=${obj.num}><a class="increase">+</a></div></td>
                <td class="cheap">-</td>
                <td class="subtotal">￥${parseFloat(item.salePrice) * obj.num}</td>
                <td class="operate" data-id="${item.id}">删除</td>
                <td class="white-space-w"></td>
              </tr>
              `
            }           
          }) 
        })
        $('tbody .emptyGoods').before(domStr)
      },
      error: function (msg){
        console.log(msg)
      }
    })
    
    // 全选1(四种方式拿到checked属性)-----(三种方式设置设置checked属性)
    $('.cartProduct').on('click','thead .theadAll',function (){
      if ($('.cartProduct thead .theadAll').prop('checked')) {
      // if ($('.cartProduct thead .theadAll').get(0).checked) {
      // if ($('.cartProduct thead .theadAll').is(':checked')){
      // if (document.querySelector('.cartProduct thead .theadAll').checked){

      // $('tbody tr .choose input').attr('checked',true)
      // $('tbody tr .choose input').get(0).checked = true ----此处设置的是所有商品复选框的 第一个 复选框
      // document.querySelectorAll('.tbody tr .choose input').checked = true ------原生API不可直接 同时操作 多个元素 只能遍历设置！！！
      $('tbody tr .choose input').prop('checked',true)
      $('.summary .bar input').prop('checked',true)
      $subtotal = $('tbody .subtotal')
      $num = $('tbody .num input')
      var totalPrice = 0 
      var totalNum = 0
      // 全选1与金额总计的关联
      $.each($subtotal, function (index, item){
        // totalPrice += Number(item.innerText.slice(1)) ---方法1
        totalPrice += parseInt($(item).text().slice(1)) // ---方法2
      })
      $('.summary .total em').text('￥'+totalPrice)
      // 全选1与数量总计的关联
      $.each($num, function (index, item){
        // totalNum += item.value
        totalNum += parseInt($(item).val())
      })
      $('.summary .bar span em').text(totalNum)
    } else {
      $('tbody tr .choose input').removeAttr('checked')  
      $('.summary .bar input').removeAttr('checked')  
      $('.summary .total em').text('￥'+'0.00')
      $('.summary .bar span em').text(0)
    }     
  })

  //全选2
  $('.cartProduct').on('click','.summary .bar input',function (){
    if ($('.summary .bar input').prop('checked')) {
      $('tbody tr .choose input').prop('checked',true)
      $('.cartProduct thead .theadAll').prop('checked',true)
      $subtotal = $('tbody .subtotal')
      $num = $('tbody .num input')
      var totalPrice = 0 
      var totalNum = 0
      // 全选2与金额总计的关联
      $.each($subtotal, function (index,item){
        totalPrice += Number(item.innerText.slice(1))
      })
      $('.summary .total em').text('￥'+totalPrice)
      // 全选2与数量总计的关联
      $.each($num, function (index, item){
        // totalNum += item.value
        totalNum += parseInt($(item).val())
      })
      $('.summary .bar span em').text(totalNum)
    } else {
      $('tbody tr .choose input').removeAttr('checked')  
      $('.cartProduct thead .theadAll').removeAttr('checked') 
      $('.summary .total em').text('￥'+'0.00')   
      $('.summary .bar span em').text(0)
    }     
  })

  // 商品数量减1
  $('.cartProduct table').on('click','tbody .num .decrease',function (){
    if ($(this).siblings('input').val() <= 1){
      alert('商品数量为1，不能再减少了！')
    } else {
      $num = Number($(this).siblings('input').val()) - 1
      $eachPrice = $(this).closest('.num').siblings('.price').text().slice(1)
      $subtotal = $num * $eachPrice
      $(this).siblings('input').val($num)
      $(this).closest('.num').siblings('.subtotal').text('￥'+$subtotal) 

      // 关联商品数量减少和金额总计与数量总计
      $flag = $(this).closest('.num').siblings('.choose').children('input')
      $count = $('.summary .total em').text().slice(1)
      $numTotal = $('.summary .bar span em').text()
      if (!$flag.prop('checked')){
        return
      }
      $count -= $eachPrice
      $numTotal -= 1
      $('.summary .total em').text('￥'+$count)   
      $('.summary .bar span em').text($numTotal)
      

      // var id = $(this).siblings('em').attr('data-id')
     
      // $.each(goodsArr,function (index,item){
      //   if (item.id == id){
      //     item.num--
      //     return false
      //   }  
      // })

      // localStorage.setItem('goods',JSON.stringify(goodsArr))
    }
  })

  // 商品数量加1
  $('.cartProduct table').on('click','tbody .num .increase',function (){
    $num = Number($(this).siblings('input').val()) + 1
    $eachPrice = parseInt($(this).closest('.num').siblings('.price').text().slice(1))
    $subtotal = $num * $eachPrice
    $(this).siblings('input').val($num)
    $(this).closest('.num').siblings('.subtotal').text('￥'+$subtotal)

    // 关联商品数量增加和金额总计与数量总计
    $flag = $(this).closest('.num').siblings('.choose').children('input')
    $count = parseInt($('.summary .total em').text().slice(1))
    $numTotal = parseInt($('.summary .bar span em').text())
    if (!$flag.prop('checked')){
      return
    }
    $count += $eachPrice
    $numTotal += 1
    $('.summary .total em').text('￥'+$count)   
    $('.summary .bar span em').text($numTotal)


    // var id = $(this).siblings('em').attr('data-id')
    
    // json数据遍历
    // $.each(goodsArr,function (index,item){
    //   if (item.id == id){
    //     item.num++
    //     return false
    //   }  
    // })

    // localStorage.setItem('goods',JSON.stringify(goodsArr))
  })


  // 1.单行复选框和全选1、全选2的对应关系 
  // 2.单行复选框和数量总计与金额总计的对应关系
  $('.cartProduct').on('click','tbody .choose input',function (){ 
    $checks = $('tbody .choose input')
    var totalPrice = 0 
    var totalNum = 0
    // 遍历其他所有单选框是否都是选中，选中则让全选1、全选2都选中
    if ($(this).prop('checked')){
      // 关联单行复选框和全选1、全选2
      $.each($checks,function (index,item){
        // console.log($(item).is(':checked'));
        // console.log(item.checked)
        if (!item.checked){
          $('.cartProduct thead .theadAll').prop('checked',false)
          $('.summary .bar input').prop('checked',false)
        } else {
          $('.cartProduct thead .theadAll').prop('checked',true)
          $('.summary .bar input').prop('checked',true)
        }  
      })  
    } else {
      $('.cartProduct thead .theadAll').removeAttr('checked')
      $('.summary .bar input').removeAttr('checked')
    }

    $.each($checks, function (index, item){
      if (item.checked){
        // 关联单行复选框和金额总计(此处注意仅需遍历选中的小计价格累加)
        totalPrice += parseInt($(this).parent().siblings('.subtotal').text().slice(1))
        // 关联单行复选框和数量总计
        totalNum += parseInt($(this).parent().siblings('.num').find('input').val())
      }
      $('.summary .total em').text('￥'+totalPrice)
      $('.summary .bar span em').text(totalNum)
    })

  })

  // 删除1
  $('.cartProduct').on('click','tbody tr td.operate',function (){
    // 当前点击的商品id
    var id = $(this).attr('data-id')
    $.each(goodsArr,function (index, item){
      if (item.id === id) {
        goodsArr.splice(index,1)
        return false
      }
    })
    // 删除1移除商品(dom结构)
    $(this).parent().remove()
    // 更新本地存储的数据
    localStorage.setItem('goods',JSON.stringify(goodsArr))
    if (goodsArr.length <= 0) {
      localStorage.removeItem('goods')
      var newTr = `<tr><td colspan="11"><h1 style="color:#aaa">购物车空空如也，快去加购商品吧！</h1></td></tr>`
      $('tbody .emptyGoods').before(newTr)
    }

    var $subtotal = $('tbody .subtotal')
    var $num = $('tbody .num input')
    var totalPrice = 0 
    var totalNum = 0
    // 关联删除1和金额总计
    $.each($subtotal, function (index, item){
      totalPrice += parseInt($(item).text().slice(1))
    })
    $('.summary .total em').text('￥'+totalPrice)
    // 关联删除1和数量总计
    $.each($num, function (index, item){
      totalNum += parseInt($(item).val())
    })
    $('.summary .bar span em').text(totalNum)
  })

  // 删除2(删除特定勾选的复选框商品后默认自动全选，并重新计算金额和数量总计)
  $('.cartProduct').on('click','.summary .bar .del',function (){
    $checks = $('tbody .choose input')
    $allChoose1 = $('thead .theadAll')
    $allChoose2 = $('.summary .bar input')
    var totalPrice = 0 
    var totalNum = 0

    // 删除2移除商品
    $.each($checks, function (index, item){
      if (item.checked){
        var id = $(this).attr('data-id')
        $.each(goodsArr,function (index, item){
          if (item.id === id) {
            goodsArr.splice(index,1)
          }
        })
        $(this).closest('tr').remove()
      }
    })
    // 更新本地存储的数据
    localStorage.setItem('goods',JSON.stringify(goodsArr))
    if (goodsArr.length <= 0) {
      localStorage.removeItem('goods')
      var newTr = `<tr><td colspan="11"><h1 style="color:#aaa">购物车空空如也，快去加购商品吧！</h1></td></tr>`
      $('tbody .emptyGoods').before(newTr)
    }
    $.each($checks, function (index, item){
      $(this).prop('checked',true)
    })
    $allChoose1.prop('checked',true)
    $allChoose2.prop('checked',true)
    
    
    // 关联删除2和金额总计
    $subtotal = $('tbody .subtotal') // 此处必须在删除后获取节点！
    $num = $('tbody .num input')
    $.each($subtotal, function (index, item){
      totalPrice += parseInt($(item).text().slice(1))
    })
    $('.summary .total em').text('￥'+totalPrice)
    // 关联删除2和数量总计
    $.each($num, function (index, item){
      totalNum += parseInt($(item).val())
    })
    $('.summary .bar span em').text(totalNum)
  })
    
  // 结算框数量与金额总计
  var $checks = $('tbody .choose input')
  var totalPrice = 0 
  var totalNum = 0
  $.each($checks, function (index, item){
    if (item.checked){
      // 关联单行复选框和金额总计(此处注意仅需遍历选中的小计价格累加)
      totalPrice += parseInt($(this).parent().siblings('.subtotal').text().slice(1))
      // 关联单行复选框和数量总计
      totalNum += parseInt($(this).parent().siblings('.num').find('input').val())
    }
    $('.summary .total em').text('￥'+totalPrice)
    $('.summary .bar span em').text(totalNum)
  })

  // 结算框支付跳转
  $('.cartProduct').on('click','.calculate .goPay',function (){
    $count = $('.summary .total em').text().slice(1)
    alert('正在跳转支付页面，亲，您即将消费 '+$count+' 元，如年后钱包空空，小店也概不赊账，如实在想买，可提供特别滴等价交换服务哟~~详情联系客服')
  })

  } else {
    var newTr = `<tr><td colspan="11"><h1 style="color:#aaa">购物车空空如也，快去加购商品吧！</h1></td></tr>`
    $('tbody .emptyGoods').before(newTr)    
  }
})



  // 原生js
  // var decs = document.querySelector('.cartProduct tbody .num .decrease')
  // var incs = document.querySelector('.cartProduct tbody .num .increase')
  // var nums = document.querySelector('.cartProduct tbody .num input')

  // for ( var i = 0, len = decs.length; i < len; i++ ) {
  //   decs[i].index = i
  //   decs[i].onclick = function (){
  //     nums[this.index].value -=1
  //     if (num.value <= 0){
  //       alert('亲，商品数量不能少于1哟！')
  //     }
  //   }
  // }

  // for ( var i = 0, len = incs.length; i < len; i++ ) {
  //   incs[i].index = i
  //   incs[i].onclick = function (){
  //     nums[this.index].value +=1
  //     if (num.value >5){
  //       alert('老子只卖5件，呵呵哒')
  //     }
  //   }
  // }


  
// } else {

//   var newLi = `<li>购物车空空如也，快去加购商品吧！</li>`
//   $('.list').html(newLi)
// }