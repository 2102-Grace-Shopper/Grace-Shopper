import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const ModalForm = (props) => {
  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Reserve A Time To Visit!</Label>
        <Input plaintext value="Some plain text/ static value" />
      </FormGroup>
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
        <Label for="exampleNumber">Number</Label>
        <Input
          type="number"
          name="number"
          id="exampleNumber"
          placeholder="please enter your phone number"
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