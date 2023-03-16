import React from 'react';
import '../../../styles/Team.css'
import {LANGUAGES} from "../../../resources/languages";

function TeamSlotherin() {

    return (
        <>

            <div className='d-flex align-items-center'>
                <div className='col-md-4 content'>

                    <h1>{LANGUAGES.pl.TeamName}</h1>
                    <div className="team">
                        <p className="member">Dawid Deszcz</p>
                        <p className="member">Marcin Szuwalski</p>
                        <p className="member">Sebastian Sosin</p>
                        <p className="member">Mateusz Gąsior</p>
                    </div>

                </div>

            </div>

        </>
    );
}

export default TeamSlotherin;