// URL mapping, from hash to a function that responds to that URL action
const router = {
  "/": () => showContent("content-home"),
  "/profile": () =>
    requireAuth(() => showContent("content-profile"), "/profile"),
  "/login": () => login()
};

//Declare helper functions

/**
 * Iterates over the elements matching 'selector' and passes them
 * to 'fn'
 * @param {*} selector The CSS selector to find
 * @param {*} fn The function to execute for every element
 */
const eachElement = (selector, fn) => {
  for (let e of document.querySelectorAll(selector)) {
    fn(e);
  }
};

/**
 * Tries to display a content panel that is referenced
 * by the specified route URL. These are matched using the
 * router, defined above.
 * @param {*} url The route URL
 */
const showContentFromUrl = (url) => {
  if (router[url]) {
    router[url]();
    return true;
  }

  return false;
};

/**
 * Returns true if `element` is a hyperlink that can be considered a link to another SPA route
 * @param {*} element The element to check
 */
const isRouteLink = (element) =>
  element.tagName === "A" && element.classList.contains("route-link");

/**
 * Displays a content panel specified by the given element id.
 * All the panels that participate in this flow should have the 'page' class applied,
 * so that it can be correctly hidden before the requested content is shown.
 * @param {*} id The id of the content to show
 */
const showContent = (id) => {
  console.log("In showContent Printing out the id: " + id);
  eachElement(".page", (p) => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
};

function checkAndLoadUserData() {
  const elements = document.querySelectorAll('.MuiButtonBase-root'); // Replace with the appropriate selector
  let targetElement = null;

  console.log('>>>>>>>>  ' + elements);

  elements.forEach(element => {

    if (element.textContent === 'Connect') {
      targetElement = element;
      element.onclick = function () {
        console.log('You are also clicked');

      };
    }
  });

  if (targetElement) {
    targetElement.setAttribute('id', 'newId'); // Added id attribute
  }
}

/**
 * Updates the user interface
 */
const updateUI = async () => {
  try {

    console.log("In the updateUI... This is where we toggle link visibility...");

    const user = await JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      document.getElementById("profile-data").innerText = JSON.stringify(
        user,
        null,
        2
      );
      console.log("User:  " + JSON.stringify(user.role));
      document.querySelectorAll("pre code").forEach(hljs.highlightBlock);

      eachElement(".profile-image", (e) => (e.src = user.picture));
      eachElement(".user-name", (e) => (e.innerText = user.name));
      eachElement(".user-email", (e) => (e.innerText = user.email));
      eachElement(".auth-invisible", (e) => e.classList.add("hidden"));
      eachElement(".auth-visible", (e) => e.classList.remove("hidden"));

      /*****/
      // Add a <script> tag dynamically to set the userdata variable
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.innerHTML = `var userdata = ${JSON.stringify(user)};`;
      document.head.appendChild(script);

      // New code to print the whole user JSON in the <pre> tag
      const userProfileElement = document.getElementById("user-profile");
      if (userProfileElement) {
        userProfileElement.innerText = JSON.stringify(user, null, 2); // Pretty-print with indentation
      }
    }

    console.log("Now dealing with subscriptions...");

    // CHAT BOT
    // Select all elements with the class 'chatbot-subscription-link'
    const anchorElements = document.getElementsByClassName('chatbot-subscription-link');

    // Check if the user has the 'chatbot_subscription_link' property
    if (user.chatbot_subscription_link) {
      console.log("Setting the anchor link tags");

      // Iterate over each element with the class 'chatbot-subscription-link'
      Array.from(anchorElements).forEach((anchorElement) => {
        // Set the href attribute to the value in the user object
        anchorElement.href = user.chatbot_subscription_link;
      });
    }

    //  STRIPE
    if (Array.isArray(user.active_subscriptions)) {
      // Check if any subscription has the specific ID
      const hasSubscription = user.active_subscriptions.some(subscription =>
        subscription.product === 'prod_R394grfrwqUp00'
      );

      // If found, handle visibility of subscription fields
      if (hasSubscription) {
        const subscriptionFields = document.querySelectorAll('[data-subscription="prod_R394grfrwqUp00"]');

        subscriptionFields.forEach(field => {
          if (field.classList.contains('subs-visible')) {
            field.classList.remove('hidden');
          } else if (field.classList.contains('subs-invisible')) {
            field.classList.add('hidden');
          }
        });

      } else {
        console.warn("No active subscriptions found.");
      }

    }

    const isAdmin = user.role === 'admin';

    console.log("Checking to see if admin " + isAdmin);

    if (isAdmin) {
      console.log("User is admin");

      eachElement(".admin-invisible", (e) => e.classList.add("hidden"));
      eachElement(".admin-visible", (e) => e.classList.remove("hidden"));

    } else {
      console.log("Run this if the user is authenticated but not admin.");
      displayNonAdminFields();
    }
  } catch (err) {
    console.log("Error updating UI!", err);
    return;
  }

  console.log("UI updated with auth/unauth links toggled...");
};

// Function to handle non-admin field visibility
function displayNonAdminFields() {
  // Add 'hidden' class to elements with 'admin-invisible' class
  document.querySelectorAll('.admin-invisible').forEach(field => {
    field.classList.remove('hidden');
  });

  // Remove 'hidden' class from elements with 'admin-visible' class
  document.querySelectorAll('.admin-visible').forEach(field => {
    field.classList.add('hidden');
  });
}

function onNavClick(path) {
  const pathh = path + '';
  if (window.location.pathname !== path && pathh.includes('/pages/')) {
    window.location.href = path;
  }
}

window.onpopstate = (e) => {
  console.log("In onpopstate");
  if (e.state && e.state.url && router[e.state.url]) {
    console.log("Going to do showContentFromURL in onpopstate");
    showContentFromUrl(e.state.url);
  }
};

window.onload = () => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>   onLoad');
  updateUI();
  fetchStats();
  setTimeout(() => {
    checkAndLoadUserData();

  }, 3000);
};