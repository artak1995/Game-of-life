import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import { sendCellData } from 'redux/actions';
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
    background: ${props => (props.isLive ? props.color : 'blue')};
  }
  cursor: ${props => (props.isLive ? 'default' : 'pointer')};
`;

const CellContainer = ({ cellProps, colIndex, rowIndex, sendCellData, socketColor }) => {
  const { isLive, color } = cellProps;
  return (
    <Cell
      isLive={isLive}
      color={color}
      onClick={() => sendCellData({ col: colIndex, row: rowIndex, isLive, socketColor })}
    />
  );
};

const ColumnContainer = ({ col = [], i, sendCellData, socketColor }) => {
  if (col.length > 0) {
    return (
      <Column>
        {col.map((cellProps, j) => (
          <CellContainer
            cellProps={cellProps}
            colIndex={i}
            rowIndex={j}
            key={j}
            sendCellData={sendCellData}
            socketColor={socketColor}
          />
        ))}
      </Column>
    );
  }
};

const Grid = ({ gameData, sendCellData, socketColor }) => {
  if (gameData.length > 0) {
    return (
      <GridContainer>
        {gameData.map((col, i) => (
          <ColumnContainer
            col={col}
            i={i}
            key={i}
            sendCellData={sendCellData}
            socketColor={socketColor}
          />
        ))}
      </GridContainer>
    );
  }

  return <Empty description={<span>Connecting to server...</span>} />;
};

const enhance = compose(
  connect(
    state => ({
      gameData: state.gameData.grid,
      socketColor: state.socketColor,
    }),
    {
      sendCellData,
    }
  )
);

export default enhance(Grid);
