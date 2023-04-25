"use client";

import React from 'react'
import { signOut } from "next-auth/react"
import Link from "next/link";

const Header = ({ session }) => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost normal-case text-xl">Altara</Link>
            </div>
            <div className="flex-none">
                {session && (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="/images/avatar.webp" alt="profile" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a onClick={() => signOut()}>Logout</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header;
