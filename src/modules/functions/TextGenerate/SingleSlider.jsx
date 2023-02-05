import { Grid, Input, Slider, Typography } from "@mui/material";
import React from "react";
class SingleSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            value: this.props.default
        }
    }
    render() {
        return (<>

            <Typography gutterBottom>
                {this.props.children}
            </Typography>
            <Typography variant="caption">
                {this.props.description}
            </Typography>
            <Grid container spacing={2} alignItems="center">

                <Grid item xs={10}>
                    <Slider
                        step={this.props.step}
                        min={this.props.min}
                        max={this.props.max}
                        value={this.state.value}
                        onChange={(event, value)=>{this.props.changeValue(value);this.setState({value:value})}}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item xs={2}>
                    <Input
                        value={this.state.value}
                        size="small"
                        onChange={(event)=>{this.props.changeValue(parseInt(event.target.value));this.setState({value:parseInt(event.target.value)})}}
                        // onBlur={handleBlur}
                        inputProps={{
                            step: this.props.step,
                            min: this.props.min,
                            max: this.props.max,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </>);
    }
}
export default SingleSlider;