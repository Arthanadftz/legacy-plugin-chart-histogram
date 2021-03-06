"use strict";

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _histogram = require("@data-ui/histogram");

var _theme = require("@data-ui/theme");

var _legend = require("@vx/legend");

var _scale = require("@vx/scale");

var _core = require("@superset-ui/core");

var _WithLegend = _interopRequireDefault(require("./WithLegend"));

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

/* eslint-disable react/sort-prop-types */
const propTypes = {
  className: _propTypes.default.string,
  data: _propTypes.default.arrayOf(_propTypes.default.shape({
    key: _propTypes.default.string,
    values: _propTypes.default.arrayOf(_propTypes.default.number)
  })).isRequired,
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  colorScheme: _propTypes.default.string,
  normalized: _propTypes.default.bool,
  binCount: _propTypes.default.number,
  opacity: _propTypes.default.number,
  xAxisLabel: _propTypes.default.string,
  yAxisLabel: _propTypes.default.string
};
const defaultProps = {
  binCount: 15,
  className: '',
  colorScheme: '',
  normalized: false,
  opacity: 1,
  xAxisLabel: '',
  yAxisLabel: ''
};

class CustomHistogram extends _react.default.PureComponent {
  render() {
    const {
      className,
      data,
      width,
      height,
      binCount,
      colorScheme,
      normalized,
      opacity,
      xAxisLabel,
      yAxisLabel
    } = this.props;

    const colorFn = _core.CategoricalColorNamespace.getScale(colorScheme);

    const keys = data.map(d => d.key);
    const colorScale = (0, _scale.scaleOrdinal)({
      domain: keys,
      range: keys.map(x => colorFn(x))
    });
    return /*#__PURE__*/_react.default.createElement(_WithLegend.default, {
      className: `superset-legacy-chart-histogram ${className}`,
      width: width,
      height: height,
      position: "top",
      renderLegend: ({
        direction,
        style
      }) => /*#__PURE__*/_react.default.createElement(_legend.LegendOrdinal, {
        style: style,
        scale: colorScale,
        direction: direction,
        shape: "rect",
        labelMargin: "0 15px 0 0"
      }),
      renderChart: parent => /*#__PURE__*/_react.default.createElement(_histogram.Histogram, {
        width: parent.width,
        height: parent.height,
        ariaLabel: "Histogram",
        normalized: normalized,
        binCount: binCount,
        binType: "numeric",
        margin: {
          top: 20,
          right: 20
        },
        renderTooltip: ({
          datum,
          color
        }) => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("strong", {
          style: {
            color
          }
        }, datum.bin0, " to ", datum.bin1), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("strong", null, "count "), datum.count), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("strong", null, "cumulative "), datum.cumulative)),
        valueAccessor: datum => datum,
        theme: _theme.chartTheme
      }, data.map(series => /*#__PURE__*/_react.default.createElement(_histogram.BarSeries, {
        key: series.key,
        animated: true,
        rawData: series.values,
        fill: colorScale(series.key),
        fillOpacity: opacity
      })), /*#__PURE__*/_react.default.createElement(_histogram.XAxis, {
        label: xAxisLabel
      }), /*#__PURE__*/_react.default.createElement(_histogram.YAxis, {
        label: yAxisLabel
      }))
    });
  }

}

CustomHistogram.propTypes = propTypes;
CustomHistogram.defaultProps = defaultProps;

var _default = (0, _core.styled)(CustomHistogram)`
  .superset-legacy-chart-histogram {
    overflow: hidden;
  }
`;

exports.default = _default;