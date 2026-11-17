import React from 'react';
import {Composition} from 'remotion';
import {FastHealing} from './Story';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="FastHealing"
    component={FastHealing}
    durationInFrames={14046}
    fps={30}
    width={1920}
    height={1080}
  />
);
