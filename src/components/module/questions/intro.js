import React, {useEffect, useState} from "react";
import { Typography, Button, Form, Input, Image, Select, InputNumber } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

export function Intro (props) {
    //const [studyPart, setStudyPart] = useState(0);
    const { Title, Paragraph, Text, Link } = Typography;
    const [form] = Form.useForm();

    const onClick = () => {
        props.setShowIntro(false);
        props.setCurrentIndex(0);
    };

    const onFinish = (values) => {
        //console.log('Success:', values);
        props.updateDemographic(values);
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if(props.currentPhrase === 'vlat'){
        return(
            <div style={{padding: 20}}>
                <Typography>
                    <Title level={3}>Instruction of the Visualization Literacy Assessment Test (VLAT)</Title>

                    <Paragraph>Please carefully read the following instructions before starting the test.</Paragraph>

                    <Paragraph>
                        1. The primary purpose of this test is to measure the ability to read and interpret visually represented data of users, especially non-experts in data visualization. The test contains <Text strong>12 single-choice questions.</Text>
                    </Paragraph>

                    <Paragraph>
                        2. After you read these instructions, you will see the questions one by one with a graph/chart in a randomized order.
                    </Paragraph>

                    <Paragraph>
                        3. Select the <Text strong>BEST</Text> answer to the questions.
                    </Paragraph>

                    <Paragraph>
                        4. <Text strong>DO NOT GUESS</Text>. Please select the “<Text strong>Omit”</Text> option if you are not sure about your answer or your answer is based on a guess.
                    </Paragraph>
                </Typography>

                <Button type="primary" onClick={onClick} style={{marginTop: 20}}>
                        <b>Go to the test</b>
                </Button>
            </div>
        );
    }else if(props.currentPhrase === 'general_training'){
        return(
            <div style={{padding: 20}}>
                <Typography>
                <Title level={4}>
                    In this session, you will be presented with two simple practice questions to help you get familiar with the types of questions you will encounter in the main study. You will be given two simple logical reasoning questions. First, you will select the option you believe is correct and submit your answer. After submission, an AI system will provide a recommendation and explanation. You can then decide whether to revise your answer. Finally, you will be asked to provide some subjective ratings about your experience and decision-making.
                </Title>
                <Title level={5}>
                You must answer the next two questions correctly to continue. Failure to do so will result in the survey ending, and you will not be compensated for not paying attention.
                </Title>
                </Typography>

                <Button type="primary" onClick={onClick} style={{ marginTop: 20}}>
                        <b>Go to the test</b>
                </Button>
            </div>
        );
    }else if(props.currentPhrase === 'takeaway_training'){
        return(
            <div style={{padding: 20}}>
                <Typography>
                    <Title level={4}>
                        Carefully read the following definition and the example - A takeaway is a key fact, point, or idea to be remembered after viewing the map. These insightful summaries effectively communicate inferences made about the data displayed, helping viewers retain and understand the map's key messages.
                    </Title>
                    <Image
                        width={800}
                        src={process.env.PUBLIC_URL+"/img/takeaway_training/takeaway_training_no_uncertainty.png"}
                        preview={false}
                        style={{marginBottom: 0, marginTop: 15}}
                    />
                    <Title level={5}>For example, these are a few takeaways from the map above:</Title>
                    <Paragraph>
                        <ul>
                            <li>California (CA) has one of the highest populations in the USA</li>
                            <li style={{marginTop: 5, marginBottom:5}}>Arizona (AZ) has a higher population than New Mexico (NM)</li>
                            <li>Wyoming (WY) has one of the lowest populations in the USA</li>
                            <li>Texas (TX) and Florida (FL) have a higher population than the rest of the Southern states (WV, KY, TN, MS, AL, GA, LA, AR, OK, NC, SC)</li>
                        </ul>
                    </Paragraph>
                    <Paragraph>
                    You will now be asked two questions. To proceed, you must answer both questions correctly. Failure to do so will result in the survey ending, and you will not be compensated for not paying attention.
                    </Paragraph>
                </Typography>

                <Button type="primary" onClick={onClick} style={{marginTop: 15}}>
                        <b>Go to the test</b>
                </Button>
            </div>
        );
    }else if(props.currentPhrase === 'uncertainty_training'){
        return(
            <div style={{padding: 20}}>
                <Typography>
                    <Title level={4}>
                    Carefully read the following section and the example that follows:
                    </Title>
                    <Paragraph>
                    Data analysis is rarely based on perfect knowledge. This inherent <Text strong>uncertainty</Text> applies to all data, regardless of its source. In this study, we focus specifically on a type of uncertainty within surveys called <Text strong>sampling error</Text>. 
                    </Paragraph>
                    <Paragraph>
                    Sampling error arises because surveys typically analyze a subset <Text strong>(sample)</Text> of the entire population. This means the results may differ from what we'd find if we surveyed everyone. The size and selection method of the sample can also influence the level of error.
                    </Paragraph>
                    <Paragraph>
                    For example, if a political poll indicates 45% support for a candidate with a <Text>±3% sampling error</Text>, the true level of support likely falls between 42% and 48%.
                    </Paragraph>
                    <Image
                        width={800}
                        src={process.env.PUBLIC_URL+"/img/uncertainty_training/uncertainty_training_intro.png"}
                        preview={false}
                        style={{marginBottom: 0, marginTop: 15}}
                    />
                    <Title level={5}>In the map above, the uncertainty (i.e., <Text strong>sampling error</Text>) in population estimates across states is divided into three levels. The 'fuzziness' level of each circle is adjusted based on the category of uncertainty to which it belongs:</Title>
                    <Paragraph>
                        <ul>
                            <li><b>Low:</b> The population estimate is reliable, and any inferences or takeaways are likely to be accurate.</li>
                            <li style={{marginTop: 5, marginBottom:5}}><b>Moderate:</b> Exercise caution when interpreting the population estimate and forming takeaways, as it might not be fully reliable.</li>
                            <li><b>High:</b> The population estimate is unreliable, so avoid drawing any firm conclusions or takeaways from it. </li>
                        </ul>
                    </Paragraph>
                    <Paragraph>
                    You will be asked two questions in the next section. To proceed, you must answer both questions correctly. Failure to do so will result in the survey ending, and you will not be compensated for not paying attention.
                    </Paragraph>
                </Typography>

                <Button type="primary" onClick={onClick} style={{marginTop: 15}}>
                        <b>Go to the test</b>
                </Button>
            </div>
        );
    }else if(props.currentPhrase === 'survey_group_1' || props.currentPhrase === 'survey_group_2'){
        return(
            <div style={{padding: 20}}>
                <Typography>
                    <Title level={3}>
                        Main Map Study
                    </Title>
                    <Title level={5}>
                    You will now be given 4 logic reasoning tasks. Answer each question to the best of your ability.
                    </Title>
                </Typography>
                <Button type="primary" onClick={onClick} style={{marginTop: 20}}>
                        <b>Start</b>
                </Button>
            </div>
        );
    }else if(props.currentPhrase === 'demographic'){
        return(
            <div style={{padding: 20}}>
                <Typography>
                    <Title level={5}>Please also complete this final survey</Title>
                    <Title level={3}>
                        Post Study Demographic information
                    </Title>
                </Typography>
                <Form
                    name="demographic_form"
                    form={form}
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                    label="Enter your age:"
                    name="age"
                    rules={[{ required: true }]}
                    >
                        <InputNumber
                            style={{width: '10%'}}
                        />
                    </Form.Item>

                    <Form.Item
                        label="What is your gender?"
                        name="gender"
                        rules={[{ required: true }]}
                    >
                        <Select style={{width: 200}} placeholder="select your gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="What is your education level?"
                        name="eduLevel"
                        rules={[{ required: true }]}
                    >
                        <Select style={{width: 300}} placeholder="select education level">
                            <Option value="less than high school">Less than High School</Option>
                            <Option value="high school/GED">High School / GED</Option>
                            <Option value="2 year degree">2 year degree</Option>
                            <Option value="4 year degree">4 year degree</Option>
                            <Option value="masters">Masters</Option>
                            <Option value="professional degree (MD, JD, etc.)">Professional degree (MD, JD, etc.)</Option>
                            <Option value="Doctoral">Doctoral</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                    label="If you were enrolled in a post high school institution, what was your major?"
                    name="major"
                    //rules={[{ required: true }]}
                    >
                        <Input
                            style={{width: '50%'}}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Is English your native language?"
                        name="english_skill"
                        //rules={[{ required: true }]}
                    >
                        <Select style={{width: 200}} >
                            <Option value="yes">Yes</Option>
                            <Option value="no">No</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                    label="If no to the question above, please enter your native language:"
                    name="native_lang"
                    //rules={[{ required: true }]}
                    >
                        <Input
                            style={{width: '50%'}}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Do you prefer visual information or text information?"
                        name="perference"
                    >
                        <Select style={{width: 200}} >
                            <Option value="visual">Visual Information</Option>
                            <Option value="text">Text Information</Option>
                        </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        <b>Submit</b>
                    </Button>
                </Form>
            </div>
        );
    }
}
