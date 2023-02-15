import React from 'react';
import '../resources/Common.css'
 import MRI from '../resources/speaking-MRI-square.gif';

export default function About() {
    return (
        <div className='bg-warning p-3'>
            <div className='d-flex align-items-center'>
                <div className='col-md-10'>
            <h1>tu moze byc np opis dla kogo i po co ta apka</h1>
                    <h3>trololo</h3>
                    <h4>lolo</h4>
                </div>
                <div className='col-md-2 d-flex justify-content-end'>
            <img src={MRI} alt='loading...' />
                </div>
            </div>
        </div>
    );
}