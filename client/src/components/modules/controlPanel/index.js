import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { sendStartGameRequest, sendEndGameRequest } from 'redux/actions';
import { Button } from 'antd';

const PanelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    margin: 0px 5px;
  }
  margin-bottom: 30px;
`;

const ControlPanel = ({ sendStartGameRequest, sendEndGameRequest }) => {
  return (
    <PanelContainer>
      <Button
        type="primary"
        shape="round"
        icon="play-circle"
        onClick={() => sendStartGameRequest()}
      >
        Start Game
      </Button>
      <Button type="danger" shape="round" icon="pause-circle" onClick={() => sendEndGameRequest()}>
        End Game
      </Button>
      <Button shape="round" icon="tool">
        Cell Template
      </Button>
    </PanelContainer>
  );
};

const enhance = compose(
  connect(
    null,
    { sendStartGameRequest, sendEndGameRequest }
  )
);

export default enhance(ControlPanel);
