import * as React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  List,
  ListSubheader
} from "@material-ui/core";
import { Item } from "./Item"
import { IItem } from "./IItem";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      height: 200,
      overflow: "auto"
    },
    listSubHeader: {
      padding: 5,
      fontSize: "small",
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: theme.palette.action.hover
    }
  }),
);

export type DrawListProps = {
  list: Array<IItem>,
  moveOne: any,
  title: string
}

export function DrawList(props: DrawListProps) {

  const classes = useStyles();

  return (
    <List dense className={classes.list}>
      <ListSubheader className={classes.listSubHeader}>{props.title}</ListSubheader>
      {
        props.list.map((item, index) => (
          <Item key={"item_i_" + index} onClick={() => props.moveOne(item)} text={item.text} />
        ))
      }
    </List>
  );
};

DrawList.propTypes = {
  list: PropTypes.array,
  moveOne: PropTypes.func,
  title: PropTypes.string
};
DrawList.propTypes = {
  list: [],
  moveOne: () => [],
  title: ""
};
