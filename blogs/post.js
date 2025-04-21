

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


const container = document.getElementById("posts-container");
  const sortSelect = document.getElementById("sort-options");

  let blogPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");

  function renderPosts(posts) {
    container.innerHTML = "";
    posts.forEach((post, index) => {
      const div = document.createElement("div");
      div.className = "blog-post";
      div.innerHTML = `
        <a href="${post.link}">
          <h2>${post.title}</h2>
          <p>Published on ${new Date(post.date).toLocaleDateString()}</p>
          <p>${post.excerpt}</p>
        </a>
        <div style="margin-top:10px">
          <button onclick="editPost(${index})">✏️ Edit</button>
          <button onclick="deletePost(${index})">🗑️ Delete</button>
        </div>
      `;
      container.appendChild(div);
    });
  }


  if (blogPosts.length == 0) {
    alert("This blog page is currently empty!");
  }

  function sortPosts(type) {
    const sorted = [...blogPosts];
    switch (type) {
      case "date-new": sorted.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
      case "date-old": sorted.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
      case "name-az": sorted.sort((a, b) => a.title.localeCompare(b.title)); break;
      case "name-za": sorted.sort((a, b) => b.title.localeCompare(a.title)); break;
    }
    renderPosts(sorted);
  }

  sortSelect.addEventListener("change", (e) => sortPosts(e.target.value));
  
  var newblog = document.getElementById('NewBlog');
  newblog.addEventListener("click", () => window.location.href="NewBlog.html");

  function deletePost(index) {
    if (confirm("Delete this post?")) {
      blogPosts.splice(index, 1);
      localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
      sortPosts(sortSelect.value);
    }
  }

  function editPost(index) {
    const post = blogPosts[index];
    localStorage.setItem("editPost", JSON.stringify(post));
    window.location.href = "NewBlog.html";
  }

  // On load
  sortPosts("date-new");
