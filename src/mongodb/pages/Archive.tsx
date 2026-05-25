import { useState, useEffect } from "react";
import { H2 } from "@leafygreen-ui/typography";
import PostSummary from "../components/PostSummary";
import { baseUrl } from "../config";
import { Post } from "../models";

export default function App() {

  const [posts, setPosts] = useState([] as Post[]);

  useEffect(() => {
    const loadPosts = () => {
      fetch(`${baseUrl}/posts/`)
        .then(resp => resp.json()).then((results) => setPosts(results));
    }

    loadPosts();
  }, []);

  return (
    <>
      <H2>All Articles</H2>
      <div>
        {posts.map(post => {
          return (
            <PostSummary {...post} key={post._id} />
          )
        })}
      </div>
    </>
  )
}