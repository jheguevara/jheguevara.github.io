let auth0Client;

function setCookie(name, value, days) {
  console.log(`Setting the cookie for ${name}`);
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  // Secure flag is necessary when running on HTTPS (like GitHub Pages)
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax; Secure";
  console.log(`Done setting the cookie for ${name}`);
}

function deleteCookie(name) {
  // Set the cookie with the same name, path, and secure flag, but with an expired date
  console.log("Deleting the cookie...");
  document.cookie = name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax; Secure";
}
const fetchAuthConfig = () => fetch("https://align.milesahead.today/auth_config.json");

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();
  //Local
  // auth0Client = await auth0.createAuth0Client({
  //   domain: 'dev-qirtwh6cktfuc8ap.us.auth0.com', // Your Auth0 domain
  //   clientId: 'if0RVNLLCc8jKwyxxaFXEL3vqDC9Svim', // Your Auth0 client I
  // });
  auth0Client = await auth0.createAuth0Client({
    domain: config.domain,
    clientId: config.clientId
  });
  // GIHUB.IO
  // auth0Client = await createAuth0Client({
  //   domain: 'dev-qirtwh6cktfuc8ap.us.auth0.com', // Your Auth0 domain
  //   client_id: 'xVKr3qH9PKG84cZVAK0OS9QcDkb10ver', // Your Auth0 client I
  // });
};


async function login() {
  console.log(`login() called`)
  try {
    await configureClient();
    await auth0Client.loginWithPopup();
    console.log('LOGGING IN   ');
  } catch (error) {
    console.log(error);
  }

  const isAuthenticated = await auth0Client.isAuthenticated();

  if (isAuthenticated) {
    const user = await auth0Client.getUser();
    console.log(`user = ${user}`)
    setCookie("name", user.email, 7)
    setCookie("user", JSON.stringify(user), 7)
    sessionStorage.setItem('user', JSON.stringify(user))
    console.log('USER:  ' + JSON.stringify(user.name));
    // window.location.replace('/pages/apps.html')

    const idToken = await auth0Client.getIdTokenClaims();
    if (idToken && idToken.__raw) {
      console.log("ID Token:", idToken.__raw);
      setCookie("oktaIdToken", idToken.__raw, 7);
    } else {
      console.error("ID Token is undefined or null");
    }

    return;
  }
}

async function logout() {
  console.log('Logout  ' + window.location.origin);
  await configureClient();
  await auth0Client.logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  });
  deleteCookie('name')
  sessionStorage.clear();
  localStorage.clear();
}

window.onload = async () => {
  try {
    console.log('OKTA >>  onLOAD');
    document.getElementById('preloader').style.display = 'block';
    const isLoggedIn = sessionStorage.getItem('user');
    document.getElementById('preloader').style.display = 'none';
    if (isLoggedIn !== null) {
      console.log('LOGGING IN   ');
      const user = JSON.parse(isLoggedIn);
      console.log('USER:  ' + JSON.stringify(user.name));
      //   window.location.replace('/pages/apps.html')
      const isAdmin = user.role === 'admin';

      console.log("Checking to see if admin " + isAdmin);
      eachElement(".profile-image", (e) => (e.src = user.picture));
      eachElement(".auth-invisible", (e) => e.classList.add("hidden"));
      eachElement(".auth-visible", (e) => e.classList.remove("hidden"));

      if (isAdmin) {
        console.log("User is admin");

        eachElement(".admin-invisible", (e) => e.classList.add("hidden"));
        eachElement(".admin-visible", (e) => e.classList.remove("hidden"));

      } else {
        console.log("Run this if the user is authenticated but not admin.");
        displayNonAdminFields();
      }
      return;
    } else {
      document.querySelectorAll('.auth-invisible').forEach(field => {
        field.classList.remove('hidden');
      });
    }
  } catch (error) {
    console.log(error);
  }
}

