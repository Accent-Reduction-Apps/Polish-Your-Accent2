import React, { useState } from 'react';
import axios from 'axios';

const G = ({ apiKey }) => {
  const [text, setText] = useState('');

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const endpoint = 'https://api.openai.com/v1/engines/davinci-codex-c-default/completions';

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };

    const data = {
      prompt: text,
      max_tokens: 50,
      n: 1,
      stop: ['\n'],
    };

    try {
      const response = await axios.post(endpoint, data, { headers });
      const { choices } = response.data;
      const { text } = choices[0];
      console.log(text);
      // set the response as state to display it in the component
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div>
        <form onSubmit={handleMessageSubmit}>
          <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
          <button type="submit">Send</button>
        </form>
      </div>
  );
};

export default G;
