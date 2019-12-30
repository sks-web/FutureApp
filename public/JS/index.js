$(document).ready(function(){
  $(".btn_register").click(function(){
    if ($(".password").val()!=$(.cpassword).val()) {
      alert("password and cpassword doesnot matched");
      window.location("/register");
    } else {

    }
  });
});
