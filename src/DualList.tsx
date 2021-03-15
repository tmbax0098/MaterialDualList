import * as React from "react";

import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText
  CardActions,
  Button,
  ButtonGroup,
  IconButton
} from "@material-ui/core";

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
        margin: 'auto',
    },
    paper: {
        width: 200,
        padding: 1,
        height: 230,
        overflow: 'auto',
    },
    paperFullWidth: {
        width: "100%",
        height: 230,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0, 0),
        width: 40,
        height: 40
    },
  }),
);

export interface IItem {
  text: string,
  value: any
}

export type DualListProps = {
  title: string,
  searchIcon: any,
  avatar: any,
  showSearch: boolean,
  selectedList: Array<IItem>,
  sourceList: Array<IItem>,
  onChange: any,
  sourceListTitle: string,
  selectedListTitle: string
};

export default function DualList(props :DualListProps ) {

  const classes = useStyles();

  const [state, setState] = React.useState({ ...props });

  const toggleSearch = () => setState({ ...state, showSearch: !state.showSearch });

  function refresh(newState={}) {
      setState({ ...state , ...newState });
  }

  function moveToSelectedList (item: IItem) {

    state.sourceList = state.sourceList.filter(item => item.value !== item.value);
    state.selectedList.unshift(item);
    refresh(state);
   }
  function moveToSourceList (item: IItem) {

    state.sourceList.unshift(item)
    state.selectedList = state.selectedList.filter(item => item.value !== item.value);
    refresh(state);

  }

    return (
      <Card className={classes.root}>
        <CardHeader
        {...props}
        action={
          <IconButton aria-label="search" onClick={toggleSearch}>
            {props.searchIcon}
          </IconButton>
        }
      />
        <CardContent>
            <Grid container direction="row">
              <Grid item>
                <DrawList list={props.sourceList} moveOne={moveToSelectedList} />
              </Grid>
              <Grid item>
                <DrawList list={props.selectedList} moveOne={moveToSourceList} />
              </Grid>
            </Grid>
        </CardContent>
        <CardActions>

        </CardActions>
        </Card>
    );
}


export type DrawListProps = {
  list:Array<IItem> ,
  moveOne:any
}

function DrawList(props : DrawListProps) {

  return (
    <List>
      {
        props.list.map((item, index) => (
          <ListItem key={"item_i_" + index}>
              <ListItemText primary={item.text} onClick={()=>props.moveOne(item)} />
          </ListItem>
        ))
      }
    </List>
);
};
