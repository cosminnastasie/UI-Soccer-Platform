import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOne: [{Id: '1', Name: 'Jon'}, {Id: '2', Name: 'Dan'}],
            listTwo: [{Id: '3', Name: 'Vivi'}],
            listThree: [{Id: '4', Name: 'Ion'}]
        };
    }

    onDragEnd = (result) => {
        // ... same as before ...
    };

    getItemStyle = (isDragging, draggableStyle) => {
        // ... styles for draggable items ...
    };

    getListStyle = (isDraggingOver) => {
        // ... styles for droppable areas ...
    };

    renderList = (items, listId) => (
        <Droppable droppableId={listId}>
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={this.getListStyle(snapshot.isDraggingOver)}
                >
                    {items.map((item, index) => (
                        <Draggable key={item.Id} draggableId={item.Id} index={index}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={this.getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}
                                >
                                    {item.Name}
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );

    render() {
        return (
          <div className="overview-layout" style={{paddingTop: '100px'}}>

            <DragDropContext onDragEnd={this.onDragEnd}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {this.renderList(this.state.listOne, 'listOne')}
                    {this.renderList(this.state.listTwo, 'listTwo')}
                    {this.renderList(this.state.listThree, 'listThree')}
                </div>
            </DragDropContext>
          </div>
        );
    }
}

export default Playground;
