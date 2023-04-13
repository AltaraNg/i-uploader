import { getUser } from "@/utils/db";
import Link from 'next/link';
import Quote from "@/components/Quote";


const myArray = [1, 2, 3, 4];

const imgSrc = (img) => {
    if (!img) return '@/public/images/avatar.webp';
    return `https://altara-staging.s3.amazonaws.com/${img}`;
}

export async function UserComponent({ id }) {
    let user = null

    try {
        user = await getUser(id)
    } catch (error) {
        console.error(error)
    }


    return (
        <>
            {!user && (<div>
                <div className="alert alert-error shadow-lg mt-6">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Error! User not found!!!</span>
                    </div>
                </div>
                <Quote />
            </div>)}
            {user && (
                <div key={user.id} className="gap-10 items-start bg-white rounded-lg p-8 mt-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <p className="c-label">ID Card:</p>
                            <img className="aspect-[4/5] w-full flex-none rounded-2xl object-cover" src={imgSrc(user.id_card_url)} alt="image" />
                        </div>
                        <div className="flex-1">
                            <p className="c-label">Passport:</p>
                            <img className="aspect-[4/5] w-full flex-none rounded-2xl object-cover" src={imgSrc(user.passport_url)} alt="image" />
                        </div>
                    </div>
                    <div className="max-w-xl flex-auto space-y-2 mt-2">
                        <div>
                            <p className="c-label">Name:</p>
                            <p className="c-text">{user.full_name}</p>
                        </div>
                        {user.email && (<div>
                            <p className="c-label">Email:</p>
                            <p className="c-text">{user.email}</p>
                        </div>)}
                        <div>
                            <p className="c-label">Gender:</p>
                            <p className="c-text">{user.gender}</p>
                        </div>
                        <div>
                            <p className="c-label">Address:</p>
                            <p className="c-text">{user.address}</p>
                        </div>
                    </div>
                </div>
            )}
            {user && (<Link href={`/upload/${user.id}`} className="btn btn-block mt-4">Upload Image</Link>)}
            <Link href="/" className="btn btn-block btn-secondary mt-8 mb-4">Dashboard</Link>
        </>
    );
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
