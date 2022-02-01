import React, { useContext } from "react"
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
import { AppContext } from "../context/AppContext";

interface Bookmark {
  id: string
  text: string
  url: string
}

export default function Home() {
  const { loading, error, data } = useQuery(GET_BOOKMARKS);
  const [delBookmark] = useMutation(DELETE_BOOKMARK);
  const { setFields, setIsUpdate, setIsOpen } = useContext(AppContext);

  const handleDelete = (id: string) => {
    delBookmark({
      variables: { id: id },
      refetchQueries: [{ query: GET_BOOKMARKS }]
    })
  }


  const handleUpdate = (id: string) => {
    const upt = data.bookmarks.filter((item: Bookmark) => item.id === id);
    upt.filter((item: Bookmark) => {
      setFields({ id: item.id, text: item.text, url: item.url });
    })
    setIsOpen(true)
    setIsUpdate(true)
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
                boxShadow: '-1px 2px 9px -2px rgba(0,0,0,0.69)',
                background: 'white',
                width: '40%',
                textAlign: 'center',
                borderRadius: '10px',
              }}
              p={2}
              margin={2}
            >
              <Typography variant="body2"
                sx={{
                  backgroundColor: '#cccccc',
                  padding: '5px 0',
                  borderRadius: '5px'
                }}>{d.url}</Typography>

              <Box
                key={d.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body1">{d.text}</Typography>

                <Box>
                  <Button
                    onClick={() => handleDelete(d.id)}
                  >
                    <DeleteIcon color="secondary" />
                  </Button>
                  <Button
                    onClick={() => handleUpdate(d.id)}
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
            </Box>
          ))}
        </Box>
      )}
    </div>
  );

}