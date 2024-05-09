//*receiving id and storing it into a variable

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
console.log("received id is => ", id);


// calling fetch function to display the user data to the page
fetchData();


//!======================  FETCHING DATA  =======================//

async function fetchData() {
  await fetch(`http://localhost:3001/employees/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("data got", data);

      const avatarImg = document.getElementById("empAvatar");
      avatarImg.src = `http://localhost:3001/uploads/${id}.jpg`;
      avatarImg.style.width = "120px";

      const birthDate = `${data.dob}`;
      console.log(birthDate);

      const [year, month, day] = birthDate.split("-");
      const newDob = `${day}-${month}-${year}`;
      console.log(newDob);

      const ageis = calculateAge(newDob);

      document.getElementById("empAge").innerHTML = `${ageis}`;

      document.getElementById("empFullName").innerHTML = `${data.salutation} ${data.firstname} ${data.lastname}`;

      document.getElementById("empEmail").innerHTML = `${data.email}`;

      document.getElementById("empGender").innerHTML = `${data.gender}`;

      document.getElementById("empDOB").innerHTML = `${data.dob}`;

      document.getElementById("empPhone").innerHTML = `${data.phone}`;

      document.getElementById("empQualification").innerHTML = `${data.qualification}`;

      document.getElementById("empAddress").innerHTML = `${data.address}`;

      document.getElementById("empUserName").innerHTML = `${data.username}`;
    });
}

//*============================  AGE CALCULATION ==============================//

function calculateAge(dob) {
  const dobDate = new Date(dob);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - dobDate.getFullYear();
  const monthDiff = currentDate.getMonth() - dobDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dobDate.getDate())) {
    age--;
  }
  console.log("age is ", age);
  return age;
}

//*======================  FORM OPEN AND CLOSE  =======================//

function delformOpen() {
  const delopen = document.getElementById("delData");
  delopen.style.display = "block";
  const formBgopem = document.getElementById("overlayPopup");
  formBgopem.style.display = "block";
}
function delformclose() {
  const delopen = document.getElementById("delData");
  delopen.style.display = "none";
  const formBgopem = document.getElementById("overlayPopup");
  formBgopem.style.display = "none";
}

function closeFunction() {
  const formBgopem = document.getElementById("overlayPopup");
  formBgopem.style.display = "none";

  const editemployForm = document.getElementById("editData");
  editemployForm.style.display = "none";
  const delopen = document.getElementById("delData");
  delopen.style.display = "none";
}

function editFormClose() {
  const formBgopem = document.getElementById("overlayPopup");
  formBgopem.style.display = "none";
  const editemployForm = document.getElementById("editData");
  editemployForm.style.display = "none";
}

//*======================  OPENING FORM AND SHOWING DATA TO EDIT FORM  ====================================//

function editFormOpen() {
  console.log(id);
  const editopen = document.getElementById("editData");
  editopen.style.display = "block";
  const formBgopem = document.getElementById("overlayPopup");
  formBgopem.style.display = "block";

  fetch(`http://localhost:3000/employees/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("editSalutation").value = data.salutation;
      document.getElementById("editFirstname").value = data.firstName;
      document.getElementById("editLastname").value = data.lastName;
      document.getElementById("editemailadd").value = data.email;
      document.getElementById("editMobile").value = data.phone;
      document.getElementById("editQualification").value = data.qualifications;
      document.getElementById("editAddress").value = data.address;
      document.getElementById("editcountry").value = data.country;
      document.getElementById("editState").value = data.state;
      document.getElementById("editCity").value = data.city;
      document.getElementById("editZip").value = data.pin;
      document.getElementById("editemailadd").value = data.email;
      document.getElementById("edituserName").value = data.username;
      document.getElementById("editPassword").value = data.password;

      //*---------dob change--------
      const [day, month, year] = data.dob.split("-");
      const newDob = `${year}-${month}-${day}`;
      document.getElementById("editDob").value = newDob;

      //*    GENDER
      document.querySelector(`input[name="editGenders"][value='${data.gender}']`).checked = true;
    });

  //*    edit page img preview
  const editpreview = document.getElementById("editImgPrew");
  editpreview.style.height = "150px";
  editpreview.src = `http://localhost:3000/employees/${id}/avatar`;

  //* after edit
  let saveEdit = document.getElementById("editSubmitBtn");
  saveEdit.addEventListener("click", () => {
    const validate = editFormValidation();
    if(!validate){
      return;
    }
    else{
      postdata();
    }
  });
}

  function postdata(){
    const salutation = document.getElementById("editSalutation").value;
    const Firstname = document.getElementById("editFirstname").value;
    const Lastname = document.getElementById("editLastname").value;
    const emailadd = document.getElementById("editemailadd").value;
    const Mobile = document.getElementById("editMobile").value;
    const Qualification = document.getElementById("editQualification").value;
    const Address = document.getElementById("editAddress").value;
    const gender = document.querySelector('input[name="editGenders"]:checked').value;
    const dob = document.getElementById("editDob").value;
    const Country = document.getElementById("editcountry").value;
    const state = document.getElementById("editState").value;
    const city = document.getElementById("editCity").value;
    const pinzip = document.getElementById("editZip").value;
    const username = document.getElementById("edituserName").value;
    const password = document.getElementById("editPassword").value;

    //*  converting DOB
    console.log("DOB", dob);
    const [year, month, day] = dob.split("-");
    const newDob = `${day}-${month}-${year}`;
    console.log(newDob);

    //creating an object for storing user dat
    var editedUserData = {
      salutation: salutation,
      firstName: Firstname,
      lastName: Lastname,
      email: emailadd,
      phone: Mobile,
      dob: newDob,
      gender: gender,
      qualifications: Qualification,
      address: Address,
      city: city,
      state: state,
      pin: pinzip,
      country: Country,
      username: username,
      password: password,
    };
    console.log("edited data", editedUserData);
    console.log("BRFORE");
    fetch(`http://localhost:3000/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Employee edited succesfully", data);
      });

    //*   edit img upload
    const profileImg = document.getElementById("Editupload");
    var imgObject = new FormData();
    imgObject.append("avatar", profileImg.files[0]);
    console.log("img added succesfully"); //avata-img section name

    fetch(`http://localhost:3000/employees/${id}/avatar`, {
      method: "POST",
      body: imgObject,
    });

    editFormClose();
  }

