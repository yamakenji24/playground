import type { NextPage, GetServerSideProps } from 'next';



type User = {
  user: {
    id: number;
    name: string;
  };
};

type Props = User;

const Home: NextPage<Props> = props => {
  return (
    <div>
      <p>id: {props.user.id}</p>
      <p>name: {props.user.name}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  const user = {
    id: 1,
    name: 'dummy'
  }

  return {
    props: {
      user
    },
  };
};

export default Home;
