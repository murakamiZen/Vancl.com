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
                    <input type="text" min="0" max="100" value=${obj.num} required=true>
                    <a class="increase" data-id="${item.id}"></a>
                  </div>
                </td>
                <td class="cheap">-</td>
                <td class="subtotal">
                  <div class="subVal">￥${(item.salePrice * obj.num).toFixed(1)}</div>
                </td>
                <td class="operate" data-id="${item.id}">删除 </td>
                <td>
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

        // 商品数量和减号的关联
        firstNum = $('tbody .selected .num input').val()
        // -51 是大于1效果，-85是等于1效果，-69是hover效果
        $.each(firstNum, function(index, item ) {
          if(firstNum > 1){
            $('tbody .selected .num .decrease').css('background', 'url(../image/cartsprite.png) no-repeat -51px 0px')
            $('tbody .selected .num .decrease').css('cursor', 'pointer')
  
          }else{
            console.log(  '进来的数是' + firstNum  );
            $('tbody .selected .num .decrease').css('background', 'url(../image/cartsprite.png) no-repeat -85px 0px')
            $('tbody .selected .num .decrease').css('cursor', 'auto')
            // $('.cartProduct').off('hover','tbody .selected .num .derease')
          }

        })
        

      },
      error: function (msg){
        console.log(msg)
      }
    })
    
    // 购物车函数

    // 免运费
    function free(){
      $totalPrice = $('.summary .total em')
      $totalVal = $totalPrice.text().slice(1)
      $carriage = $('.summary .bar .carriage')
      if( $totalVal >= 188 ){
        $carriage.show()
      } else {
        $carriage.hide()
      }
    }

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
      free() // 免运费       
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
      free() // 免运费 
    })
    
    // 用户改变商品数量(重新计算当前点击行的小计，遍历单选框得到金额总计和数量总计)
    $('.cartProduct').on('change copy','tbody .num input',function (){
      var totalPrice = 0
      var totalNum = 0
      $checks = $('tbody .choose input')
      $eachPrice = Number($(this).closest('.num').siblings('.price').text().slice(1)) // 单价不改动一开始获取即可
      
      // 监测用户输入框行为相关(不同需求)
      
      $(this).val($(this).val().replace(/\D^-|^0+/g,''))
      if (+($(this).val() <= 0)){
        alert('数量不能少于1件！')
        $(this).val(1)
        // $(this).closest('.num').siblings('.subtotal').text('￥'+$eachPrice)
      }
      if ($(this).val() > 100){
        alert('库存不足！')
        $(this).val(100)
        // $(this).closest('.num').siblings('.subtotal').text('￥'+100*$eachPrice)
      }
      if (/\D/.test($(this).val())){
        alert('给老子输数字！')
        // $(this).val('') //原来的值
      }

      // 计算总计相关
      $num = Number($(this).val())
      $subtotal = $num * $eachPrice
      $(this).closest('.num').siblings('.subtotal').text('￥'+$subtotal.toFixed(1))  // 不管用户勾不勾单价都得更新(小计)
      $.each($checks,function(index, item){
        $subtotalNow = Number($(this).parent().siblings('.subtotal').text().slice(1))
        $numNow = Number($(this).parent().siblings('.num').find('input').val())
        if ($(this).prop('checked')){
          totalPrice += $subtotalNow
          totalNum += $numNow
        }
      })
      $('.summary .total em').text('￥'+totalPrice.toFixed(1))
      $('.summary .bar span em').text(totalNum)
    })
    
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
        $(this).off('hover')
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
      free() // 免运费 
    })

    // 商品数量加1
    $('.cartProduct table').on('click','tbody .num .increase',function (){
      // 用户点击时重新获取商品数据，计算总价格
      $checks = $('tbody .choose input') 
      $num = $('tbody .num input') 
      $subtotal = $('tbody .subtotal') 
      var totalPrice = 0 
      var totalNum = 0
      
      $num = Number($(this).siblings('input').val()) + 1
      $eachPrice = Number($(this).closest('.num').siblings('.price').text().slice(1))
      $subtotal = ($num * $eachPrice).toFixed(1)
      $(this).siblings('input').val($num)
      $(this).closest('.num').siblings('.subtotal').text('￥'+$subtotal)

      // bug:选中时点击加号，总价出现NaN 
      $.each($checks,function (index,item){
        if ( !$(this).prop('checked')) {
          $('.summary .bar span em').text(0)
          $('.summary .total em').text('￥'+ 0)
        } else if($(this).prop('checked')){
          // 关联单行复选框和金额总计
          totalPrice += Number($(item).parent().siblings('.subtotal').text().slice(1))
          // 关联单行复选框和数量总计
          totalNum += parseInt($(item).parent().siblings('.num').find('input').val())
        }
      }) 
      // totalPrice = totalPrice.toFixed(1)
      $('.summary .bar span em').text(totalNum)
      $('.summary .total em').text('￥'+ totalPrice)

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

        // -51 是大于1效果，-85是等于1效果，-69是hover效果
        console.log( $decrease  );
        $decrease.hover( function() {
          $decrease.css('background', 'url(../image/cartsprite.png) no-repeat -69px 0px')
        },
        function() {
          $decrease.css('background','url(../image/cartsprite.png) no-repeat -51px 0px')          
        })

      }
      free() // 免运费 
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
        // 注意循环遍历完成后再进行比较
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
      free() // 免运费 
    })

    // 删除1
    $('.cartProduct').on('click','tbody tr td.operate',function (){
      $checks = $('tbody .choose input') 
      $num = $('tbody .num input') 
      $subtotal = $('tbody .subtotal')    
      var totalPrice = 0 
      var totalNum = 0

      // 点击时弹窗询问用户是否删除
      $delAlert = $(this).next().find('.delAlert')
      $delAlert.css('display', 'block')
      $yes = $('.selected .delAlert .yes')
      $cancle = $('.selected .delAlert .cancle')
      $yes.click( function(){
        $(this).closest('.selected').remove()
        totalPrice = 0 // 这步很关键，重新赋值为数字0，防止上次的字符串赋值影响

        // 用户点击删除1的时候重新获取商品数据，计算总价格
        $checks = $('tbody .choose input') 
        $num = $('tbody .num input') 
        $subtotal = $('tbody .subtotal') 

        // bug:只有一个商品时点删除1总价会出现0.0的问题，缺少判断

        $.each($checks,function (index,item){
          if ( !$(this).prop('checked')) {
            $('.summary .bar span em').text(0)
            $('.summary .total em').text('￥'+ 0)
          } else if($(this).prop('checked')){
            // 关联单行复选框和金额总计
            totalPrice += Number($(item).parent().siblings('.subtotal').find('.subVal').text().slice(1))
            // 关联单行复选框和数量总计
            totalNum += parseInt($(item).parent().siblings('.num').find('input').val())
          }
        }) 
        // totalPrice = totalPrice.toFixed(1)
        $('.summary .bar span em').text(totalNum)
        $('.summary .total em').text('￥'+ totalPrice)
        // 删除本地存储数据
        var id = $(this).closest('.selected').find('.operate').attr('data-id')
        $.each(goodsArr,function (index, item){
          if (item.id === id) {
            goodsArr.splice(index,1)
            return false
          }
        })
        // 更新本地存储的数据
        localStorage.setItem('goods',JSON.stringify(goodsArr))
        // 本地存储里没有商品
        if (goodsArr.length <= 0) {
          localStorage.removeItem('goods')
          var newTr = `<td colspan="11"><h1 style="color:#aaa"> &nbsp; 购物车空空如也，快去加购商品吧！</h1></td> `
          $('tbody .emptyGoods').html(newTr)
          $('.cartProduct thead .theadAll').prop('checked',false)
          $('.summary .bar input').prop('checked',false)
        }                                 
        free() // 免运费      
      })
      $cancle.click( function(){
        $delAlert = $(this).closest('.delAlert')
        $delAlert.css('display', 'none')
      })      
    })

    // 删除2(删除特定勾选的复选框商品后默认自动全选，并重新计算金额和数量总计)
    $('.cartProduct').on('click','.summary .bar .del',function (){
      $checks = $('tbody .choose input')
      $allChoose1 = $('thead .theadAll')
      $allChoose2 = $('.summary .bar input')
      var totalPrice = 0 
      var totalNum = 0

      // 判断用户点击删除2的时候是否有勾选
      // console.log($checks.is(':checked'));
      if (!$checks.is(':checked')){  
        alert('请先选择要删除的商品~')      
      } else {  
        // 点击时弹窗询问用户是否删除
        $delAlert = $(this).closest('.summary').find('.delAlert')
        $delAlert.css('display', 'block')
        $yes = $('.summary .delAlert .yes')
        $cancle = $('.summary .delAlert .cancle')
        $('.cartProduct').on('click','.summary .delAlert .yes',function (){
          $.each($checks, function (index, item){     
            if ($(item).prop('checked')){
              $delAlert = $('.summary .delAlert')
              $delAlert.css('display', 'none')
              $(item).closest('.selected').remove()
            } 
          })
          // 删除本地存储数据
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
            }
          })

          // 更新本地存储的数据
          localStorage.setItem('goods',JSON.stringify(goodsArr))     

          var flag = false
          if (goodsArr.length <= 0) {
            localStorage.removeItem('goods')
            var newTr = `<td colspan="11"><h1 style="color:#aaa"> &nbsp; 购物车空空如也，快去加购商品吧！</h1></td>`
            $('tbody .emptyGoods').html(newTr)  
            flag = true
          }
          // 删除后购物车无商品，全选
          if (flag){
            $allChoose1.prop('checked',false)
            $allChoose2.prop('checked',false)
            $('.summary .total em').text('￥'+ 0)
            $('.summary .bar span em').text(0)
          } else{
            // 关联删除2和金额总计
            $checks = $('tbody .choose input')
            console.log($checks);
            $.each($checks, function (index, item){     
              if ($(item).prop('checked')){
                $subtotal = $('tbody .subtotal') // 此处必须在删除后获取节点！
                $num = $('tbody .num input')
                $.each($subtotal, function (index, item){
                  totalPrice += Number($(item).text().split('￥')[1])
                })
                console.log(22222);
                $('.summary .total em').text('￥'+totalPrice)
                // 关联删除2和数量总计
                $.each($num, function (index, item){
                  totalNum += parseInt($(item).val())
                })
                $('.summary .bar span em').text(totalNum)
              } else{
                $('.summary .total em').text('￥'+ 0)
                $('.summary .bar span em').text(0)
              }
            })  
          }                  
                  
          free() // 免运费 
        })
        $('.cartProduct').on('click','.summary .delAlert .cancle',function (){
          $delAlert = $('.summary .delAlert')
          $delAlert.css('display', 'none')
        })           
      }
    }) 
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
        alert('正在跳转支付页面，亲，您一共需支付 '+ $count +' 元，如有其他问题，详情联系客服')
      }
    })
  } else {
    var newTr = `<td colspan="11"><h1 style="color:#aaa"> &nbsp; 购物车空空如也，快去加购商品吧！</h1></td>`
    $('tbody .emptyGoods').html(newTr)  
    console.log(  '没有商品数据了' );
    $('.calculate .goPay').click( function (){
        alert('购物车没有商品哦，请先去挑选心仪的商品吧~')  
    })
  }
})




