import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Posts from './components/Posts';
import NewPost from './components/NewPost';
import OnePost from './components/OnePost';
import EditPost from './components/EditPost';

function App() {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    {
      try {
        const response = await fetch('http://localhost:7070/posts', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        setPosts(data)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const fetchNewPost = async (newPost) => {
    {
      try {
        const response = await fetch('http://localhost:7070/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPost)
        });
        if (response.status === 204) {
          await fetchData();

        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  const fetchDeletePost = async (id) => {
    {
      try {
        const response = await fetch(`http://localhost:7070/posts/${id}`, {
          method: 'DELETE',
        });
        if (response.status === 204) {
          await fetchData();

        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  const fetchNewValue = async (id, newPostInfo) => {
    {
      try {
        const response = await fetch(`http://localhost:7070/posts/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPostInfo)
        });
        if (response.status === 204) {
          await fetchData();
        }
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  function convertDate(date) {
    const now = Date.now();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    if (diffInMinutes <= 60) {
      return `${diffInMinutes} minutes ago`;
    }
    return `прошло больше часа`;
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<Posts posts={posts} convertDate={convertDate} />} />
          <Route path="/posts/new" element={<NewPost fetchNewPost={fetchNewPost} />} />
          <Route path="/posts/:id" element={<OnePost posts={posts} convertDate={convertDate} fetchDeletePost={fetchDeletePost} />} />
          <Route path="/posts/:id/edit" element={<EditPost posts={posts} fetchNewValue={fetchNewValue} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App