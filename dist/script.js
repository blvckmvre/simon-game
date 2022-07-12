const SoundBank = [
"https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
"https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
"https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
"https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"];


const App = () => {
  const [round, setRound] = React.useState(0);
  const [sequence, setSequence] = React.useState([]);
  const [myTurn, setMyTurn] = React.useState([]);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isRunning, setIsRunning] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [isStrict, setIsStrict] = React.useState(false);
  const [warning, setWarning] = React.useState(null);

  const timer = React.useRef(null);

  const btn1 = React.useRef(null);
  const btn2 = React.useRef(null);
  const btn3 = React.useRef(null);
  const btn4 = React.useRef(null);

  const refList = [
  btn1,
  btn2,
  btn3,
  btn4];


  const btnArray = React.useMemo(() =>
  Array.from({ length: 4 }, (_, i) => i),
  []);

  const applyShine = i => {
    refList[i].
    current.
    classList.
    add("highlight-" + i);
  };
  const removeShine = i => {
    refList[i].
    current.
    classList.
    remove("highlight-" + i);
  };

  const runSequence = () => {
    if (!isRunning)
    setIsRunning(true);
    setIsDisabled(true);
    for (let i = 0; i < sequence.length; i++) {
      timer.current = setTimeout(() => {
        if (sequence[i - 1])
        removeShine(sequence[i - 1]);
        applyShine(sequence[i]);
        let audio = refList[sequence[i]].current.children[0];
        audio.currentTime = 0;
        audio.play();
        if (i === sequence.length - 1) {
          setTimeout(() => {
            removeShine(sequence[sequence.length - 1]);
            setIsDisabled(false);
          }, 1000);
        }
      }, 1000 * i + 1000);
    }
  };

  const genRandomNum = () => {
    let i = '' + Math.floor(Math.random() * 4);
    if (sequence[sequence.length - 1] === i)
    return genRandomNum();else

    return i;
  };

  const increment = () => {
    let i = genRandomNum();
    setSequence(p => [...p, i]);
  };

  const guessSequence = e => {
    if (myTurn.length < sequence.length) {
      let audio = refList[e.target.textContent].current.children[0];
      audio.currentTime = 0;
      audio.play();
      setMyTurn(p => [...p, e.target.textContent]);
    }
  };

  const reset = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setResult(null);
    setSequence([]);
    setMyTurn([]);
    setIsRunning(false);
    setIsDisabled(false);
    setRound(0);
    setIsStrict(false);
  };

  const assert = () => {
    if (myTurn[myTurn.length - 1] !== sequence[myTurn.length - 1]) {
      if (isStrict) {
        setResult("You Lost...");
        setTimeout(() => reset(), 1000);
      } else {
        setWarning("Try again!");
        setTimeout(() => setWarning(null), 1000);
        runSequence();
        setMyTurn([]);
      }
    } else if (sequence.length === myTurn.length) {
      if (round === 20) {
        setResult("You Won!");
        setTimeout(() => reset(), 1000);
      } else {
        increment();
        setMyTurn([]);
      }
    }
  };

  React.useEffect(() => {
    if (sequence.length) {
      runSequence();
      setRound(p => p + 1);
    }
  }, [sequence]);

  React.useEffect(() => {
    if (sequence.length)
    assert();
  }, [myTurn]);

  return /*#__PURE__*/(
    React.createElement("div", { className: isDisabled ? "app-wrapper disabled" : "app-wrapper" }, /*#__PURE__*/
    React.createElement("h1", null,

    isRunning ?
    result ?
    result :
    warning ?
    warning :
    `Round ${round}, ${isStrict ? "Hardcore" : "Softcore"}` :
    "Simon Game"),


    isRunning ? /*#__PURE__*/

    React.createElement("button", {
      disabled: !!result,
      className: "func-btn",
      onClick: reset }, "Reset") : /*#__PURE__*/


    React.createElement("div", { className: "func-wrapper" }, /*#__PURE__*/
    React.createElement("div", {
      onChange: e => setIsStrict(!!+e.target.value),
      className: "radio-wrapper" }, /*#__PURE__*/

    React.createElement("label", { className:
      isStrict ? "mode-btn right-divider checked" :
      "mode-btn right-divider" }, "Hardcore", /*#__PURE__*/


    React.createElement("input", {
      type: "radio",
      value: "1",
      name: "mode",
      checked: isStrict })), /*#__PURE__*/


    React.createElement("label", { className:
      isStrict ? "mode-btn" :
      "mode-btn checked" }, "Softcore", /*#__PURE__*/


    React.createElement("input", {
      type: "radio",
      value: "0",
      name: "mode",
      checked: !isStrict }))), /*#__PURE__*/



    React.createElement("button", {
      className: "func-btn",
      onClick: increment }, "Start")), /*#__PURE__*/



    React.createElement("div", { className: "field-wrapper" },
    btnArray.map((i) => /*#__PURE__*/
    React.createElement("div", {
      key: "bt" + i,
      ref: refList[i],
      className:
      !isRunning ||
      !!result ?
      "field-btn disabled" :
      "field-btn",

      onClick: e => guessSequence(e) }, /*#__PURE__*/

    React.createElement("audio", {
      className: "aud",
      src: SoundBank[i] }),

    i)))));





};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(App, null));