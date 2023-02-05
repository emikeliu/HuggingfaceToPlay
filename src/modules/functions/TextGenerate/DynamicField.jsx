import { TextField } from "@mui/material";
import React from "react";

class DynamicField extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<TextField
            id="promptField"
            label="动态 Prompt"
            multiline
            fullWidth
            margin="normal"
            rows={4}
            value={this.props.text}
            onChange={(event)=>{this.props.onChange(event.target.value);}}
        />);
    }
}
export default DynamicField;