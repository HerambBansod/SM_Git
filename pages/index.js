"use client";
 import '../app/globals.css'

import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
    const [user, setUser] = useState(null);
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => setUser(user));
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
    };

    const handlePost = async () => {
        if (!user) return alert("Please log in first!");

        let imageUrl = "";
        if (image) {
            const imageRef = ref(storage, `images/${image.name}`);
            await uploadBytes(imageRef, image);
            imageUrl = await getDownloadURL(imageRef);
        }

        await addDoc(collection(db, "posts"), {
            text,
            imageUrl,
            userId: user.uid,
            userName: user.displayName,
            createdAt: serverTimestamp(),
        });

        setText("");
        setImage(null);
        fetchPosts();
    };

    return (
        <div>
            {user ? (
                <>
                    <h2>Welcome, {user.displayName}</h2>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a post..." />
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    <button onClick={handlePost}>Post</button>
                    <button onClick={() => auth.signOut()}>Logout</button>
                </>
            ) : (
                <p>Please log in to post.</p>
            )}

            <h3>Recent Posts</h3>
            {posts.map((post) => (
                <div key={post.id}>
                    <p><strong>{post.userName}:</strong> {post.text}</p>
                    {post.imageUrl && <img src={post.imageUrl} alt="Post" width="200" />}
                </div>
            ))}
        </div>
    );
}
