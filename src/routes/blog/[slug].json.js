import path from "path";
import fs from "fs";
import marked from "marked";
import grayMatter from "gray-matter";

export function get(req, res, next) {
  const { slug } = req.params;

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  const post = fs.readFileSync(
    path.resolve("src/posts", `${slug}.md`),
    "utf-8"
  );
  // Parse frontmatter form string
  const { data, content } = grayMatter(post);

  const renderer = new marked.Renderer();
  const html = marked(content, { renderer });

  res.end(
    JSON.stringify({
      html,
      ...data,
    })
  );
}
