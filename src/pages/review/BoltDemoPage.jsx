import React, { useEffect, useState } from 'react';
import BoltDemo from '../../components/review/BoltDemo';
import BoltMascot from '../../components/BoltMascot';

export default function BoltDemoPage() {
  const [mood, setMood] = useState('talk');
  const [message, setMessage] = useState("Hey there! This is the Bolt drop-in demo page. Try triggering different emotions!");

  useEffect(() => {
    document.title = "Bolt Drop-in Demo · Delta One";
  }, []);

  return (
    <div className="py-6 px-4 max-w-5xl mx-auto">
      <BoltDemo
        onTriggerBoltMood={setMood}
        onTriggerBoltMsg={setMessage}
      />
      <BoltMascot
        mood={mood}
        title="Bolt · Demo Mascot"
        message={message}
        soundEnabled={true}
        voiceEnabled={false}
      />
    </div>
  );
}

