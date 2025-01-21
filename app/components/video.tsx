"use client";

import React from 'react';

const Video = () => {
  return (
    <div className="video-wrapper">
      <video autoPlay muted controls={false} loop={true} poster="/media/thumbnail.png">
        <source src="/media/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;