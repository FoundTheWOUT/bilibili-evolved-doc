const Page = () => {
  return <h1>Hi</h1>;
};

export async function getServerSideProps() {
  console.log("server here");
  return {
    props: {},
  };
}

export default Page;
