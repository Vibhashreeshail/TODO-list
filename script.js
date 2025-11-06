// --- Function to handle the immediate deletion when a radio button is selected ---
function deleteKeyOnSelect(event) {
  // The 'event.target' is the radio button that was just clicked/changed
  const radio = event.target;

  // Only proceed if the radio button is now checked (which it should be on 'change')
  if (radio.checked) {
    const keyToRemove = radio.value;

    if (
      confirm(
        `You completed the task: "${keyToRemove}". Can I remove it from the TODO List?`,
      )
    ) {
      // 1. Remove the item from Local Storage
      localStorage.removeItem(keyToRemove);

      // 2. Refresh the display to show the updated list
      displayAllItems();
    } else {
      // If the user cancels the deletion, uncheck the radio button
      radio.checked = false;
    }
  }
}

// --- Function to display all items with radio buttons and the 'onchange' listener ---
function displayAllItems() {
  let outputDiv = document.getElementById("todo");

  // Clear previous content
  outputDiv.innerHTML = "<h3>TODO List</h3>";

  if (localStorage.length === 0) {
    outputDiv.innerHTML += "<p>Local Storage is currently empty.</p>";
    return;
  }

  let ul = document.createElement("ul");

  for (let i = 0; i < localStorage.length; i++) {
    let currentKey = localStorage.key(i);
    let currentValue = localStorage.getItem(currentKey);

    let li = document.createElement("li");

    // 1. Create the radio button input
    let radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "selectedKey"; // Grouped, but only one will trigger deletion at a time
    radio.value = currentKey; // Stores the actual key
    radio.id = `key-${i}`;

    // CRUCIAL: Attach the immediate deletion function to the 'change' event
    radio.onchange = deleteKeyOnSelect;

    // 2. Create the label/text
    let label = document.createElement("label");
    label.htmlFor = `key-${i}`;
    label.innerHTML = `&nbsp;&nbsp; Task: ${currentValue}`;

    li.appendChild(radio);
    li.appendChild(label);
    ul.appendChild(li);
  }

  outputDiv.appendChild(ul);
}

// --- Initial Script Execution ---

// 1. Get user input (This runs on page load and adds an item)
let key = prompt("Enter the key");
let value = prompt("Enter the value");

if (key && value) {
  localStorage.setItem(key, value);
}

// 2. Display all items
displayAllItems();
