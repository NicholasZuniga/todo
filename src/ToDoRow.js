import React, {Component} from 'react';

export class ToDoRow extends Component{
    //Features 3 and 4 (also features 5 and 6)
    render = () =>
    <tr>
        <td>
            {this.props.myToDoItem.action}
        </td>
        <td>
            <input type="checkbox" checked={this.props.myToDoItem.done}
            onChange={() => this.props.callback(this.props.myToDoItem)} />
        </td>
    </tr>
        
};