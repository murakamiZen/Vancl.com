$code = $('.code')
$phone = $('.phone')
$phoneCode = $('.phoneCode')
$designPass = $('.designPass')
$confirmPass = $('.confirmPass')
$checkbox = $('.checkbox')
$Register = $('.vanclRegister')


// 英文验证码
$code.blur( ()=>{

  $codeVal = $code.val() 
  $codeReg = /[A-Za-z]{4}/

  if(!$code.val() ){
    alert('什么都没输入是不行的哟')
  } else if(!$codeReg.test( $codeVal )){
    alert('验证码有误，请重新输入图中显示的验证码')
  } 
})


// 手机号验证
$phone.blur( ()=>{
  $phoneVal = $phone.val() 
  $phoneReg =  /0?(13|14|15|17|18)[0-9]{9}/

  if(!$phone.val() ){
    alert('什么都没输入是不行的哟')
  }else if(!$phoneReg.test( $phoneVal )){
    alert('格式不对，请重新输入你的手机号码')
  } 
})

// 6位手机验证验
$phoneCode.blur( ()=>{
  $phoneCodeVal = $phoneCode.val() 
  $phoneCodeReg = /[0-9]{6}/

  if(!$phoneCode.val() ){
    alert('什么都没输入是不行的哟')
  }else if(!$phoneCodeReg.test( $phoneCodeVal )){
    alert('验证码不正确，请输入您收到的手机验证码')
  } 
})

// 设定密码
$designPass.blur( ()=>{
  $PassVal = $designPass.val()
  $PassReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
  if(!$designPass.val() ){
    alert('什么都没输入是不行的哟')
  }else if(!$PassReg.test( $PassVal )){
    alert('输入错误，请重新输入格式正确的密码')
  } 
})

$confirmPass.blur( ()=>{
  $confirmVal = $confirmPass.val()
  if(!$confirmPass.val() ){
    alert('请再次输入一次密码')
  } else if($confirmVal !== $PassVal){
    alert('两次输入的密码不一致，请重新输入')
  }
})


 

$Register.click( ()=>{
  // if($checkbox.prop('checked')){
  //   alert(1111111)
  // }

  alert('注册成功，为你跳转至登录界面！')
  location.href = './login.html'
})











