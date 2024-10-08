//*===========  ADD EMPLOYEE FORM OPEN  ===========//
function formOpen() {
  const employForm = document.getElementById("addData");
  employForm.style.display = "block";
  const formBgopem = document.getElementById("overlayPopup");
  formBgopem.style.display = "block";
}

//*===========  ADD EMPLOYEE FORM CLOSE  ===========//
function addFormClose() {
  const employForm = document.getElementById("addData");
  employForm.style.display = "none";
  const formBgopem = document.getElementById("overlayPopup");
  formBgopem.style.display = "none";
}

//*===========  DELETE EMPLOYEE FORM OPEN  ===========//
function delformOpen() {
  const delopen = document.getElementById("delData");
  delopen.style.display = "block";
  const formBgopem = document.getElementById("overlayPopup");
  formBgopem.style.display = "block";
}

//*==========  DELETE EMPLOYEE FORM CLOSE  ===========//
function delformclose() {
  const delopen = document.getElementById("delData");
  delopen.style.display = "none";
  const formBgopem = document.getElementById("overlayPopup");
  formBgopem.style.display = "none";
}

//*===========  EDIT EMPLOYEE FORM CLOSE  ===========//
function editFormClose() {
  const formBgopem = document.getElementById("overlayPopup");
  formBgopem.style.display = "none";
  const editemployForm = document.getElementById("editData");
  editemployForm.style.display = "none";
}

//*===========  OVERLAY FORM CLOSE  ===========//
function closeFunction() {
  const formBgopem = document.getElementById("overlayPopup");
  formBgopem.style.display = "none";
  const employForm = document.getElementById("addData");
  employForm.style.display = "none";
  const editemployForm = document.getElementById("editData");
  editemployForm.style.display = "none";
  const delopen = document.getElementById("delData");
  delopen.style.display = "none";
}

let currentPage = 1;
let itemsPerpage = 5;
let totaitems = 0;
let tableContents = [];

//!===========  FETCHING DATA  =========== //

function displayData(data, currentPage) {


  let tableData = "";
  let items = document.getElementById("count").value;

  let count = (currentPage - 1) * items;

  data.map((values) => {
    count++;

    let slNumber = count > 9 ? `#${count}` : `#0${count}`;

    tableData =
      tableData +
      `
      <tr>
                      <th scope="row " class="table-slno">${slNumber}</th>
                      <td><img src="http://localhost:3001/${values.image}" alt="" class="rounded-5 mx-2
                      " height="30px" />${values.salutation} ${values.firstname} ${values.lastname}</td>
                      <td>${values.email}</td>
                      <td>${values.phone}</td>
                      <td>${values.gender}</td>
                      <td>${values.dob}</td>
                      <td>${values.country}</td>
                      <td>
                        <div class="dropdown">
                          <button class="btn nav-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis"></i>
                          </button>
                          <ul class="dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="viewdetails?id=${values._id}"><i class="fa-regular fa-eye"></i> View Details</a>
                            </li>
                            <li class="" id="" onclick="editFormOpen('${values._id}')">
                              <a class="dropdown-item" href="#">
                                <span><i class="fa-solid fa-pencil"></i> </span>Edit</a
                              >
                            </li>
                            <li onclick="delformOpen()">
                              <a class="dropdown-item" href="#" onclick="passid('${values._id}')"> <i class="fa-solid fa-trash"></i> Move to Trash</a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>`;
  });
  document.getElementById("tableBody").innerHTML = tableData;
  console.log("FETCH COMPLETED");
  highlight(currentPage);
}

function highlight(currentPage) {
  const pageNationUl = document.getElementById("pagenationcCOntainer");
  let buttons = pageNationUl.querySelectorAll("li");
  buttons.forEach((li) => {
    if (li.textContent == currentPage) {
      li.classList.add("pagenation-color");
    } else {
      li.classList.remove("pagenation-color");
    }
  });
}

