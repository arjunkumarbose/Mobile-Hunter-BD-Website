const loadPhone = async (searchText = "apple", isShowAll) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  const phones = data.data;
  displayPhone(phones, isShowAll);
};


const displayPhone = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-card-container");

  phoneContainer.innerHTML = "";

  if (phones.length > 12 && !isShowAll) {
    showAllButton.classList.remove("hidden");
  } else {
    showAllButton.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `max-w-sm bg-white border border-gray-200 rounded-lg shadow`;
    phoneCard.innerHTML = `<div class="flex justify-center py-8 bg-primary">
    <img
    class="rounded-t-lg"
    src="${phone.image}"
    alt=""
    draggable=false
  /></div>
  <hr>

  <div class="p-5">
    <a href="#">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900"
      >
        ${phone.phone_name}
      </h5>
    </a>
    <span class="bg-gray-100 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded">${phone.brand}</span>
    <br>
    <a
      onclick = "showDetails('${phone.slug}')"
      class="hover:cursor-pointer inline-flex items-center mt-3 px-3 py-2 text-sm font-medium text-center text-white bg-tertiary rounded duration-300 hover:bg-black"
    >
      Details
      <svg
        class="w-3.5 h-3.5 ml-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </a>
  </div>`;

    phoneContainer.appendChild(phoneCard);
  });

  toggleSpinner(false);
};

loadPhone();
const searchButton = document.getElementById("btn-search");
const searchField = document.getElementById("field-search");
const searchTitle = document.getElementById("result-title");
const spinner = document.getElementById("loadingSpinner");

const handleSearch = (isShowAll) => {
  const searchTerm = searchField.value;
  toggleSpinner(true);
  loadPhone(searchTerm, isShowAll);
  searchTitle.innerText = searchTerm;
};


const showAllButton = document.getElementById("btn-show-all");
const handleShowAll = () => {
  handleSearch(true);
};


const toggleSpinner = (isLoading) => {
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};


const showDetails = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await response.json();
  const details = data.data;
  showPhoneDetails(details);
};

const modalBox =
  document.getElementById("showDetailsModal").childNodes[1].childNodes;
const showPhoneDetails = (details) => {
  details.mainFeatures.chipSet
    ? (chipsetName = details.mainFeatures.chipSet)
    : (chipsetName = "Unavailable");
  modalBox[1].src = details.image;
  modalBox[3].innerText = details.brand;
  modalBox[5].innerText = details.name;
  modalBox[7].innerText = details.releaseDate;
  const sensorList = details.mainFeatures.sensors;
  let sensorString = "";

  sensorList.forEach((sensor) => {
    sensorString += ` ${sensor}<br>`;
  });

  modalBox[11].innerHTML = `
  <h1 class="text-tertiary font-semibold">Chipset</h1>
  <h1 class="col-span-2 text-gray-500 text-[15px]">
    ${chipsetName}
  </h1>
  
  <h1 class="text-tertiary font-semibold">Display Size</h1>
  <h1 class="col-span-2 text-gray-500 text-[15px]">
    ${details.mainFeatures.displaySize}
  </h1>

  <h1 class="text-tertiary font-semibold">Memory</h1>
  <h1 class="col-span-2 text-gray-500 text-[15px]">
    ${details.mainFeatures.memory}
  </h1>

  <h1 class="text-tertiary font-semibold">Sensors</h1>
  <h1 class="col-span-2 text-gray-500 text-[15px]">
    ${sensorString}
  </h1>
  `;

  showDetailsModal.showModal();
};
