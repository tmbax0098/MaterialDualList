import * as React from "react";
import * as PropTypes from "prop-types";

export type ConditionRenderProps = {
  condition: any;
  trueCondition: any;
  falseCondition: any;
};

const ConditionRender: React.FC<ConditionRenderProps> = ({
                                                           condition,
                                                           trueCondition,
                                                           falseCondition,
                                                         }) => {
  return Boolean(condition) ? trueCondition : falseCondition;
};

ConditionRender.propTypes = {
  condition: PropTypes.bool,
  trueCondition: PropTypes.any,
  falseCondition: PropTypes.any,
};

ConditionRender.defaultProps = {
  condition: false,
  trueCondition: null,
  falseCondition: null,
};

export default ConditionRender;
