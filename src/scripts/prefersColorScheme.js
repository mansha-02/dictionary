
const defaultThemeClass = "theme--default";
const lightThemeClass = "theme--light";
const darkThemeClass = "theme--dark";

const toggleElements = getToggleElements();

updateDocumentState();
updateToggleStates();

toggleElements.forEach((toggle) =>
  toggle.addEventListener("click", toggleEventListenerFor(toggle))
);
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (evt) => {
    if (document.body.classList.contains(defaultThemeClass)) {
      updateToggleStates();
    }
  });

/**
 
 * @param {*} element
 * @returns 
 */
function toggleEventListenerFor(element) {
  return (evt) => {
    const selectedColorScheme = evt.target.checked ? "dark" : "light";

    if (selectedColorScheme === getSystemColorScheme()) {
      removeUserColorScheme();
    } else {
      setUserColorScheme(selectedColorScheme);
    }
    updateDocumentState();
    updateToggleStates(evt.target);
  };
}

/**

 * @param {*} currentEl
 */
function updateToggleStates(currentEl) {
  const userScheme = getUserColorScheme();
  let checkedState = userScheme
    ? userScheme === "dark"
    : getSystemColorScheme() === "dark";
  toggleElements.forEach((el) => {
    if (el !== currentEl) {
      el.checked = checkedState;
    }
  });
}

function updateDocumentState() {
  const userTheme = getUserColorScheme();
  if (userTheme) {
    const userThemeClass =
      userTheme === "dark" ? darkThemeClass : lightThemeClass;

    if (!document.body.classList.contains(userThemeClass)) {
      // reset body state to no theme
      document.body.classList.remove(defaultThemeClass);
      document.body.classList.remove(darkThemeClass);
      document.body.classList.remove(lightThemeClass);
      document.body.classList.add(userThemeClass);
    }
  } else {
    // if body does not presently use the default theme class
    if (!document.body.classList.contains(defaultThemeClass)) {
      // reset body state to no theme
      document.body.classList.remove(darkThemeClass);
      document.body.classList.remove(lightThemeClass);

      // and attach the default theme
      document.body.classList.add(defaultThemeClass);
    }
  }
}

/**
@media (prefers-color-scheme: dark)
 
 *
 * @returns "light" or "dark"
 */
function getSystemColorScheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}


function removeUserColorScheme() {
  localStorage.removeItem("userColorScheme");
}

/**

 * @param {string} scheme, either "dark" or "light"
 */
function setUserColorScheme(scheme) {
  localStorage.setItem("userColorScheme", scheme);
}

/**
 
 * @returns {string} either "light" or "dark" or null
 */
function getUserColorScheme() {
  return localStorage.getItem("userColorScheme");
}

function getToggleElements() {
  return Array.from(document.querySelectorAll("[data-dark-mode-toggle]"));
}
