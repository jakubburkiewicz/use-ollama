import React, { useState, useEffect } from 'react'

import { Ollama } from 'ollama/browser'

import { OllamaContext } from '../contexts/OllamaContext'

const OllamaProvider = ( { children, host } ) => {
    const [ ollama, setOllama ] = useState( new Ollama( { host } ) )

    useEffect( () => {
        setOllama( new Ollama( { host } ) )
    }, [ host ] )

    return (
        <OllamaContext.Provider value={ ollama }>
            { children }
        </OllamaContext.Provider>
    )
}

export { OllamaProvider }