import React from "react";
import { Formik } from "formik";

function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  refreshing,
  onRefresh,
  children,
}) {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      refreshing
      onRefresh
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
