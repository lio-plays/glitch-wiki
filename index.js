// root ("/") redirects to last page.
// because glitch loads "/" at refresh

const path = location.pathname;
if (path === "/") {
  const path = localStorage.getItem("lastPath");
  if (path === "/") {
    // just in case. would lead to recursion.
    location.replace("index.html");
  } else {
    location.replace(path);
  }
} else {
  const urltag = document.querySelector("#url");
  const project = location.host.match(/(.*?)\./)[1];

  //save last path, update on hashchange

  function updateLastPath() {
    const lastPath = location.pathname + location.hash;
    localStorage.setItem("lastPath", lastPath);
    urltag.textContent = `${project}${lastPath}`;
  }

  onhashchange = () => updateLastPath();
  updateLastPath();

  // url from here to glitch-editor

  urltag.href = `https://glitch.com/edit/#!/${project}?path=${path.substring(
    1
  )}`;

  // markdown

  const markdowntag = document.querySelector("#markdown");
  const src = markdowntag.innerHTML;
  const md = window.markdownit();
  const result = md.render(src);
  const htmltag = document.querySelector("#html");
  markdowntag.innerHTML = "";
  htmltag.innerHTML = result;
}