//* ADd Button

const addEmloyeeSubmit = document.getElementById("addSubmit");
addEmloyeeSubmit.addEventListener("click", () => {
  // console.log(document.getElementById("AddDataForm").serializeArray())
  const validation = addFormValidation();

  if (!validation) {
    return;
  } else {
    postdata();
  }
});

//!===========  POST DATA  ===========//
async function postdata() {
  const salutation = document.getElementById("Salutation").value;
  const Firstname = document.getElementById("Firstname").value;
  const Lastname = document.getElementById("Lastname").value;
  const emailadd = document.getElementById("emailadd").value;
  const username = document.getElementById("userName").value;
  const password = document.getElementById("Password").value;
  const Mobile = document.getElementById("Mobile").value;
  const Qualification = document.getElementById("Qualification").value;
  const Address = document.getElementById("Address").value;
  const gender = document.querySelector('input[name="Gender"]:checked').value;
  const dob = document.getElementById("DOB").value;
  const Country = document.getElementById("Country").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const pinzip = document.getElementById("pinzip").value;

  //*converting DOB
  console.log("username", username);
  const [year, month, day] = dob.split("-");
  const newDob = `${day}-${month}-${year}`;
  console.log(newDob);

  var newUserData = {
    salutation: salutation,
    firstname: Firstname,
    lastname: Lastname,
    email: emailadd,
    phone: Mobile,
    dob: newDob,
    gender: gender,
    qualification: Qualification,
    address: Address,
    city: city,
    state: state,
    pin: pinzip,
    country: Country,
    username: username,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:3001/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });

    const data = await response.json();
    console.log("Employee added successfully", data);

    //!=============================== IMG UPLOAD ==========================================//

    const profileImg = document.getElementById("upload");
    var imgObject = new FormData();
    imgObject.append("image", profileImg.files[0]);
    console.log("img added successfully");

    await fetch(`http://localhost:3001/employees/${data._id}/image`, {
      method: "POST",
      body: imgObject,
    });

    Swal.fire({
      icon: "success",
      title: "ADD EMPLOYEE SUCCESSFUL",
      showConfirmButton: false,
      timer: 1500,
    });
    document.getElementById("AddDataForm").reset();
    resetAvatarPreview();
    addFormClose();
    fetchSearchResults(searchQuery, 1);
  } catch (error) {
    console.error("Error", error);
  }
}

