import { useContext, useState } from 'react'

import { OllamaContext } from '../contexts/OllamaContext'

const useOllama = () => {
    const ollama = useContext( OllamaContext )

    if ( !ollama ) {
        throw new Error( 'useOllama must be used within an OllamaProvider' )
    }

    const [ loading, setLoading ] = useState( false )
    const [ error, setError ] = useState( null )
    const [ response, setResponse ] = useState( null )

    const chat = async ( {
        model,
        messages,
        format,
        stream,
        keep_alive,
        options
    } ) => {
        setLoading( true )
        setError( null )
        setResponse( null )

        try {
            const response = await ollama.chat( {
                model,
                messages,
                format,
                stream,
                keep_alive,
                options
            } )

            setResponse( response )
        } catch ( error ) {
            setError( error )
        }

        setLoading( false )
    }

    const generate = async ( {
        model,
        prompt,
        system,
        template,
        raw,
        images,
        format,
        stream,
        keep_alive,
        options
    } ) => {
        setLoading( true )
        setError( null )
        setResponse( null )

        try {
            const response = await ollama.generate( {
                model,
                prompt,
                system,
                template,
                raw,
                images,
                format,
                stream,
                keep_alive,
                options
            } )

            setResponse( response )
        } catch ( error ) {
            setError( error )
        }

        setLoading( false )
    }

    const pull = async ( {
        model,
        insecure,
        stream
    } ) => {
        setLoading( true )
        setError( null )
        setResponse( null )

        try {
            const response = await ollama.pull( {
                model,
                insecure,
                stream
            } )

            setResponse( response )
        } catch ( error ) {
            setError( error )
        }

        setLoading( false )
    }

    const push = async ( {
        model,
        insecure,
        stream
    } ) => {
        setLoading( true )
        setError( null )
        setResponse( null )

        try {
            const response = await ollama.push( {
                model,
                insecure,
                stream
            } )

            setResponse( response )
        } catch ( error ) {
            setError( error )
        }

        setLoading( false )
    }

    const create = async ( {
        model,
        path,
        modelfile,
        stream
    } ) => {
        setLoading( true )
        setError( null )
        setResponse( null )

        try {
            const response = await ollama.create( {
                model,
                path,
                modelfile,
                stream
            } )

            setResponse( response )
        } catch ( error ) {
            setError( error )
        }

        setLoading( false )
    }

    const remove = async ( {
        model
    } ) => {
        setLoading( true )
        setError( null )
        setResponse( null )

        try {
            const response = await ollama.delete( {
                model
            } )

            setResponse( response )
        } catch ( error ) {
            setError( error )
        }

        setLoading( false )
    }

    const copy = async ( {
        source,
        destination
    } ) => {
        setLoading( true )
        setError( null )
        setResponse( null )

        try {
            const response = await ollama.copy( {
                source,
                destination
            } )

            setResponse( response )
        } catch ( error ) {
            setError( error )
        }

        setLoading( false )
    }

    const list = async () => {
        setLoading( true )
        setError( null )
        setResponse( null )

        try {
            const response = await ollama.list()

            setResponse( response )
        } catch ( error ) {
            setError( error )
        }

        setLoading( false )
    }

    const show = async ( {
        model,
        system,
        template,
        options
    } ) => {
        setLoading( true )
        setError( null )
        setResponse( null )

        try {
            const response = await ollama.show( {
                model,
                system,
                template,
                options
            } )

            setResponse( response )
        } catch ( error ) {
            setError( error )
        }

        setLoading( false )
    }

    const embeddings = async ( {
        model,
        prompt,
        keep_alive,
        options
    } ) => {
        setLoading( true )
        setError( null )
        setResponse( null )

        try {
            const response = await ollama.embeddings( {
                model,
                prompt,
                keep_alive,
                options
            } )

            setResponse( response )
        } catch ( error ) {
            setError( error )
        }

        setLoading( false )
    }

    return {
        loading,
        error,
        response,
        chat,
        generate,
        pull,
        push,
        create,
        remove,
        copy,
        list,
        show,
        embeddings
    }
}

export { useOllama }