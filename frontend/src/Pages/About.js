import React from "react";
import '../App.css'

export default function About() {
    return (
        <div className='bg-warning p-3'>
            <h1>tu moze byc np opis dla kogo i po co ta apka</h1>
            <img src={require('../resources/speaking-MRI.gif')} alt="loading..." />
        </div>
    );
}