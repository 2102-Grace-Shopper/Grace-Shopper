import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const ModalForm = (props) => {
  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Reserve A Time To Visit!</Label>
        <br/>
      </FormGroup>
        <br/>
      <FormGroup>
        <Label for="exampleName">Name</Label>
        <Input
          type="name"
          name="name"
          id="exampleName"
          placeholder="please enter your name"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          placeholder="please enter your email"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleDate">Date</Label>
        <Input
          type="date"
          name="date"
          id="exampleDate"
          placeholder="date placeholder"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleTime">Time</Label>
        <Input
          type="time"
          name="time"
          id="exampleTime"
          placeholder="time placeholder"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Do You Have Any Questions Prior To Your Visit?</Label>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" /> Sign me up for emails about other dogs!
        </Label>
      </FormGroup>
    </Form>
  );
}

export default ModalForm;