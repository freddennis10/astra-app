"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const DEFAULT_ANIMATE_TIME = 300;
const styles = _reactNative.StyleSheet.create({
  emptyOverlay: {
    backgroundColor: 'transparent',
    height: 0,
    position: 'absolute',
    width: 0
  },
  fullOverlay: {
    backgroundColor: 'transparent',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  }
});
const Overlay = _ref => {
  let {
    visible,
    children
  } = _ref;
  const [fadeAnim] = React.useState(new _reactNative.Animated.Value(0));
  const [overlayStyle, setOverlayStyle] = React.useState(styles.emptyOverlay);
  const onAnimatedEnd = React.useCallback(() => {
    if (!visible) {
      setOverlayStyle(styles.emptyOverlay);
    }
  }, [visible]);
  React.useEffect(() => {
    if (visible) {
      setOverlayStyle(styles.fullOverlay);
    }
    return _reactNative.Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: DEFAULT_ANIMATE_TIME,
      useNativeDriver: false
    }).start(onAnimatedEnd);
  }, [visible, fadeAnim, onAnimatedEnd]);
  return /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [overlayStyle, {
      opacity: fadeAnim
    }]
  }, children);
};
var _default = Overlay;
exports.default = _default;
//# sourceMappingURL=Overlay.js.map