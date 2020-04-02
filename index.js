  const project = location.href.match(/.*\/\/(.*?)\./)[1];
  const urltag = document.querySelector("#url");
  const path = (location.pathname === "/" ? "/index.html" : location.pathname).substring(1);

  urltag.textContent = `${project} / ${path}`;
  urltag.href = `https://glitch.com/edit/#!/${project}?path=${path}`;
