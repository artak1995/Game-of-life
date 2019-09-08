import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import { Empty } from 'antd';

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Column = styled.div`
  display: flex;
  flex-direction: row;
`;

const Cell = styled.div`
  background: ${props => (props.isLive ? props.color : 'white')};
  width: 20px;
  height: 20px;
  border: 1px solid lightgrey;
  :hover {
    background: blue;
  }
`;

const CellContainer = ({ cellProps, j }) => {
  const { isLive, color } = cellProps;
  return <Cell isLive={isLive} color={color} />;
};

const ColumnContainer = ({ col = [], i }) => {
  if (col.length > 0) {
    return (
      <Column>
        {col.map((cellProps, j) => (
          <CellContainer cellProps={cellProps} colIndex={i} rowIndex={j} key={j} />
        ))}
      </Column>
    );
  }
};

const Grid = ({ gameData }) => {
  if (gameData.length > 0) {
    return (
      <GridContainer>
        {gameData.map((col, i) => (
          <ColumnContainer col={col} i={i} key={i} />
        ))}
      </GridContainer>
    );
  }

  return <Empty description={<span>Connecting to server...</span>} />;
};

const enhance = compose(
  connect(state => ({
    gameData: state.gameData,
  }))
);

export default enhance(Grid);
