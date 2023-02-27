import React, { useEffect } from 'react';

export default function AudioPlayer({ src }) {
    useEffect(() => {
        const audio = new Audio(src);
        audio.play();

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [src]);

    return null;
}

