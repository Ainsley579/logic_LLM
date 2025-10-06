import React, {useEffect, useState} from "react";

export function NavBar () {
    return(
        <>
            <span className="logo" href="#"
                style={{float: 'left'}}
            >
                A Study on Human-AI Collaborated Decision Making
            </span>

            <span style={{float: 'left', color: 'white', lineHeight: 4, marginLeft: 150}}>
                Please DO NOT USE "GO BACK" and DO NOT REFRESH THE PAGE during your survey session!
            </span>
        </>
    );
}