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


export type DualListProps = {
  title: string,
  searchPlaceholder: string,
  searchIcon: any,
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
  searchPlaceholder: PropTypes.string,
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
    let source = state.sourceList.filter(item => item.value !== item.value);
    let selected = [item, ...state.selectedList];
    state.selectedList = selected;
    state.sourceList = source;
    refresh(state);
  }
  function moveToSourceList(item: IItem) {
    // state.sourceList.push(item)
    // state.selectedList = state.selectedList.filter(item => item.value !== item.value);
    let source = [item, ...state.sourceList];
    let selected = state.selectedList.filter(item => item.value !== item.value);
    state.selectedList = selected;
    state.sourceList = source;
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
            list={state.sourceList.filter(item => item.text.search(search) !== -1)}
            moveOne={moveToSelectedList}
            title={props.sourceListTitle} />
        </Box>
        <Box width={1 / 2}>
          <Box display="flex" justifyContent="center" bgcolor="action.hover">
            <Typography align="center">{props.selectedListTitle}</Typography>
          </Box>
          <DrawList
            list={state.selectedList.filter(item => item.text.search(search) !== -1)}
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


