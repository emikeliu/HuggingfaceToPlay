import { Divider, Typography } from "@mui/material";
import React from "react";
class ResultText extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <>
            <Typography variant="h5">执行结果</Typography>
            <Divider />
            <pre style={{
                whiteSpace: "pre-wrap",
                wordWarp: "break-word"
            }}>{this.props.result}</pre>
        </>);
    }
}
export default ResultText;