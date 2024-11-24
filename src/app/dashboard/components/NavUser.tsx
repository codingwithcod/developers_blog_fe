"use client";

import {
  ChevronsUpDown,
  LogOut,
  UserRoundPenIcon,
  UserRound,
  SquareArrowOutUpRight,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

const NavUser = () => {
  const { data: session } = useSession();
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={session?.user.profilePic}
                  alt={session?.user.firstName}
                />
                <AvatarFallback className="rounded-lg bg-indigo-500">
                  {session?.user.firstName.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {session?.user.firstName} {session?.user.lastName}
                </span>
                <span className="truncate text-xs">{session?.user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={session?.user.profilePic}
                    alt={session?.user.firstName}
                  />
                  <AvatarFallback className="rounded-lg bg-indigo-500">
                    {session?.user.firstName.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {" "}
                    {session?.user.firstName} {session?.user.lastName}
                  </span>
                  <span className="truncate text-xs">{session?.user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={"/"}>
                <DropdownMenuItem className="gap-3">
                  <SquareArrowOutUpRight className="h-5 w-5" />
                  Go To Home
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={`/u/@${session?.user.username}`}>
                <DropdownMenuItem className="gap-3">
                  <UserRound className="h-5 w-5" />
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link href={`/u/@${session?.user.username}/update`}>
                <DropdownMenuItem className="gap-3">
                  <UserRoundPenIcon className="h-5 w-5" />
                  Update Profile
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-3">
              <LogOut className="h-5 w-5" />
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUser;
