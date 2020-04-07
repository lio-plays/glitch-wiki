(async function() {
  // root ("/") redirects to last page.
  // because glitch loads "/" at refresh

  const path = location.pathname;
  if (path === "/" && location.hash === "") {
    const lastPath = localStorage.getItem("lastPath");
    if (
      lastPath === "/" || // just in case. would lead to recursion.
      lastPath === null
    ) {
      location.replace("index.html");
    } else {
      location.replace(lastPath);
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

    const glitchpath =
      path === "/" && location.hash !== ""
        ? location.hash.substring(2)
        : path.substring(1);
    urltag.href = `https://glitch.com/edit/#!/${project}?path=${glitchpath}`;

    // markdown

    const markdowntag = document.querySelector("#markdown");
    const htmltag = document.querySelector("#html");
    if (path === "/" && location.hash !== "") {
      htmltag.innerHTML = "<h1>Loading</h1>";
      const response = await fetch(new Request(location.hash.substring(1)));
      if (response.status === 200) {
        var src = await response.text();
      } else {
        var src = "Error. Goto [Index](index.html)";
      }
    } else {
      var src = markdowntag.innerHTML;
    }

    markdowntag.innerHTML = "";
    const md = window.markdownit();
    const result = md.render(src);
    htmltag.innerHTML = result;
  }
})();
