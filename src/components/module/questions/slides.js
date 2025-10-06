import React, { useEffect, useState, useRef } from "react";
import {
  Row, Col, Typography, Radio, Button, message, Form
} from "antd";

export function Slides(props) {
  const [messageApi, contextHolder] = message.useMessage();
  const [answer, setAnswer] = useState(null); // first answer
  const [secondAnswer, setSecondAnswer] = useState(null); // post-AI answer
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [startTime, setStartTime] = useState(null); // ⏱️ start time
  const [firstSubmitTime, setFirstSubmitTime] = useState(null); // ⏱️ pre-AI submit time

  const questionRef = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setAnswer(null);
    setSecondAnswer(null);
    setShowSuggestion(false);
    setStartTime(Date.now()); // record question start time
    setFirstSubmitTime(null);
    window.scrollTo(0, 0);
  }, [props.question]);

  const { Paragraph, Text } = Typography;

  // Handler for submitting the first answer (pre-AI)
  const handleFirstSubmit = () => {
    if (!answer) {
      message.error("Please select an answer before submitting!");
      return;
    }
    const now = Date.now();
    setFirstSubmitTime(now);
    const firstStageTime = (now - startTime) / 1000;
    console.log(`🕒 Time before AI suggestion: ${firstStageTime}s`);
    setShowSuggestion(true);
  };

  // Handler for submitting the second/final answer (post-AI)
  const handleFinalSubmit = () => {
    if (!secondAnswer) {
      message.error("Please select a final answer before submitting!");
      return;
    }
    const endTime = Date.now();
    const totalTime = (endTime - startTime) / 1000;
    const postAITime = firstSubmitTime ? (endTime - firstSubmitTime) / 1000 : null;

    console.log(`✅ Total time for this question: ${totalTime}s`);
    console.log(`🤖 Time after AI suggestion: ${postAITime}s`);

    // Call updateAnswer with both answers and timing info
    props.updateAnswer(
      {
        firstAnswer: answer,
        finalAnswer: secondAnswer,
        totalTime: totalTime,
        postAITime: postAITime
      },
      props.question,
      props.currentPhrase
    );

    setShowSuggestion(false);
    setAnswer(null);
    setSecondAnswer(null);
    window.scrollTo(0, 0);
  };

  // Render answer options as radio buttons
  const renderRadioChoices = (selectedValue, onChangeHandler, disabled = false) => (
    <>
      {Object.entries(props.question)
        .filter(([key]) => ["a", "b", "c", "d", "e"].includes(key))
        .map(([key, value]) => (
          <div key={key} style={{ marginBottom: 8 }}>
            <Radio.Group
              onChange={(e) => onChangeHandler(e.target.value)}
              value={selectedValue}
              disabled={disabled}
            >
              <Radio value={key}>{`${key.toUpperCase()}. ${value}`}</Radio>
            </Radio.Group>
          </div>
        ))}
    </>
  );

  return (
    <div style={{ padding: 15, overflow: "scroll" }}>
      {contextHolder}
      <Row>
        <Col span={2}>
          <Text>Task:</Text>
          <Text strong>
            {props.currentIndex + 1}/{props.questionLen}
          </Text>
        </Col>
        <Col span={22}>
          <Text>{props.question.query}</Text>
          <div style={{ marginTop: 15 }}>
            {/* First set of choices */}
            {renderRadioChoices(answer, setAnswer, showSuggestion)}
            <Button
              type="primary"
              style={{ marginTop: 10 }}
              onClick={handleFirstSubmit}
              disabled={showSuggestion}
            >
              Submit
            </Button>

            {/* AI suggestion and second set of choices */}
            {showSuggestion && (
              <>
                <div
                  style={{
                    marginTop: 15,
                    padding: 10,
                    background: "#f6f6f6",
                    borderRadius: 5,
                    border: "1px solid #d9d9d9",
                  }}
                >
                  <Text strong>AI Suggestion:</Text>
                  The answer is <Text strong>{props.question.gold}</Text>.
                  <Paragraph style={{ marginTop: 5 }}>
                    {props.question.explanation}
                  </Paragraph>
                </div>
                <div style={{ marginTop: 20 }}>
                  <Text strong>Now, please select your final answer:</Text>
                  <div style={{ marginTop: 15 }}>
                    {renderRadioChoices(secondAnswer, setSecondAnswer)}
                    <Button
                      type="primary"
                      style={{ marginTop: 10 }}
                      onClick={handleFinalSubmit}
                    >
                      Submit Final Answer
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}