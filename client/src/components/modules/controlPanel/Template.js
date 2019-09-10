import React from 'react';
import styled from 'styled-components';

const BLINKER = 'blinker';
const GLIDER = 'glider';

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const Pattern = styled.img`
  :hover {
    box-shadow: ${props =>
      props.selected
        ? ' 0px 0px 5px 5px rgba(37,148,245,1)'
        : '0px 3px 12px -2px rgba(0,0,0,0.75)'};
    transform: translate(0px, -2px);
    transition: transform 0.3s;
    transform: ${props => (props.selected ? '' : 'transform(0px, -2px)')};
  }
  box-shadow: ${props => (props.selected ? ' 0px 0px 5px 5px rgba(37,148,245,1)' : '')};
`;

const Template = ({ selected, setSelected }) => (
  <Container>
    <Pattern
      src="blinker.gif"
      selected={selected === BLINKER}
      onClick={() => setSelected(BLINKER)}
    />
    <Pattern src="glider.gif" selected={selected === GLIDER} onClick={() => setSelected(GLIDER)} />
  </Container>
);

export default Template;
