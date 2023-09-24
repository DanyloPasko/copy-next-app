import Head from "next/head";
import UsersInfo from "../../components/UsersInfo";

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { contact: data },
  }
};

const Contact = ({ contact }) => (
  <>
    <Head>
      <title>Contact page</title>
    </Head>
    <UsersInfo contact={contact} />
  </>
);

export default Contact;
