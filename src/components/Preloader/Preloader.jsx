import React from 'react';
import styled from 'styled-components';

const Preloader = () => {
  return (
    <PreloaderWrapper>
      <div className="backdrop">
        <div className="loader">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>
    </PreloaderWrapper>
  );
};

const PreloaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: absolute;

  .backdrop {
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .loader {
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
  }

  .dot {
    background: white;
    margin: 5px;
    -webkit-animation-name: loader;
    animation-name: loader;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;
  }

  .dot:nth-child(1) {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  .dot:nth-child(2) {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }
  .dot:nth-child(3) {
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }
  .dot:nth-child(4) {
    -webkit-animation-delay: 0.8s;
    animation-delay: 0.8s;
  }
  .dot:nth-child(5) {
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
  }

  @-webkit-keyframes loader {
    from {
      width: 2px;
      height: 2px;
      border-radius: 1px;
    }
    to {
      width: 20px;
      height: 20px;
      border-radius: 10px;
    }
  }

  @keyframes loader {
    from {
      width: 2px;
      height: 2px;
      border-radius: 1px;
    }
    to {
      width: 20px;
      height: 20px;
      border-radius: 10px;
    }
  }
`;

export default Preloader;
