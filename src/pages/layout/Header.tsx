import React from "react";
import { Typography } from "@material-tailwind/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {Link} from "react-router-dom"
export default function Header() {
    return <div className="flex justify-between p-3 items-center">
        <Link to={"/"}>
            <Typography>
                Trading
            </Typography>
        </Link>
        <ConnectButton />
    </div>
}
