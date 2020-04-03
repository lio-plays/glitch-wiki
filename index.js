// url from here to glitch-editor
const project = location.href.match(/.*\/\/(.*?)\./)[1];
const urltag = document.querySelector("#url");
const path = (location.pathname === "/"
  ? "/index.html"
  : location.pathname
).substring(1);

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
                       