import * as React from "react";
import { mount } from "enzyme";
import App from "./App";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-15";

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  describe("component", () => {
    let element;

    beforeEach(() => {
      element = <App />;
    });
    it("renders as expected", () => {
      const component = mount(element);
      expect(component).toMatchSnapshot();
    });
  });
});
