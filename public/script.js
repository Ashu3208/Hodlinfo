var countdownNumberEl = document.getElementById('countdown-number');
var countdown = 60;

countdownNumberEl.textContent = countdown;

setInterval(function() {
  countdown = --countdown <= 0 ? 60 : countdown;

  countdownNumberEl.textContent = countdown;
}, 1000);


  
  function updateTable(data) {
    const tableBody = document.getElementById('table-body');
    const tableRows = data.map(item => {
      return `<tr>
        <td>${item.name}</td>
        <td>${item.last}</td>
        <td>${item.buy}</td>
        <td>${item.sell}</td>
        <td>${item.volume}</td>
        <td>${item.base_unit}</td>
      </tr>`;
    }).join('');
  
    tableBody.innerHTML = tableRows;
  }
  
  function fetchData() {
    console.log('Fetching data...');
    fetch('/api/data')
      .then(response => response.json())
      .then(savedData => {
        console.log('Data fetched:', savedData);
        updateTable(savedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
  // Fetch data initially
  fetchData();
  
  // Refresh data every 60 seconds
  setInterval(fetchData, 60000);
  
  // Start countdown timer
  updateCountdown();
  
  const dropdownBtn1 = document.getElementById("dropdown-btn-1");
  const dropdownBtn2 = document.getElementById("dropdown-btn-2");

  const dropdownContent1 = document.querySelectorAll("#buttons-container .dropdown-content")[0];
  const dropdownContent2 = document.querySelectorAll("#buttons-container .dropdown-content")[1];

  dropdownContent1.addEventListener("click", (event) => {
      dropdownBtn1.innerText = event.target.innerText;
  });

  dropdownContent2.addEventListener("click", (event) => {
      dropdownBtn2.innerText = event.target.innerText;
  });
  const toggleSwitch = document.getElementById('toggle-switch');
  toggleSwitch.addEventListener('change', function() {
    document.body.classList.toggle('toggle-mode');
  });