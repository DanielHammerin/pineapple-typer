import React, { useEffect, useState } from 'react';
import Background from "../src/assets/images/wallpapersden.com_sunset-retrowave-synthwave_3840x2160.jpg"
import './App.css';
import styled from "styled-components";
import wordsJson from "./config/wordlists/words.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

const StyleConstants = {
  yellow: "#ffd319",
  orange: "#ff901f",
  magenta: "#ff2975",
  pink: "#f222ff",
  purple: "#8c1eff",
  cyan: "#00eeff",
  grey: "#c5c5c5",
  red: "#ff271f",
  red_extra_letter: "#b4231e"
};

const AppContainer = styled.div`
  font-family: "Hack", monospace;
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #323437;
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
`;

const Title = styled.div`
  display: flex;
  height: fit-content;
  width: fit-content;
  align-items: center;
  justify-content: center;
  margin: 2rem;

  font-size: 3rem;
  color: ${StyleConstants.yellow};
  text-shadow: 0 0 10px ${StyleConstants.yellow}, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const TopBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
`;

const MenuOption = styled.div`
  font-size: 1.5rem;
  color: ${StyleConstants.yellow};
  text-shadow: 0 0 10px ${StyleConstants.yellow}, 0 0 10px #fff, 0 0 10px #e60073, 0 0 15px #e60073;
  margin: 0 1rem;
`;

const TimerBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 52rem;
  height: fit-content;
  margin: 5rem 2rem 0rem 2rem;
`;

const TyperContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50rem;
  max-width: 50rem;
  max-height: 9rem;
  margin: 0.5rem 2rem 2rem 2rem;
  padding: 1rem;
  background: #00000036;
  border-radius: 1rem;
`;

const ResultsScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-width: 50rem;
  max-width: 50rem;
  height: 9rem;
  margin: 0.5rem 2rem 2rem 2rem;
  padding: 2rem 1rem;
  background: #00000036;
  border-radius: 1rem;

  font-size: 1.5rem;
  color: ${StyleConstants.yellow};
  text-shadow: 0 0 10px ${StyleConstants.yellow}, 0 0 10px #fff, 0 0 10px #e60073, 0 0 15px #e60073;
`;

const ResetButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 5rem;
  max-width: 5rem;
  height: 5rem;
  margin: 5rem 2rem auto 2rem;
  background: #00000036;
  border-radius: 1rem;
  cursor: pointer;

  font-size: 1.5rem;
  color: ${StyleConstants.yellow};
  text-shadow: 0 0 10px ${StyleConstants.yellow}, 0 0 10px #fff, 0 0 10px #e60073, 0 0 15px #e60073;
`;

const TypeText = styled.div`
  display: flex;
  justify-content: center;
  height: 7.1rem;
  overflow: hidden;
`;

const TypeTextContent = styled.div<{ offset: number }>`
  position: relative;
  margin-top: -${p => (p.offset * 2.375)}rem;
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  transition: all 150ms;
`;

const Word = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 0.5rem;
`;

const Letter = styled.div<{ correct: string }>`
  font-size: 2rem;
  color: #ff901f;
  overflow: visible;
  
  ${p => (p.correct === "y" ? `text-shadow: 0 0 10px ${StyleConstants.yellow}, 0 0 10px #fff, 0 0 10px #e60073, 0 0 15px #e60073` : null)};
  /* ${p => (p.correct === "y" ? `text-shadow: 0 0 10px ${StyleConstants.yellow}, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;` : null)}; */
  /* ${p => (p.correct === "n" ? `text-shadow: 0 0 10px ${StyleConstants.red}, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;` : null)}; */
`;

const Timer = styled.div`
  display: flex;
  font-size: 1.5rem;
  color: ${StyleConstants.yellow};
  text-shadow: 0 0 10px ${StyleConstants.yellow}, 0 0 10px #fff, 0 0 10px #e60073, 0 0 15px #e60073;
  background: #00000036;
  border-radius: 1rem;
  height: 1.5rem;
  width: fit-content;
  padding: 1rem;
