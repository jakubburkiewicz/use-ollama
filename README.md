# React useOllama hook

A custom hook that allows you to use the Ollama API in your React project.

## Installation

```bash
npm install use-ollama
```

## API

```jsx
<OllamaProvider
    host="localhost" // string - host of the Ollama API
/>

const {
    loading, // boolean - Loading state indicator
    error, // string - Error message
    response, // object - Response from the API
    chat, // function - Generate the next message in a chat with a provided model
    generate, // function - Generate a response for a given prompt with a provided model
    pull, // function - Download a model from the ollama library
    push, // function - Upload a model to a model library. Requires registering for ollama.ai and adding a public key first
    create, // function - Create a model from a Modelfile
    remove, // function - Delete a model and its data
    copy, // function - Copy a model. Creates a model with another name from an existing model
    list, // function - List models that are available locally on the host
    show, // function - Show information about a model including details, modelfile, template, parameters, license, and system prompt
    embeddings // function - Generate embeddings from a model
} = useOllama();
```

## Usage

Here is a really simple example of how you can use the hook to create a chat-like app.

```jsx
import { useEffect, useState } from 'react';
import { OllamaProvider, useOllama } from 'use-ollama';

const App = () => {
    return (
        <OllamaProvider host="localhost">
            <Component />
        </OllamaProvider>
    )
}

const Component = () => {
    const { chat, response, error } = useOllama();
    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState([]);

    const handleMessageChange = event => {
        setMessage(event.target.value)
    }

    const handleMessageSend = event => {
        setMessages([
            ...messages,
            {
                role: 'user',
                content: message
            }
        ]);
    }

    useEffect(() => {
        const isLatestMessageFromUser = () => (
            messages[messages.length - 1]?.role === 'user'
        )

        const sendMessage = async () => {
            const message = {
                role: 'assistant',
                content: ''
            }

            setMessages([
                ...messages,
                message
            ]);

            await chat( {
                model: 'llama3',
                messages: messages.map( message => ( {
                    role: message.role,
                    content: message.content
                } ) ),
                stream: true
            } )
        }

        if( messages.length > 0 && isLatestMessageFromUser() ) {
            sendMessage()
        }
    }, [messages, chat]);

    useEffect(() => {
        const collectResponse = async response => {
            const message = messages[messages.length - 1]

            for await ( const part of response ) {
                message.content += part.message.content

                setMessages([
                    ...messages.slice(0, -1),
                    message
                ])

                if(part.done === true) {
                    break
                }
            }
        }

        if(response) {
            collectResponse(response)
        }
    }, [response])

    return (
        <div>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message.content}</div>
                ))}
            </div>

            <div>
                <input
                    type="text"
                    value={message}
                    onChange={handleMessageChange}
                />

                <button onClick={handleMessageSend}>Send</button>
            </div>

            <div>{error}</div>
        </div>
    )
}

export default App
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.