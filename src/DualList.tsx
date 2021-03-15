import * as React from "react";
import * as PropTypes from "prop-types";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Badge,
  Button,
  ButtonGroup,
  TextField
} from "@material-ui/core";

import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
      root: {
        minHeight : 200,
    },
  }),
);

export interface IItem {
  text: string,
  value: any
}

export type DualListProps = {
  title: string,
  searchPlaceholder : string,
  avatar: any,
  selectedList: Array<IItem>,
  sourceList: Array<IItem>,
  onChange: any,
  sourceListTitle: string,
  selectedListTitle: string,
  buttonSelectAllText: string,
  buttonUnselectAllText : string,
};

DualList.propTypes = {
  title: PropTypes.string,
  searchPlaceholder : PropTypes.string,
  avatar: PropTypes.any,
  selectedList:PropTypes.array,
  sourceList: PropTypes.array,
  onChange: PropTypes.func,
  sourceListTitle: PropTypes.string,
  selectedListTitle: PropTypes.string,
  buttonSelectAllText: PropTypes.string,
  buttonUnselectAllText : PropTypes.string,
};
DualList.defaultProps = {
  title: "",
  searchPlaceholder : PropTypes.string,
  avatar: null,
  selectedList:[],
  sourceList: [],
  onChange: ()=>[],
  sourceListTitle: "Source list",
  selectedListTitle: "Selected items",
  buttonSelectAllText: "Select all",
  buttonUnselectAllText : "Clear all",
};

export default function DualList(props :DualListProps ) {

  const classes = useStyles();

  const [state, setState] = React.useState({ ...props });
  const [search, setSearch] = React.useState("")

  function emitChange() {
    if (JSON.stringify(state.selectedList) !== JSON.stringify(props.selectedList)) {
      if (typeof props.onChange === "function") {
        props.onChange(state.selectedList);
      }
    }
  }
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
  function unselectAll() {
    state.sourceList = [...state.sourceList, ...state.selectedList];
    state.selectedList = [];
    refresh(state);
  }
  function selectAll() {
    state.selectedList = [...state.sourceList, ...state.selectedList];
    state.sourceList = [];
    refresh(state);
  }


  React.useEffect(emitChange, [state]);

    return (
      <Card className={classes.root}>
        <CardHeader
        {...props}
        action={
          <Badge badgeContent={state.selectedList.length} color="primary" />
        }
          subheader={
            <TextField
              variant="standard"
              value={search}
              onChange={e=>setSearch(e.target.value)}
              placeholder={props.searchPlaceholder}
            />
          }
          subheaderTypographyProps={{
            style : {padding : 2}
          }}
      />
        <CardContent>
            <Grid container direction="column">
              <Grid item>
              <DrawList
                list={props.sourceList}
                moveOne={moveToSelectedList}
                title={props.sourceListTitle} />
            </Grid>
            <Grid item>
              <ButtonGroup fullWidth variant="text" color="default" >
                <Button onClick={unselectAll}>
                  {props.buttonUnselectAllText}
                </Button>
                <Button onClick={selectAll}>
                  {props.buttonSelectAllText}
                </Button>
              </ButtonGroup>
            </Grid>
              <Grid item>
              <DrawList
                list={props.selectedList}
                moveOne={moveToSourceList}
                title={props.selectedListTitle} />
              </Grid>
            </Grid>
        </CardContent>
        </Card>
    );
}


type DrawListProps = {
  list:Array<IItem> ,
  moveOne: any,
  title : string
}

function DrawList(props : DrawListProps) {

  return (
    <List>
      <ListSubheader>{props.title}</ListSubheader>
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
