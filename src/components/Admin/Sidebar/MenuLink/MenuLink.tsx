"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface MenuItem {
  title: string;
  path: string;
  icon: ReactNode;
}

interface MenuLinkProps {
  item: MenuItem;
}

const MenuLink: React.FC<MenuLinkProps> = ({ item }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`p-4 flex items-center gap-3 mx-1 rounded-lg hover:bg-gray-700 transition duration-200 ease-in-out ${pathname === item.path ? "bg-[#2e374a]" : "bg-transparent"}`}
    >
      {item.icon}
      <span className="">{item.title}</span>
    </Link>
  );
}

export default MenuLink;
