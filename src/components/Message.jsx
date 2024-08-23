import React from 'react';
import {Typography, Container, Box} from '@mui/material';

export default function MessageBox({ Adress, Message, isMyMessage }){
  return (
    <Box
      sx={{
        borderRadius: '20px',
        padding: 2,
        backgroundColor:  isMyMessage ? '#d1fcd3' :'#f0f0f0',
        boxShadow: 1,
        width: '100%',
        maxwidth: '800px',
        margin: isMyMessage ? '0 0 10px auto' : '0 auto 10px 0',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMyMessage ? 'flex-end' : 'flex-start',
      }}>
        <Typography variant='body2' color="textSecondary">
          {Adress}
        </Typography>
        <Container className='mr-2 items-center flex'>
            <Typography variant='body1' >{Message}</Typography>
        </Container>
    </Box>
  )
}
