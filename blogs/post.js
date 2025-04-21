

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

const blogFiles = await fetch('blog-posts.json').then(res => res.json());

var blogPosts= []

  async function fetchBlogMeta(file) {
    const res = await fetch("blog-page/"+file+".html");
    const html = await res.text();

    const titleMatch = html.match(/<h1>(.*?)<\/h1>/);
    const dateMatch = html.match(/Published on (.*?)<\/em>/);
    const bodyMatch = html.match(/<div>([\s\S]*?)<\/div>/i);

    const title = titleMatch ? titleMatch[1] : "Untitled";
    const excerpt = bodyMatch ? bodyMatch[1].replace(/<[^>]+>/g, "").slice(0, 63) + "..." : "";
    const datestr = dateMatch[1].split('/');
    const date= dateMatch ? new Date(datestr[2]+"-"+datestr[1]+"-"+datestr[0]) : new Date();

    return {
      title,
      date,
      excerpt,
      link: file
    };
  }

  async function loadBlogPosts() {
    const posts = await Promise.all(blogFiles.map(fetchBlogMeta));
    blogPosts = posts;
    sortPosts("date-new");
  }

  function renderPosts(posts) {
    container.innerHTML = "";
    posts.forEach((post, index) => {
      const div = document.createElement("div");
      div.className = "blog-post";
      div.innerHTML = `
        <a href="blog-page/${post.link}.html">
          <h2>${post.title}</h2>
          <p>Published on ${post.date.toLocaleDateString()}</p>
          <p>${post.excerpt}</p>
        </a>
        <div style="margin-top:10px">
          <button onclick="editPost('${post.link}')">✏️ Edit</button>
          <button onclick="deletePost('${post.link}')">🗑️ Delete</button>
        </div>
      `;
      container.appendChild(div);
    });
  }

  function sortPosts(type) {
    const sorted = [...blogPosts];
    switch (type) {
      case "date-new": sorted.sort((a, b) => b.date - a.date); break;
      case "date-old": sorted.sort((a, b) => a.date - b.date); break;
      case "name-az": sorted.sort((a, b) => a.title.localeCompare(b.title)); break;
      case "name-za": sorted.sort((a, b) => b.title.localeCompare(a.title)); break;
    }
    renderPosts(sorted);
  }

  sortSelect.addEventListener("change", (e) => sortPosts(e.target.value));

  let NewBlog = document.getElementById("NewBlog");
  NewBlog.addEventListener('click', () => window.location.href="newblog.html");
  function editPost(file) {
    localStorage.setItem("editPostFile", file);
    window.location.href = "newblog.html";
  }

  function deletePost(file) {
    alert("To delete this post, remove it manually from the blog-page folder:\n" + file);
  }

  loadBlogPosts();
