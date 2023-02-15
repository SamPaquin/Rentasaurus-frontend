import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingEgg from "../../shared/components/UIElements/LoadingEgg";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/AuthContext";
import "./ReportForm.css";

const NewReport = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      image: {
        value: "",
        isValid: false,
      },
      title: {
        value: "",
        isValid: false,
      },
      street: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      state: {
        value: "",
        isValid: false,
      },
      zipcode: {
        value: "",
        isValid: false,
      },
      purchaseprice: {
        value: null,
        isValid: false,
      },
      closingcosts: {
        value: null,
        isValid: false,
      },
      downpayment: {
        value: null,
        isValid: false,
      },
      interestrate: {
        value: null,
        isValid: false,
      },
      loanterm: {
        value: null,
        isValid: false,
      },
      grossmonthlyincome: {
        value: null,
        isValid: false,
      },
      propertytaxes: {
        value: null,
        isValid: false,
      },
      insurance: {
        value: null,
        isValid: false,
      },
      otherexpenses: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const reportSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/reports`,
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          street: formState.inputs.street.value,
          city: formState.inputs.city.value,
          state: formState.inputs.state.value,
          zipcode: formState.inputs.zipcode.value,
          image: formState.inputs.image.value,
          purchaseprice: formState.inputs.purchaseprice.value,
          closingcosts: formState.inputs.closingcosts.value,
          downpayment: formState.inputs.downpayment.value,
          interestrate: formState.inputs.interestrate.value,
          loanterm: formState.inputs.loanterm.value,
          grossmonthlyincome: formState.inputs.grossmonthlyincome.value,
          propertytaxes: formState.inputs.propertytaxes.value,
          insurance: formState.inputs.insurance.value,
          otherexpenses: formState.inputs.otherexpenses.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/" + auth.userId + "/reports");
    } catch (err) {
      history.push("/" + auth.userId + "/reports");
    }
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="report-form" onSubmit={reportSubmitHandler}>
        {isLoading && <LoadingEgg asOverlay />}
        <div id="property-info" className="section">
          <h2>Property Information</h2>
          <Input
            id="title"
            element="input"
            type="text"
            label="Property Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a property title."
            onInput={inputHandler}
          />
          <Input
            id="street"
            element="input"
            type="text"
            label="Street Address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a street address."
            onInput={inputHandler}
          />
          <Input
            id="city"
            element="input"
            type="text"
            label="City"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a city."
            onInput={inputHandler}
          />
          <Input
            id="state"
            element="input"
            type="text"
            label="State"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a state."
            onInput={inputHandler}
          />
          <Input
            id="zipcode"
            element="input"
            type="text"
            label="Zip Code"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a zipcode."
            onInput={inputHandler}
          />
          <Input
            id="image"
            element="input"
            type="text"
            label="Property Image URL"
            validators={[VALIDATOR_REQUIRE()]}
            infoText="Right-click any image on the web and select 'Copy Image
                  Address'"
            errorText="Please enter an image URL."
            onInput={inputHandler}
          />
        </div>
        <div id="purchase-info" className="section">
          <h2>Purchase Information</h2>
          <Input
            id="purchaseprice"
            element="input"
            type="text"
            label="Purchase Price"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the purchase price of the home."
            onInput={inputHandler}
          />
          <Input
            id="closingcosts"
            element="input"
            type="text"
            label="Closing Costs"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the closing costs."
            onInput={inputHandler}
          />
        </div>
        <div id="loan-info" className="section">
          <h2>Loan Information</h2>
          <Input
            id="downpayment"
            element="input"
            type="number"
            label="Down Payment (dollars)"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the down payment."
            onInput={inputHandler}
          />
          <Input
            id="interestrate"
            element="input"
            type="number"
            label="Interest Rate"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the interest rate."
            onInput={inputHandler}
          />
          <Input
            id="loanterm"
            element="input"
            type="number"
            label="Loan Term (years)"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the loan term."
            onInput={inputHandler}
          />
        </div>
        <div id="rental-income" className="section">
          <h2>Rental Income</h2>
          <Input
            id="grossmonthlyincome"
            element="input"
            type="number"
            label="Gross Monthly Income"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the gross monthly income."
            onInput={inputHandler}
          />
        </div>
        <div id="monthly-expenses" className="section">
          <h2>Monthly Expenses</h2>
          <Input
            id="propertytaxes"
            element="input"
            type="number"
            label="Property Taxes"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the monthly property tax amount."
            onInput={inputHandler}
          />
          <Input
            id="insurance"
            element="input"
            type="number"
            label="Insurance"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the monthly insurance amount."
            onInput={inputHandler}
          />
          <Input
            id="otherexpenses"
            element="input"
            type="number"
            label="Other Expenses"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter any other monthly expenses."
            onInput={inputHandler}
          />
        </div>
        <Button type="submit" disabled={!formState.isValid}>
          ADD REPORT
        </Button>
      </form>
    </Fragment>
  );
};

export default NewReport;
