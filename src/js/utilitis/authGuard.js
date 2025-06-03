/**
 * Guards routes that require authentication.
 * 
 * Checks if a token exists in localStorage. If not, alerts the user and redirects to the login page.
 * 
 * @function
 */
export function authGuard() {
    if (!localStorage.token) {
      alert("You must be logged in to view this page");
      window.location.href = "/auth/login/";
    }
  }