//!===================================      ADD FORM VALIDATION    =====================================//
function addFormValidation() {
  const salutation = document.getElementById("Salutation").value.trim();
  const Firstname = document.getElementById("Firstname").value.trim();
  const Lastname = document.getElementById("Lastname").value.trim();
  const username = document.getElementById("userName").value.trim();
  const password = document.getElementById("Password").value.trim();

  const emailadd = document.getElementById("emailadd").value.trim();
  const Mobile = document.getElementById("Mobile").value.trim();
  const Qualification = document.getElementById("Qualification").value.trim();
  const Address = document.getElementById("Address").value.trim();
  const Country = document.getElementById("Country").value.trim();
  const state = document.getElementById("state").value.trim();
  const city = document.getElementById("city").value.trim();
  const pinzip = document.getElementById("pinzip").value.trim();

  //dob
  const dob = document.getElementById("DOB");
  const addDOBValidation = document.getElementById("DOBValidation");
  const dobvalue = dob.value.trim();

  const gender = document.querySelector('input[name="Gender"]:checked');
  const GenderValidation = document.getElementById("GenderValidation");

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
    document.getElementById("MobileValidation").textContent = "* phone number should contain 10 digits";
    isValid = false;
  }

  if (!emailPattern.test(emailadd)) {
    document.getElementById("emailaddValidation").textContent = "* enter a valid email";
    isValid = false;
  }

  if (!namePattern.test(Firstname)) {
    document.getElementById("FirstnameValidation").textContent = "* invalid firstname";
    isValid = false;
  }

  if (!namePattern.test(Lastname)) {
    document.getElementById("LastnameValidation").textContent = "* invalid lastname";
    isValid = false;
  }

  if (!passwordpattern.test(password)) {
    document.getElementById("PasswordValidation").textContent =
      "* password should contain atleast 8 character with number, symbol, capital and small letters";
    isValid = false;
  }

  if (salutation === "") {
    document.getElementById("SalutationValidation").textContent = "* salutation required";
    isValid = false;
  }

  if (username === "") {
    document.getElementById("userNameValidation").textContent = "* username required";
    isValid = false;
  }

  if (Qualification === "") {
    document.getElementById("QualificationValidation").textContent = "* qualification required";
    isValid = false;
  }

  if (Address === "") {
    document.getElementById("AddressValidation").textContent = "* address required";
    isValid = false;
  }

  if (city === "") {
    document.getElementById("cityValidation").textContent = "* city required";
    isValid = false;
  }

  if (pinzip === "") {
    document.getElementById("pinzipValidation").textContent = "* pin required";
    isValid = false;
  }

  if (Country === "") {
    document.getElementById("CountryValidation").textContent = "* select a country";
    isValid = false;
  }

  if (state === "") {
    document.getElementById("stateValidation").textContent = "* select a state";
    isValid = false;
  }

  //validation text event

  document.getElementById("addData").addEventListener("input", (event) => {
    inputId = event.target.id;
    const errorid = `${inputId}Validation`;
    console.log("error id is", errorid);
    document.getElementById(errorid).textContent = " ";
  });

  //gender validation

  const male = document.getElementById("forMale");
  const female = document.getElementById("forFemale");

  male.addEventListener("click", () => {
    document.getElementById("GenderValidation").textContent = "";
  });

  female.addEventListener("click", () => {
    document.getElementById("GenderValidation").textContent = "";
  });

  return isValid;
}

//*==========================  img Preview  ====================================//
function avatarPreview() {
  const preview = document.getElementById("avatarimg");
  preview.src = URL.createObjectURL(event.target.files[0]);
  preview.style.height = "100px";
  document.getElementById("uploadicons").style.display = "none";
}
function resetAvatarPreview() {
  const preview = document.getElementById("avatarimg");
  preview.src = "";
  preview.style.height = "";
  document.getElementById("uploadicons").style.display = "block";
}

//-----passing id when clicking delete button in modal-------//

function passid(id) {
  document.getElementById("delBtn").addEventListener("click", () => {
    deleteData(id);
  });
  console.log("id passed", id);
}

//!=========================   DELETE DATA   ===========================//
// async function deleteData(id) {
//   try {
//     const response = await fetch(`http://localhost:3001/employees/${id}`, {
//       method: "DELETE",
//     });
//     const data = await response.json();
//     console.log("Deleted DATA", data);
//   } catch (error) {
//     console.log("error in deleting data", error);
//   }
//   delformclose();
//   fetchSearchResults(searchQuery, 1);
// }

// *---- img preview on edit page ---- //
async function deleteData(id) {
  try {
    const response = await fetch(`http://localhost:3001/employees/delete/${id}`, {
      method: "PUT",
    });
    const data = await response.json();
    console.log("Deleted DATA", data);
  } catch (error) {
    console.log("error in deleting data", error);
  }
  delformclose();
  fetchSearchResults(searchQuery, 1);
}




let editimage = document.getElementById("editImgPrew");
let editinputimg = document.getElementById("Editupload");
editinputimg.onchange = function () {
  editimage.src = URL.createObjectURL(editinputimg.files[0]);
};

//!-----------------------------EDIT DATA-----------------------------//

