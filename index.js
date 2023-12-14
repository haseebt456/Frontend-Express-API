
  const apiUrl = "https://crud-api-mongo-xvln.vercel.app/Products";

  // Function to fetch and display records
  async function fetchAndDisplayRecords() {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const tableBody = document.querySelector("#recordTable tbody");
      tableBody.innerHTML = "";

      data.forEach(record => {
          const row = tableBody.insertRow();
          const cell1 = row.insertCell(0);
          const cell2 = row.insertCell(1);
          const cell3 = row.insertCell(2);
          const cell4 = row.insertCell(3);

          cell1.textContent = record.name;
          cell2.textContent = record.price;
          cell3.textContent = record.stock;

          // Add buttons for Edit and Delete actions
          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.onclick = () => editRecord(record._id);
          console.log(record._id);
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.onclick = () => deleteRecord(record._id);

          cell4.appendChild(editButton);
          cell4.appendChild(deleteButton);
      });
  }

  // Function to add a new record
  async function addRecord() {
      const name = document.getElementById("name").value;
      const price = document.getElementById("price").value;
      const stock = document.getElementById("stock").value;

      const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, price,stock })
      });

      if (response.ok) {
          fetchAndDisplayRecords();
          // Clear input fields after adding a record
          document.getElementById("name").value = "";
          document.getElementById("price").value = "";
          document.getElementById("stock").value = "";
      } else {
          console.error("Failed to add record");
      }
  }


  function populateEditModal(record) {
    document.getElementById("editName").value = record.name;
    document.getElementById("editPrice").value = record.price;
    document.getElementById("editStock").value = record.stock;
  }
  function cancelEditModal() {
    editingRecordId = null;
    const editModal = document.getElementById("editModal");
    editModal.style.display = "none";
  }
  let editingRecordId = null;
  async function editRecord(recordId) {
    editingRecordId = recordId;
    const editModal = document.getElementById("editModal");
    editModal.style.display = "block";

    // Fetch the record data and populate the edit modal
    const response = await fetch(`${apiUrl}/${recordId}`);
    const record = await response.json();
    populateEditModal(record);
  }

  // Function to update a record
  async function updateRecord() {
    const name = document.getElementById("editName").value;
    const price = document.getElementById("editPrice").value;
    const stock = document.getElementById("editStock").value;
    console.log(name+price+stock);  
    console.log(`${apiUrl}/${editingRecordId}`);
    const response = await fetch(`${apiUrl}/${editingRecordId}`, {
      method: "PATCH", // Assuming your API supports the PUT method for updates
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, stock }),
    });

    if (response.ok) {
      fetchAndDisplayRecords();
      cancelEditModal();
    } else {
      console.error("Failed to update record");
    }
  }
  // Function to delete a record
  async function deleteRecord(recordId) {
      const response = await fetch(`${apiUrl}/${recordId}`, {
          method: "DELETE"
      });

      if (response.ok) {
          fetchAndDisplayRecords();
      } else {
          console.error("Failed to delete record");
      }
  }
  

  // Initial fetch and display when the page loads
  fetchAndDisplayRecords();