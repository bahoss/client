import React, { Component } from "react";
import { connect } from "react-redux";
import { getData, sendDataChanges } from "../actions";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 200px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  width: 128px;
  border: 1px solid #000;
`;

const Item = styled.div`
  border: 1px solid #000;
  padding: 10px;
  cursor: pointer;
`;

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: #000;
  opacity: ${props => props.opacity};
`;

const InfoBlock = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  & span {
    text-align: center;
  }
`;

const Span = styled.span`
  color: ${props => (props.isLoading ? "red" : "gray")};
  font-weight: bold;
  transition: all 0.5s ease;
`;

class App extends Component {
  componentDidMount() {
    const { getData } = this.props;
    getData();
    setInterval(this.update, 3000);
  }

  handleClick = index => {
    const { data, sendDataChanges } = this.props;
    const updatedData = data;
    if (updatedData[index] === 0) {
      updatedData[index] = 1;
      sendDataChanges(updatedData);
    }
  };

  update = () => {
    const { data, sendDataChanges } = this.props;
    const newData = data.map(item => {
      if (item === 0) {
        return item;
      } else {
        return item - 0.25;
      }
    });
    sendDataChanges(newData);
  };
  render() {
    const { data, isSending, isLoading } = this.props;

    return (
      <>
        <Wrapper>
          {data.map((item, index) => (
            <Item onClick={() => this.handleClick(index)}>
              <Circle opacity={item} index={index}></Circle>
            </Item>
          ))}
        </Wrapper>
        <InfoBlock>
          <Span isLoading={isLoading}>Обновление </Span>
        </InfoBlock>
      </>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
  isSending: state.isSending,
  isLoading: state.isLoading
});

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getData()),
  sendDataChanges: data => dispatch(sendDataChanges(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
