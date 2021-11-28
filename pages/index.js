import Head from 'next/head';
import Nav from '../components/Nav';
import PostCard from '../components/PostCard';
import axios from "axios";
import styles from '../styles/Home.module.css';

export default function Home({ posts = [] }) {
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Nav />

            <main>
                <div className={styles.container}>
                    {posts.length === 0 ? (
                        <h2>No added posts</h2>
                    ) : (
                        <ul>
                            {posts.map((post, i) => (
                                <PostCard post={post} key={i} />
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    const { DEV_URL, PROD_URL } = process.env;

    // request posts from api
    const response = await axios.get(`${process.env.NODE_ENV !== 'production' ? DEV_URL : PROD_URL}/api/posts`);

    return {
        props: {
            posts: response.data["message"],
        },
    };
}