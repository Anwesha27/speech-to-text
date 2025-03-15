// components/TranscriptionDisplay.jsx
import React from 'react';

function TranscriptionDisplay({ transcription }) {
  return (
    <div className="mt-6 bg-gray-700 p-4 rounded-lg w-full">
      <h2 className="text-lg font-semibold mb-2">Transcription:</h2>
      <p className="text-gray-400">{transcription || 'No transcription available.'}</p>
    </div>
  );
}

export default TranscriptionDisplay;

