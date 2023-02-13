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
    <div className="signed-in">
      <h1>CHECKMATE</h1>
      <h2>work hard + play hard</h2>
      <div className="window-title-bar">
        <div className="window-buttons">
          <span className="red">⬤</span> &nbsp;
          <span className="yellow">⬤</span> &nbsp;
          <span className="green">⬤</span>
          </div>
        CheckMate Joke Terminal
      </div>
      <div className="joke-display">
        <h1>Last login: {
          Date().split(" ")[0] + " " +        // Day of the week
          Date().split(" ")[1] + " " +        // Month
          Date().split(" ")[2] + " " +        // Day
          Date().split(" ")[3] + " " +        // Year
          Date().split(" ")[4].substring(0,5) // hh:mm(:ss)
          // No using seconds, or a react hydration error may occur
          // https://nextjs.org/docs/messages/react-hydration-error
        }</h1>
        <h1>
          signed-in@
          <a href="https://checkmatehk.io" className="blue">CheckMate </a>
          ~ %
          <span> JOKE ./programming/random/</span>
        </h1>
        {/* &nbsp; is a space */}
        <h1>
          <span className="bg-red">&nbsp;SETUP </span>
          &nbsp;{joke.setup}
        </h1>
        <h1>
          <span className="bg-green">&nbsp;PUNCHLINE </span>
          &nbsp;{joke.punchline}
        </h1>
        <h1>
          signed-in@
          <a href="https://checkmatehk.io" className="blue">CheckMate </a>
          ~ % ▌
        </h1>
        {/* Task 3: Your own presentation of the joke here (Free Style 😉 )*/}

        {/* End of Task 3 */}
      </div>
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