import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Typeahead from "./Typeahead";
import quotes from "@/utils/quotes.json";
import Quote from "@/components/Quote";


export default async function Home() {
  const { user } = await getServerSession(authOptions);

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-1 w-full">
      <div className="mx-auto max-w-xl pt-4">
        <p className="text-xl font-semibold">Welcome {user.name}!!!</p>
        <p className="mt-8 font-semibold">Search</p>
        <Typeahead placeholder="Type phonenumber or id....." />
        {quote && (<Quote quote={quote} />)}
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Altara|Photo App',
  description: 'This is a photo app from Altara',
};
