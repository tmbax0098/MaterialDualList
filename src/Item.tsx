import * as React from 'react';
import * as PropTypes from "prop-types";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemText
} from "@material-ui/core";


const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      cursor: "pointer"
    },
    listItemPrimaryText: {
      fontSize: "small"
    }
  }),
);


export type ItemProps = {
  onClick: any,
  text: string
};

export function Item(props: ItemProps) {


  const classes = useStyles();

  return (<ListItem className={classes.listItem}>
    <ListItemText
      primary={props.text}
      primaryTypographyProps={{
        className: classes.listItemPrimaryText
      }}
      onClick={props.onClick} />
  </ListItem>);
}


Item.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string
};
Item.defaultProps = {
  onClick: () => {
  },
  text: ""
}
