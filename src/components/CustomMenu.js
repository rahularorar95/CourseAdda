import React, { Component } from "react"
import FormControl from 'react-bootstrap/FormControl'
export class CustomMenu extends Component {
    state = { value: '' };
    handleChange=(e)=> {
      this.setState({ value: e.target.value.toLowerCase().trim() });
    }
  
    render() {
      const {
        children,
        style,
        className,
        'aria-labelledby': labeledBy,
      } = this.props;
  
      const { value } = this.state;
  
      return (
        <div style={style} className={className} aria-labelledby={labeledBy}>
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to search subjects..."
            onChange={this.handleChange}
            value={value}
          /> 
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              child =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    }
  }

  export default CustomMenu