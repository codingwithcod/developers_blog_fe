"use client";
import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./components/NavMain";
import { TeamSwitcher } from "./components/TeamSwitcher";
import NavUser from "./components/NavUser";
// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Users",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All Users",
          url: "#",
        },
        {
          title: "Blocked Users",
          url: "#",
        },
        {
          title: "Unverified Users",
          url: "#",
        },
      ],
    },
    {
      title: "Blogs",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "All Blogs",
          url: "#",
        },
        {
          title: "Featured",
          url: "#",
        },
        {
          title: "Published",
          url: "#",
        },
        {
          title: "Draft",
          url: "#",
        },
      ],
    },
    {
      title: "Report",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Blog",
          url: "#",
        },
        {
          title: "Comment",
          url: "#",
        },
        {
          title: "Profile",
          url: "#",
        },
      ],
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
