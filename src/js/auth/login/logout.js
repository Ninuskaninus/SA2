export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location.href = "/";
  alert("You have been logged out");
}
