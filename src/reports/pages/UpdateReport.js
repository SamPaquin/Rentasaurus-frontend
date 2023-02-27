import React, { Fragment, useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import LoadingEgg from "../../shared/components/UIElements/LoadingEgg";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/AuthContext";
import "./ReportForm.css";

const UpdateReport = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedReport, setLoadedReport] = useState();
  const reportId = useParams().reportId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      image: {
        value: "",
        isValid: "",
      },
      title: {
        value: "",
        isValid: "",
      },
      street: {
        value: "",
        isValid: "",
      },
      city: {
        value: "",
        isValid: "",
      },
      state: {
        value: "",
        isValid: "",
      },
      zipcode: {
        value: "",
        isValid: "",
      },
      purchaseprice: {
        value: "",
        isValid: "",
      },
      closingcosts: {
        value: "",
        isValid: "",
      },
      downpayment: {
        value: "",
        isValid: "",
      },
      interestrate: {
        value: "",
        isValid: "",
      },
      loanterm: {
        value: "",
        isValid: "",
      },
      grossmonthlyincome: {
        value: "",
        isValid: "",
      },
      propertytaxes: {
        value: "",
        isValid: "",
      },
      insurance: {
        value: "",
        isValid: "",
      },
      otherexpenses: {
        value: "",
        isValid: "",
      },
    },
    false
  );

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/reports/${reportId}`
        );
        setLoadedReport(responseData.report);
        setFormData(
          {
            image: {
              value: responseData.report.image,
              isValid: true,
            },
            title: {
              value: responseData.report.title,
              isValid: true,
            },
            street: {
              value: responseData.report.street,
              isValid: true,
            },
            city: {
              value: responseData.report.city,
              isValid: true,
            },
            state: {
              value: responseData.report.state,
              isValid: true,
            },
            zipcode: {
              value: responseData.report.zipcode,
              isValid: true,
            },
            purchaseprice: {
              value: responseData.report.purchaseprice,
              isValid: true,
            },
            closingcosts: {
              value: responseData.report.closingcosts,
              isValid: true,
            },
            downpayment: {
              value: responseData.report.downpayment,
              isValid: true,
            },
            interestrate: {
              value: responseData.report.interestrate,
              isValid: true,
            },
            loanterm: {
              value: responseData.report.loanterm,
              isValid: true,
            },
            grossmonthlyincome: {
              value: responseData.report.grossmonthlyincome,
              isValid: true,
            },
            propertytaxes: {
              value: responseData.report.propertytaxes,
              isValid: true,
            },
            insurance: {
              value: responseData.report.insurance,
              isValid: true,
            },
            otherexpenses: {
              value: responseData.report.otherexpenses,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchReport();
  }, [sendRequest, reportId, setFormData]);

  const reportUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/reports/${reportId}`,
        "PATCH",
        JSON.stringify({
          image: formState.inputs.image.value,
          title: formState.inputs.title.value,
          street: formState.inputs.street.value,
          city: formState.inputs.city.value,
          state: formState.inputs.state.value,
          zipcode: formState.inputs.zipcode.value,
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
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingEgg />
      </div>
    );
  }

  if (!loadedReport && !error) {
    return (
      <div className="center">
        <div>
          <h2>Could not find the report!</h2>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingEgg asOverlay />}
      {!isLoading && loadedReport && (
        <form className="report-form" onSubmit={reportUpdateSubmitHandler}>
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
              initialValue={loadedReport.title}
            />
            <Input
              id="street"
              element="input"
              type="text"
              label="Street Address"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a street address."
              onInput={inputHandler}
              initialValue={loadedReport.street}
            />
            <Input
              id="city"
              element="input"
              type="text"
              label="City"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a city."
              onInput={inputHandler}
              initialValue={loadedReport.city}
            />
            <Input
              id="state"
              element="input"
              type="text"
              label="State"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a state."
              onInput={inputHandler}
              initialValue={loadedReport.state}
            />
            <Input
              id="zipcode"
              element="input"
              type="text"
              label="Zip Code"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a zipcode."
              onInput={inputHandler}
              initialValue={loadedReport.zipcode}
            />
            <Input
              id="image"
              element="input"
              type="text"
              label="Property Image URL"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a property image url."
              onInput={inputHandler}
              initialValue={loadedReport.image}
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
              initialValue={loadedReport.purchaseprice}
            />
            <Input
              id="closingcosts"
              element="input"
              type="text"
              label="Closing Costs"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter the closing costs."
              onInput={inputHandler}
              initialValue={loadedReport.closingcosts}
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
              initialValue={loadedReport.downpayment}
            />
            <Input
              id="interestrate"
              element="input"
              type="number"
              label="Interest Rate"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter the interest rate."
              onInput={inputHandler}
              initialValue={loadedReport.interestrate}
            />
            <Input
              id="loanterm"
              element="input"
              type="number"
              label="Loan Term (years)"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter the loan term."
              onInput={inputHandler}
              initialValue={loadedReport.loanterm}
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
              initialValue={loadedReport.grossmonthlyincome}
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
              initialValue={loadedReport.propertytaxes}
            />
            <Input
              id="insurance"
              element="input"
              type="number"
              label="Insurance"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter the monthly insurance amount."
              onInput={inputHandler}
              initialValue={loadedReport.insurance}
            />
            <Input
              id="otherexpenses"
              element="input"
              type="number"
              label="Other Expenses"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter any other monthly expenses."
              onInput={inputHandler}
              initialValue={loadedReport.otherexpenses}
            />
          </div>
          <Button type="submit">UPDATE REPORT</Button>
        </form>
      )}
    </Fragment>
  );
};

export default UpdateReport;
