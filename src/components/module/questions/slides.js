import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Typography, Radio, Button, message } from "antd";

export function Slides(props) {
  const [messageApi, contextHolder] = message.useMessage();

  // 答案
  const [answer, setAnswer] = useState(null);
  const [secondAnswer, setSecondAnswer] = useState(null);

  // 信心
  const [firstConfidence, setFirstConfidence] = useState(null);
  const [secondConfidence, setSecondConfidence] = useState(null);

  // AI 评分
  const [aiAccuracy, setAiAccuracy] = useState(null);
  const [aiHelpfulness, setAiHelpfulness] = useState(null);
  const [aiTrustworthiness, setAiTrustworthiness] = useState(null);

  // 控制阶段
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showFirstConf, setShowFirstConf] = useState(false);
  const [showFinalConf, setShowFinalConf] = useState(false);
  const [showAISurvey, setShowAISurvey] = useState(false);

  // 按钮禁用状态
  const [firstSubmitted, setFirstSubmitted] = useState(false);
  const [firstConfSubmitted, setFirstConfSubmitted] = useState(false);
  const [finalSubmitted, setFinalSubmitted] = useState(false);
  const [finalConfSubmitted, setFinalConfSubmitted] = useState(false);
  const [aiSurveySubmitted, setAiSurveySubmitted] = useState(false);

  // 计时变量
  const timeStartRef = useRef(null);
  const timeFirstSubmitRef = useRef(null);
  const timeConf1SubmitRef = useRef(null);
  const timeFinalSubmitRef = useRef(null);
  const timeConf2SubmitRef = useRef(null);

  const { Text, Paragraph } = Typography;

  // 每次加载新题目时重置状态
  useEffect(() => {
    setAnswer(null);
    setSecondAnswer(null);
    setFirstConfidence(null);
    setSecondConfidence(null);
    setAiAccuracy(null);
    setAiHelpfulness(null);
    setAiTrustworthiness(null);

    setShowSuggestion(false);
    setShowFirstConf(false);
    setShowFinalConf(false);
    setShowAISurvey(false);

    setFirstSubmitted(false);
    setFirstConfSubmitted(false);
    setFinalSubmitted(false);
    setFinalConfSubmitted(false);
    setAiSurveySubmitted(false);

    // 记录起始时间
    timeStartRef.current = Date.now();

    window.scrollTo(0, 0);
  }, [props.question]);

  // ================== 阶段逻辑 ==================

  const handleFirstSubmit = () => {
    if (!answer) {
      message.error("Please select an answer before submitting!");
      return;
    }
    timeFirstSubmitRef.current = Date.now();
    setShowFirstConf(true);
    setFirstSubmitted(true);
  };

  const handleFirstConfSubmit = () => {
    if (!firstConfidence) {
      message.error("Please select your confidence level!");
      return;
    }
    timeConf1SubmitRef.current = Date.now();
    setShowSuggestion(true);
    setFirstConfSubmitted(true);
  };

  const handleFinalSubmit = () => {
    if (!secondAnswer) {
      message.error("Please select your final answer before submitting!");
      return;
    }
    timeFinalSubmitRef.current = Date.now();
    setShowFinalConf(true);
    setFinalSubmitted(true);
  };

  const handleSecondConfSubmit = () => {
    if (!secondConfidence) {
      message.error("Please select your confidence level!");
      return;
    }
    timeConf2SubmitRef.current = Date.now();
    setShowAISurvey(true);
    setFinalConfSubmitted(true);
  };

  const handleAISurveySubmit = () => {
    if (!aiAccuracy || !aiHelpfulness || !aiTrustworthiness) {
      message.error("Please rate all three AI metrics!");
      return;
    }
    const timeNow = Date.now();

    // 计算时间差（秒）
    const time_firstAnswer = (timeFirstSubmitRef.current - timeStartRef.current) / 1000;
    const time_firstConfidence = (timeConf1SubmitRef.current - timeFirstSubmitRef.current) / 1000;
    const time_finalAnswer = (timeFinalSubmitRef.current - timeConf1SubmitRef.current) / 1000;
    const time_finalConfidence = (timeConf2SubmitRef.current - timeFinalSubmitRef.current) / 1000;
    const time_aiSurvey = (timeNow - timeConf2SubmitRef.current) / 1000;

    props.updateAnswer(
      {
        firstAnswer: answer,
        firstConfidence,
        finalAnswer: secondAnswer,
        finalConfidence: secondConfidence,
        aiAccuracy,
        aiHelpfulness,
        aiTrustworthiness,
        time_firstAnswer,
        time_firstConfidence,
        time_finalAnswer,
        time_finalConfidence,
        time_aiSurvey,
      },
      props.question,
      props.currentPhrase
    );

    message.success("Response submitted!");
    setAiSurveySubmitted(true);
  };

  // ================== 可复用组件 ==================

  const renderScale = (value, setter, labelText) => (
    <div style={{ marginTop: 4 }}>
      <Text type="secondary">{labelText}</Text>
      <div style={{ marginTop: 6 }}>
        <Radio.Group
          value={value}
          onChange={(e) => setter(e.target.value)}
          style={{ marginTop: 4 }}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((v) => (
            <Radio.Button key={v} value={v} style={{ marginRight: 6 }}>
              {v}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
    </div>
  );

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

  // ================== 主体渲染 ==================
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
            {/* --- 第一次作答 --- */}
            {renderRadioChoices(answer, setAnswer, showFirstConf || showSuggestion)}
            {!showFirstConf && !showSuggestion && (
              <Button
                type="primary"
                style={{ marginTop: 10 }}
                onClick={handleFirstSubmit}
                disabled={firstSubmitted}
              >
                Submit
              </Button>
            )}

            {/* --- 第一次信心评分 --- */}
            {showFirstConf && (
              <div style={{ marginTop: 15 }}>
                <Text strong>How confident are you in your answer?</Text>
                {renderScale(firstConfidence, setFirstConfidence, "1 = Very Low, 7 = Very High")}
                <Button
                  type="primary"
                  style={{ marginTop: 10 }}
                  onClick={handleFirstConfSubmit}
                  disabled={firstConfSubmitted}
                >
                  Submit Confidence
                </Button>
              </div>
            )}

            {/* --- AI 建议 --- */}
            {showSuggestion && (
              <div
                style={{
                  marginTop: 20,
                  padding: 10,
                  background: "#f6f6f6",
                  borderRadius: 5,
                  border: "1px solid #d9d9d9",
                }}
              >
                <Text strong>AI Suggestion:</Text>
                <Paragraph style={{ marginTop: 5 }}>
                  The answer is <Text strong>{props.question.prediction}</Text>.
                  <br />
                  {props.question.explanation}
                </Paragraph>
              </div>
            )}

            {/* --- 第二次作答 --- */}
            {showSuggestion && (
              <div style={{ marginTop: 20 }}>
                <Text strong>Now, please select your final answer:</Text>
                {renderRadioChoices(secondAnswer, setSecondAnswer)}
                {!showFinalConf && (
                  <Button
                    type="primary"
                    style={{ marginTop: 10 }}
                    onClick={handleFinalSubmit}
                    disabled={finalSubmitted}
                  >
                    Submit Final Answer
                  </Button>
                )}
              </div>
            )}

            {/* --- 第二次信心评分 --- */}
            {showFinalConf && (
              <div style={{ marginTop: 15 }}>
                <Text strong>How confident are you in your final answer?</Text>
                {renderScale(secondConfidence, setSecondConfidence, "1 = Very Low, 7 = Very High")}
                <Button
                  type="primary"
                  style={{ marginTop: 10 }}
                  onClick={handleSecondConfSubmit}
                  disabled={finalConfSubmitted}
                >
                  Submit Confidence
                </Button>
              </div>
            )}

            {/* --- AI 主观问卷 --- */}
            {showAISurvey && (
              <div style={{ marginTop: 20 }}>
                <Text strong>Please rate the AI’s performance:</Text>
                <div style={{ marginTop: 10 }}>
                  <Text>How accurate do you think the AI was?</Text>
                  {renderScale(aiAccuracy, setAiAccuracy, "1 = Not Accurate, 7 = Extremely Accurate")}
                </div>
                <div style={{ marginTop: 10 }}>
                  <Text>How helpful do you think the AI was?</Text>
                  {renderScale(aiHelpfulness, setAiHelpfulness, "1 = Not Helpful, 7 = Extremely Helpful")}
                </div>
                <div style={{ marginTop: 10 }}>
                  <Text>How trustworthy do you think the AI was?</Text>
                  {renderScale(aiTrustworthiness, setAiTrustworthiness, "1 = Not Trustworthy, 7 = Completely Trustworthy")}
                </div>
                <Button
                  type="primary"
                  style={{ marginTop: 15 }}
                  onClick={handleAISurveySubmit}
                  disabled={aiSurveySubmitted}
                >
                  Submit All
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}