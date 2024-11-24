import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const Dashboard = () => {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4"
          />
          <h1 className="text-2xl font-semibold">Developers Blog</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="flex aspect-video flex-col items-center justify-center rounded-xl bg-muted/50">
            <span className="text-5xl font-semibold">50</span>
            <p className="text-xl">Blogs</p>
          </div>
          <div className="flex aspect-video flex-col items-center justify-center rounded-xl bg-muted/50">
            <span className="text-5xl font-semibold">42</span>
            <p className="text-xl text-green-500">Published</p>
          </div>
          <div className="flex aspect-video flex-col items-center justify-center rounded-xl bg-muted/50">
            <span className="text-5xl font-semibold">18</span>
            <p className="text-xl text-yellow-500">Draft</p>
          </div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        <div className="h-[10rem] rounded-xl bg-red-500/10" />
        <div className="h-[10rem] rounded-xl bg-muted/50" />
        <div className="h-[10rem] rounded-xl bg-muted/50" />
        <div className="h-[10rem] rounded-xl bg-muted/50" />
        <div className="h-[10rem] rounded-xl bg-muted/50" />
      </div>
    </SidebarInset>
  );
};

export default Dashboard;