async function editFormOpen(empid) {
  console.log(empid);
  const editopen = document.getElementById("editData");
  editopen.style.display = "block";
  const formBgopem = document.getElementById("overlayPopup");
  formBgopem.style.display = "block";
  try {
    const response = await fetch(`http://localhost:3001/employees/${empid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    document.getElementById("editSalutation").value = data.salutation;
    document.getElementById("editFirstname").value = data.firstname;
    document.getElementById("editLastname").value = data.lastname;
    document.getElementById("editemailadd").value = data.email;
    document.getElementById("editMobile").value = data.phone;
    document.getElementById("edituserName").value = data.username;
    document.getElementById("editPassword").value = data.password;
    document.getElementById("editQualification").value = data.qualification;
    document.getElementById("editAddress").value = data.address;
    document.getElementById("editcountry").value = data.country;
    document.getElementById("editState").value = data.state;
    document.getElementById("editCity").value = data.city;
    document.getElementById("editZip").value = data.pin;
    document.getElementById("editemailadd").value = data.email;

    //!---------dob change--------
    const [day, month, year] = data.dob.split("-");
    const newDob = `${year}-${month}-${day}`;
    document.getElementById("editDob").value = newDob;

    //!  GENDER

    document.querySelector(`input[name="editGenders"][value='${data.gender}']`).checked = true;

    //edit page img preview
    const editpreview = document.getElementById("editImgPrew");
    editpreview.style.height = "150px";
    editpreview.src = `http://localhost:3001/uploads/${empid}.jpg`;

    // after edit
    let saveEdit = document.getElementById("editSubmitBtn");
    saveEdit.addEventListener("click", () => {
      const editsubmit = editFormValidation();
      if (!editsubmit) {
        return;
      } else {
        postEditedData(empid);
      }
    });
  } catch (error) {
    console.error("Error in Geting Emp data", error);
  }
}
//!==================Posting Edited  data after validation =======================//
async function postEditedData(empid) {
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

  //!converting DOB
  console.log("DOB", dob);
  const [year, month, day] = dob.split("-");
  const newDob = `${day}-${month}-${year}`;
  console.log(newDob);
  //creating an object for storing user data

  var editedUserData = {
    salutation: salutation,
    firstname: Firstname,
    lastname: Lastname,
    email: emailadd,
    phone: Mobile,
    dob: newDob,
    gender: gender,
    qualification: Qualification,
    address: Address,
    city: city,
    state: state,
    pin: pinzip,
    country: Country,
    username: username,
    password: password,
  };

  try {
    const response = await fetch(`http://localhost:3001/employees/${empid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUserData),
    });

    const data = await response.json();
    console.log("Employee edited succesfully", data);
    //*   edit img upload
    const profileImg = document.getElementById("Editupload");
    var imgObject = new FormData();
    imgObject.append("image", profileImg.files[0]);
    console.log("img added succesfully"); //avata-img section name

    await fetch(`http://localhost:3001/employees/${empid}/image`, {
      method: "POST",
      body: imgObject,
    });
  } catch (error) {
    console.error("Error in Editing Employee", error);
  }

  editFormClose();
  fetchSearchResults(searchQuery, 1);
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
    document.getElementById("editMobile").focus();
    document.getElementById("editMobileValidation").textContent = "* phone number should contain 10 digits";
    isValid = false;
  }

  if (!emailPattern.test(emailadd)) {
    document.getElementById("editemailadd").focus();
    document.getElementById("editemailaddValidation").textContent = "* enter a valid email";
    isValid = false;
  }

  if (!namePattern.test(Firstname)) {
    document.getElementById("editFirstname").focus();
    document.getElementById("editFirstnameValidation").textContent = "* invalid firstname";
    isValid = false;
  }

  if (!namePattern.test(Lastname)) {
    document.getElementById("editLastname").focus();
    document.getElementById("editLastnameValidation").textContent = "* invalid lastname";
    isValid = false;
  }

  if (!passwordpattern.test(password)) {
    document.getElementById("editPassword").focus();

    document.getElementById("editPasswordValidation").textContent =
      "* password should contain atleast 8 character with number, symbol, capital and small letters";
    isValid = false;
  }

  if (salutation === "") {
    document.getElementById("editSalutation").focus();

    document.getElementById("editSalutationValidation").textContent = "* salutation required";
    isValid = false;
  }

  if (username === "") {
    document.getElementById("edituserName").focus();
    document.getElementById("edituserNameValidation").textContent = "* username required";
    isValid = false;
  }

  if (Qualification === "") {
    document.getElementById("editQualificationValidation").textContent = "* qualification required";
    isValid = false;
  }

  if (Address === "") {
    document.getElementById("editAddress").focus();
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
document.getElementById("editData").addEventListener("input", (event) => {
  inputId = event.target.id;
  const errorid = `${inputId}Validation`;
  console.log("error id is", errorid);
  document.getElementById(errorid).textContent = "";
});

//!============ search and geting data ======================//

let pagesize = 5;
// table count
document.getElementById("count").addEventListener("change", () => {
  dataCount = document.getElementById("count");
  pagesize = parseInt(dataCount.value);
  fetchSearchResults(searchQuery, 1, pagesize);
});
let searchQuery = document.getElementById("dataSearch").value;
fetchSearchResults(searchQuery, 1);
function fetchSearchResults(searchQuery, page, pagesize) {
  const url = `http://localhost:3001/employees/searchAndPagination?search=${searchQuery}&page=${page}&pagesize=${pagesize}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let totalPage = data.pagination.totalPage;
      let currentPage = data.pagination.currentPage;
      displayData(data.users, currentPage);
      renderPaginationButtons(totalPage, currentPage);
    });
}

//search
let searchBar = document.getElementById("dataSearch");
searchBar.addEventListener("input", async () => {
  console.log("its working");
  let searchQuery = document.getElementById("dataSearch").value;
  fetchSearchResults(searchQuery, 1);
  highlight(currentPage);
});

//*pagination buttons
function renderPaginationButtons(totalPage, currentPage) {
  const pageNationUl = document.getElementById("pagenationcCOntainer");
  pageNationUl.innerHTML = "";

  // back skip button  " < "  //
  const backskip = document.createElement("li");
  backskip.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  pageNationUl.appendChild(backskip);

  backskip.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
    } else {
      currentPage = 1;
    }
    fetchSearchResults(searchQuery, currentPage, pagesize);
    highlight(currentPage);
  });
  // page buttons
  for (let i = 1; i <= totalPage; i++) {
    const pageItems = document.createElement("li");
    pageItems.textContent = `${i}`;
    pageNationUl.appendChild(pageItems);
    pageItems.addEventListener("click", () => {
      let searchQuery = document.getElementById("dataSearch").value;
      let page = parseInt(i);
      fetchSearchResults(searchQuery, page, pagesize);
      highlight(page);
    });
  }
  // front skip button  " > "  //

  const frontSkip = document.createElement("li");
  frontSkip.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
  pageNationUl.appendChild(frontSkip);
  frontSkip.addEventListener("click", () => {
    if (currentPage <= totalPage - 1) {
      currentPage++;
    } else {
      currentPage = totalPage;
    }
    fetchSearchResults(searchQuery, currentPage, pagesize);
    highlight(currentPage);
  });
  function highlight(currentPage) {
    const pageNationUl = document.getElementById("pagenationcCOntainer");
    let buttons = pageNationUl.querySelectorAll("li");
    buttons.forEach((li) => {
      if (li.textContent == currentPage) {
        li.classList.add("pagenation-color");
      } else {
        li.classList.remove("pagenation-color");
      }
    });
  }
}

//*logout user

const logout = document.getElementById("Logout");
logout.addEventListener("click", () => {
  fetch("http://localhost:3001/users/logout", {
    method: "GET",
  }).then((res) => {
    if (res.ok) {
      
      window.location.href = res.url;

    }
  });
});
