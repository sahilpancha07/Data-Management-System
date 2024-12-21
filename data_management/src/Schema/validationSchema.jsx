import * as Yup from "yup";

export default function validationSchema() {
    
     Yup.object({
        no: Yup.string()
          .required("No is required")
          .matches(/^\d+$/, "No must be a number"),
        zone: Yup.string().required("Zone is required"),
        main_member_contact: Yup.string()
          .required("Contact is required")
          .matches(/^\d{10}$/, "Enter a valid 10-digit contact number"),
        address: Yup.string().required("Address is required"),
        economic_position: Yup.string().required("Economic position is required"),
        annual_income: Yup.number()
          .required("Annual income is required")
          .positive("Annual income must be positive"),
        name: Yup.string().required("Name is required"),
        age: Yup.number()
          .required("Age is required")
          .positive("Age must be positive")
          .integer("Age must be an integer"),
        relation: Yup.string().required("Relation is required"),
        xender: Yup.string().required("Gender is required"),
        contact: Yup.string()
          .required("Contact is required")
          .matches(/^\d{10}$/, "Enter a valid 10-digit contact number"),
        education: Yup.string().required("Education is required"),
        marritial_status: Yup.string().required("Marital status is required"),
        job_business: Yup.string().required("Job/Business is required"),
        Physical_handicap_disease: Yup.string().required(
          "Physical handicap/disease is required"
        ),
        blood_grp: Yup.string()
          .required("Blood group is required")
          .matches(/^(A|B|AB|O)[+-]$/, "Enter a valid blood group (e.g., A+, B-)"),
      });

}