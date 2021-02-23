console.log('加载成功');


require.config({
  paths: {
    "jquery": ["https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery","./jquery-1.8.3"],
    // "download": "download", 
    // "header": "header", 
    // "footer": "footer",
  }
})

require(['header'],function (header){
  header.fn1();
  header.fn2();
  header.fn3();

})