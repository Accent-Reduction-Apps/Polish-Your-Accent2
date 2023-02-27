import React from 'react';
import '../../../styles/Common.css'
 import MRI from '../../../resources/image/speaking-MRI-square.gif';

export default function About() {
    return (
        <div className='bg-warning p-3'>
            <div className='d-flex align-items-center'>
                <div className='col-md-8'>
                    <h2>Think about it:</h2><br/>
            <h3>People with regional accents on average can increase their wages by 20% and increase their probability of promotion by reducing their accents according to researchers*</h3>
                    <h3>trololo</h3>
                    <p><br/>*The Wage Penalty of Regional Accents; Grogger, Steinmayr, Winter; National Bureau of Economic Research; January 2020</p>
                    <p>**Want to earn money? Polish your accent; Lizzy Burden; The Telegraph; 2020.02.12</p>
                </div>
                <div className='col-md-4 d-flex justify-content-end'>
            <img src={MRI} alt='loading...' />
                </div>
            </div>
        </div>
    );
}