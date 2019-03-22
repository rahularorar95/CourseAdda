import React from "react"
import "./Loader.css"
import loader from './loader.gif'

/* Source : https://github.com/nguyenbathanh/react-loading-screen */
export default () => {
    return (
        <div className='ipl-progress-indicator' id='ipl-progress-indicator'>
            <div className='ipl-progress-indicator-head'>
                <div className='first-indicator' />
                <div className='second-indicator' />
            </div>
            <div className='insp-logo-frame'>
                <div className='insp-logo-frame-img'>
                    <img src={loader} alt=""/>
                </div>
            </div>
        </div>
    )
}
