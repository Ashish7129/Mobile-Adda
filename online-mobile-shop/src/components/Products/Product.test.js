import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import ProductContainer from "./ProductContainer";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-15";

describe("ProductContainer", () => {
  const mockStore = configureStore();
  describe("interactions", () => {
    let wrapper;
    const state = {};
    beforeEach(() => {
      wrapper = mount(<ProductContainer store={mockStore(state)} />);
    });

    it("renders correctly", () => {
      let wrapper = { state: { products: [] } };
      expect(wrapper.state).toEqual([]);
    });
  });
});
