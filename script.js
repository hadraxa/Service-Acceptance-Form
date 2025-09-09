const serviceForm = document.getElementById("serviceForm");
if (serviceForm) {
  serviceForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent actual submission for now
    alert("Form submitted! (This is just a demo)");
    // You can later send data to backend using fetch/AJAX
  });
}

const data = [
  { id: 1, date: "2025-09-09", ticket: "SF-00123", company: "NGT Solutions", branch: "Karachi", reported: "Ali Raza", type: "Software", feedback: "Excellent" },
  { id: 2, date: "2025-09-08", ticket: "SF-00122", company: "TechBridge", branch: "Lahore", reported: "Sana Khan", type: "Hardware", feedback: "Average" },
  { id: 3, date: "2025-09-07", ticket: "SF-00121", company: "SkyNet", branch: "Islamabad", reported: "Bilal Ahmed", type: "Network", feedback: "Poor" },
  { id: 4, date: "2025-09-06", ticket: "SF-00120", company: "DemoCorp", branch: "Peshawar", reported: "Hira Yousuf", type: "Consulting", feedback: "Very Good" },
];

const rowsPerPage = 5;
let currentPage = 1;
let filteredData = [...data];

function renderTable() {
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  filteredData.slice(start, end).forEach((row, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.date}</td>
      <td>${row.ticket}</td>
      <td>${row.company}</td>
      <td>${row.branch}</td>
      <td>${row.reported}</td>
      <td>${row.type}</td>
      <td>${row.feedback}</td>
    `;
    tableBody.appendChild(tr);
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.toggle("active", i === currentPage);
    btn.onclick = () => {
      currentPage = i;
      renderTable();
    };
    pagination.appendChild(btn);
  }
}

function sortTable(columnIndex) {
  const keys = ["id", "date", "ticket", "company", "branch", "reported", "type", "feedback"];
  const key = keys[columnIndex];
  filteredData.sort((a, b) => a[key].localeCompare(b[key]));
  renderTable();
}

document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  filteredData = data.filter(row =>
    row.company.toLowerCase().includes(keyword) ||
    row.branch.toLowerCase().includes(keyword) ||
    row.feedback.toLowerCase().includes(keyword)
  );
  currentPage = 1;
  renderTable();
});

renderTable();
