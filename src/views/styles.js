import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;
`;

export const TitleHeader = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const PasswordField = styled.div`
  display: flex;
  margin-top: 40px;
`;

export const StyledInput = styled.input`
  height: 40px;
  width: 400px;
  padding: 0px 11px;
  text-align: center;
`;

export const ShowPasswordToggle = styled.span`
  margin-left: -40px;
  width: 30px;
  cursor: pointer;
  align-self: center;
  font-size: 10px;
  text-align: center;
`;

export const DescriptionContainer = styled.div`
  width: 400px;
  text-align: center;
`;

export const ScoreContainer = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-top: 30px;
`;

export const GuessTimeContainer = styled.div`
  font-size: 14px;
  margin-top: 20px;
`;

export const SuggestionsContainer = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
`;