---
layout: minimal-app
icon: "notifications_active"
title: "GPT"
blurb: "We'll get you the answers your looking for."
access: "internal-user"
authenticated: true
top-level-link: false
priority: 1
---

<style>

	#response {
		margin-top: 20px;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		background-color: #f9f9f9;
	}
	textarea {
		width: 100%;
		height: 100px;
		margin-bottom: 10px;
		padding: 10px;
		font-size: 16px;
	}
	button {
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
	}
</style>

<h5>What would you like to know?</h5>
<textarea id="queryInput" placeholder="Type your question here..."></textarea>
<br>
<button id="submitBtn">Submit</button>
<div id="response">Response will appear here...</div>

<a href="/apps/gpt/gpt0.png">.</a>
<a href="/apps/gpt/gpt1.png">.</a>

<script>
document.getElementById("submitBtn").addEventListener("click", async function () {
    const query = document.getElementById("queryInput").value.trim();

    if (!query) {
	document.getElementById("response").textContent = "Please enter a question.";
	return;
    }

    document.getElementById("response").textContent = "Fetching response...";
    
    try {
	const response = await fetch("https://api.milesahead.today/api/chatgpt/query2", {
	    method: "POST",
	    headers: {
		"Content-Type": "application/json"
	    },
	    body: JSON.stringify({ query: query })
	});

	if (response.ok) {
	    const data = await response.json();
	    document.getElementById("response").textContent = data.response || "No response received.";
	} else {
	    document.getElementById("response").textContent = "Error: Unable to fetch response.";
	}
    } catch (error) {
	document.getElementById("response").textContent = "Error: Something went wrong.";
    }
});
</script>

