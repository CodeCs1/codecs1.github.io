const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const titleInput = document.getElementById('title');
const dateInput = document.getElementById('date');

// Default to today
dateInput.valueAsDate = new Date();

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
btn.classList.add('active');

document.getElementById('editor').classList.remove('active');
document.getElementById('preview').classList.remove('active');

document.getElementById(btn.dataset.tab).classList.add('active');

if (btn.dataset.tab === 'preview') {
  const markdown = editor.value;
  preview.innerHTML = `
<h2>${titleInput.value || 'Untitled'}</h2>
<p><em>${new Date(dateInput.value).toLocaleDateString()}</em></p>
<div>${marked.parse(markdown)}</div>
  `;
}
  });
});

function saveFile(filename, content) {
  const a = document.createElement('a');
  const blob = new Blob([content], { type: 'text/html' });
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

function generateHTML(title, date, body) {
  return `
<!DOCTYPE html>
<html lang="en">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <head>
    <meta charset="UTF-8">
    <title>${title} - Code-dev Blogs</title>
    <style>
        body {
        font-family: Georgia, serif;
        background: #121212;
            color: white;
            padding: 40px;
            max-width: 800px;
            margin: auto;
        }
        a { color: #0066cc; text-decoration: none; }
    </style>
    </head>
    <body>
        <a href="../index.html">← Back to Blog List</a>
        <h1>${title}</h1>
        <p><em>Published on ${new Date(date).toLocaleDateString()}</em></p>
        <div>${body}</div>
    </body>
</html>
`;
}

function updatePostContainer(title, date, excerpt, filename) {
  const newPost = { title, date, excerpt, link: filename };
  let posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');

  // Remove existing with same title
  posts = posts.filter(p => p.title !== title);
  posts.push(newPost);
  localStorage.setItem('blogPosts', JSON.stringify(posts));
}

function handleSave(type) {
  const title = titleInput.value.trim() || 'Untitled Blog';
  const date = dateInput.value || new Date().toISOString().split('T')[0];
  const markdown = editor.value.trim();
  const htmlBody = marked.parse(markdown);
  const filename = title.toLowerCase().replace(/\s+/g, '-') + (type === 'draft' ? '-draft' : '') + '.html';
  const excerpt = markdown.split('\n')[0].substring(0, 100) + '...';

  const fullHTML = generateHTML(title, date, htmlBody);
  saveFile(filename, fullHTML);
  updatePostContainer(title, date, excerpt, "blog-page/"+filename);
}

document.querySelector('.publish').addEventListener('click', () => handleSave('publish'));
document.querySelector('.draft').addEventListener('click', () => handleSave('draft'));