import React, { Component } from 'react';
import { MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { Button } from "@blueprintjs/core";

class UISelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null
        };
    }

    renderItem = (item, { handleClick }) => {
        return (
            <MenuItem 
                key={item} 
                text={item} 
                onClick={handleClick} />
        );
    };

    handleItemChange = (item) => {
        this.setState({ selectedItem: item }, this.props.onChange({item, isSelect: true, key: this.props.itemKey}));
    };

    render() {
        var items = this.props.items;
        return (
            <Select
                className='sp-select'
                items={items}
                itemRenderer={this.renderItem}
                onItemSelect={this.handleItemChange}
                filterable={false}
            >
                <Button className="sp-select-btn" text={this.state.selectedItem || `Select ${this.props.itemKey || "item"}`}  rightIcon="double-caret-vertical" />
            </Select>
        );
    }
}

export default UISelect;
