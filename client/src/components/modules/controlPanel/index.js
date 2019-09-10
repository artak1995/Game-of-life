import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { sendStartGameRequest, sendEndGameRequest } from 'redux/actions';
import { Button } from 'antd';
import Modal from 'components/modules/modal';
import Template from './Template';

const PanelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    margin: 0px 5px;
  }
  margin: 20px 0px 30px 0px;
`;

const ControlPanel = ({
  sendStartGameRequest,
  sendEndGameRequest,
  isOpen,
  setIsOpen,
  selected,
  setSelected,
}) => {
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
      <Button shape="round" icon="tool" onClick={() => setIsOpen(true)}>
        Cell Template
      </Button>
      <Modal
        title="Choose a template to place it on the board!"
        isOpen={isOpen}
        onSubmit={() => {
          console.log(selected);
          setIsOpen(false);
        }}
        onCancel={() => setIsOpen(false)}
      >
        <Template selected={selected} setSelected={setSelected} />
      </Modal>
    </PanelContainer>
  );
};

const enhance = compose(
  withState('isOpen', 'setIsOpen', false),
  withState('selected', 'setSelected', ''),
  connect(
    null,
    { sendStartGameRequest, sendEndGameRequest }
  )
);

export default enhance(ControlPanel);
