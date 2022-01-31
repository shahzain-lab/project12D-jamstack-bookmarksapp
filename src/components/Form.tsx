import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { GET_BOOKMARKS, ADD_BOOKMARK } from '../graphql/types';



const FormBox = () => {
    const [text, setText] = useState('');
    const [url, setUrl] = useState('');
    const [addBookmark] = useMutation(ADD_BOOKMARK)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text && url) {
            console.log("hello");
            addBookmark({
                variables: { text: text, url: url },
                refetchQueries: [{ query: GET_BOOKMARKS }]
            })
        }
    }
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '45ch' },
                outline: 'none'
            }}
            noValidate
            onSubmit={handleSubmit}
        >
            <TextField
                id="standard-basic"
                label="Enter Name"
                type="text"
                required
                variant="standard"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <TextField
                id="standard-basic"
                label="Enter URL"
                type="url"
                required
                variant="standard"
                value={url}
                onChange={e => setUrl(e.target.value)}
            />
            <Button type="submit" size='large' variant='contained'>Submit</Button>
        </Box>
    );

};

export default FormBox;
