import { AppBar, Toolbar, Typography, Box, Divider, Slide, useScrollTrigger } from "@mui/material";
import React from "react";
import { PropTypes } from "prop-types";

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
      });
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }
HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func
};
class TitleBar extends React.Component {
    render()
    {
        return (
            <Box >
                <HideOnScroll {...this.props}>
                    <AppBar component="nav" position="static">
                        <Toolbar>
                            <Typography
                                variant="h4"
                                
                                sx={{ my: 2 }}
                            >
                                Play with 🤗
                            </Typography>
                        </Toolbar>
                        
                    </AppBar>
                </HideOnScroll>
            </Box>
        )
    }
}

export default TitleBar;