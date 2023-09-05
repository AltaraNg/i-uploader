export default function Alert({ message }) {
   return (
      <div className="absolute w-96 right-2 top-0 z-50">
         <div className="rounded-md bg-red-50 p-4 mt-8">
            <div className="flex">
               <div className="flex-shrink-0">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="stroke-red-700 flex-shrink-0 h-6 w-6"
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
               </div>
               <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">An error occurred!</h3>
                  <div className="text-sm text-red-700">
                     <p>{message}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
