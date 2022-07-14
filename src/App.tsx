import React, { useEffect, useState } from 'react';
import Background from "../src/assets/images/wallpapersden.com_sunset-retrowave-synthwave_3840x2160.jpg"
import './App.css';
import styled from "styled-components";
import wordsJson from "./config/wordlists/words.json";

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
  margin: 2rem auto;
`;

const MenuOption = styled.div`
  font-size: 1.5rem;
  color: #ffd319;
  margin: 0 1rem;
`;

const TyperContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50rem;
  max-width: 50rem;
  /* max-height: 6.5rem; */
  margin: 10rem 2rem auto 2rem;
  background: #00000036;
  border-radius: 1rem;
  overflow: hidden;
`;

const TypeText = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1rem 1rem 0 1rem;
`;

const NextLineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1rem;
`;

const Word = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 0.5rem;
`;

const Letter = styled.div<{correct: string}>`
  font-size: 2rem;
  color: #ff901f;
  
  ${p => (p.correct === "y" ? `text-shadow: 0 0 10px ${StyleConstants.yellow}, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;` : null)};
  /* ${p => (p.correct === "n" ? `text-shadow: 0 0 10px ${StyleConstants.red}, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;` : null)}; */
`;

const Caret = styled.span`
  transition: left 0.1s ease;
  /* margin-left: -7.29165px;
  position: absolute; */
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
      <MenuOption>Hello</MenuOption>
      <MenuOption>Hello</MenuOption>
      <MenuOption>Hello</MenuOption>
      <MenuOption>Hello</MenuOption>
    </TopBarContainer>
  );
}

const CompletedWordsComponent = ({completedWordsList} : {completedWordsList: string[]}) => {
  return (
    <>
      { // Render any completed words
        completedWordsList.length > 0 ?
          completedWordsList.map((word, widx) => {
            return (
              <>
                <Word key={widx}>
                  {
                    word.split("").map((letter, lidx) => {
                      return (
                        <Letter correct={"y"} key={widx+lidx} style={{color: StyleConstants.yellow}}>{letter}</Letter>
                      );
                    })
                  }
                </Word>
              </>
            );
          })
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

} : {
  currentWord: string,
  currentWordIndex: number,
  typedLetters: string[],
}) => {
  const extraLetters = typedLetters.slice(currentWord.length, typedLetters.length);

  return (
    <>
      { // Render current word
        <Word key={currentWordIndex}>
          <>
            {
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
                          <Caret>|</Caret>
                          <Letter correct={"n"} key={currentWordIndex+lidx} style={{color: StyleConstants.orange}}>{letter}</Letter>
                        </>
                        :
                        <>
                          {
                            hasTypedAnything ?
                              <>
                                {
                                  isLetterBeforeCurrentLetter ?
                                    <Letter correct={"u"} key={currentWordIndex+lidx} style={{color: StyleConstants.orange}}>{letter}</Letter>
                                    :
                                    <>
                                      {
                                        correctLetter ?
                                          <Letter correct={"y"} key={currentWordIndex+lidx} style={{color: StyleConstants.yellow}}>{letter}</Letter>
                                          :
                                          <Letter correct={"n"} key={currentWordIndex+lidx} style={{color: StyleConstants.red}}>{typedLetters[lidx]}</Letter>
                                      }
                                      {
                                        lastLetter && extraLetters.length === 0 ?
                                          <Caret>|</Caret>
                                          :
                                          null
                                      }
                                    </>
                                }
                              </>
                              :
                              <Letter correct={"n"} key={currentWordIndex+lidx} style={{color: StyleConstants.orange}}>{letter}</Letter>
                          }
                        </>
                    }
                  </>
                );
              })
            }
            {
              extraLetters ?
                extraLetters.map((letter, lidx) => {
                  const lastLetter = extraLetters.length - 1 === lidx;
                  return (
                    <>
                      <Letter correct={"n"} key={currentWordIndex + lidx} style={{ color: StyleConstants.red_extra_letter }}>{letter}</Letter>
                      {
                        lastLetter ?
                        <Caret>|</Caret>
                        :
                        null
                      }
                    </>
                  );
                })
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
} : {
  wordList: string[],
  currentWordIndex: number
}) => {
  return (
    <>
      { // Render any yet to be written words
            wordList.map((word, widx) => {
              return (
                <>
                  {
                    widx === currentWordIndex ?
                      null
                      :
                      <Word key={widx}>
                        {
                          word.split("").map((letter, lidx) => {
                            return (
                              <>
                                <Letter correct={"u"} key={widx+lidx} style={{color: StyleConstants.orange}}>{letter}</Letter>
                              </>
                            );
                          })
                        }
                      </Word>
                  }
                </>
              );
            })
          }
    </>
  );
}

