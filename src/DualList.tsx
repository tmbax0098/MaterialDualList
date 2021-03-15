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
  TextField,
  Box,
  CardActions
} from "@material-ui/core";

import { createStyles, makeStyles , Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme : Theme) =>
  createStyles({
      root: {
    },
    list: {
      height: 200,
      overflow  : "auto"
    },
    cardHeader: {
      margin: 0,
      padding: 5,
      paddingBottom : 0,
      backgroundColor : theme.palette.action.hover
    },
    cardContent: {
      margin: 0,
      padding : 0,
    },
    listItem: {
      cursor : "pointer"
    },
    listSubHeader: {
      fontSize: "small",
      fontWeight: "bold",
      textAlign :"center",
       backgroundColor : theme.palette.action.hover
    },
    listItemPrimaryText: {
      fontSize : "small"
    }
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
    state.selectedList.push(item);
    refresh(state);
   }
  function moveToSourceList (item: IItem) {

    state.sourceList.push(item)
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
          className={classes.cardHeader}
          action={
          <Box p={1}>
            <Badge badgeContent={state.selectedList.length} color="primary" />
          </Box>
        }
          subheader={
            <TextField
                size="small"
                fullWidth
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
        <CardContent className={classes.cardContent}>
            <Grid container direction="row">
              <Grid xs={12} sm={6} item>
                <DrawList
                  list={state.sourceList}
                  moveOne={moveToSelectedList}
                  title={props.sourceListTitle} />
              </Grid>
              <Grid xs={12} sm={6} item>
                <DrawList
                  list={state.selectedList}
                  moveOne={moveToSourceList}
                  title={props.selectedListTitle} />
              </Grid>
            </Grid>
        </CardContent>
        <CardActions>
                <ButtonGroup fullWidth variant="text" color="default" size="small">
                  <Button onClick={unselectAll}>
                    {props.buttonUnselectAllText}
                  </Button>
                  <Button onClick={selectAll}>
                    {props.buttonSelectAllText}
                  </Button>
                </ButtonGroup>
        </CardActions>
        </Card>
    );
}


type DrawListProps = {
  list:Array<IItem> ,
  moveOne: any,
  title : string
}

function DrawList(props : DrawListProps) {

  const classes = useStyles();

  return (
    <List dense className={classes.list}>
      <ListSubheader className={classes.listSubHeader}>{props.title}</ListSubheader>
      {
        props.list.map((item, index) => (
          <ListItem key={"item_i_" + index} className={classes.listItem}>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                className:classes.listItemPrimaryText
              }}
              onClick={() => props.moveOne(item)} />
          </ListItem>
        ))
      }
    </List>
);
};
