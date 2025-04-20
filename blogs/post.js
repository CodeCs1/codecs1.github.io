

// ChatGPT creation =)


function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

let type = getCookie("type");
if (type.length == 0) document.cookie = "type=date-new";


    const blogPosts = [
      {
        title: "My first Blog Post",
        date: "2025-04-20",
        excerpt: "",
        link: "blog-page/blog1.html"
      },
        {
        title: "Operating System Development #1",
        date: "2025-04-20",
        excerpt: "",
        link: "blog-page/blog2.html"
      }
    ];

    const container = document.getElementById("posts-container");
    const sortSelect = document.getElementById("sort-options");

    function renderPosts(posts) {
      container.innerHTML = "";
      posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "blog-post";
        div.innerHTML = `
          <a href="${post.link}">
            <h2>${post.title}</h2>
            <p>Published on ${new Date(post.date).toLocaleDateString()}</p>
            <p>${post.excerpt}</p>
          </a>
        `;
        container.appendChild(div);
      });
    }

    function sortPosts(type) {
      const sorted = [...blogPosts];
      switch (type) {
        case "date-new":
          sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "date-old":
          sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case "name-az":
          sorted.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "name-za":
          sorted.sort((a, b) => b.title.localeCompare(a.title));
          break;
      }
      renderPosts(sorted);
    }

    sortSelect.addEventListener("change", (e) => {
      sortPosts(e.target.value);
      document.cookie="type="+e.target.value
    });

    // Initial render
    sortPosts(type);