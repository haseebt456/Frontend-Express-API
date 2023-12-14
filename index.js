
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

          cell1.textContent = record.name;
          cell2.textContent = record.description;

          // Add buttons for Edit and Delete actions
          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.onclick = () => editRecord(record._id);
          
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.onclick = () => deleteRecord(record._id);

          cell3.appendChild(editButton);
          cell3.appendChild(deleteButton);
      });
  }

  // Function to add a new record
  async function addRecord() {
      const name = document.getElementById("name").value;
      const description = document.getElementById("description").value;

      const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, description })
      });

      if (response.ok) {
          fetchAndDisplayRecords();
          // Clear input fields after adding a record
          document.getElementById("name").value = "";
          document.getElementById("description").value = "";
      } else {
          console.error("Failed to add record");
      }
  }

  // Function to edit a record
  async function editRecord(recordId) {
      // Implement the logic to edit a record
      // You may use a modal or a form for editing
      console.log(`Edit record with ID: ${recordId}`);
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