`;

const TimeSelector = styled.div`
  display: flex;
  font-size: 1.5rem;
  color: #ff901f;
  background: #00000036;
  border-radius: 1rem;
  height: 1.5rem;
  width: fit-content;
  padding: 1rem;
`;

const TimerOption = styled.div<{ selected: boolean }>`
  display: flex;
  font-size: 1.5rem;
  margin: 0 0.5rem;
  cursor: pointer;
  ${p => (p.selected ? `color: ${StyleConstants.yellow}; text-shadow: 0 0 10px ${StyleConstants.yellow}, 0 0 10px #fff, 0 0 10px #e60073, 0 0 15px #e60073` : null)};
`;

const Caret = styled.span<{ offset: number }>`
  transition: left 0.1s ease;
  margin-left: ${p => (p.offset)}rem;
  position: absolute;
  color: #00eeff;
  animation: blink 1.5s infinite 1s;

  @keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
`;

const TopBar = () => {
  return (
    <TopBarContainer>
      <MenuOption>The most nostalgic type test out there</MenuOption>
    </TopBarContainer>
  );
}

const TimerComponent = ({
  timeRemaining,
  setTestDuration,
  reset
}: {
  timeRemaining: number,
  setTestDuration: React.Dispatch<React.SetStateAction<number>>,
  reset: Function
}) => {
  const [selected, setselected] = useState<number>(30);
  const timerTimes = [30, 60, 120];

  const TimerOptionComponent = ({ time }: { time: number }) => {
    return (
      <TimerOption
        selected={selected === time}
        onClick={() => {
          setselected(time);
          setTestDuration(time);
          reset();
        }}>
        {time}
      </TimerOption>
    );
  }

  return (
    <TimerBar>
      <Timer>{timeRemaining}</Timer>
      <TimeSelector>
        {
          timerTimes.map((time, idx) => {
            return (
              <TimerOptionComponent time={time} key={`timer_option_${idx}`} />
            );
          })
        }
      </TimeSelector>
    </TimerBar>
  );
}

const CompletedWordsComponent = ({ completedWordsList }: { completedWordsList: string[] }) => {
  return (
    <>
      { // Render any completed words
        completedWordsList.length > 0 ?
          React.Children.toArray(
            completedWordsList.map((word, widx) => {
              return (
                <>
                  <Word>
                    {
                      React.Children.toArray(
                        word.split("").map((letter, lidx) => {
                          return (
                            <Letter correct={"y"} style={{ color: StyleConstants.yellow }}>{letter}</Letter>
                          );
                        })
                      )
                    }
                  </Word>
                </>
              );
            })
          )
          :
          null
      }
    </>
  );
}

const CurrentWordComponent = ({
  currentWord,
  currentWordIndex,
  typedLetters,
}: {
  currentWord: string,
  currentWordIndex: number,
  typedLetters: string[],
}) => {
  const extraLetters = typedLetters.slice(currentWord.length, typedLetters.length);
  const defaultOffset = 0.456;
  const characterWidth = 1.204;
  const offset = typedLetters.length > 0 ? typedLetters.length * characterWidth - defaultOffset : -defaultOffset;

  return (
    <>
      { // Render current word
        <Word key={currentWordIndex} id="current_word">
          <>
            {
              React.Children.toArray(
                currentWord.split("").map((letter, lidx) => {
                  const currentLetter = typedLetters.length === lidx;
                  const correctLetter = typedLetters[lidx] === currentWord.split("")[lidx];
                  const lastLetter = currentWord.length === lidx + 1;
                  const hasTypedAnything = typedLetters.length > 0;
                  const isLetterBeforeCurrentLetter = lidx > typedLetters.length;

                  return (
                    <>
                      {
                        currentLetter ?
                          <>
                            <Caret offset={offset}>|</Caret>
                            <Letter correct={"n"} style={{ color: StyleConstants.orange }}>{letter}</Letter>
                          </>
                          :
                          <>
                            {
                              hasTypedAnything ?
                                <>
                                  {
                                    isLetterBeforeCurrentLetter ?
                                      <Letter correct={"u"} style={{ color: StyleConstants.orange }}>{letter}</Letter>
                                      :
                                      <>
                                        {
                                          correctLetter ?
                                            <Letter correct={"y"} style={{ color: StyleConstants.yellow }}>{letter}</Letter>
                                            :
                                            <Letter correct={"n"} style={{ color: StyleConstants.red }}>{typedLetters[lidx]}</Letter>
                                        }
                                        {
                                          lastLetter && extraLetters.length === 0 ?
                                            <Caret offset={offset}>|</Caret>
                                            :
                                            null
                                        }
                                      </>
                                  }
                                </>
                                :
                                <Letter correct={"n"} style={{ color: StyleConstants.orange }}>{letter}</Letter>
                            }
                          </>
                      }
                    </>
                  );
                })
              )
            }
            {
              extraLetters ?
                React.Children.toArray(
                  extraLetters.map((letter, lidx) => {
                    const lastLetter = extraLetters.length - 1 === lidx;
                    return (
                      <>
                        <Letter correct={"n"} key={currentWordIndex + lidx} style={{ color: StyleConstants.red_extra_letter }}>{letter}</Letter>
                        {
                          lastLetter ?
                            <Caret offset={offset}>|</Caret>
                            :
                            null
                        }
                      </>
                    );
                  })
                )
                :
                null
            }
          </>
        </Word>
      }
    </>
  );
}

const LaterWordsComponent = ({
  wordList,
  currentWordIndex
}: {
  wordList: string[],
  currentWordIndex: number
}) => {
  return (
    <>
      { // Render any yet to be written words
        React.Children.toArray(
          wordList.map((word, widx) => {
            return (
              <>
                {
                  widx === currentWordIndex ?
                    null
                    :
                    <Word key={widx}>
                      {
                        React.Children.toArray(
                          word.split("").map((letter, lidx) => {
                            return (
                              <>
                                <Letter correct={"u"} key={widx + lidx} style={{ color: StyleConstants.orange }}>{letter}</Letter>
                              </>
                            );
                          })
                        )
                      }
                    </Word>
                }
              </>
            );
          })
        )
      }
    </>
  );
}

const TyperComponent = ({
  wordList,
  completedWordsList,
  currentWord,
  currentWordIndex,
  typedLetters,
  textVerticalOffset
}: {
  wordList: string[],
  completedWordsList: string[],
  currentWord: string,
  currentWordIndex: number,
  typedLetters: string[],
  textVerticalOffset: number
}) => {
  return (
    <TyperContainer>
      <TypeText>
        <TypeTextContent offset={textVerticalOffset}>
          <CompletedWordsComponent completedWordsList={completedWordsList} />
          <CurrentWordComponent currentWord={currentWord} currentWordIndex={currentWordIndex} typedLetters={typedLetters} />
          <LaterWordsComponent wordList={wordList} currentWordIndex={currentWordIndex} />
        </TypeTextContent>
      </TypeText>
    </TyperContainer>
  );
}

const ResultsComponent = ({
  completedWords,
  testDuration,
  reset
}: {
  completedWords: number,
  testDuration: number,
  reset: Function
}) => {
  return (
    <ResultsScreen>
      {((completedWords / testDuration) * 60).toFixed(1)} WPM
      <FontAwesomeIcon icon={faRotateLeft} onClick={() => { reset(); }} style={{ cursor: "pointer" }} />
    </ResultsScreen>
  );
}

const App = () => {
  const [wordList, setWordlist] = useState<string[]>(wordsJson);
  const [completedWordsList, setCompletedWordsList] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [typedLetters, setTypedLetters] = useState<string[]>([]);
  const [textVerticalOffset, setTextVerticalOffset] = useState<number>(0);

  const [testInProgress, setTestInProgress] = useState<boolean>(false);
  const [testDuration, setTestDuration] = useState<number>(30);
  const [timeRemaining, setTimeRemaining] = useState<number>(30);

  const shuffleWordList = (list: string[]) => {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }
    return list;
  };

  const shouldOffset = (offset: number) => {
    const currentWord = document.getElementById("current_word");
    if (currentWord) {
      if (currentWord.offsetTop <= 38) return false;
      return (currentWord.offsetTop > (38 * offset));
    }
  };

  const reset = () => {
    setWordlist(shuffleWordList(wordsJson));
    setCompletedWordsList([]);
    setCurrentWord("");
    setCurrentWordIndex(0);
    setTypedLetters([]);
    setTextVerticalOffset(0);
    setTestInProgress(false);
    setTimeRemaining(testDuration);
  };

  useEffect(() => {
    shuffleWordList(wordsJson);
  }, []);

  useEffect(() => {
    setTimeRemaining(testDuration)
  }, [testDuration]);

  useEffect(() => {
    if (!testInProgress) return;
    if (timeRemaining === 0) return setTestInProgress(false);

    const interval = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, testInProgress]);

  useEffect(() => {
    if (!currentWord) setCurrentWord(wordList[currentWordIndex]);
  }, [currentWord, wordList, currentWordIndex]);

  useEffect(() => {
    document.onkeydown = (e) => {
      e.preventDefault();
      if (["Shift", "Control", "Alt"].includes(e.key)) {
        return;
      }

      if (!testInProgress) setTestInProgress(true);

      switch (e.key) {
        case "Escape":
          console.log(`Remaining words: ${wordList.length}`);
          console.log(wordList)
          console.log(`Completed words: ${completedWordsList.length}`);
          console.log(completedWordsList);
          console.log(`Current word: ${currentWord}`);
          console.log(`Current word index: ${currentWordIndex}`);
          console.log(`Typed letters: ${typedLetters}`);
          break;
        case " ":
          if (typedLetters.join("") === currentWord) {
            setCompletedWordsList([...completedWordsList, wordList.splice(0, 1).toString()]);
            setWordlist(wordList.slice(0, wordList.length));
            setCurrentWord(wordList[currentWordIndex]);
            setCurrentWordIndex(currentWordIndex);
            setTypedLetters([]);
          }
          break;
        case "Backspace":
          if (typedLetters.length > 0) {
            setTypedLetters(typedLetters.slice(0, typedLetters.length - 1));
          }
          break;
        case "Tab":
          // eslint-disable-next-line
          reset();
          break;
        default:
          if (!testInProgress) setTestInProgress(true);
          setTypedLetters([...typedLetters, e.key]);

          if (shouldOffset(textVerticalOffset + 1)) {
            setTextVerticalOffset(textVerticalOffset + 1);
          }
      }
    };
    return () => {
      document.onkeydown = null;
    };
  }, [
    typedLetters,
    currentWord,
    wordList,
    currentWordIndex,
    completedWordsList,
    textVerticalOffset,
    testInProgress
  ]);


  const RestartTestComponent = () => {
    return (
      <ResetButton onClick={reset}>
        <FontAwesomeIcon icon={faRotateLeft} onClick={() => { reset(); }} style={{ cursor: "pointer" }} />
      </ResetButton>
    )
  }

  return (
    <AppContainer style={{ backgroundImage: `url(${Background})` }}>
      <Content>
        <Title>Pineapple Typer</Title>
        <TopBar />
        <TimerComponent timeRemaining={timeRemaining} setTestDuration={setTestDuration} reset={reset} />
        {
          timeRemaining === 0 ?
            <ResultsComponent
              completedWords={completedWordsList.length}
              testDuration={testDuration}
              reset={reset}
            />
            :
            <TyperComponent
              wordList={wordList}
              completedWordsList={completedWordsList}
              currentWord={currentWord}
              currentWordIndex={currentWordIndex}
              typedLetters={typedLetters}
              textVerticalOffset={textVerticalOffset}
            />
        }
        <RestartTestComponent />
      </Content>
    </AppContainer>
  );
}

export default App;
