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
  //*===========  DELETE EMPLOYEE FORM OPEN  ===========//
function restoreFormopen() {
    const resOpen = document.getElementById("restore-popup");
    resOpen.style.display = "block";
    const formBgopem = document.getElementById("overlayPopup");
    formBgopem.style.display = "block";
  }
  
  //*==========  DELETE EMPLOYEE FORM CLOSE  ===========//
  function restoreFormClose() {
    const resClose = document.getElementById("restore-popup");
    resClose.style.display = "none";
    const formBgopem = document.getElementById("overlayPopup");
    formBgopem.style.display = "none";
  }
  

  //*===========  OVERLAY FORM CLOSE  ===========//
  function closeFunction() {
    const formBgopem = document.getElementById("overlayPopup");
    formBgopem.style.display = "none";
    const resPopup = document.getElementById("restore-popup");
    resPopup.style.display = "none";
    const delopen = document.getElementById("delData");
    delopen.style.display = "none";
  }
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
                             
                              <li onclick="restoreFormopen()" >
                                <a class="dropdown-item" href="#" onclick="passResid('${values._id}')">
                                  <i class="fa-solid fa-circle-arrow-up"></i> Restore</a
                                >
                              </li>
                              <li onclick="delformOpen()">
                                <a class="dropdown-item" href="#" onclick="passid('${values._id}')"> <i class="fa-solid fa-trash"></i> Remove form Trash</a>
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


  //-----passing id when clicking delete button in modal-------//

function passid(id) {
    document.getElementById("delBtn").addEventListener("click", () => {
      deleteData(id);
    });
    console.log("id passed", id);
  }
//!=========================   DELETE DATA   ===========================//
async function deleteData(id) {
  try {
    const response = await fetch(`http://localhost:3001/employees/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("Deleted DATA", data);
  } catch (error) {
    console.log("error in deleting data", error);
  }
  delformclose();
  fetchSearchResults(searchQuery, 1);
}
function passResid(id) {
    document.getElementById("restore").addEventListener("click", () => {
      restoreData(id);
    });
    console.log("Restore id passed", id);
  }
//*===================RESTORE==================//
async function restoreData(id) {
    try {
      const response = await fetch(`http://localhost:3001/employees/restore/${id}`, {
        method: "PUT",
      });
      const data = await response.json();
      console.log("Deleted DATA", data);
    } catch (error) {
      console.log("error in deleting data", error);
    }
    restoreFormClose();
    fetchSearchResults(searchQuery, 1);
  }
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
  const url = `http://localhost:3001/employees/TrashsearchAndPagination?search=${searchQuery}&page=${page}&pagesize=${pagesize}`;
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