import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingEgg from "../../shared/components/UIElements/LoadingEgg";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/AuthContext";
import "./ExistingReport.css";

const ExistingReport = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedReport, setLoadedReport] = useState();
  const reportId = useParams().reportId;

  let reportData;

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/reports/${reportId}`
        );
        setLoadedReport(responseData.report);
        reportData(
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
  }, [sendRequest, reportId, reportData]);

  const MonthlyInterestRate = () => {
    return loadedReport.interestrate / 100 / 12;
  };

  const TotalPaymentCount = () => {
    return loadedReport.loanterm * 12;
  };

  const LoanAmount = () => {
    return (
      loadedReport.purchaseprice +
      loadedReport.closingcosts -
      loadedReport.downpayment
    );
  };

  const MonthlyPayment = () => {
    let monthlyPayment = (
      LoanAmount() *
      ((MonthlyInterestRate() *
        (1 + MonthlyInterestRate()) ** TotalPaymentCount()) /
        ((1 + MonthlyInterestRate()) ** TotalPaymentCount() - 1))
    ).toFixed(2);

    if (isNaN(monthlyPayment))
    {
      return 0;
    }

    return monthlyPayment;
  };

  const Expenses = () => {
    return (
      loadedReport.propertytaxes +
      loadedReport.insurance +
      loadedReport.otherexpenses
    );
  };

  const TotalExpenses = () => {
    return (+MonthlyPayment() + +Expenses()).toFixed(2);
  };

  const CashFlow = () => {
    return (loadedReport.grossmonthlyincome - +TotalExpenses()).toFixed(2);
  };

  const CashOnCashReturn = () => {
    return (((+CashFlow() * 12) / loadedReport.downpayment) * 100).toFixed(2);
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
      <div className="existing-report">
        {isLoading && <LoadingEgg asOverlay />}
        {!isLoading && loadedReport && auth.isLoggedIn && (
          <div className="report">
            <div className="title">
              <div className="property-info">
                <h2>{loadedReport.title}</h2>
                <h3 className="address">
                  <div>{loadedReport.street}</div>
                  {loadedReport.city}, {loadedReport.state}{" "}
                  {loadedReport.zipcode}
                </h3>
                <Button to={`/reports/edit/${reportId}`}>UPDATE REPORT</Button>
                <div className="quick-stats">
                  <div className="quick-stats-title">
                    <h4>Quick Stats</h4>
                    <div className="decor" />
                  </div>
                  <div>
                    <label>Monthly Cash Flow: </label> ${CashFlow()}
                  </div>
                  <div>
                    <label>COC ROI: </label> {CashOnCashReturn()}%
                  </div>
                  <div>
                    <label>Cash to Close: </label> $
                    {loadedReport.downpayment.toFixed(2)}
                  </div>
                  <div>
                    <label>Rental Income: </label> $
                    {loadedReport.grossmonthlyincome.toFixed(2)}
                  </div>
                  <div>
                    <label>Total Expenses: </label> ${TotalExpenses()}
                  </div>
                </div>
              </div>
              <div className="title-image">
                <img src={loadedReport.image} alt={loadedReport.title} />
              </div>
            </div>
            <div className="summary">
              <div className="summary-title">
                <h4>Summary</h4>
                <div className="decor" />
              </div>
              <div className="summary-content">
                <div className="loan-details">
                  <h5>Loan Details</h5>
                  <div>
                    <label>Purchase Price: </label> $
                    {loadedReport.purchaseprice.toFixed(2)}
                  </div>
                  <div>
                    <label>Closing Costs: </label> $
                    {loadedReport.closingcosts.toFixed(2)}
                  </div>
                  <div>
                    <label>Down Payment: </label> $
                    {loadedReport.downpayment.toFixed(2)}
                  </div>
                  <div>
                    <label>Interest Rate: </label>{" "}
                    {loadedReport.interestrate.toFixed(3)}%
                  </div>
                  <div>
                    <label>Loan Term: </label>{" "}
                    {Math.round(loadedReport.loanterm)} Years
                  </div>
                </div>
                <div className="income-and-expenses">
                  <h5>Income &amp; Expenses</h5>
                  <div>
                    <label>Rental Income: </label> $
                    {loadedReport.grossmonthlyincome.toFixed(2)}
                  </div>
                  <div>
                    <label>Mortgage Payment: </label> ${MonthlyPayment()}
                  </div>
                  <div>
                    <label>Property Taxes: </label> $
                    {loadedReport.propertytaxes.toFixed(2)}
                  </div>
                  <div>
                    <label>Insurance: </label> $
                    {loadedReport.insurance.toFixed(2)}
                  </div>
                  <div>
                    <label>Other Expenses: </label> $
                    {loadedReport.otherexpenses.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ExistingReport;
