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
        console.log(item);
        return (
            <MenuItem 
                key={item.key} 
                text={item.value} 
                onClick={handleClick} />
        );
    };

    componentDidMount(){
        if(this.props.selectedItem){
            this.setState({selectedItem: this.props.selectedItem})
        }
    }

    handleItemChange = (item) => {
        console.log(item);
        if(item.key){
            this.setState({ selectedItem: item.key? item.key: item }, this.props.onChange({item: item.key, isSelect: true, key: this.props?.itemKey}));
        }
    };

    render() {
        console.log('STATE', this.state);
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
