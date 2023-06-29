import React from 'react';
import { Keyboard, Dimensions, StatusBar } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { ContentLoadingWrapper } from './ContentLoadingWrapper';

interface Props {
  header?: React.ReactNode;
  children: React.ReactNode;
  hiddenStatusBar?: boolean;
  isLoading?: boolean;
  disableTouchableFeedback?: boolean;
}

const FULL_WIDTH = Dimensions.get('screen').width;

const MainContainer: React.FC<Props> = ({
  children,
  header,
  isLoading = false,
  hiddenStatusBar = false,
  disableTouchableFeedback = false
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ContentLoadingWrapper isLoading={isLoading}>
      {!disableTouchableFeedback && (
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          accessible={false}
        >
          <StyledContainer>
            <StatusBar
              barStyle={'dark-content'}
              backgroundColor={isLoading ? 'rgba(0,0,0,0.7)' : 'white'}
              hidden={hiddenStatusBar}
            />
            {header && <HeaderStyled>{header}</HeaderStyled>}
            {children}
          </StyledContainer>
        </TouchableWithoutFeedback>
      )}
      {disableTouchableFeedback && (
        <StyledContainer>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={isLoading ? 'rgba(0,0,0,0.7)' : 'white'}
            hidden={hiddenStatusBar}
          />
          {header && <HeaderStyled>{header}</HeaderStyled>}
          {children}
        </StyledContainer>
      )}
    </ContentLoadingWrapper>
  );
};

export default MainContainer;

const HeaderStyled = styled.View`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
`;

const StyledContainer = styled.View`
  width: ${FULL_WIDTH}px;
  height: 100%;
  background: transparent;
`;
