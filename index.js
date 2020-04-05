// root ("/") redirects to last page.
//because glitch loads "/" at refresh

const path = location.pathname.substring(1);
if (path === "") {
  const path = localStorage.getItem("lastPath");
  location.replace(path);
} else {
  localStorage.setItem("lastPath", path);

  // url from here to glitch-editor

  const project = location.href.match(/.*\/\/(.*?)\./)[1];
  const urltag = document.querySelector("#url");

  urltag.textContent = `${project} / ${path}`;
  urltag.href = `https://glitch.com/edit/#!/${project}?path=${path}`;

  // markdown

  const markdowntag = document.querySelector("#markdown");
  const src = markdowntag.innerHTML;
  const md = window.markdownit();
  const result = md.render(src);
  const htmltag = document.querySelector("#html");
  markdowntag.innerHTML = "";
  htmltag.innerHTML = result;
}
