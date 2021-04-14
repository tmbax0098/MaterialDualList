import * as React from "react";
import * as PropTypes from "prop-types";
import {
  Button,
  ButtonGroup,
  TextField,
  Box,
  Collapse,
  Chip,
  Typography,
  Tabs,
  Tab,
  Divider
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IItem } from "./IItem";
import { DrawList } from "./DrawList";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tab: {
      fontSize: "small",
      fontWeight: "bold",
      textAlign: "center",
      align: "center",
      textTransform: 'none'
    },
    listHeaderBox: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "action.hover"
    },
    button: {
      textTransform: 'none'
    },
    boxTextField: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      backgroundColor: "action.hover"
    },
    listBox: {
      minHeight: 200,
      height: 200,
      overflow: "auto"
    }
  }),
);

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
  borderWidth: number,
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
  borderWidth: PropTypes.number,
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
  borderWidth: 1,
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

  const classes = useStyles();

  const [selectedList, setSelectedList] = React.useState<Array<number>>(props.selectedList);
  const [search, setSearch] = React.useState("");
  const [searchFlag, setSearchFlag] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const toggleSearch = () => setSearchFlag(!searchFlag);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    event.preventDefault();
  };
  function emitChange() {
    if (JSON.stringify(selectedList) !== JSON.stringify(props.selectedList)) {
      if (typeof props.onChange === "function") {
        props.onChange(selectedList);
      }
    }
  }
  function refresh(newState: Array<number> = []) {
    setSelectedList([...newState]);
  };
  function moveToSelectedList(item: IItem) {
    selectedList.push(item.value);
    refresh(selectedList);
  };
  function moveToSourceList(item: IItem) {
    let index = selectedList.indexOf(item.value);
    if (index !== -1) {
      selectedList.splice(index, 1);
    }
    refresh(selectedList);
  }
  function unselectAll() {
    refresh([]);
    setValue(0);
  }
  function selectAll() {
    refresh(props.sourceList.map(item => item.value));
    setValue(1);
  }


  React.useEffect(emitChange, [selectedList]);

  return (
    <Box border={props.borderWidth} borderColor="divider">
      <Box display="flex" flexDirection="row" alignItems="center" bgcolor="action.hover" p={1}>
        <Box flexGrow={1}>
          <Typography variant="body1" color="textPrimary">{props.title}</Typography>
        </Box>
        <Box>
          <ButtonGroup
            fullWidth
            variant="text"
            color="default"
            size="small">
            <Button className={classes.button} onClick={toggleSearch} color={searchFlag || search.trim() !== "" ? "primary" : "default"}>
              {props.searchIcon}
            </Button>
            <Button className={classes.button} >
              <Chip color="primary" label={selectedList.length} />
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <Collapse in={searchFlag}>
        <Box className={classes.boxTextField} bgcolor="action.hover">
          <TextField
            fullWidth
            size="small"
            variant="filled"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={props.searchPlaceholder}
          />
        </Box>
      </Collapse>
      <Collapse in={!searchFlag}>
        <Divider />
      </Collapse>
      <Box bgcolor="action.hover">
        <Tabs
          value={value}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab label={props.sourceListTitle} className={classes.tab} disableFocusRipple disableRipple disableTouchRipple />
          <Tab label={props.selectedListTitle} className={classes.tab} disableFocusRipple disableRipple disableTouchRipple />
        </Tabs>
      </Box>
      <Collapse in={!searchFlag}>
        <Divider />
      </Collapse>
      {
        value === 0 ?
          <DrawList
            list={getItems(props.sourceList, selectedList, search, false)}
            moveOne={moveToSelectedList}
            title={props.sourceListTitle} /> :
          <DrawList
            list={getItems(props.sourceList, selectedList, search, true)}
            moveOne={moveToSourceList}
            title={props.selectedListTitle} />
      }

      <Box borderTop={1} borderColor="divider" bgcolor="action.hover">
        <ButtonGroup
          fullWidth
          variant="text"
          color="inherit"
          size="small">
          <Button className={classes.button} onClick={unselectAll}>
            {props.buttonUnselectAllText}
          </Button>
          <Button className={classes.button} onClick={selectAll}>
            {props.buttonSelectAllText}
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
