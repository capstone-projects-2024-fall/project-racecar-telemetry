import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const NavBar = () => {
    return (
        <div>
            <nav className='flex items-center flex-wrap bg-blue-400 p-6 '>
            <ul>
        <li>
          <Link href="/page">Dashboard</Link>
        </li>
        <li>
          <Link href="/profiles">Profiles</Link>
        </li>
        <li>
          <Link href="/contact">Logout</Link>
        </li>
      </ul>
            </nav>

        </div>
    )
}
export default NavBar;
