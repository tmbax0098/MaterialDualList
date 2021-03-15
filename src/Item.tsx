import * as React from 'react';
import * as PropTypes from "prop-types";
import {Checkbox, ListItem, Typography} from "@material-ui/core";

export type ItemProps = {
  onClick: any,
  checked: boolean,
  text: string
};

export function Item(props: ItemProps) {
  return (
    <ListItem dense onClick={props.onClick} button>
      <Checkbox
        style={{padding: 3}}
        size={"small"}
        edge="start"
        checked={props.checked}
        tabIndex={-1}
        disableRipple
      />
      <Typography variant={"caption"}>{props.text}</Typography>
    </ListItem>
  )
}

Item.propTypes = {
  onClick: PropTypes.func,
  checked: PropTypes.any,
  text: PropTypes.string
};
Item.defaultProps = {
  onClick: () => {
  },
  checked: false,
  text: ""
}
