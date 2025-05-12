import React, { useState } from "react";
import { InputGroup } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={`${className} w-100`}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 "
          style={{ width: "90%" }}
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

export default ({ items }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown-custom-components"
        className="d-flex justify-content-between align-items-center text-decoration-none bg-white text-black w-100 "
      >
        <span
          className="mx-2 text-decoration-none"
          style={{ color: "#38094d" }}
        >
          ALL USER
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        {items.map((item, index) => (
          <Dropdown.Item key={index} eventKey={index}>
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
