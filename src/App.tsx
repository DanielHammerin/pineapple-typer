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
  font-size: 28px;
  color: #ffd319;
  margin: 0 1rem;
`;

const TyperContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 600px;
  max-width: 1200px;
  height: fit-content;
  margin: 10rem 2rem auto 2rem;
  background: #00000036;
  border-radius: 1rem;
`;

const TypeText = styled.div`
  font-size: 32px;
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

const Letter = styled.div`
  font-size: 32px;
  color: #ff901f;
`;

const Caret = styled.span`
  transition: left 0.1s ease;
  /* margin-left: -7.29165px; */
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

const TyperComponent = ({
  wordList,
  currentWord,
  currentWordLetter,
  typedLetters,
  completedWordsList,
  extraLetters,
  setTypedLetters

} : {
  wordList: string[],
  currentWord: number,
  currentWordLetter: number,
  typedLetters: string[],
  completedWordsList: string[],
  extraLetters: string[],
  setTypedLetters: React.Dispatch<React.SetStateAction<string[]>>
}) => {

  return (
    <TyperContainer>
      <TypeText>
      {wordList.map((word, widx) => {
        const isCurrentWord = currentWord == widx;
        const isCompletedWord = completedWordsList[widx] == word;
        //const extraLetters = typedLetters.slice(word.length + 1, typedLetters.length);
        return (
          <>
            {isCurrentWord ?
            // Is this word the current word to be typed?
            <Word key={widx}>
              {
                word.split("").map((letter, lidx) => {
                  const isCurrentLetter = currentWordLetter == lidx;
                  const isCorrectLetter = word.charAt(lidx) == typedLetters[lidx] && lidx < currentWordLetter;
                  const isBeforeCurrentLetter = lidx > currentWordLetter;
                  return (
                    <>
                      {isCurrentLetter ?
                        // If it's the next letter to be typed, show the caret infront of it.
                        <>
                          <Caret>|</Caret>
                          <Letter key={widx+lidx} style={{color: StyleConstants.orange}}>{letter}</Letter>
                        </>
                        :
                        // Otherwise it's any other letter in the word.
                        <>
                          {isBeforeCurrentLetter ?
                            // Is the letter before the current letter?
                            <Letter key={widx+lidx} style={{color: StyleConstants.orange}}>{letter}</Letter>
                            :
                            <>
                              {isCorrectLetter ?
                                // Is the letter is typed correctly? 
                                <Letter key={widx+lidx} style={{color: StyleConstants.yellow}}>{letter}</Letter>
                                :
                                <Letter key={widx+lidx} style={{color: StyleConstants.red}}>{letter}</Letter>
                              }
                            </>
                          }
                        </>
                      }
                    </>
                  );
                })
              }
              {extraLetters.map((letter, elidx) => {
                return (
                  <Letter key={elidx} style={{color: StyleConstants.red_extra_letter}}>{letter}</Letter>
                );
              })}
            </Word>
            :
            // If this isn't the currently typed word, show it without caret logic.
            <Word key={widx}>
                {
                  Array.from(word).map((letter, lidx) => {
                    return (
                      <Letter key={widx+lidx} style={{color: isCompletedWord ? StyleConstants.yellow : StyleConstants.orange}}>{letter}</Letter>
                    );
                  })
                }
              </Word>
            }
          </>
        );
      })}
      </TypeText>
    </TyperContainer>
  );
}

const App = () => {
  const [currentWord, setCurrentWord] = useState<number>(0);
  const [currentWordLetter, setCurrentWordLetter] = useState<number>(0);
  const [wordList, setWordlist] = useState<string[]>([]);
  const [completedWordsList, setCompletedWordsList] = useState<string[]>([]);
  const [typedLetters, setTypedLetters] = useState<string[]>([]);
  const [extraLetters, setExtraLetters] = useState<string[]>([]);

  useEffect(() => {
    const words: string[] = wordsJson;
    setWordlist(words);
  }, [wordList]);

  useEffect(() => {
		document.onkeydown = (e) => {
      if (e.key == "Escape") {
        console.log(`Typed letters: ${typedLetters}`);
        console.log(`Current word index: ${currentWord}`);
        console.log(`Current word letter index: ${currentWordLetter}`);
        console.log(`Completed words: ${completedWordsList}`);
        console.log(`Extra letters: ${extraLetters}`);
        return;
      }

      if (["Shift", "Control", "Alt"].includes(e.key)) {
        return;
      }

      if (e.key == " ") {
        const activeWord = wordList[currentWord];

        if (typedLetters.join("") == activeWord) {
          console.log(`"${activeWord}" typed correctly.`)
          setCompletedWordsList(completedWordsList => [...completedWordsList, activeWord]);
          setCurrentWord(currentWord + 1);
          setCurrentWordLetter(0);
          setTypedLetters([]);
          setExtraLetters([]);
          return;
        }
        console.log("not correct")
        return;
      }

      if (e.key == "Backspace") {
        if (typedLetters.length == 0 || currentWordLetter == 0) return;

        if (currentWordLetter == typedLetters.length) {
          setCurrentWordLetter(currentWordLetter - 1);
        }
        setTypedLetters(typedLetters => typedLetters.splice(-1));
        const extras = typedLetters.slice(wordList[currentWord].length, typedLetters.length);
        setExtraLetters(extraLetters => [...extraLetters, ...extras]);
        return;
      }

      if (currentWordLetter < wordList[currentWord].length) {
        setCurrentWordLetter(currentWordLetter + 1);
      }
      setTypedLetters(typedLetters => [...typedLetters, e.key]);
      const extras = typedLetters.slice(wordList[currentWord].length, typedLetters.length);
      setExtraLetters(extras);
		};
		return () => {
			document.onkeydown = null;
		};
	}, [typedLetters, currentWordLetter, currentWord, extraLetters, wordList]);

  return (
    <AppContainer style={{backgroundImage: `url(${Background})`}}>
      <Content>
        <TopBar />
        <TyperComponent 
          wordList = {wordList} 
          currentWord = {currentWord} 
          currentWordLetter = {currentWordLetter}
          typedLetters = {typedLetters}
          completedWordsList = {completedWordsList}
          extraLetters = {extraLetters}
          setTypedLetters = {setTypedLetters}
          />
      </Content>
    </AppContainer>
  );
}

export default App;
