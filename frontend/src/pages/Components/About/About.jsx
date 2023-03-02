import React from 'react';
import '../../../styles/Common.css'
import MRI from '../../../resources/image/speaking-MRI-square.gif';

export default function About() {
    return (
        <div className='bg-site p-3'>
            <div className='d-flex align-items-center'>
                <div className='col-md-8'>


                    <h2>PYA - Polish Your Accent. Po co ta aplikacja?</h2>

                    <p>PYA - Polish Your Accent. Pomoże Ci nauczyć się prawidłowej wymowy języka angielskiego. Stwórz konto i działaj!!!!
                    </p>

                    <h2>Tylko czy wymowa jest ważna?</h2>

                    <p>Wymowa jest jednym z najważniejszych elementów nauki języka.
                        Dla komunikacji dobra wymowa jest znacznie ważniejsza od znajomości gramatyki.
                        Dlaczego więc w szkołach tak mało uwagi poświęca się wymowie?

                        Polski system edukacji sprowadził naukę języka do nauki gramatyki.
                        W szkołach dzieci robią ćwiczenia gramatyczne, zamiast słuchać i uczyć się mówić.
                        Zastanawialiśmy się nie raz, dlaczego tak się dzieje i wydaje się nam, że znajomość gramatyki łatwiej jest sprawdzić.
                        Robisz test gramatyczny, za każdą poprawna
                        formę czasownika dajesz punkt i już – możesz wystawić ocenę. Czy to się przekłada na
                        znajomość języka? Niestety, nie. A na płynność mówienia? Też nie.

                        Dwa elementy są znacznie ważniejsze w nauce języka niż gramatyka.
                        To słownictwo i wymowa. Znajomość słów umożliwia wyrażanie różnych rzeczy
                        w języku obcym, właściwa wymowa sprawia, że rozumiesz, kiedy ktoś do ciebie
                        mówi i sam jesteś zrozumiany.</p>

                    <h2>System fonetyczny</h2>

                    <p>Angielski system fonetyczny znacznie różni się od polskiego, trzeba więc nauczyć
                        się wymawiać dźwięki, których nie ma w naszym języku. Polacy mają najwięcej problemów
                        z samogłoskami, bo w angielskim występują dwa rodzaje samogłosek: krótkie i długie.
                        Trzeba zdawać sobie z tego sprawę i zapisywać, jak wymawiamy poszczególne słowa.
                        Jest wiele słów, które różnią się tylko jedną samogłoską i czasami można naprawdę popełnić
                        wielką gafę, jeśli źle wymówimy samogłoskę. Klasycznym przykładem są pary słów shit – sheet,
                        lub bitch – beach, z których pierwsze są wulgaryzmami. PYA - Polish Your Accent nauczy
                        Cię dzwięków które nie występują w języku polskim i sprawi, że Twój Russian English zamieni
                        się na Queens English.</p>






                </div>
                <div className='col-md-4 d-flex justify-content-end'>
                    <img src={MRI} alt='loading...'/>
                </div>
            </div>
        </div>
    );
}