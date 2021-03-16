# NAME
> MaterialDualList

# ABOUT
> Component view and choose from the list of dual

# EXAMPLE

    const list = [
      { text: "item 1", value: 1 },
      { text: "item 2", value: 2 },
      { text: "item 3", value: 3 },
      { text: "item 4", value: 4 },
      { text: "item 5", value: 5 },
      { text: "item 6", value: 6 },
      { text: "item 7", value: 7 }
    ];

    const [selectedList, setSelectedList] = React.useState([2,3]);

    return (
        <DualList
          searchIcon={<Visibility />}
          title={"Dual list"}
          selectedList={selectedList}
          sourceList={list}
          onChange={setSelectedList}
          searchPlaceholder={"Search item"}
        />
    );


# PROPERTIES

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

# DEFAULT VALUES

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
