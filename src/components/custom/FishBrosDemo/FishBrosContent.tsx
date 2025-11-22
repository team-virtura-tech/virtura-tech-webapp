'use client';

import { useState } from 'react';
import { FishBrosHero } from './FishBrosHero';
import { FishBrosLoader } from './FishBrosLoader';

import { FishSwimTransition } from './FishSwimTransition';

export const FishBrosContent = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [showFishTransition, setShowFishTransition] = useState(false);
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      {showLoader && (
        <FishBrosLoader
          onProgressComplete={() => setShowFishTransition(true)}
          duration={2500}
        />
      )}

      {showFishTransition && (
        <FishSwimTransition
          onTransitionComplete={() => {
            setShowLoader(false);
            setShowContent(true);
          }}
          duration={1.4}
        />
      )}

      {showContent && (
        <>
          <FishBrosHero />
        </>
      )}
    </>
  );
};
