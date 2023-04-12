"use client";

import cn from 'classnames';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)


    const handleSubmit = async () => {
        setLoading(true)
        try {
            await signIn("credentials", { redirect: false, staff_id: email, password })
            router.push("/");
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-full">
            <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <img
                            className="h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-8">
                        <div className="mt-6">
                            <form className="space-y-8">
                                <div>
                                    <label className="c-label">
                                        <span className="label-text">Staff ID</span>
                                    </label>
                                    <div className="">
                                        <input id="staff_id" type="text" placeholder="Ex. ALT/12/34" className="text-input" value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label className="c-label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="">
                                        <input id="password" type="password" placeholder="Type password here....." className="text-input" value={password} onChange={e => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <button
                                    className={cn("btn w-full", loading && 'loading')}
                                    disabled={loading}
                                    type="button"
                                    onClick={() => handleSubmit()}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                    alt=""
                />
            </div>
        </div>
    );
}
