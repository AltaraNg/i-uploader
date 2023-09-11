"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import cn from "classnames";
import { useRouter } from "next/navigation";

export default function VerifyLocation({ params }) {
   const router = useRouter();

   const [user, setUser] = useState([]);
   const [loc, setLoc] = useState();
   const [loading, setLoading] = useState(false);

   const getUser = async () => {
      try {
         const response = await fetch(`/api/customer?term=${params.id}`);
         const result = await response.json();
         setUser(result.results[0]);
         getLocation();
      } catch (error) {
         return;
      }
   };

   useEffect(() => {
      getUser();
   }, []);

   async function showPosition(position) {
      let res = await coordinateToPhysicalAddress(
         position.coords.longitude,
         position.coords.latitude,
      );
      setLoc(res);
   }

   async function coordinateToPhysicalAddress(longitude, latitude) {
      let apiKey = process.env.GEOPIFY_KEY;
      let resp;
      await fetch(
         `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`,
         {
            method: "GET",
            headers: {
               Accept: "*/*",
               "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            },
         },
      )
         .then((response) => {
            return response.json();
         })
         .then((res) => {
            let data = res.results[0].formatted;
            resp = data;
         });

      return resp;
   }

   const getLocation = () => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(showPosition);
      }
   };

   const saveAddress = async () => {
      try {
         setLoading(true);

         const response = await fetch("/api/save-address", {
            method: "POST",
            body: JSON.stringify({ id: params.id, add_street: loc, add_addinfo_description: loc }),
         });

         await response.json();
         router.push(`/user/${params.id}`);
      } catch (error) {
         setLoading(false);
      }
   };

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
            </div>
         )}
         {user && (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
               <div className="mx-auto max-w-xl pt-4">
                  <div key={user.id} className="gap-10 items-start bg-white rounded-lg p-8">
                     <div className="max-w-xl flex-auto space-y-2 mt-2">
                        <div>
                           <p className="c-label">Name:</p>
                           <p className="c-text">{user.full_name}</p>
                        </div>
                        {user.email && (
                           <div>
                              <p className="c-label">Email:</p>
                              <p className="c-text">{user.email}</p>
                           </div>
                        )}
                        {loc !== undefined && (
                           <div>
                              <p className="c-label">Location:</p>
                              <textarea
                                 className="w-full text-lg font-semibold"
                                 onChange={(value) => setLoc(value.target.value)}
                                 value={loc}
                              ></textarea>
                           </div>
                        )}

                        <div className="pt-10">
                           <button
                              className={cn(
                                 "btn btn-block text-white sm:w-1/2 mt-2 sm:mt-0",
                                 loading && "loading",
                              )}
                              disabled={loading}
                              onClick={() => saveAddress()}
                           >
                              Save address
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}
