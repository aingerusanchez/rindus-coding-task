export const environment = {
  production: false,
  slug: 'rindus_front_test',
  title: 'Employee Manager',
  employeeForm: {
    name: {
      minChars: 3,
      maxChars: 20,
    },
    position: {
      options: ['Junior', 'Senior', 'Other'],
    },
  },
};
