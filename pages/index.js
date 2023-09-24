import Head from "next/head";
import Heading from "../components/Heading";
import styles from "../styles/Home.module.css";


const Home = () => (
  <div className={styles.wrapper}>
    <Head>
      <title>Home</title>
    </Head>
    <Heading text="Test application Next.js created by Danylo Pasko" />
  </div>
);

export default Home;
