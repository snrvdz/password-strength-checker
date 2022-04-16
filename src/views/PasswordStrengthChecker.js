import { useEffect, useState } from "react";
import axios from 'axios';
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;
`;

const TitleHeader = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const PasswordField = styled.div`
  display: flex;
  margin-top: 40px;
`;

const StyledInput = styled.input`
  height: 40px;
  width: 400px;
  padding: 0px 11px;
  text-align: center;
`;

const ShowPasswordToggle = styled.span`
  margin-left: -40px;
  width: 30px;
  cursor: pointer;
  align-self: center;
  font-size: 10px;
  text-align: center;
`;

const DescriptionContainer = styled.div`
  width: 400px;
  text-align: center;
`;

const ScoreContainer = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-top: 30px;
`;

const GuessTimeContainer = styled.div`
  font-size: 14px;
  margin-top: 20px;
`;

const SuggestionsContainer = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
`;

const strengths = [
  'very weak',
  'weak',
  'medium',
  'strong',
  'very strong',
];

const PasswordStrengthChecker = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordString, setPasswordString] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({});

  // delays call until user is finish typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      checkPasswordStrength(passwordString)
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [passwordString]);

  // api call here
  const checkPasswordStrength = (password) => {
    if (password === '') setPasswordStrength({});
    const requestBody = { password };
    axios.post('https://o9etf82346.execute-api.us-east-1.amazonaws.com/staging/password/strength', requestBody)
      .then(response => setPasswordStrength(response.data));
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