const NextLineComponent = ({
  nextLine
} : {
  nextLine: string[]
}) => {
  return (
    <>
      { // Render any yet to be written words
            nextLine.map((word, widx) => {
              return (
                <Word key={widx}>
                  {
                    word.split("").map((letter, lidx) => {
                      return (
                        <>
                          <Letter correct={"u"} key={widx+lidx} style={{color: StyleConstants.orange}}>{letter}</Letter>
                        </>
                      );
                    })
                  }
                </Word>
              );
            })
          }
    </>
  );
}

const TyperComponent = ({
  wordList,
  nextLine,
  completedWordsList,
  currentWord,
  currentWordIndex,
  typedLetters
} : {
  wordList: string[],
  nextLine: string[],
  completedWordsList: string[],
  currentWord: string,
  currentWordIndex: number,
  typedLetters: string[]
}) => {
  return (
    <TyperContainer>
      <TypeText>
        <>
          <CompletedWordsComponent completedWordsList={completedWordsList}/>
          <CurrentWordComponent currentWord={currentWord} currentWordIndex={currentWordIndex} typedLetters={typedLetters} />
          <LaterWordsComponent wordList={wordList} currentWordIndex={currentWordIndex} />
        </>
      </TypeText>
      <NextLineWrapper>
        <NextLineComponent nextLine={nextLine} />
      </NextLineWrapper>
    </TyperContainer>
  );
}

const App = () => {
  const [wordList, setWordlist] = useState<string[]>(wordsJson);
  const [completedWordsList, setCompletedWordsList] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [typedLetters, setTypedLetters] = useState<string[]>([]);

  const [lines, setLines] = useState<string[][]>([]);
  const [currentLine, setCurrentLine] = useState<string[]>([]);
  const [nextLine, setNextLine] = useState<string[]>([]);

  const lineLength = 10;

  const newLine = () => {
    setCurrentWord(nextLine[0]);
    setLines(lines.slice(1, lines.length));
    setCurrentWordIndex(0);
    setTypedLetters([]);
  };

  const isLastWordOfLine = () => {
    return currentWordIndex - 1 === lineLength;
  }

  useEffect(() => {
    const [list, chunkSize] = [wordList, lineLength]
    const linesList = [...Array(Math.ceil(list.length / chunkSize))]
      .map((_, i) => list.slice(i * chunkSize, i * chunkSize + chunkSize));
    
    setLines(linesList);

  }, [wordList]);

  useEffect(() => {
    if (lines[0]) setCurrentLine(lines[0]);
    if (lines[1]) setNextLine(lines[1]);
  }, [lines]);

  useEffect(() => {
    // if (!currentWord) setCurrentWord(wordList[currentWordIndex]);
    if (!currentLine) return;
    if (!currentWord) setCurrentWord(wordList[currentWordIndex]);
  }, [currentWord, wordList, currentWordIndex]);

  useEffect(() => {
    if (currentLine.length > 0) setCurrentWord(currentLine[currentWordIndex]);
  }, [currentLine, currentWordIndex]);

  useEffect(() => {
		document.onkeydown = (e) => {
      if (["Shift", "Control", "Alt"].includes(e.key)) {
        return;
      }

      switch (e.key) {
        case "Escape":
          console.log(`Remaining words: ${wordList.length}`);
          console.log(wordList)
          console.log(`Completed words: ${completedWordsList.length}`);
          console.log(completedWordsList);
          console.log(`Current word: ${currentWord}`);
          console.log(`Current word index: ${currentWordIndex}`);
          console.log(`Typed letters: ${typedLetters}`);
          console.log(lines)
          console.log(currentLine)
          console.log(nextLine)
          break;
        case " ":
          if (typedLetters.join("") === currentWord) {
            // setCompletedWordsList([...completedWordsList, wordList.splice(0, 1).toString()]);
            // setWordlist(wordList.slice(0, wordList.length));
            // setCurrentWord(wordList[currentWordIndex]);
            
            if (isLastWordOfLine()) {
              newLine();
              return;
            }

            setCompletedWordsList([...completedWordsList, currentLine.splice(0, 1).toString()]);
            setCurrentLine(currentLine.slice(0, currentLine.length));
            setCurrentWord(currentLine[currentWordIndex]);
            setCurrentWordIndex(currentWordIndex);
            setTypedLetters([]);
          }
          break;
        case "Backspace":
          if (typedLetters.length > 0) {
            setTypedLetters(typedLetters.slice(0, typedLetters.length - 1));
          }
          break;
        case "q":
          newLine();
          break;
        default:
          setTypedLetters([...typedLetters, e.key]);

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
    lines,
    currentLine,
    nextLine
  ]);

  return (
    <AppContainer style={{backgroundImage: `url(${Background})`}}>
      <Content>
        <TopBar />
        <TyperComponent 
          wordList = {currentLine} 
          nextLine = {nextLine}
          completedWordsList = {completedWordsList}
          currentWord = {currentWord} 
          currentWordIndex = {currentWordIndex}
          typedLetters = {typedLetters}
          />
      </Content>
    </AppContainer>
  );
}

export default App;
