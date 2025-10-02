import React, {useEffect, useState} from "react";
import { SmileOutlined } from '@ant-design/icons';
import { Result, Image, Typography } from 'antd';

export function FinalPage ({passTraining, UID}) {
    const { Title, Paragraph, Text, Link } = Typography;

    if(passTraining){
        return(
            <Result
                icon={
                    <SmileOutlined />
                }
                title="Great, the study is complete, thanks for your participation!"
                extra={
                    <Typography>
                        <Title level={4} >Your code for payment is:</Title>
                        <Title level={4} type="success" code>{UID}</Title>
                        <Title level={5}>
                        Please copy and paste this code into Prolific.
                        </Title>
                    </Typography>
                }
            />
        );
    }else{
        return(
            <Result
                title="Sorry you don't pass the attention check or the study training."
                extra={
                    <Typography>
                        <Title level={4}>The study is complete, thanks for your participation!</Title>
                        <Paragraph>
                            You may close the page now.
                        </Paragraph>
                    </Typography>
                }
            />
        );
    }
    
}