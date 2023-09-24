import Head from "next/head";
import Link from "next/link";
import Heading from "../../components/Heading";

export const getServerSideProps = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();

    if (!data) {
      return {
        notFound: true,
      };
    }

    const limitedContacts = data.slice(0, 5);

    return {
      props: { contacts: limitedContacts },
    };
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return {
      props: {
        contacts: [],
      },
    };
  }
};

const Contacts = ({ contacts }) => { 
  return (
    <>
      <Head>
        <title>Contacts</title>
      </Head>
      <Heading text="Contacts list:" />
      <ul>
        {contacts && contacts.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/users/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Contacts;
