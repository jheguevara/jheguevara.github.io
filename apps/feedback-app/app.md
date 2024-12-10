---
layout: minimal-app
title:  "Feedback"
blurb: "Please provide your feedback on the app."

authenticated: true
# subscription-product: enterprise
# subscription-link-name: enterprise-subscription-link
top-level-link: false
priority: 4

---
      
<style>

  .containerx {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      font-size: 16px;
  }
  .h1x {
      font-size: 24px;
      color: #333;
      text-align: center;
  }
  label {
      display: block;
      margin: 15px 0 5px;
      font-weight: bold;
  }
  input[type="text"], select, textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
  }
  .priority-container {
      display: flex;
      gap: 10px;
  }
  .priority-button {
      padding: 8px 16px;
      border: 1px solid transparent;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
  }
  .low {
      background-color: #e6ffe6;
      color: #0b800b;
      border: 1px solid #0b800b;
  }
  .medium {
      background-color: #fff5e6;
      color: #e69500;
      border: 1px solid #e69500;
  }
  .high {
      background-color: #ffcccc;
      color: #ff0000;
      border: 1px solid #ff0000;
  }
  .priority-button.active {
      outline: 2px solid #333;
  }
  .submit-button {
      display: block;
      width: 100%;
      padding: 12px;
      margin-top: 20px;
      background-color: #ff9f42;
      color: white;
      font-size: 16px;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      cursor: pointer;
  }
  .hidden {
    display: none;
  }
</style>

<div>
<div id="form-container" class="container hidden">
    <h1>Please Provide Feedback</h1>
    <form id="ticketForm" 
    action="https://jira.milesahead.today/api/jira/issue"
    method="POST">
        <label for="title">Support Ticket Title *</label>
        <input type="text" id="title" name="summary" placeholder="Enter a brief title for the issue (e.g., Payroll processing error, Login failure)" required>

        <label>Priority Level *</label>
        <div class="priority-container">
            <button type="button" class="priority-button low" onclick="setPriority('Low')">Low</button>
            <button type="button" class="priority-button medium" onclick="setPriority('Medium')">Medium</button>
            <button type="button" class="priority-button high" onclick="setPriority('High')">High</button>
        </div>
        <input type="hidden" id="priority" name="priority" value="">

        <input id="feedback-username" name="userName" disabled type="hidden" />
        <input id="feedback-useremail" name="userEmail" disabled type="hidden" />
        <input name="issueType" disabled type="hidden" value="Feedback"/>
        <select id="category" name="serviceName" required disabled type="hidden" hidden>
            <option value="{{page.url}}">{{page.title}}</option>
        </select>

        <label for="description">Description of Issue *</label>
        <textarea id="description" name="issueDescription" placeholder="Enter the description of the issue" rows="5" required></textarea>

        <button type="submit" class="submit-button">SUBMIT</button>
    </form>
</div>
    <span id="feedback-loading">Loading</span>
</div>

<script>
    function setPriority(priority) {
        document.getElementById('priority').value = priority;
        document.querySelectorAll('.priority-button').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelector(`.${priority.toLowerCase()}`).classList.add('active');
    }

    document.getElementById('ticketForm').addEventListener('submit', function(event) {
        event.preventDefault(); // prevent default form submission

        // Gather form data from form fields
        const formData = {
            summary: document.getElementById('title').value,
            serviceName: document.getElementById('category').value,
            userName: document.getElementById('feedback-username').value,
            userEmail: document.getElementById('feedback-useremail').value,
            issueDescription: document.getElementById('description').value,
            priority: document.getElementById('priority').value,
            issueType: "Feedback" 
        };

        // Send the JSON data to the API endpoint
        fetch(this.action, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
        .then(data => {
            alert("Ticket created successfully!");
        }).catch(error => {
            console.error("Error:", error);
            alert("There was an error creating the ticket.");
        });
    });
</script>

<script>

// Function to check if userdata is loaded
let checkInterval;
// let maxCount = 0
function checkAndLoadUserData() {
    if (typeof userdata !== 'undefined' && userdata.email) {
        // set for user value to form
        document.getElementById("feedback-loading").classList.add("hidden")
        document.getElementById("form-container").classList.remove("hidden")

        document.getElementById("feedback-username").value = userdata.nickname || userdata.name
        document.getElementById("feedback-useremail").value = userdata.email

        clearInterval(checkInterval);
        // maxCount = 0
    }

    // if (maxCount >= 60) {
    //     clearInterval(checkInterval);
    // } else {
    //     maxCount++
    // }
}

// Wait for the page to fully load
window.addEventListener('load', () => {
// Start checking every 500ms if userdata is loaded
checkInterval = setInterval(checkAndLoadUserData, 500);
});
</script>



