"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { use } from "react";

import Profile from "@components/Profile";

export default function UserProfile({ params }) {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const userId = use(params)?.id;

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      setUserPosts(data);
    };

    if (userId) fetchPost();
  }, [userId]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
}
