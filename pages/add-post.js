import { useState } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handlePost = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!title || !content) return setError('All fields are required');

        // post structure
        const post = {
            title,
            content,
            published: false,
            createdAt: new Date().toISOString(),
        };
        // save the post
        const response = await axios.post('/api/posts', post)
        const { message, success } = response.data

        // get the data
        if (success) {
            // reset the fields
            setTitle('');
            setContent('');
            // set the message
            return setMessage(message);
        } else {
            // set the error
            return setError(message);
        }
    };

    return (
        <div>
            <Nav />
            <div className={styles.container}>
                <form onSubmit={handlePost} className={styles.form}>
                    {error && (
                        <div className={styles.formItem}>
                            <h3 className={styles.error}>{error}</h3>
                        </div>
                    )}
                    {message && (
                        <div className={styles.formItem}>
                            <h3 className={styles.message}>{message}</h3>
                        </div>
                    )}
                    <div className={styles.formItem}>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="title"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label>Content</label>
                        <textarea
                            name="content"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder="Post content"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <button type="submit">Add post</button>
                    </div>
                </form>
            </div>
        </div>
    );
}