$(document).ready(function() {
  var usernameInput = $("#username-reg");
  var passwordInput = $("#password-reg");
  var cityInput = $("#city-reg");
  var stateInput = $("#state-reg");
  // var username = $("#username");
  // var password = $("#password");

  $(document).on("submit", ".register-form", handleUserRegister);
  $(document).on("submit", ".login-form", handleUserLogin);

  // getUsers();

  function handleUserRegister(event) {
    event.preventDefault();
    if (
      !usernameInput.val().trim() ||
      !passwordInput.val().trim() ||
      !cityInput.val().trim() ||
      !stateInput.val().trim()
    ) {
      return;
    }
    // else {
    //     insertUser({
    //       username: usernameInput.val().trim(),
    //       password: passwordInput.val().trim(),
    //       city: cityInput.val().trim(),
    //       state: stateInput.val().trim()
    //     });
    //   }
  }

  // function insertUser(userData) {
  //   $.post("/api/users", userData).then(getUsers);
  // }

  function handleUserLogin() {}
});