//!         edit image change preview
let editimage = document.getElementById("editImgPrew");
let editinputimg = document.getElementById("Editupload");
editinputimg.onchange = function () {
  editimage.src = URL.createObjectURL(editinputimg.files[0]);
};

//!=========================   DELETE DATA   ===========================//

function deleteData() {
  fetch(`http://localhost:3000/employees/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("API RESPONCE DATA", data);
    })
    .catch((error) => {
      console.log("error in deleting data", error);
    });

  delformclose();
  window.location.href = "index.html";
}


//!=============================  EDIT FORM VALIDATION ==============================//

function editFormValidation() {
  const salutation = document.getElementById("editSalutation").value.trim();
  const Firstname = document.getElementById("editFirstname").value.trim();
  const Lastname = document.getElementById("editLastname").value.trim();
  const username = document.getElementById("edituserName").value.trim();
  const password = document.getElementById("editPassword").value.trim();

  const emailadd = document.getElementById("editemailadd").value.trim();
  const Mobile = document.getElementById("editMobile").value.trim();
  const Qualification = document.getElementById("editQualification").value.trim();
  const Address = document.getElementById("editAddress").value.trim();
  const Country = document.getElementById("editcountry").value.trim();
  const state = document.getElementById("editState").value.trim();
  const city = document.getElementById("editCity").value.trim();
  const pinzip = document.getElementById("editZip").value.trim();

  //dob
  const dob = document.getElementById("editDob");
  const addDOBValidation = document.getElementById("editDobValidation");
  const dobvalue = dob.value.trim();

  const gender = document.querySelector('input[name="editGenders"]:checked');
  const GenderValidation = document.getElementById("editGendersValidation");

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePattern = /^\d{10}$/;
  const namePattern = /^[A-Za-z]+$/;
  const passwordpattern = new RegExp("(?=.*[a-z])" + "(?=.*[A-Z])" + "(?=.*\\d)" + "(?=.*[^A-Za-z0-9])" + ".{8,}");

  let isValid = true;

  //validating DOB and GENDER

  if (gender) {
    GenderValidation.textContent = "";
  } else {
    GenderValidation.textContent = " * please select a gender";
    isValid = false;
  }

  if (dobvalue === "") {
    addDOBValidation.textContent = "* Date of Birth is required";
  }

  // validating rest

  if (!phonePattern.test(Mobile)) {
    document.getElementById("editMobileValidation").textContent = "* phone number should contain 10 digits";
    isValid = false;
  }

  if (!emailPattern.test(emailadd)) {
    document.getElementById("editemailaddValidation").textContent = "* enter a valid email";
    isValid = false;
  }

  if (!namePattern.test(Firstname)) {
    document.getElementById("editFirstnameValidation").textContent = "* invalid firstname";
    isValid = false;
  }

  if (!namePattern.test(Lastname)) {
    document.getElementById("editLastnameValidation").textContent = "* invalid lastname";
    isValid = false;
  }

  if (!passwordpattern.test(password)) {
    document.getElementById("editPasswordValidation").textContent =
      "* password should contain atleast 8 character with number, symbol, capital and small letters";
    isValid = false;
  }

  if (salutation === "") {
    document.getElementById("editSalutationValidation").textContent = "* salutation required";
    isValid = false;
  }

  if (username === "") {
    document.getElementById("edituserNameValidation").textContent = "* username required";
    isValid = false;
  }

  if (Qualification === "") {
    document.getElementById("editQualificationValidation").textContent = "* qualification required";
    isValid = false;
  }

  if (Address === "") {
    document.getElementById("editAddressValidation").textContent = "* address required";
    isValid = false;
  }

  if (city === "") {
    document.getElementById("editCityValidation").textContent = "* city required";
    isValid = false;
  }

  if (pinzip === "") {
    document.getElementById("editZipValidation").textContent = "* pin required";
    isValid = false;
  }

  if (Country === "") {
    document.getElementById("editcountryValidation").textContent = "* select a country";
    isValid = false;
  }

  if (state === "") {
    document.getElementById("editStateValidation").textContent = "* select a state";
    isValid = false;
  }

  //validation text event

  //gender validation

  const male = document.getElementById("checkMale");
  const female = document.getElementById("checkFemale");

  male.addEventListener("click", () => {
    document.getElementById("editGendersValidation").textContent = "";
  });

  female.addEventListener("click", () => {
    document.getElementById("editGendersValidation").textContent = "";
  });

  return isValid;
}

// Targerting txt events
document.getElementById("editData").addEventListener("input", (event) => {
  inputId = event.target.id;
  const errorid = `${inputId}Validation`;
  console.log("error id is", errorid);
  document.getElementById(errorid).textContent = "";
});