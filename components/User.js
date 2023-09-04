import { getUser, getDocuments } from "@/utils/db";
import Link from "next/link";
import Quote from "@/components/Quote";

const myArray = [1, 2, 3, 4];

const imgSrc = (img) => {
    if (!img) {
        return "@/public/images/avatar.webp";
    }
    return `${process.env.S3_HOST}/${img}`;
};

export async function UserComponent({ id }) {
  let user = null
  let documents = []

  try {
    user = await getUser(id)
    documents = await getDocuments(id)
  } catch (error) {}

  const utilityBillDocument = documents.find(
    (item) => item.name === "utility_bill_url"
  )
  const residenceProofDocument = documents.find(
    (item) => item.name === "residence_proof_url"
  )

  const capitalizeStringWithoutUnderscore = (str) => {
    const words = str.split("_")
    const capitalizedWords = words
      .map((word) =>
        word === "url" ? "" : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .filter((word) => word !== "")
      .join(" ")

    return capitalizedWords
  }

  return (
    <>
      <Link href="/" className="btn btn-block btn-secondary mb-6">
        Dashboard
      </Link>
      {!user && (
        <div>
          <div className="alert alert-error shadow-lg mt-6">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Error! User not found!!!</span>
            </div>
          </div>
          <Quote />
        </div>
      )}
      {user && (
        <div
          key={user.id}
          className="gap-10 items-start bg-white rounded-lg p-8 mt-4"
        >
          <div className="flex gap-4">
            <div className="flex-1">
              <p className="c-label">ID Card:</p>
              <img
                className="aspect-[4/5] w-full flex-none rounded-2xl object-cover"
                src={imgSrc(user.id_card_url)}
                alt="image"
              />
            </div>
            <div className="flex-1">
              <p className="c-label">Passport:</p>
              <img
                className="aspect-[4/5] w-full flex-none rounded-2xl object-cover"
                src={imgSrc(user.passport_url)}
                alt="image"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-5">
            {utilityBillDocument && (
              <div className="flex-1">
                <p className="c-label">Utility Bill:</p>
                <img
                  className="aspect-[4/5] w-full flex-none rounded-2xl object-cover"
                  src={imgSrc(utilityBillDocument.document_url)}
                  alt="image"
                />
              </div>
            )}
            {residenceProofDocument && (
        <div className="flex-1">
          <p className="c-label">Residence Proof:</p>
          <img
            className="aspect-[4/5] w-full flex-none rounded-2xl object-cover"
            src={imgSrc(residenceProofDocument.document_url)}
            alt="image"
          />
        </div>
      )}
          </div>
        </div>
      )}
      
      {documents.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 mt-4 mb-6 rounded">
          {documents.map((item, key) => (
            <div key={key}>
              <p className="c-label">
                {capitalizeStringWithoutUnderscore(item.name)}
              </p>
              <img
                className="flex-none w-full rounded-2xl object-contain"
                src={imgSrc(item.document_url)}
                alt="image"
              />
            </div>
          ))}
        </div>
      )}
      {user && (
        <Link
          href={`/upload/${user.id}`}
          className="btn btn-circle btn-accent fixed bottom-12 right-12 sm:bottom-24 sm:right-24 z-50 h-16 w-16"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8v2z"></path>
          </svg>
        </Link>
      )}
    </>
  )
}

export function Loading() {
    return (
        <div className="gap-10 items-start bg-white rounded-lg p-8 mt-4 animate-pulse">
            <div className="flex gap-4">
                <div className="flex-1">
                    <p className="h-2 bg-slate-400 rounded w-28 mb-2"></p>
                    <div className="h-64 bg-gray-400 w-full object-cover object-center rounded-2xl"></div>
                </div>
                <div className="flex-1">
                    <p className="h-2 bg-slate-400 rounded w-28 mb-2"></p>
                    <div className="h-64 bg-gray-400 w-full object-cover object-center rounded-2xl"></div>
                </div>
            </div>
            <div className="max-w-xl flex-auto space-y-4 mt-4">
                {myArray.map((item) => (
                    <div key={item}>
                        <p className="h-2 bg-slate-400 rounded w-28 mb-2"></p>
                        <p className="h-6 bg-slate-400 rounded"></p>
                    </div>
                ))}
            </div>
        </div>
    );
}
