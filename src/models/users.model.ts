import { model, Schema, addValidators } from 'ottoman';

addValidators({
  phone: (value: any) => {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (value && !value.match(regex)) {
      throw new Error('Phone number is invalid.');
    }
  },
});

// password: password
const userSchema = new Schema({
  id: { type: String, required: true },
  address: String,
  password: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, validator: 'phone' },
});

const User = model('user', userSchema);

export default User;
