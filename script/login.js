$login = $('#vanclLogin')


$login.click( ()=>{
  var $user = $('#user').val()
  var $pswd = $('#pass').val()

  if($user == '123' && $pswd == '123'){
    // alert('登录成功')

    setCookie({
      key: 'login',
      val: 'loginSuccess',
      days: 3,
    })
    $('#user').val('')
    $('#pass').val('')
    
    $('.logSuccess').attr('href', "./shoppingCar.html") 

  } else {
    alert('请输入正确的账号密码！')
    return false
  } 
})

