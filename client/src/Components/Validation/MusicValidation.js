import * as yup from "yup";

const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Comment is required")
    .max(150, "Comment should be less than 150 characters"),
  rating: yup.number().required("Select a rating"),
});

const musicValidation = yup.object().shape({
  name: yup
    .string()
    .required("Please enter a music name")
    .max(50, "Music name should be less than 50 characters"),
  time: yup.number().required("Please enter a music duration"),
  language: yup.string().required("Please enter a music language"),
  year: yup.number().required("Please enter year of release"),
  category: yup.string().required("Please select music category"),
  desc: yup
    .string()
    .required("Please enter a music description")
    .max(300, "Music description should be less than 300 characters"),
});

export { ReviewValidation, musicValidation };
