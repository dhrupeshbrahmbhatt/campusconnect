import { Button, Container, Typography } from "@mui/material"
import { useState } from "react"

export const NotFound = () => {
    const [login, setlogin] = useState(false)
    return(
        <>
            <Container sx={{ mt: 3}} >
                <Typography className="font-extrabold flex justify-center" component='div'>
                    <div className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mt-36">
                        <span className="text-8xl">Oops!</span>
                    </div>
                </Typography>
                <Typography className="flex justify-center font-semibold" component='div'> 
                    <span className="text-2xl content-center mt-10 mb-10 ">404- PAGE NOT FOUND</span>
                </Typography>
                <Typography className="flex justify-center" component='div'>
                    <Button href="/" variant="contained" className="mt-10">
                        Go to home page
                    </Button>
                </Typography>
            </Container>
        </>
    )
}