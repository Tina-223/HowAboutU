import React from "react";
import {Link} from  "react-router-dom";

const Navigation = () => (<nav>
    <ul>
        <li class='navi'>
            <Link to ="/profile"> Home </Link>
        </li>
        <li class='navi'>
            <Link to ="/profile"> My Daily Log </Link>
        </li>
        <li class='navi'>
            <Link to ="/"> Diagnosis Result </Link>
        </li>
    </ul>
    </nav>
);
export default Navigation;
