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
                <td class="num">
                  <div>
                    <a class="decrease" data-id="${item.id}"></a>
                    <input type="text" value=${obj.num}>
                    <a class="increase" data-id="${item.id}"></a>
                  </div>
                </td>
                <td class="cheap">-</td>
                <td class="subtotal">
                  <div>￥${(item.salePrice * obj.num).toFixed(1)}</div>
                </td>
                <td class="operate" data-id="${item.id}">删除
                  <div class="delAlert">
                    <p class="msg">确定要删除此商品吗</p>
                    <p class="button">
                      <a class="yes">确定</a>
                      <a class="cancle">取消</a>
                    </p>
                    <span class="triangle"></span>
                  </div>
                </td>
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
    

    // 全选1(四种方式拿到checked属性)-----(三种方式设置checked属性)
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
        $checks = $('tbody .choose input')
        var totalPrice = 0 
        var totalNum = 0

        // 全选1与金额总计的关联
        $.each($subtotal, function (index, item){
          // totalPrice += Number(item.innerText.slice(1)) ---方法1
          totalPrice += Number($(item).text().split('￥')[1]) // ---方法2
        })

        // 临界值，当购物车没有商品时计算渲染不同精度的数据
        if ($checks.length <= 0){
          $('.summary .total em').text('￥'+ '0')
        } else {
          $('.summary .total em').text('￥'+totalPrice.toFixed(1))
        }
        
        // 全选1与数量总计的关联
        $.each($num, function (index, item){
          // totalNum += item.value
          totalNum += parseInt($(item).val())
        })
        $('.summary .bar span em').text(totalNum)
      } else {
        $('tbody tr .choose input').removeAttr('checked')  
        $('.summary .bar input').removeAttr('checked')  
        $('.summary .total em').text('￥'+'0')
        $('.summary .bar span em').text(0)
      }     

      // 免运费
      $totalPrice = $('.summary .total em')
      $totalVal = $totalPrice.text().slice(1)
      $carriage = $('.summary .bar .carriage')
      if( $totalVal >= 188 ){
        $carriage.show()
      } else {
        $carriage.hide()
      }
    })

    //全选2
    $('.cartProduct').on('click','.summary .bar input',function (){
      if ($('.summary .bar input').prop('checked')) {
        $('tbody tr .choose input').prop('checked',true)
        $('.cartProduct thead .theadAll').prop('checked',true)
        $subtotal = $('tbody .subtotal')
        $num = $('tbody .num input')
        $checks = $('tbody .choose input')
        var totalPrice = 0 
        var totalNum = 0

        // 全选2与金额总计的关联
        $.each($subtotal, function (index,item){
          totalPrice += Number(item.innerText.split('￥')[1])
        })

        // 临界值，当购物车没有商品时计算渲染不同精度的数据
        if ($checks.length <= 0){
          $('.summary .total em').text('￥'+ '0')
        } else {
          $('.summary .total em').text('￥'+totalPrice.toFixed(1))
        }
        
        // 全选2与数量总计的关联
        $.each($num, function (index, item){
          // totalNum += item.value
          totalNum += parseInt($(item).val())
        })
        $('.summary .bar span em').text(totalNum)
      } else {
        $('tbody tr .choose input').removeAttr('checked')  
        $('.cartProduct thead .theadAll').removeAttr('checked') 
        $('.summary .total em').text('￥'+'0')   
        $('.summary .bar span em').text(0)
      }    
      // 免运费
      $totalPrice = $('.summary .total em')
      $totalVal = $totalPrice.text().slice(1)
      $carriage = $('.summary .bar .carriage')
      if( $totalVal >= 188 ){
        $carriage.show()
      } else {
        $carriage.hide()
      } 
    })


    // // 手动输入数量和小计价格的关联
    // // 获得焦点
    // $('.cartProduct table').on('focus','tbody .num input',function (){
    //   $lastVal = $('tbody .num input').val()
      
    // })
    // // 失去焦点
    // $('.cartProduct table').on('blur','tbody .num input',function ($lastVal){
      
    //   $subtotal = $(this).closest('.selected').find('.subtotal')
    //   $inputVal = $(this).val()
    //   $priceVal = $(this).closest('.num').prev().text().slice(1)

    //   $subtotalVal = (Number( $inputVal*$priceVal )).toFixed(1)
    //   $subtotal.text('￥'+ $subtotalVal )

    //   // console.log( $lastVal );
    //   if(!$(this)){
    //     $(this).val( $lastVal )
    //   }

    //   // 手动更改后重新获取商品数据
    //   $checks = $('tbody .choose input') 
    //   $num = $('tbody .num input') 
    //   $subtotal = $('tbody .subtotal') 
    //   $.each($checks,function (index,item){
    //     if ( $(this).prop('checked')) {
    //       // 关联单行复选框和金额总计
    //       totalPrice += Number($(item).parent().siblings('.subtotal').text().slice(1))
    //       // 关联单行复选框和数量总计
    //       totalNum += parseInt($(item).parent().siblings('.num').find('input').val())
    //     }
    //   }) 
    //   $('.summary .bar span em').text(totalNum)
    //   $('.summary .total em').text('￥'+ totalPrice)
    //     // 更新本地存储的数据
    //   localStorage.setItem('goods',JSON.stringify(goodsArr))
    // })
     
    
    

    // 商品数量减1
    $('.cartProduct table').on('click','tbody .num .decrease',function (){
      $num = Number($(this).siblings('input').val()) - 1
      $eachPrice = Number($(this).closest('.num').siblings('.price').text().slice(1))
      $subtotal = ($num * $eachPrice).toFixed(1)
      $flag = $(this).closest('.num').siblings('.choose').children('input')
      $count = $('.summary .total em').text().slice(1)
      $numTotal = $('.summary .bar span em').text()
      $checks = $('tbody .choose input')
      $(this).siblings('input').val($num)
      $(this).closest('.num').siblings('.subtotal').text('￥'+$subtotal) 

      // 关联商品数量减少和金额总计与数量总计
      if ($flag.prop('checked')){
        $count -= $eachPrice
        $numTotal -= 1
        $('.summary .total em').text('￥'+$count.toFixed(1))   
        $('.summary .bar span em').text($numTotal)
      }

      // 临界值判断
      if ($(this).siblings('input').val() <= 0){
        if ($flag.prop('checked')){
          $('.summary .bar span em').text($numTotal+1)
          $('.summary .total em').text('￥'+($count+$eachPrice).toFixed(1))  
        }
        $(this).siblings('input').val(1)
        $(this).closest('.num').siblings('.subtotal').text('￥'+$eachPrice.toFixed(1))  
        $('.cartProduct table').off('click', $(this))

      }  
      if ($(this).siblings('input').val() <= 1){
        $(this).css('background', 'url(../image/cartsprite.png) no-repeat -85px 0px')
        $(this).css('cursor', 'auto')
      }
      // 关联商品减少和本地存储
      var id = $(this).attr('data-id')
      $.each(goodsArr,function (index,item){
        if (item.id == id){
          item.num--
          // 临界值判断
          if (item.num <= 0){
            item.num = 1
          }
          return false
        }  
      })
      localStorage.setItem('goods',JSON.stringify(goodsArr))

      // 免运费
      $totalPrice = $('.summary .total em')
      $totalVal = $totalPrice.text().slice(1)
      $carriage = $('.summary .bar .carriage')
      if( $totalVal >= 188 ){
        $carriage.show()
      } else {
        $carriage.hide()
      }
    })

    // 商品数量加1
    $('.cartProduct table').on('click','tbody .num .increase',function (){
      $num = Number($(this).siblings('input').val()) + 1
      $eachPrice = Number($(this).closest('.num').siblings('.price').text().slice(1))
      $subtotal = ($num * $eachPrice).toFixed(1)
      $flag = $(this).closest('.num').siblings('.choose').children('input')
      $count = Number($('.summary .total em').text().slice(1))
      $numTotal = parseInt($('.summary .bar span em').text())

      $(this).siblings('input').val($num)
      $(this).closest('.num').siblings('.subtotal').text('￥'+$subtotal)

      // 关联商品数量增加和金额总计与数量总计
      if ($flag.prop('checked')){
        $count += $eachPrice
        $numTotal += 1
        $('.summary .total em').text('￥'+$count.toFixed(1))   
        $('.summary .bar span em').text($numTotal)
      }

      // 关联商品增加和本地存储
      var id = $(this).attr('data-id')
      $.each(goodsArr,function (index,item){
        if (item.id == id){
          item.num++
          return false
        }  
      })
      localStorage.setItem('goods',JSON.stringify(goodsArr))

      if ($(this).siblings('input').val() > 1){
        $decrease = $(this).closest('.num').find('.decrease')
        $decrease.css('background', 'url(../image/cartsprite.png) no-repeat -51px 0px')
        $decrease.css('cursor', 'pointer')
      }

      // 免运费
      $totalPrice = $('.summary .total em')
      $totalVal = $totalPrice.text().slice(1)
      $carriage = $('.summary .bar .carriage')
      if( $totalVal >= 188 ){
        $carriage.show()
      } else {
        $carriage.hide()
      }

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
        var num = 0
        $.each($checks,function (index,item){
          // console.log($(item).is(':checked'));
          // console.log(item.checked)  
          if (item.checked) {
            num++
          }
        })  

        // 注意循环遍历完成后再进行比较！
        if (num < $checks.length){
          $('.cartProduct thead .theadAll').prop('checked',false)
          $('.summary .bar input').prop('checked',false)
        } else {
          $('.cartProduct thead .theadAll').prop('checked',true)
          $('.summary .bar input').prop('checked',true)
        }
      } else {
        $('.cartProduct thead .theadAll').removeAttr('checked')
        $('.summary .bar input').removeAttr('checked')
      }

      var flag = false
      $.each($checks, function (index, item){
        if (item.checked){
          // 关联单行复选框和金额总计(此处注意仅需遍历选中的小计价格累加)
          totalPrice += Number($(this).parent('tbody .choose').siblings('.subtotal').text().split('￥')[1])
          // 关联单行复选框和数量总计
          totalNum += parseInt($(this).parent('tbody .choose').siblings('.num').find('input').val())
          flag = true
        }

      })
      if (flag){
        totalPrice = totalPrice.toFixed(1)
      } 
      $('.summary .total em').text('￥'+totalPrice)
      $('.summary .bar span em').text(totalNum)

      // 免运费
      $totalPrice = $('.summary .total em')
      $totalVal = $totalPrice.text().slice(1)
      $carriage = $('.summary .bar .carriage')
      if( $totalVal >= 188 ){
        $carriage.show()
      } else {
        $carriage.hide()
      }
    })

    // 删除1
    $('.cartProduct').on('click','tbody tr td.operate',function (){
      $checks = $('tbody .choose input') 
      $num = $('tbody .num input') 
      $subtotal = $('tbody .subtotal') 
      
      var totalPrice = 0 
      var totalNum = 0
      // 当前点击的商品id
      var id = $(this).attr('data-id')
      $.each(goodsArr,function (index, item){
        if (item.id === id) {
          goodsArr.splice(index,1)
          return false
        }
      })
      // 弹窗询问是否删除
      $delAlert = $(this).find('.delAlert')
      $delAlert.css('display', 'block')
      $yes = $('.operate .delAlert .yes')
      $cancle = $('.operate .delAlert .cancle')
      $('.cartProduct').on('click','.operate .delAlert .yes',function (){
         $(this).closest('.selected').remove()
      })
      $('.cartProduct').on('click','.operate .delAlert .cancle',function (){
        $delAlert.remove()
      })
      // 删除1移除商品(dom结构)
      // $(this).parent().remove()
      // 更新本地存储的数据
      localStorage.setItem('goods',JSON.stringify(goodsArr))
      // 本地存储里没有商品
      if (goodsArr.length <= 0) {
        localStorage.removeItem('goods')
        var newTr = `<tr><td colspan="11"><h1 style="color:#aaa"> &nbsp; 购物车空空如也，快去加购商品吧！</h1></td></tr> `
        $('tbody .emptyGoods').before(newTr)
        $('.cartProduct thead .theadAll').prop('checked',false)
        $('.summary .bar input').prop('checked',false)
      }

      
      // 判断用户点击删除1的时候是否为多选，重新获取商品数据，计算总价格
      if($checks.length >= 2){
        // 重新获取商品数据
        $checks = $('tbody .choose input') 
        $num = $('tbody .num input') 
        $subtotal = $('tbody .subtotal') 
        $.each($checks,function (index,item){
          if ( $(this).prop('checked')) {
            // 关联单行复选框和金额总计
            totalPrice += Number($(item).parent().siblings('.subtotal').text().split('￥')[1])
            // 关联单行复选框和数量总计
            totalNum += parseInt($(item).parent().siblings('.num').find('input').val())
          }
        }) 
        // totalPrice = totalPrice.toFixed(1)
        $('.summary .bar span em').text(totalNum)
        $('.summary .total em').text('￥'+ totalPrice)
      }

      // 免运费
      $totalPrice = $('.summary .total em')
      $totalVal = $totalPrice.text().slice(1)
      $carriage = $('.summary .bar .carriage')
      if( $totalVal >= 188 ){
        $carriage.show()
      } else {
        $carriage.hide()
      }
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
              // ！！！注意此处只要在本地存储中遍历到和选中商品的id相同把该id从本地存储中删除即可，后面无需遍历必须return false。
              // ！！！若继续遍历会报错，因为已经删除了永远找不到item.id ===  id
              return false        
            }
          })
          $(this).closest('tr').remove()
        }
      })

      // 更新本地存储的数据
      localStorage.setItem('goods',JSON.stringify(goodsArr))
      var flag = false
      if (goodsArr.length <= 0) {
        localStorage.removeItem('goods')
        var newTr = `<tr><td colspan="11"><h1 style="color:#aaa"> &nbsp; 购物车空空如也，快去加购商品吧！</h1></td></tr>`
        $('tbody .emptyGoods').before(newTr)
        flag = true
      }

      // 判断用户点击删除2的时候是否有勾选
      // console.log($checks.is(':checked'));
      if (!$checks.is(':checked')){  // 用户没有勾选
        alert('请先选择要删除的商品。')
      } else {  // 用户勾选了
        // 删除后购物车无商品
        if (flag){
          $allChoose1.prop('checked',false)
          $allChoose2.prop('checked',false)
        } else {
          // 删除后购物车还有剩余商品
          $.each($checks, function (index, item){
            $(this).prop('checked',true)
          })
          $allChoose1.prop('checked',true)
          $allChoose2.prop('checked',true)
        }

        // 关联删除2和金额总计
        $subtotal = $('tbody .subtotal') // 此处必须在删除后获取节点！
        $num = $('tbody .num input')
        $.each($subtotal, function (index, item){
          totalPrice += Number($(item).text().slice(1))
        })
        $('.summary .total em').text('￥'+totalPrice)
        // 关联删除2和数量总计
        $.each($num, function (index, item){
          totalNum += parseInt($(item).val())
        })
        $('.summary .bar span em').text(totalNum)
      }

      // 免运费
      $totalPrice = $('.summary .total em')
      $totalVal = $totalPrice.text().slice(1)
      $carriage = $('.summary .bar .carriage')
      if( $totalVal >= 188 ){
        $carriage.show()
      } else {
        $carriage.hide()
      }
    })
      
    // 结算框数量与金额总计
    var $checks = $('tbody .choose input')
    var totalPrice = 0 
    var totalNum = 0
    $.each($checks, function (index, item){
      if (item.checked){
        // 关联单行复选框和金额总计(此处注意仅需遍历选中的小计价格累加)
        totalPrice += Number($(this).parent().siblings('.subtotal').text().slice(1))
        // 关联单行复选框和数量总计
        totalNum += parseInt($(this).parent().siblings('.num').find('input').val())
      }
    })
    $('.summary .total em').text('￥'+totalPrice)
    $('.summary .bar span em').text(totalNum)
    
    // 结算框支付跳转
    $('.cartProduct').on('click','.calculate .goPay',function (){

      // 检查本地存储的数据
      var flag = 1
      if (goodsArr.length <= 0) {
        localStorage.removeItem('goods')
        flag = 0
      }
      $count = $('.summary .total em').text().slice(1)
      if (!parseInt($count)){
        if(!flag){
          alert('购物车没有商品哦，先去挑选心仪的商品吧~')
          return
        } else{
          alert('您还未勾选任何商品，请先勾选要购买的商品~')
        }
      } else {
        alert('正在跳转支付页面，亲，您一共需支付 '+ $count +' 元，详情联系客服')
      }
    })
  } else {
    var newTr = `<tr class="empty"><td colspan="11"><h1 style="color:#aaa"> &nbsp; 购物车空空如也，快去加购商品吧！</h1></td></tr>`
    $('tbody .emptyGoods').before(newTr)

    $('.calculate .goPay').click( function (){
        alert('购物车没有商品哦，请先去挑选心仪的商品吧~')  
    })
  }



})

