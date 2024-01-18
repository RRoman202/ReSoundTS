function changeTheme() {
  var element = document.getElementById("App");
  if (localStorage.getItem("theme") !== "dark") {
    element!.className = "dark";
    localStorage.setItem("theme", "dark");
  } else {
    element!.className = "light";
    localStorage.setItem("theme", "light");
  }
}

export default changeTheme;
