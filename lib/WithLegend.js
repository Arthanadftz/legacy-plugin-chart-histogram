"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _responsive = require("@vx/responsive");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* eslint-disable react/sort-prop-types, react/jsx-sort-default-props */
const propTypes = {
  className: _propTypes.default.string,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  renderChart: _propTypes.default.func.isRequired,
  renderLegend: _propTypes.default.func.isRequired,
  position: _propTypes.default.oneOf(['top', 'left', 'bottom', 'right']),
  legendJustifyContent: _propTypes.default.oneOf(['center', 'flex-start', 'flex-end'])
};
const defaultProps = {
  className: '',
  width: 'auto',
  height: 'auto',
  position: 'top',
  legendJustifyContent: undefined
};
const LEGEND_STYLE_BASE = {
  display: 'flex',
  flexGrow: 0,
  flexShrink: 0,
  order: -1,
  paddingTop: '5px',
  fontSize: '0.9em'
};
const CHART_STYLE_BASE = {
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 'auto',
  position: 'relative'
};

class WithLegend extends _react.default.Component {
  getContainerDirection() {
    const {
      position
    } = this.props;

    switch (position) {
      case 'left':
        return 'row';

      case 'right':
        return 'row-reverse';

      case 'bottom':
        return 'column-reverse';

      default:
      case 'top':
        return 'column';
    }
  }

  getLegendJustifyContent() {
    const {
      legendJustifyContent,
      position
    } = this.props;

    if (legendJustifyContent) {
      return legendJustifyContent;
    }

    switch (position) {
      case 'left':
        return 'flex-start';

      case 'right':
        return 'flex-start';

      case 'bottom':
        return 'flex-end';

      default:
      case 'top':
        return 'flex-end';
    }
  }

  render() {
    const {
      className,
      width,
      height,
      position,
      renderChart,
      renderLegend
    } = this.props;
    const isHorizontal = position === 'left' || position === 'right';
    const style = {
      display: 'flex',
      flexDirection: this.getContainerDirection()
    };

    if (width) {
      style.width = width;
    }

    if (height) {
      style.height = height;
    }

    const chartStyle = { ...CHART_STYLE_BASE
    };

    if (isHorizontal) {
      chartStyle.width = 0;
    } else {
      chartStyle.height = 0;
    }

    const legendDirection = isHorizontal ? 'column' : 'row';
    const legendStyle = { ...LEGEND_STYLE_BASE,
      flexDirection: legendDirection,
      justifyContent: this.getLegendJustifyContent()
    };
    const legendContainerStyle = {
      flexWrap: 'wrap',
      display: 'flex',
      flexDirection: legendDirection
    };
    return /*#__PURE__*/_react.default.createElement("div", {
      className: `with-legend ${className}`,
      style: style
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "legend-container",
      style: legendStyle
    }, renderLegend({
      // Pass flexDirection for @vx/legend to arrange legend items
      direction: legendDirection,
      style: legendContainerStyle
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "main-container",
      style: chartStyle
    }, /*#__PURE__*/_react.default.createElement(_responsive.ParentSize, null, parent => parent.width > 0 && parent.height > 0 ? // Only render when necessary
    renderChart(parent) : null)));
  }

}

WithLegend.propTypes = propTypes;
WithLegend.defaultProps = defaultProps;
var _default = WithLegend;
exports.default = _default;