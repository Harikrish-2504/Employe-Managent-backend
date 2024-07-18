

  
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
  document.getElementById('loginForm').reset();
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
  document.getElementById('loginForm').reset();

});

let credentialValid = true;
let signCredentialValid = true;

let signIn = document.getElementById("signInBtn");
signIn.addEventListener("click",()=>{
  let validCheck = credentialsValidation();
  if(!validCheck){
    return;
  }
  else{
    console.log("else");
    credentials();
  }
})

function credentials() {
  let email = document.getElementById("Email").value;
  let password = document.getElementById("Password").value;
  let errorMessage = document.getElementById("error-message");

  let credentials = {
    email: email,
    password: password,
  };

  fetch("http://localhost:3001/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then(async (response) => {
      let data;
      try {
        data = await response.json();
      } catch (e) {
        throw new Error("Invalid JSON response");
      }
      
      if (!response.ok) {
        errorMessage.textContent = data.error || "An error occurred.";
      } else {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
      errorMessage.textContent = "An error occurred during login. Please try again later.";
    });
}


function credentialsValidation(){
  let credentialValid = true;
  let email = document.getElementById("Email");
  let password = document.getElementById("Password");
  let errorMessage = document.getElementById("error-message");
  if(email.value ==="" && password.value ===""){
    errorMessage.textContent ="* Please Enter Email and Password"
    credentialValid = false
   }

  else if(email.value ===""){
  errorMessage.textContent ="* please enter an email"
  credentialValid = false
 }
 else if(password.value ===""){
  errorMessage.textContent ="* please enter password"
  credentialValid = false
 }
 console.log(credentialValid);

 return credentialValid;
  
}

function signCredentials() {
  let username = document.getElementById("username").value;
  let email = document.getElementById("signupEmail").value;
  let password = document.getElementById("signupPassword").value;
  let errorMessage = document.getElementById("signup-error-message");

  let credentials = {
    username:username,
    email: email,
    password: password,
  };

  fetch("http://localhost:3001/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }) 
    .then(async (response) => {
      let data;
      try {
        data = await response.json();
        console.log(data);
      } catch (e) {
        throw new Error("Invalid JSON response");
      }
      
      if (!response.ok) {
        errorMessage.textContent = data.error || "An error occurred.";
      } else {
        window.location.href = "/otp";
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
      errorMessage.textContent = "An error occurred during login. Please try again later.";
    });
}