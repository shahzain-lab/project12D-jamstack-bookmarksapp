import React from "react"
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GET_BOOKMARKS } from '../graphql/types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CallMadeIcon from '@mui/icons-material/CallMade';
import Model from "../components/Model";
import { useMutation } from '@apollo/client';
import { DELETE_BOOKMARK } from '../graphql/types';

interface Bookmark {
  id: string
  text: string
  url: string
}

export default function Home() {
  const { loading, error, data } = useQuery(GET_BOOKMARKS);
  const [delBookmark] = useMutation(DELETE_BOOKMARK)

  const handleDelete = (id: string) => {
    delBookmark({
      variables: { id: id },
      refetchQueries: [{ query: GET_BOOKMARKS }]
    })
  }



  return (
    <div>
      <Model />
      {loading && <p>Loading Client Side Querry...</p>}
      {error && <p>Error: ${error.message}</p>}
      {data && data.bookmarks && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
          marginY={5}
        >
          {data.bookmarks.map((d: Bookmark) => (
            <Box
              key={d.id}
              sx={{
                boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.2)',
                background: 'white',
                display: 'flex',
                width: '40%',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '10px'
              }}
              p={2}
              margin={2}
            >
              <Typography variant="body1">{d.text}</Typography>

              <Box>
                <Button
                  onClick={() => handleDelete(d.id)}
                >
                  <DeleteIcon color="secondary" />
                </Button>
                <Button
                // onClick={() => handleDelete(d.id)}
                >
                  <EditIcon color="secondary" />
                </Button>
                <a
                  href={`${d.url}`}
                  target="_blank"
                >
                  <Button>
                    <CallMadeIcon color="secondary" />
                  </Button>
                </a>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </div>
  );

}