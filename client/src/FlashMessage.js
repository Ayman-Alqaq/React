import {React, useState, useEffect} from 'react';
import './FlashMessage.css';

/* Flash Message component does not understand timeout, but can be understood with a KEY */

function FlashMessage(props) {

    //Using Hooks
    const [visible, setVisible] = useState(true);

    //Use Effect Hook
    useEffect(()=>{
        //Set timer using setTimeout
        const timer = setTimeout(()=>setVisible(false), props.duration);

        return ()=>{
            clearTimeout(timer);
        }
    });

    //Use Props
    //If Visible is True, Show message, else hide
    return(<div className={(visible ? 'show': 'hide') +' message'}>{props.message}</div>);
}

export default FlashMessage;