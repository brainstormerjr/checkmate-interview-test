import {GetServerSideProps, InferGetServerSidePropsType} from "next";

interface Joke {
  type:string;
  setup:string;
  punchline:string;
  id:number;
}

export default function SignedIn({ joke }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(joke);
  return (
    <div>
      <h1>Signed In</h1>
      <h2>Wanna hear a programming joke?</h2>
      <h2>{ joke.setup }</h2>
      <h2>{ joke.punchline }</h2>
      {/* Task 3: Your own presentation of the joke here (Free Style 😉 )*/}

      {/* End of Task 3 */}
    </div>
  )

}

// Task 2: Fetch random jokes from the API
// https://official-joke-api.appspot.com/jokes/programming/random
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API and pass it to the page via props.joke

  const url = "https://official-joke-api.appspot.com/jokes/programming/random";
  const response = await fetch(url);
  const data = await response.json();
  let apiJoke:Joke 
  if (data) apiJoke = data[0];
  else {
    apiJoke = {
      type: "programming",
      setup: "legen- wait for it...",
      punchline: "dary!",
      id: -1,
    }
  }

  return {
    props: {
      joke: apiJoke,
    }, // will be passed to the page component as props
  }
}