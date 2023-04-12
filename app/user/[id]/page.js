import { Suspense } from "react";
import { UserComponent, Loading } from "@/components/User"


export default async function User({ params }) {

  return (
    <div className="bg-slate-100 min-h-full flex flex-col">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-1 w-full">
        <div className="mx-auto max-w-xl pt-4">
          <Suspense fallback={<Loading />}>
            <UserComponent id={params.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
