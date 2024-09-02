import React from 'react'
import { UserSearch, ClipboardPlus, BookPlus, CircleUser } from 'lucide-react';
import './nurseSide.css'

function NurseSide(props) {
    return (
        <div className='side1'>
            <ul>
                <li className='elm1'><UserSearch /> <button onClick={()=>props.disp('1')} className='l1'>Patients</button></li>
                <li className='elm1'><ClipboardPlus /><button onClick={()=>props.disp('2')} className='l1'>Consultation</button></li>
                <li className='elm1'><BookPlus /> <button onClick={()=>props.disp('3')} className='l1'>Histore des  patients</button></li>
                <li className='elm1'><CircleUser /> <button onClick={()=>props.disp('4')} className='l1'>Profile</button></li>
            </ul>
        </div>
    )
}

export default NurseSide