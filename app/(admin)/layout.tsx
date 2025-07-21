"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import {
  IconBrandTabler,
  IconLogout,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

import { useUserStore } from "@/lib/store";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserStore();
  const { profilePicture, name } = user || {
    name: "Admin",
  };

  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <SidebarLink
              link={{
                label: name,
                href: "#",
                icon: profilePicture ? (
                  <Image
                    src={profilePicture}
                    alt="Avatar"
                    width={10}
                    height={10}
                    className="w-7 h-7 rounded-full border-4 border-gray-200 object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 bg-gray-200 rounded-full border-4 border-gray-200 flex-shrink-0">
                    <div className="flex items-center justify-center h-full text-gray-500 text-xl">
                      {name[0]}
                    </div>
                  </div>
                ),
              }}
            />
            <Link href="/auth/logout" className={open ? "block" : "hidden"}>
              <IconLogout className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            </Link>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </div>
  );
}

const links = [
  {
    label: "Dashboard A",
    href: "#",
    icon: (
      <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Dashboard B",
    href: "#",
    icon: (
      <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Dashboard C",
    href: "#",
    icon: (
      <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-4 py-1 text-sm font-normal text-black"
    >
      <Image src={"/collegeLogo.png"} alt="logo" width={40} height={40} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-medium whitespace-pre text-black dark:text-white"
      >
        Alumni Portal
      </motion.span>
    </a>
  );
};

const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image src={"/collegeLogo.png"} alt="logo" width={40} height={40} />
    </a>
  );
};
