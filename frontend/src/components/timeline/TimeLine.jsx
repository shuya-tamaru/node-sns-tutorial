import React, {useState, useEffect, useContext} from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import "./TimeLine.css";
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';
// import {Posts} from "../../dummyData"

export default function TimeLine({ username }) {
  const [ posts, setPosts ] = useState([]);
  const { user } = useContext(AuthContext);
 
  useEffect(()=>{
    const fetchPosts = async () => {
      const response = username 
      ? await axios.get(`/posts/profile/${username}`) //if protile page
      : await axios.get(`/posts/timeline/${user._id}`); // if top page
      setPosts(response.data.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      })
    );
  };
  fetchPosts();
  },[username,user._id]);

  return (
    <div className="TimeLine">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post._id}/>
        ))}
      </div>
    </div>
  )
} 
