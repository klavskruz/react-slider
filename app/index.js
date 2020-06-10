import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ant from "./ant.svg";


const sliderContent = [
  {
    content: (
      <div className="contentContainer">
        <h1>This is an h1</h1>
        <p>And here is some cool content and stuff</p>
      </div>
    ),
  },
  {
    content: (
      <div className="contentContainer">
        <h2>A little bit smaller this time</h2>
        <button>And a button</button>
        <button>Or two</button>
      </div>
    ),
  },
  {
    content: (
      <div className="contentContainer">
        <h3>How small can we go?</h3>
        <input type="text" placeholder="Mby write a poem here?"></input>
      </div>
    ),
  },
  {
    content: (
      <div className="contentContainer">
        <h4>Is this a header for ants??</h4>
        <img src={ant} alt="Ant" />
      </div>
    ),
  },
  {
    content: (
      <div className="contentContainer">
        <h1>Slide 5</h1>
        <p>And here is some cool content and stuff</p>
      </div>
    ),
  },
  {
    content: (
      <div className="contentContainer">
        <h1>Slide 6</h1>
        <p>And here is some cool content and stuff</p>
      </div>
    ),
  },
  {
    content: (
      <div className="contentContainer">
        <h1>Slide 7</h1>
        <p>And here is some cool content and stuff</p>
      </div>
    ),
  },
  {
    content: (
      <div className="contentContainer">
        <h1>Slide 8</h1>
        <p>And here is some cool content and stuff</p>
      </div>
    ),
  },
];

//ARROW BUTTON COMPONENT
const ArrowButton = (props) => {
  return (
    <div onClick={props.handleClick} className={props.className}>
      {props.icon}
    </div>
  );
};

//SLIDER DISPLAY COMPONENT
const SlideDisplay = (props) => {
  let beginningX;
  let endX;

  const mouseDown = (e) => {
    console.log("Mouse Down", e, e.pageX, e.pageY);
    beginningX = e.pageX;
  };
  const mouseUp = (e) => {
    console.log("Mouse up", e, e.pageX, e.pageY);
    endX = e.pageX;
  };
  const touchStart = (e) => {
    if (e.changedTouches == null) {
      return null;
    } else {
      beginningX = e.changedTouches[0].clientX;
    }
  };
  const touchEnd = (e) => {
    if (e.changedTouches == null) {
      return null;
    } else {
      endX = e.changedTouches[0].pageX;
    }
  };

  const tellDirection = (e) => {
    mouseUp(e);
    touchEnd(e);

    if (beginningX > endX) {
      props.nextSlide();
    } else if (beginningX < endX) {
      props.previousSlide();
    }
  };

  return (
    <div
      className="slideDisplay"
      onMouseDown={(e) => mouseDown(e)}
      onMouseUp={(e) => tellDirection(e)}
      onTouchStart={(e) => touchStart(e)}
      onTouchEnd={(e) => tellDirection(e)}
    >
      {props.content.map((slide, index) => (
        <div
          key={index}
          className={
            index === props.currentIndex ? "activeSlide" : "disabledSlide"
          }
        >
          {slide.content}
        </div>
      ))}
    </div>
  );
};

//PAGINATION

const PageNumber = (props) => {
  const isActive = () => (props.isActive ? "activePage" : "");
  const classes = [isActive(), "PageNumber"].join(" ");
  const handleClick = () => props.changeIndex(props.pageNumber - 1);

  return (
    <div key={props.pageNumber} className={classes} onClick={handleClick}>
      {props.pageNumber}
    </div>
  );
};

const PageList = (props) => {
  return (
    <div className="pageList">
      {props.content.map((slide, index) =>
        index - 3 <= props.currentIndex && index + 3 >= props.currentIndex ? (
          <PageNumber
            changeIndex={props.changeIndex}
            pageNumber={index + 1}
            isActive={index === props.currentIndex}
          />
        ) : null
      )}
    </div>
  );
};

//CAROUSEL COMPONENT

const Carousel = (props) => {
  const [currentIndex, changeCurrentIndex] = useState(0); //Setting a state for the current slide being displayed
  const [contentLength] = useState(props.content.length); //Reads the length of the content file.

  //Definining functions for changing index of the slide being displayed, implementing looping if the last slide is reached.
  const nextSlide = () => {
    if (currentIndex === contentLength - 1) {
      changeCurrentIndex(0);
    } else {
      changeCurrentIndex(currentIndex + 1);
    }
  };

  const previousSlide = () => {
    if (currentIndex === 0) {
      changeCurrentIndex(contentLength - 1);
    } else {
      changeCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="carousel">
      <SlideDisplay
        currentIndex={currentIndex}
        content={props.content}
        nextSlide={nextSlide}
        previousSlide={previousSlide}
      />
      <ArrowButton
        handleClick={previousSlide}
        icon={<i className="arrow left"></i>}
        className="previousButton"
      />
      <ArrowButton
        handleClick={nextSlide}
        icon={<i className="arrow right"></i>}
        className="nextButton"
      />
      <PageList
        changeIndex={changeCurrentIndex}
        content={props.content}
        currentIndex={currentIndex}
      />
    </div>
  );
};

//APP

const App = () => {
  return <Carousel content={sliderContent} slidesPerPage={1} />;
};

ReactDOM.render(
  
    <App />
  ,
  document.getElementById("app")
);
