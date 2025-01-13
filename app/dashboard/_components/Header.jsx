"use client";
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link'; // Import Link for navigation
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]); // Update whenever the path changes

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src="/logo.svg" width={50} height={30} alt="logo" />
      <ul className="hidden md:flex gap-6 ml-4 mr-4">
        {/* Use Link for navigation */}
        <li>
          <Link href="/dashboard" className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-primary font-bold'}`}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/dashboard/questions" className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/questions' && 'text-primary font-bold'}`}>
            Questions
          </Link>
        </li>
        <li>
          <Link href="/dashboard/upgrade" className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' && 'text-primary font-bold'}`}>
            Upgrade
          </Link>
        </li>
        <li>
          <Link href="/dashboard/how" className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/how' && 'text-primary font-bold'}`}>
            How does it work?
          </Link>
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
