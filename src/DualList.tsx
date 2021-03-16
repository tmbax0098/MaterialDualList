import * as React from "react";
import * as PropTypes from "prop-types";
import {
  Button,
  ButtonGroup,
  TextField,
  Box,
  IconButton,
  Collapse,
  Chip
} from "@material-ui/core";
import { IItem } from "./IItem";
import { DrawList } from "./DrawList";
import { Typography } from '@material-ui/core';


function getItems(list: Array<IItem>, selectedList: Array<number>, search: string, selected: boolean) {

  let data = [...list];


  if (search.trim().length > 0) {
    data = list.filter(item => item.text.search(search) !== -1);
  }

  if (selected) {
    return data.filter(item => selectedList.indexOf(item.value) !== -1)
  } else {
    return data.filter(item => selectedList.indexOf(item.value) === -1)
  }

}

export type DualListProps = {
  title: string,
  searchPlaceholder: string,
  searchIcon: any,
  selectedList: Array<number>,
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
  searchIcon: PropTypes.any,
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
  searchPlaceholder: "search item",
  searchIcon: "S",
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
  const [search, setSearch] = React.useState("");
  const [searchFlag, setSearchFlag] = React.useState(false);

  const toggleSearch = () => setSearchFlag(!searchFlag);

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
    state.selectedList.push(item.value);
    refresh(state);
  }
  function moveToSourceList(item: IItem) {
    let index = state.selectedList.indexOf(item.value);
    if (index !== -1) {
      state.selectedList.splice(index, 1);
    }
    refresh(state);

  }
  function unselectAll() {
    state.selectedList = [];
    refresh(state);
  }
  function selectAll() {
    state.selectedList = state.sourceList.map(item => item.value);
    refresh(state);
  }


  React.useEffect(emitChange, [state]);

  return (
    <Box border={1} borderColor="divider">
      <Box display="flex" flexDirection="row" alignItems="center" bgcolor="action.hover" p={1}>
        <Box flexGrow={1}>
          <Typography variant="body1" color="textPrimary">{props.title}</Typography>
        </Box>
        <Box pr={1}>
          <Chip color="primary" label={state.selectedList.length} />
        </Box>
        <Box pr={1}>
          <IconButton size="small" onClick={toggleSearch} color={searchFlag || search.trim() !== "" ? "primary" : "default"}>
            {props.searchIcon}
          </IconButton>
        </Box>
      </Box>
      <Collapse in={searchFlag}>
        <Box pl={1} pr={1} pb={1} bgcolor="action.hover">
          <TextField
            size="small"
            fullWidth
            variant="filled"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={props.searchPlaceholder}
          />
        </Box>
      </Collapse>

      <Box display="flex" flexDirection="row">
        <Box width={1 / 2}>
          <Box display="flex" justifyContent="center" bgcolor="action.hover">
            <Typography align="center">{props.sourceListTitle}</Typography>
          </Box>
          <DrawList
            list={getItems(props.sourceList, state.selectedList, search, false)}
            moveOne={moveToSelectedList}
            title={props.sourceListTitle} />
        </Box>
        <Box width={1 / 2}>
          <Box display="flex" justifyContent="center" bgcolor="action.hover">
            <Typography align="center">{props.selectedListTitle}</Typography>
          </Box>
          <DrawList
            list={getItems(props.sourceList, state.selectedList, search, true)}
            moveOne={moveToSourceList}
            title={props.selectedListTitle} />
        </Box>
      </Box>
      <Box bgcolor="action.hover" borderTop={1} borderColor="divider">
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


