import React from "react";
import { Typography, List, ListItem, ListItemText, Divider, ListItemAvatar, Avatar } from "@mui/material";

export const CustomList = (props) => {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={props.name} src={props.srcImag} />
                </ListItemAvatar>
                <ListItemText
                    primary={props.name}
                    secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {props.message}
                        </Typography>
                        </React.Fragment>
                        }
                    />
                </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    )
}