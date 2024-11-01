import { useState, useEffect } from 'react';
import './index.scss';
import useChatGPTService from '../services/useChatGPTService';

const TempTesting = () => {
    const [text, setText] = useState("");

    const { getNickname } = useChatGPTService();
    const generateWord = async () => {
        try {
            const response = await getNickname('Explosive Plyometric Box Jumps with Weighted Resistance for Power Development');
            const nickname = response.choices[0].message.content;
            setText(nickname);
        } catch (error) {
            console.error("Error fetching nickname from ChatGPT:", error);
            return null;
        }
    };


    return (
        <div className='test-container'>
            <div className='random-word'>Random Word: {text} </div>
            <button className='button' onClick={generateWord}> Generate word </button>
        </div>
    )
}

export default TempTesting