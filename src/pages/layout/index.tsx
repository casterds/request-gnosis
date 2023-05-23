import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Typography } from "@material-tailwind/react";
export default function Layout() {
    return <div className="h-screen flex flex-col overflow-hidden">
        <Header />
        <div className="bg-green-50 flex-1 overflow-y-auto">
            <Outlet />
        </div>

        <div className="text-center p-4">
            <Typography>
                copyright @ 2023
            </Typography>

        </div>
    </div>
}
