import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css'

function App() {

  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Posts</Link>
              </li>

              <li>
                <Link to="/addPost">Add Post</Link>
              </li>
            </ul>
          </nav>
          <Routes>

            <Route path="/" element={<Posts />} />

            <Route path="/addPost" element={<AddPost />} />

          </Routes>
        </div>
      </Router>
    </>
  );
}

function Posts () {
  return (
    <h2>This route returns the posts</h2>
  )
}

function AddPost () {
  return (
    <h2>This route returns the page on which you can add new posts to the site</h2>
  )
}

export default App
