"use client";

import Link from "next/link";
import { IconLogo, IconUser, NameLogo } from "../icons";
import { Icon } from '@iconify/react';

export interface Props {
  namePage: string;
}
export default function AdminHeader(props: Props) {
  const namePage = props.namePage;

  return (
    <div className="px-12 py-4 w-full left-0 bg-[white]">
      <div className="flex justify-between items-center">
        <Link href="#" className="logo flex items-center gap-5">
          <img src={IconLogo} alt="icon-logo" className="w-[50px] h-[50px] rounded-[50%] ring-1 ring-[#FE724C] ring-offset-2 backdrop-blur-sm"/>
          <img src={NameLogo} alt="name-logo" />
        </Link>
        <div className="text-[#FE724C] text-[35px] font-semibold">{namePage}</div>
        <div className="logo flex items-center gap-2">
          <Icon icon="mdi:user-circle" fontSize={"40px"} color="grey"/>
        </div>
      </div>
    </div>
  );
}
