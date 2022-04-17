import { useEffect, useState } from "react";
import axios from 'axios';
import { strengths } from "../constants.js";
import {
  MainContainer,
  TitleHeader,
  PasswordField,
  StyledInput,
  ShowPasswordToggle,
  DescriptionContainer,
  ScoreContainer,
  GuessTimeContainer,
  SuggestionsContainer
} from './styles.js';

const PasswordStrengthChecker = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordString, setPasswordString] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({});

  // delays call until user is finish typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      checkPasswordStrength(passwordString)
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [passwordString]);

  // api call here
  const checkPasswordStrength = (password) => {
    if (password === '') setPasswordStrength({});
    else {
      const requestBody = { password };
      axios.post('https://o9etf82346.execute-api.us-east-1.amazonaws.com/staging/password/strength', requestBody)
        .then(response => setPasswordStrength(response.data));
    }
  };

  return (
    <MainContainer>
      <TitleHeader>Is your password strong enough?</TitleHeader>
      <PasswordField>
        <StyledInput
          type={showPassword ? 'text' : 'password'}
          placeholder="Type a password"
          onChange={e => setPasswordString(e.target.value)}
        />
        <ShowPasswordToggle onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'HIDE' : 'SHOW'}
        </ShowPasswordToggle>
      </PasswordField>
      {Object.entries(passwordStrength).length > 0 &&
        <>
          <progress
            className={`password strength-${passwordStrength.score + 1 || 0}`}
            value={passwordStrength.score + 1 || 0}
            max={5}
          />
          <DescriptionContainer>
            <ScoreContainer>
              {`Your password is ${strengths[passwordStrength.score] || ''}!`}
            </ScoreContainer>
            <GuessTimeContainer>
              {`It will take ${passwordStrength.guessTimeString || ''} to guess your password. ${passwordStrength.warning || ''}`}
            </GuessTimeContainer>
            {passwordStrength.suggestions &&
              passwordStrength.suggestions.length > 0 &&
              <SuggestionsContainer>{passwordStrength.suggestions.join(' ')}</SuggestionsContainer>
            }
          </DescriptionContainer>
        </>
      }
    </MainContainer>
  );
}

export default PasswordStrengthChecker;
