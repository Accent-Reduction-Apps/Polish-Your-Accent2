import React from 'react';
import AudioPlayer from './AudioPlayer';

export function playAudio(src) {
    return <AudioPlayer src={src} />;
}
