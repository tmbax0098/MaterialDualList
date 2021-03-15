import * as React from "react";
import * as PropTypes from "prop-types";
import {
  Badge,
  Button,
  ButtonGroup,
  TextField,
  Box
} from "@material-ui/core";
import { IItem } from "./IItem";
import { DrawList } from "./DrawList";
import { Typography } from '@material-ui/core';


export type DualListProps = {
  title: string,
  searchPlaceholder: string,
  avatar: any,
  selectedList: Array<IItem>,
  sourceList: Array<IItem>,
  onChange: any,
  sourceListTitle: string,
  selectedListTitle: string,
  buttonSelectAllText: string,
  buttonUnselectAllText: string,
};

DualList.propTypes = {
  title: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  avatar: PropTypes.any,
  selectedList: PropTypes.array,
  sourceList: PropTypes.array,
  onChange: PropTypes.func,
  sourceListTitle: PropTypes.string,
  selectedListTitle: PropTypes.string,
  buttonSelectAllText: PropTypes.string,
  buttonUnselectAllText: PropTypes.string,
};
DualList.defaultProps = {
  title: "",
  searchPlaceholder: PropTypes.string,
  avatar: null,
  selectedList: [],
  sourceList: [],
  onChange: () => [],
  sourceListTitle: "Source list",
  selectedListTitle: "Selected items",
  buttonSelectAllText: "Select all",
  buttonUnselectAllText: "Clear all",
};

export default function DualList(props: DualListProps) {

  const [state, setState] = React.useState({ ...props });
  const [search, setSearch] = React.useState("")

  function emitChange() {
    if (JSON.stringify(state.selectedList) !== JSON.stringify(props.selectedList)) {
      if (typeof props.onChange === "function") {
        props.onChange(state.selectedList);
      }
    }
  }
  function refresh(newState = {}) {
    setState({ ...state, ...newState });
  }
  function moveToSelectedList(item: IItem) {

    state.sourceList = state.sourceList.filter(item => item.value !== item.value);
    state.selectedList.push(item);
    refresh(state);
  }
  function moveToSourceList(item: IItem) {

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
    <Box border={1} borderColor="divider">
      <Box display="flex" flexDirection="row" bgcolor="action.hover" p={1}>
        <Box flexGrow={1}>
          <Typography variant="body1" color="textPrimary">{props.title}</Typography>
        </Box>
        <Box>
          <Badge badgeContent={state.selectedList.length} color="primary" />
        </Box>
      </Box>
      <Box pl={1} pr={1}>
        <TextField
          size="small"
          fullWidth
          variant="standard"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={props.searchPlaceholder}
        />
      </Box>
      <Box display="flex" flexDirection="row">
        <Box width={1 / 2}>
          <DrawList
            list={state.sourceList}
            moveOne={moveToSelectedList}
            title={props.sourceListTitle} />
        </Box>
        <Box width={1 / 2}>
          <DrawList
            list={state.selectedList}
            moveOne={moveToSourceList}
            title={props.selectedListTitle} />
        </Box>
      </Box>
      <Box bgcolor="action.hover">
        <ButtonGroup fullWidth variant="text" color="default" size="small">
          <Button onClick={unselectAll}>
            {props.buttonUnselectAllText}
          </Button>
          <Button onClick={selectAll}>
            {props.buttonSelectAllText}
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}


