import StaticField from "./TextGenerate/StaticField";
import DynamicField from "./TextGenerate/DynamicField";
import SingleSlider from "./TextGenerate/SingleSlider";
import { Divider, Typography, Button, FormGroup, FormControlLabel, Switch, Box, Grid, Skeleton, TextField, Alert, AlertTitle, LinearProgress, Snackbar } from "@mui/material";
import React from "react";
import ResultText from "./ResultText";
function Field(props) {
    return <TextField
        id="promptField"
        label="Prompt"
        multiline
        fullWidth
        margin="normal"
        rows={10}
        value={props.text}
        onChange={(event) => { props.onChange(event.target.value); }}
    />;
}
function Result(props) {
    if (props.isUseStatic) {
        if (props.result) {
            return <ResultText result={props.result} />;
        }
        else {
            return <ResultText result={<><Skeleton variant="body1" sx={{ "marginTop": 1 }} /><Skeleton variant="body1" sx={{ "marginTop": 1 }} /><Skeleton variant="body1" sx={{ "marginTop": 1 }} /><Skeleton variant="body1" sx={{ "marginTop": 1 }} /><Skeleton variant="body1" sx={{ "marginTop": 1 }} /></>}></ResultText>
        }

    }
    else {
        return <></>;
    }
}

function Error(props) {
    return <Snackbar open={props.error} autoHideDuration={1000} sx={{"marginBottom":7}} onClose={()=>{setTimeout(()=>{props.clearError()},2000)}}><Alert severity="info">{props.error}</Alert></Snackbar>

}
class TextGenerate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUseStatic: false,
            text: "",
            do_sample: true,
            ready: true,
            apikey: ""

        }
    }
    render() {
        let onClickEval = async () => {
            if (this.state.ready) {
                this.setState({ ready: false })
                console.log(this.state.isUseStatic)
                let body = {
                    "inputs": this.state.text,
                    "parameters":
                    {
                        "early_stopping": false,
                        "length_penalty": 0,
                        "max_new_tokens": this.state.max_new_tokens,
                        "do_sample": this.state.do_sample,
                        "top_p": this.state.top_p,
                        "top_k": this.state.top_k,
                        "temperater": this.state.temperater,
                        "repetition_penalty": this.state.repetition_penalty,
                        "max_new_tokens": this.state.max_new_tokens,
                        "return_full_text": this.state.isUseStatic
                    },
                    "options":
                    {
                        "wait_for_model": false
                    }
                };
                let requestObject= {
                    "credentials": "include",
                    "headers": {
                        "Accept": "*/*",
                        "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
                        "content-type": "application/json",
                        "x-use-cache": "false",
                        "Sec-Fetch-Dest": "empty",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Site": "same-site"
                    },
                    "referrer": "https://huggingface.co/",
                    "body": JSON.stringify(body),
                    "method": "POST",
                    "mode": "cors"
                };
                if(this.state.apikey!="")
                {
                    requestObject.headers["Authorization"] = "Bearer "+this.state.apikey;
                }
                let value = (await fetch("https://api-inference.huggingface.co/models/bigscience/bloom",
                requestObject));
                let json = await value.json();
                if (json.error) {
                    this.setState({ ready: true, error: json.error });
                }
                if (this.state.isUseStatic) {
                    this.setState({
                        ready: true,
                        result: json[0]["generated_text"]
                    })
                }
                else {
                    this.setState({
                        ready: true,
                        text: this.state.text+json[0]["generated_text"]
                    })
                }
            }
            else {
                this.setState({
                    error: "正在执行，请稍候"
                })
            }
        }
        return (
            <>
                <Error error={this.state.error} clearError={() => { this.setState({ error: undefined }) }} />
                <Typography variant="h5">模型参数</Typography>
                <Divider />
                {
                    (this.state.ready) ? <></> : <LinearProgress />
                }
                <Field isUseStatic={this.state.isUseStatic} text={this.state.text} onChange={(t) => { this.setState({ text: t }) }} />
                
                <FormGroup>
                <Button variant="contained" sx={{ "margin": 1 }} onClick={onClickEval}>执行推理</Button>
                        <Grid spacing={2} alignItems="center">
                            <FormControlLabel control={<Switch onChange={() => { this.setState({ isUseStatic: !this.state.isUseStatic }) }} />} label="静态模式" />
                            <FormControlLabel control={<Switch defaultChecked onChange={() => { this.setState({ do_sample: !this.state.do_sample }) }} />} label="是否取样" />
                        </Grid>

                    </FormGroup>
                <TextField
                    id="APIField"
                    label="API Key"
                    multiline
                    fullWidth
                    margin="normal"
                    rows={1}
                    value={this.state.apikey}
                    onChange={(event) => { this.setState({apikey: event.target.value}) }}
                />
                
                <Box>
                    <SingleSlider
                        default={10}
                        description="定义取样过程一次要考虑的取样文本数量。"
                        changeValue={(value) => { this.setState({ top_k: value }); }}
                        max={256}
                        min={1}
                        step={1}
                    >top_k</SingleSlider>
                    <SingleSlider
                        default={0.9}
                        description="定义取样过程一次要考虑的取样文本的概率。"
                        changeValue={(value) => { this.setState({ top_p: value }); }}
                        max={10}
                        min={1}
                        step={0.01}
                    >top_p</SingleSlider>
                    <SingleSlider
                        default={1}
                        description="取样过程的温度。1意味着有规律的取样，0意味着总是取得最高分数，100更接近于平均可能性"
                        changeValue={(value) => { this.setState({ temperature: value }); }}
                        max={100}
                        min={1}
                        step={0.01}
                    >temperature</SingleSlider>
                    <SingleSlider
                        default={1}
                        description="一个记号在生成中使用的次数越多，在连续的代次传递中不被选中的惩罚就越大。用于惩罚重复，>1奖励重复"
                        changeValue={(value) => { this.setState({ repetition_penalty: value }); }}
                        max={100}
                        min={0}
                        step={0.01}
                    >repetition_penalty</SingleSlider>
                    <SingleSlider
                        default={20}
                        description="要生成的新记号的数量，这不包括输入长度，它是您想要的生成文本大小的估计值。每个新记号都会减慢请求速度，因此请在响应时间和生成的文本长度之间寻求平衡。"
                        changeValue={(value) => { this.setState({ max_new_tokens: value }); }}
                        max={250}
                        min={0}
                        step={1}
                    >max_new_tokens</SingleSlider>
                    
                </Box>
                <Result isUseStatic={this.state.isUseStatic} result={this.state.result} />
            </>)
    }
}
export default TextGenerate;
