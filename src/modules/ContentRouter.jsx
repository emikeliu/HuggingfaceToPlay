import { Box } from "@mui/material";
import React from "react";
import AboutUs from "./functions/AboutUs";
import ImageDescribe from "./functions/ImageDescribe";
import TextGenerate from "./functions/TextGenerate";
import NotFound from "./NotFound";

class ContentRouter extends React.Component {

    constructor(props) {
        super(props);

       
    }
    render() {
        function ret(element) {
            return <Box sx={{"paddingLeft":3,"paddingTop":2,"paddingRight":3,"paddingBottom":3,"overflow":"scroll"}}>{element}</Box>
        }
        switch (this.props.id) {
            case 0:
                return ret(<TextGenerate/>);
            case 1:
                return ret();
            case 2:
                return ret(<ImageDescribe/>);
            case 3:
                return ret(<AboutUs/>);
            default:
                return ret(<NotFound/>);
        }
        // return (this.functionModules[String(this.props.id)] instanceof React.Component)?(this.functionModules[this.props.id]):(<></>); 

    }
}
export default ContentRouter;