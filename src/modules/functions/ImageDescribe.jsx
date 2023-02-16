import StaticField from "./TextGenerate/StaticField";
import DynamicField from "./TextGenerate/DynamicField";
import SingleSlider from "./TextGenerate/SingleSlider";
import { Divider, Typography, Button, FormGroup, FormControlLabel, Switch, Box, Grid, Skeleton, TextField, Alert, AlertTitle, LinearProgress, Snackbar, Card, CardMedia, CardContent } from "@mui/material";
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
function Error(props) {
    return <Snackbar open={props.error} autoHideDuration={1000} sx={{ "marginBottom": 7 }} onClose={() => { setTimeout(() => { props.clearError() }, 2000) }}><Alert severity="info">{props.error}</Alert></Snackbar>

}
class ImageDescribe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUseStatic: false,
            text: "",
            do_sample: true,
            ready: true,
            apikey: "",
            image: "",
            speech: false

        }
    }
    render() {
        let onClickEval = async () => {

            if (this.state.ready && this.state.image != "") {
                this.setState({ ready: false })
                console.log(this.state.isUseStatic)
                let reader = new FileReader();
                reader.readAsArrayBuffer(this.state.file)
                reader.addEventListener("loadend", async (e) => {

                    let body = e.target.result;
                    let requestObject = {
                        "credentials": "include",
                        "headers": {
                            "Accept": "*/*",
                            "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
                            "content-type": "image/jpeg",
                            "Sec-Fetch-Dest": "empty",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Site": "same-site"
                        },
                        "referrer": "https://huggingface.co/",
                        "body": body,
                        "method": "POST",
                        "mode": "cors"
                    };
                    if (this.state.apikey != "") {
                        requestObject.headers["Authorization"] = "Bearer " + this.state.apikey;
                    }
                    let value = (await fetch("https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
                        requestObject));
                    let json = await value.json();
                    if (json.error) {
                        this.setState({ ready: true, error: json.error });
                    }
                    else {
                        if (this.state.isUseStatic) {
                            let requestObject1 = {
                                "credentials": "include",
                                "headers": {
                                    "Accept": "*/*",
                                    "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
                                    "Sec-Fetch-Dest": "empty",
                                    "Sec-Fetch-Mode": "cors",
                                    "Sec-Fetch-Site": "same-site"
                                },
                                "referrer": "https://fanyi.youdao.com/",
                                "method": "GET",
                                "mode": "cors"
                            };
                            let trans = (await fetch("/fanyi/translate?&doctype=json&type=EN2ZH_CN&i=" + json[0]["generated_text"], requestObject1));
                            let transjson = await trans.json();

                            this.setState({
                                ready: true,
                                result: transjson["translateResult"][0][0]["tgt"],
                                source: "原文：" + json[0]["generated_text"]
                            })
                        }
                        else {
                            this.setState({
                                ready: true,
                                result: json[0]["generated_text"]
                            })
                        }

                    }
                });
            }

            else {
                if (this.state.image == "") {
                    this.setState({
                        error: "请上传图像"
                    })
                }
                else {
                    this.setState({
                        error: "正在执行，请稍候"
                    })
                }
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
                <FormGroup>
                    <Button variant="contained" component="label" sx={{ "margin": 1 }}>
                        上传图像
                        <input id="uploadPicture" onChange={(e) => { let reader = new FileReader(); reader.readAsDataURL(e.target.files[0]); reader.addEventListener("load", (event) => { this.setState({ image: event.target.result, file: e.target.files[0] }) }) }} hidden accept="image/*" multiple type="file" />
                    </Button>
                </FormGroup>

                <Card >
                    <Box sx={{ "textAlign": "center", "marginTop": 3, "marginBottom": 3 }}>
                        <img src={this.state.image} width="40%" height="80%" />

                    </Box>
                    <Typography variant="h5" sx={{ "textAlign": "center", "marginBottom": 3 }}>{this.state.result}</Typography>
                    {this.state.isUseStatic ? <><Divider /><Typography variant="h5" sx={{ "textAlign": "center", "marginBottom": 3 }}>{this.state.source}</Typography></> : <></>}
                    {(this.state.speech && this.state.result) ? <><audio src={"https://tts.baidu.com/text2audio?tex=" + this.state.result + "&cuid=baike&lan=ZH&ctp=1&pdt=301&vol=10&rate=32&per=0"} autoPlay control></audio></> : <></>}

                </Card>
                <FormGroup>
                    <Grid spacing={2} alignItems="center">
                        {/* <FormControlLabel control={<Switch onChange={() => { this.setState({ isUseStatic: !this.state.isUseStatic }) }} />} label="进行机器翻译" /> */}
                        <FormControlLabel control={<Switch onChange={() => { this.setState({ speech: !this.state.speech }) }} />} label="进行朗读" />
                    </Grid>
                    <Button variant="contained" sx={{ "margin": 1 }} onClick={onClickEval}>执行推理</Button>
                </FormGroup>
                <TextField
                    id="APIField"
                    label="API Key"
                    multiline
                    fullWidth
                    margin="normal"
                    rows={1}
                    value={this.state.apikey}
                    onChange={(event) => { this.setState({ apikey: event.target.value }) }}
                />
            </>)
    }
}
export default ImageDescribe;