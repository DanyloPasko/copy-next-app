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

    const limitedUsers = data.slice(0, 5);

    return {
      props: { users: limitedUsers },
    };
  } catch (error) {
    console.error('Помилка при отриманні інформації:', error);
    return {
      props: {
        users: [],
      },
    };
  }
};

const Users = ({ users }) => { 
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Heading text="Contacts list:" />
      <ul>
        {users && users.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/users/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Users;
