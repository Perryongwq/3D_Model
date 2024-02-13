import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const setAudioData = () => {
      setIsLoading(false);
      setDuration(audio.duration);
    };

    const setAudioError = () => {
      setIsLoading(false);
      console.error("Audio load failed");
    };

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('canplaythrough', setAudioData);
    audio.addEventListener('error', setAudioError);
    audio.addEventListener('timeupdate', updateTime);

    return () => {
      audio.removeEventListener('canplaythrough', setAudioData);
      audio.removeEventListener('error', setAudioError);
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  const handleSliderChange = (e) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Format time to display as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Calculate the progress as a percentage
  const progress = (currentTime / duration) * 100;

  return (
    <div style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 100, backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', width: '300px' }}>
      <audio ref={audioRef} src={src} preload="auto" loop />
      {isLoading ? (
        <div>Loading audio...</div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <button onClick={togglePlayPause} style={{ cursor: 'pointer', marginRight: '10px' }}>
              {isPlaying ? '❚❚' : '►'}
            </button>
            <div style={{ flexGrow: 1, marginRight: '10px' }}>
              <div style={{ width: '100%', height: '5px', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#007bff', transition: 'width 0.5s' }}></div>
              </div>
            </div>
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration.toFixed(2)}
            value={currentTime.toFixed(2)}
            onChange={handleSliderChange}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </>
      )}
    </div>
  );
};

export default MusicPlayer;
