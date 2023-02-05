import { TextField } from "@mui/material";
import React from "react";

class StaticField extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<TextField
            id="promptField"
            label="静态 Prompt"
            multiline
            fullWidth
            margin="normal"
            rows={4}
            value={this.props.text}
            onChange={(event)=>{this.props.onChange(event.target.value);}}
        />);
    }
}
export default StaticField;