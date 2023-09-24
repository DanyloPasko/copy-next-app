import Heading from "./Heading";

const UsersInfo = ({ user }) => {
  const { name, email, address } = user || {};
  const { street, suite, city, zipcode } = address || {};

  if (!user) {
    return <Heading tag="h3" text="Empty contact" />
  }

  return (
    <>
      <Heading tag="h3" text={name} />
      <div>
        <strong>Email: </strong>
        {email}
      </div>
      <div>
        <strong>Address: </strong>
        {`${street}, ${suite}, ${city}, ${zipcode}`}
      </div>
    </>
  );
}

export default UsersInfo;
