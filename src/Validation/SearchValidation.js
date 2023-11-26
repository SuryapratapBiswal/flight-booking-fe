import * as yup from "yup";

export const searchFlightSchema = yup.object().shape({
    from_airport: yup.string().required("Please enter your Airport name"),
    to_airport:yup.string().required("Please enter your Airport name"),
    departure_date:yup.string().required("Please enter your departure date"),
    class_type: yup.string().required("Please select your class type"),
})