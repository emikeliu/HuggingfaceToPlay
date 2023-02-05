import { Copyright } from "@mui/icons-material";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
class AboutUs extends React.Component {
    render() {
        return <>
            <Typography variant="h5">Huggingface API 调用实用程序</Typography>
            <Divider/>
            <Typography variant="body1">
            <br/>
            本项目采用 MIT 许可证发布，不含任何机器学习模型，与 Huggingface 托管的 API 进行通讯，实现深度学习推理。本项目通过深度学习技术推理产生的内容不代表本项目作者的任何立场，人工智能模型产生的任何内容与本项目作者无关。本项目与 Huggingface 无关。
            </Typography>
            <br/>
            <Typography variant="h5">MIT 协议全文</Typography>
            <Divider/>
            <Typography variant="body2">
            <br/>
            The MIT License (MIT)
            <br/>
            Copyright © 2023 Mike Liu
            <br/>
            Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
            <br/>
            The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
            <br/>
            THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
            </Typography>
            
        </>
    }
}
export default AboutUs;