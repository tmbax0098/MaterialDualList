# NAME
> material_multi_select_list
# ABOUT
> This package allows you to select multiple items from a list.
>
> The source list must be in the form of text and value.
# EXAMPLE
_________________________________________


    const list = [{text: "item 1", value: 1}, {text: "item 2", value: 2}, {text: "item 3", value: 3}];

    const [selectedList, setSelectedList] = useState([1 , 3]);

    return (
        <Box p={5}>
            <TransferList
                maximumSelectableItemText={"Maximum selectable item : "},
                buttonCleanAllText={"Clean all"}
                buttonSelectAllText={"Select all"}
                searchBoxPlaceholder={"Search"}
                menuShowAllText={"Show all"}
                menuShowSelectedText={"Show selected"}
                menuShowUnselectedText={"Show unselected"}
                onChange={setSelectedList}
                sourceList={list}
                selectedList={selectedList}
                title={"Multi Select List"}
                chipText={"Selected items"}
                pageSize={5}
                chipIcon={null}
                leftIcon={"<"}
                rightIcon={">"}
                searchIcon={"Search"}
                menuIcon={"Menu"}
                maximumSelectableItem={2}
                readOnly={false}
                searchResetIcon={"Reset"}/>
        </Box>
    );


# Default value of properties
_____________________________________________________
    TransferList.propTypes = {
        maximumSelectableItemText : PropTypes.string ,
        buttonCleanAllText : PropTypes.string,
        buttonSelectAllText : PropTypes.string,
        searchBoxPlaceholder : PropTypes.string,
        menuShowAllText : PropTypes.string,
        menuShowSelectedText : PropTypes.string,
        menuShowUnselectedText : PropTypes.string,
        onChange: PropTypes.func,
        sourceList: PropTypes.array,
        selectedList: PropTypes.array,
        title: PropTypes.string,
        chipText: PropTypes.string,
        pageSize: PropTypes.number,
        chipIcon: PropTypes.any,
        searchIcon: PropTypes.any,
        menuIcon: PropTypes.any,
        rightIcon: PropTypes.any,
        leftIcon: PropTypes.any,
        searchResetIcon: PropTypes.any,
        maximumSelectableItem: PropTypes.number,
        readyOnly: PropTypes.bool
    };
    TransferList.defaultProps = {
        maximumSelectableItemText : "Maximum selectable item : ",
        buttonCleanAllText : "Clean all",
        buttonSelectAllText : "Select all",
        searchBoxPlaceholder : "Search",
        menuShowAllText : "Show all",
        menuShowSelectedText : "Show selected",
        menuShowUnselectedText : "Show unselected",
        onChange: () => [],
        sourceList: [],
        selectedList: [],
        title: "Title",
        chipText: "Selected items",
        pageSize: 5,
        chipIcon: null,
        searchIcon: "S",
        menuIcon: "M",
        rightIcon: ">",
        leftIcon: "<",
        searchResetIcon: "X",
        maximumSelectableItem: -1,
        readyOnly: false
    };

# Properties Example

> You can add the following component as a value to icons property
>
> `searchIcon = { <FontAwesomeIcon icon={faSearch}/> }`
>


# About [onChange]
> To use it, you must add its value as follows
>
> `onChange={newSelectedItemValueList =>{}}`
