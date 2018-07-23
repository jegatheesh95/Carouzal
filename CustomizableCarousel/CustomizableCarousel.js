import React from 'react';
import PropTypes from 'prop-types';

import './CustomizableCarousel.scss';

export default class CustmizableCarousel extends React.Component {
  constructor() {
    super();
    this.state = {
      showLeftArrow: false,
      showRightArrow: true
    };
    this.scrollContainer = React.createRef();
    this.leftArrow = React.createRef();
    this.rightArrow = React.createRef();
  }

  componentDidMount() {
    this.setArrowVisibility();
  }

  setArrowVisibility = () => {
    let child;
    let i;
    const { firstChild, scrollLeft, offsetWidth } = this.scrollContainer.current;
    const childMargin = parseInt(window.getComputedStyle(firstChild).marginLeft.replace(/px/g,''), 10) +
                        parseInt(window.getComputedStyle(firstChild).marginRight.replace(/px/g,''), 10);
    const childWidth = firstChild.offsetWidth;
    const childWidthWithMarigin = childMargin + childWidth;
    const scrollWidth = childWidthWithMarigin * this.props.childrenArray.length;
    const scrollRight = scrollWidth - (scrollLeft + offsetWidth);
    const leftChild = scrollLeft / childWidthWithMarigin;
    const rightChild = scrollRight / childWidthWithMarigin;
    if (scrollLeft === 0 && this.state.showLeftArrow) {
      this.setState({
        showLeftArrow: false
      });
    }
    if (scrollLeft !== 0 && !this.state.showLeftArrow) {
      this.setState({
        showLeftArrow: true
      });
    }
    if (scrollRight === 0 && this.state.showRightArrow) {
      this.setState({
        showRightArrow: false
      });
    }
    if (scrollRight !== 0 && !this.state.showRightArrow) {
      this.setState({
        showRightArrow: true
      });
    }
    child = firstChild;
    // for (i = 1; i < (this.props.childrenArray.length - Math.floor(rightChild)); i += 1) {
    //   if (i === Math.ceil(leftChild)) {
    //     child.style.opacity = (Math.ceil(leftChild) - leftChild);
    //     child.style.boxShadow = (Math.ceil(leftChild) - leftChild) > 0.75 ? '0 8px 20px 0 rgba(37, 56, 88, 0.8)' : 'none';
    //   } else {
    //     child.style.opacity = 1;
    //     child.style.boxShadow = '0 8px 20px 0 rgba(37, 56, 88, 0.8)';
    //   }
    //   child = child.nextSibling;
    // }
    // child.style.opacity = Math.ceil(rightChild) !== 0 ? (Math.ceil(rightChild) - rightChild) : 1;
    // child.style.boxShadow = (Math.ceil(rightChild) - rightChild) > 0.75 || (Math.ceil(rightChild) - rightChild) === 0 ? '0 8px 20px 0 rgba(37, 56, 88, 0.8)' : 'none';
  }

  render() {
    const { childrenArray } = this.props;
    const { showLeftArrow, showRightArrow } = this.state;
    return (
      <div className="col-sm-12 tab-body">
        {showLeftArrow && false &&
          <div className="left-arrow-container" ref={this.leftArrow}>
            <div className="left-arrow">
              <i className="fa fa-arrow-left" />
            </div>
          </div>}
        {showRightArrow && false &&
          <div className="right-arrow-container" ref={this.rightArrow}>
            <div className="right-arrow">
              <i className="fa fa-arrow-right" />
            </div>
          </div>
        }
        <div className="scroller" onScroll={this.setArrowVisibility} ref={this.scrollContainer}>
          {childrenArray}
        </div>
      </div>
    );
  }
}

CustmizableCarousel.propTypes = {
  childrenArray: PropTypes.array.isRequired
};

