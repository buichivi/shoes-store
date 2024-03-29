import { forwardRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const regexName =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

const CustomerInfo = forwardRef(function CustomerForm(
    { user = {}, onSubmitForm = () => {}, isAccountPage = false },
    ref,
) {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    console.log(user)

    useEffect(() => {
        axios
            .get('https://vapi.vnappmob.com/api/province')
            .then((res) => setProvinces(res.data.results));
        axios
            .get(
                `https://vapi.vnappmob.com/api/province/district/${user?.province?.province_id}`,
            )
            .then((res) => {
                setDistricts(res.data.results);
            });
        axios
            .get(
                `https://vapi.vnappmob.com/api/province/ward/${user?.district?.district_id}`,
            )
            .then((res) => {
                setWards(res.data.results);
            });
    }, [user]);

    const customerInfoForm = useFormik({
        initialValues: {
            customer_name: user?.firstName
                ? user?.firstName + ' ' + user?.lastName
                : '',
            phone_number: user?.phoneNumber ? user?.phoneNumber : '',
            shipping_address: user?.address ? user?.address : '',
            email: user?.email ? user?.email : '',
            province: user?.province ? user?.province : { province_id: -1 },
            district: user?.district ? user?.district : { district_id: -1 },
            ward: user?.ward ? user?.ward : { ward_id: -1 },
        },
        validationSchema: Yup.object({
            customer_name: Yup.string()
                .required('This field is required!')
                .matches(regexName, 'Invalid name'),
            email: Yup.string()
                .required('This field is required!')
                .email('Invalid email customerInfoFormat'),
            phone_number: Yup.string()
                .required('This field is required!')
                .matches(regexPhoneNumber, 'Please enter valid phone number'),
            shipping_address: Yup.string().required('This field is required!'),
            province: Yup.object().shape({
                province_id: Yup.number()
                    .notOneOf([-1], 'Please select a province')
                    .required('Province is required'),
            }),
            district: Yup.object().shape({
                district_id: Yup.number()
                    .notOneOf([-1], 'Please select a province')
                    .required('District is required'),
            }),
            ward: Yup.object().shape({
                ward_id: Yup.number()
                    .notOneOf([-1], 'Please select a province')
                    .required('Ward is required'),
            }),
        }),
        onSubmit: (values) => {
            onSubmitForm({ values });
        },
    });

    const accountInfo = useFormik({
        initialValues: {
            first_name: user?.firstName ? user?.firstName : '',
            last_name: user?.lastName ? user?.lastName : '',
            phone_number: user?.phoneNumber ? user?.phoneNumber : '',
            date_of_birth: user?.dateOfBirth ? user?.dateOfBirth : '',
            shipping_address: user?.address ? user?.address : '',
            province: user?.province ? user?.province : { province_id: -1 },
            district: user?.district ? user?.district : { district_id: -1 },
            ward: user?.ward ? user?.ward : { ward_id: -1 },
        },
        validationSchema: Yup.object({
            first_name: Yup.string()
                .required('This field is required!')
                .matches(regexName, 'Invalid name'),
            last_name: Yup.string()
                .required('This field is required!')
                .matches(regexName, 'Invalid name'),
            phone_number: Yup.string()
                .required('This field is required!')
                .matches(regexPhoneNumber, 'Please enter valid phone number'),
            date_of_birth: Yup.date()
                .required('This field is required!')
                .test('is-adult', 'Must be at least 18 years old', (value) => {
                    const thisYear = new Date().getFullYear();
                    const dobYear = new Date(value).getFullYear();
                    return thisYear - dobYear >= 18;
                }),
            shipping_address: Yup.string().required('This field is required!'),
            province: Yup.object().shape({
                province_id: Yup.number()
                    .notOneOf([-1], 'Please select a province')
                    .required('Province is required'),
            }),
            district: Yup.object().shape({
                district_id: Yup.number()
                    .notOneOf([-1], 'Please select a province')
                    .required('District is required'),
            }),
            ward: Yup.object().shape({
                ward_id: Yup.number()
                    .notOneOf([-1], 'Please select a province')
                    .required('Ward is required'),
            }),
        }),
        onSubmit: (values) => {
            onSubmitForm({ values });
        },
    });

    const handleSelectProvince = (e, form) => {
        const { name } = e.target;
        // provinceErr.current.style.display = 'none';
        const province = provinces.find(
            (province) => province.province_id == e.target.value,
        );
        form.setFieldValue(name, province);
        axios
            .get(
                `https://vapi.vnappmob.com/api/province/district/${e.target.value}`,
            )
            .then((res) => {
                setDistricts(res.data.results);
                form.setFieldValue('district', {
                    district_id: -1,
                    district_name: '--Select district--',
                });
                form.setFieldValue('ward', {
                    ward_id: -1,
                    ward_name: '--Select ward--',
                });
            });
    };

    const handleSelectDistrict = (e, form) => {
        const district = districts.find(
            (district) => district.district_id == e.target.value,
        );
        form.setFieldValue('district', district);
        axios
            .get(
                `https://vapi.vnappmob.com/api/province/ward/${e.target.value}`,
            )
            .then((res) => {
                setWards(res.data.results);
                form.setFieldValue('ward', {
                    ward_id: -1,
                    ward_name: '--Select ward--',
                });
            });
    };

    return (
        <>
            {!isAccountPage ? (
                <form onSubmit={customerInfoForm.handleSubmit}>
                    <div className="flex items-center gap-4 [&>*]:w-full">
                        <div className="pb-2 2xl:pb-8">
                            <div className="flex items-center justify-between pb-2">
                                <label
                                    htmlFor="customer_name"
                                    className="block font-medium 2xl:text-3xl"
                                >
                                    Name
                                </label>
                                {customerInfoForm.errors.customer_name &&
                                    customerInfoForm.touched.customer_name && (
                                        <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                            {
                                                customerInfoForm.errors
                                                    .customer_name
                                            }
                                        </span>
                                    )}
                            </div>
                            <input
                                type="text"
                                name="customer_name"
                                id="customer_name"
                                placeholder="Enter your name"
                                className={`w-full rounded-md
                                border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                                focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                                2xl:p-4 
                                2xl:text-3xl`}
                                value={customerInfoForm.values.customer_name}
                                onChange={customerInfoForm.handleChange}
                                onBlur={customerInfoForm.handleBlur}
                            />
                        </div>
                        <div className="pb-2 2xl:pb-8">
                            <div className="flex items-center justify-between pb-2">
                                <label
                                    htmlFor="phone_number"
                                    className="block font-medium 2xl:text-3xl"
                                >
                                    Phone number
                                </label>
                                {customerInfoForm.errors.phone_number &&
                                    customerInfoForm.touched.phone_number && (
                                        <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                            {
                                                customerInfoForm.errors
                                                    .phone_number
                                            }
                                        </span>
                                    )}
                            </div>
                            <input
                                type="text"
                                name="phone_number"
                                id="phone_number"
                                placeholder="Enter your phone number"
                                className={`w-full rounded-md
                                border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                                focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                                2xl:p-4 2xl:text-3xl`}
                                value={customerInfoForm.values.phone_number}
                                onChange={customerInfoForm.handleChange}
                                onBlur={customerInfoForm.handleBlur}
                            />
                        </div>
                    </div>
                    <div className="pb-2 2xl:pb-8">
                        <div className="flex items-center justify-between pb-2">
                            <label
                                htmlFor="email"
                                className="block font-medium 2xl:text-3xl"
                            >
                                Email
                            </label>
                            {customerInfoForm.errors.email &&
                                customerInfoForm.touched.email && (
                                    <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                        {customerInfoForm.errors.email}
                                    </span>
                                )}
                        </div>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className={`w-full rounded-md
                                border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                                focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                                2xl:p-4 
                                2xl:text-3xl`}
                            value={customerInfoForm.values.email}
                            onChange={customerInfoForm.handleChange}
                            onBlur={customerInfoForm.handleBlur}
                        />
                    </div>

                    <div className="pb-2 2xl:pb-8">
                        <div className="flex items-center justify-between pb-2">
                            <label
                                htmlFor="province"
                                className="block font-medium 2xl:text-3xl"
                            >
                                Province/ City
                            </label>
                            {customerInfoForm.errors?.province?.province_id && (
                                <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                    {
                                        customerInfoForm.errors?.province
                                            ?.province_id
                                    }
                                </span>
                            )}
                        </div>
                        <select
                            name="province"
                            id="province"
                            className={`w-full rounded-md
                        border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                        focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                        2xl:p-4 2xl:text-3xl`}
                            value={
                                customerInfoForm.values.province?.province_id
                            }
                            onChange={(e) =>
                                handleSelectProvince(e, customerInfoForm)
                            }
                        >
                            <option value={-1}>--Select province--</option>
                            {provinces.map((province, index) => (
                                <option
                                    key={index}
                                    value={province.province_id}
                                >
                                    {province.province_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-4 [&>*]:w-full">
                        <div className="pb-2 2xl:pb-8">
                            <div className="flex items-center justify-between pb-2">
                                <label
                                    htmlFor="province"
                                    className="block font-medium 2xl:text-3xl"
                                >
                                    District/ County
                                </label>
                                {customerInfoForm.errors.district
                                    ?.district_id && (
                                    <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                        {
                                            customerInfoForm.errors.district
                                                ?.district_id
                                        }
                                    </span>
                                )}
                            </div>
                            <select
                                name="province"
                                id="province"
                                className={`w-full rounded-md
                            border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                            focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                            2xl:p-4 
                            2xl:text-3xl`}
                                value={
                                    customerInfoForm.values.district
                                        ?.district_id
                                }
                                onChange={(e) =>
                                    handleSelectDistrict(e, customerInfoForm)
                                }
                            >
                                <option value={-1}>--Select district--</option>
                                {districts.map((district, index) => (
                                    <option
                                        key={index}
                                        value={district.district_id}
                                    >
                                        {district.district_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="pb-2 2xl:pb-8">
                            <div className="flex items-center justify-between pb-2">
                                <label
                                    htmlFor="province"
                                    className="block font-medium 2xl:text-3xl"
                                >
                                    Ward/ Commune
                                </label>
                                {customerInfoForm.errors.ward?.ward_id && (
                                    <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                        {customerInfoForm.errors.ward?.ward_id}
                                    </span>
                                )}
                            </div>
                            <select
                                name="province"
                                id="province"
                                className={`w-full rounded-md
                            border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                            focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                            2xl:p-4 
                            2xl:text-3xl`}
                                value={customerInfoForm.values.ward?.ward_id}
                                onChange={(e) => {
                                    const ward = wards.find(
                                        (ward) =>
                                            ward.ward_id == e.target.value,
                                    );
                                    customerInfoForm.setFieldValue(
                                        'ward',
                                        ward,
                                    );
                                }}
                            >
                                <option value={-1}>--Select ward--</option>
                                {wards.map((ward, index) => (
                                    <option key={index} value={ward.ward_id}>
                                        {ward.ward_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="pb-2 2xl:pb-8">
                        <div className="flex items-center justify-between  pb-2">
                            <label
                                htmlFor="shipping_address"
                                className="block font-medium 2xl:text-3xl"
                            >
                                Address
                            </label>
                            {customerInfoForm.errors.shipping_address &&
                                customerInfoForm.touched.shipping_address && (
                                    <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                        {
                                            customerInfoForm.errors
                                                .shipping_address
                                        }
                                    </span>
                                )}
                        </div>
                        <textarea
                            name="shipping_address"
                            value={customerInfoForm.values.shipping_address}
                            onChange={customerInfoForm.handleChange}
                            onBlur={customerInfoForm.handleBlur}
                            placeholder="Address"
                            className="w-full resize-none rounded-md border border-gray-400 px-2 py-1 outline-none 
                    ring-2 ring-transparent focus:border-transparent focus:ring-black"
                            rows={3}
                        ></textarea>
                    </div>
                    <button ref={ref} type="submit" className="hidden">
                        Submit
                    </button>
                </form>
            ) : (
                <form onSubmit={accountInfo.handleSubmit}>
                    <div className="flex items-center gap-4 [&>*]:w-full">
                        <div className="pb-2 2xl:pb-8">
                            <div className="flex items-center justify-between pb-2">
                                <label
                                    htmlFor="first_name"
                                    className="block font-medium 2xl:text-3xl"
                                >
                                    First Name
                                </label>
                                {accountInfo.errors.first_name &&
                                    accountInfo.touched.first_name && (
                                        <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                            {accountInfo.errors.first_name}
                                        </span>
                                    )}
                            </div>
                            <input
                                type="text"
                                name="first_name"
                                id="first_name"
                                placeholder="Enter your name"
                                className={`w-full rounded-md
                                border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                                focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                                2xl:p-4 
                                2xl:text-3xl`}
                                value={accountInfo.values.first_name}
                                onChange={accountInfo.handleChange}
                                onBlur={accountInfo.handleBlur}
                            />
                        </div>
                        <div className="pb-2 2xl:pb-8">
                            <div className="flex items-center justify-between pb-2">
                                <label
                                    htmlFor="last_name"
                                    className="block font-medium 2xl:text-3xl"
                                >
                                    Last name
                                </label>
                                {accountInfo.errors.last_name &&
                                    accountInfo.touched.last_name && (
                                        <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                            {accountInfo.errors.last_name}
                                        </span>
                                    )}
                            </div>
                            <input
                                type="text"
                                name="last_name"
                                id="last_name"
                                placeholder="Enter your phone number"
                                className={`w-full rounded-md
                                border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                                focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                                2xl:p-4 2xl:text-3xl`}
                                value={accountInfo.values.last_name}
                                onChange={accountInfo.handleChange}
                                onBlur={accountInfo.handleBlur}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 pb-2 2xl:pb-8 [&>*]:w-full">
                        <div className="">
                            <div className="flex items-center justify-between pb-2">
                                <label
                                    htmlFor="phone_number"
                                    className="block font-medium 2xl:text-3xl"
                                >
                                    Phone number
                                </label>
                                {accountInfo.errors.phone_number &&
                                    accountInfo.touched.phone_number && (
                                        <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                            {accountInfo.errors.phone_number}
                                        </span>
                                    )}
                            </div>
                            <input
                                type="text"
                                name="phone_number"
                                id="phone_number"
                                placeholder="Enter your phone number"
                                className={`w-full rounded-md
                                    border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                                    focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                                    2xl:p-4 2xl:text-3xl`}
                                value={accountInfo.values.phone_number}
                                onChange={accountInfo.handleChange}
                                onBlur={accountInfo.handleBlur}
                            />
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="date_of_birth"
                                    className="pb-2 font-medium"
                                >
                                    Date of birth
                                </label>
                                {accountInfo.errors.date_of_birth &&
                                    accountInfo.touched.date_of_birth && (
                                        <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                            {accountInfo.errors.date_of_birth}
                                        </span>
                                    )}
                            </div>
                            <input
                                type="date"
                                name="date_of_birth"
                                id="date_of_birth"
                                value={accountInfo.values.date_of_birth}
                                onChange={accountInfo.handleChange}
                                onBlur={accountInfo.handleBlur}
                                className=" w-full rounded-md border border-gray-400 p-2.5 outline-none 
                            ring-2 ring-transparent transition-all focus:border-transparent focus:ring-slate-800
                            2xl:rounded-xl 2xl:p-4 2xl:text-3xl"
                            />
                        </div>
                    </div>
                    <div className="pb-2 2xl:pb-8">
                        <div className="flex items-center justify-between pb-2">
                            <label
                                htmlFor="province"
                                className="block font-medium 2xl:text-3xl"
                            >
                                Province/ City
                            </label>
                            {accountInfo.errors?.province?.province_id && (
                                <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                    {accountInfo.errors?.province?.province_id}
                                </span>
                            )}
                        </div>
                        <select
                            name="province"
                            id="province"
                            className={`w-full rounded-md
                        border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                        focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                        2xl:p-4 2xl:text-3xl`}
                            value={accountInfo.values.province?.province_id}
                            onChange={(e) =>
                                handleSelectProvince(e, accountInfo)
                            }
                        >
                            <option value={-1}>--Select province--</option>
                            {provinces.map((province, index) => (
                                <option
                                    key={index}
                                    value={province.province_id}
                                >
                                    {province.province_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-4 [&>*]:w-full">
                        <div className="pb-2 2xl:pb-8">
                            <div className="flex items-center justify-between pb-2">
                                <label
                                    htmlFor="province"
                                    className="block font-medium 2xl:text-3xl"
                                >
                                    District/ County
                                </label>
                                {accountInfo.errors.district?.district_id && (
                                    <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                        {
                                            accountInfo.errors.district
                                                ?.district_id
                                        }
                                    </span>
                                )}
                            </div>
                            <select
                                name="province"
                                id="province"
                                className={`w-full rounded-md
                            border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                            focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                            2xl:p-4 
                            2xl:text-3xl`}
                                value={accountInfo.values.district?.district_id}
                                onChange={(e) =>
                                    handleSelectDistrict(e, accountInfo)
                                }
                            >
                                <option value={-1}>--Select district--</option>
                                {districts.map((district, index) => (
                                    <option
                                        key={index}
                                        value={district.district_id}
                                    >
                                        {district.district_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="pb-2 2xl:pb-8">
                            <div className="flex items-center justify-between pb-2">
                                <label
                                    htmlFor="province"
                                    className="block font-medium 2xl:text-3xl"
                                >
                                    Ward/ Commune
                                </label>
                                {accountInfo.errors.ward?.ward_id && (
                                    <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                        {accountInfo.errors.ward?.ward_id}
                                    </span>
                                )}
                            </div>
                            <select
                                name="province"
                                id="province"
                                className={`w-full rounded-md
                            border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                            focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                            2xl:p-4 
                            2xl:text-3xl`}
                                value={accountInfo.values.ward?.ward_id}
                                onChange={(e) => {
                                    const ward = wards.find(
                                        (ward) =>
                                            ward.ward_id == e.target.value,
                                    );
                                    accountInfo.setFieldValue('ward', ward);
                                }}
                            >
                                <option value={-1}>--Select ward--</option>
                                {wards.map((ward, index) => (
                                    <option key={index} value={ward.ward_id}>
                                        {ward.ward_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="pb-2 2xl:pb-8">
                        <div className="flex items-center justify-between  pb-2">
                            <label
                                htmlFor="shipping_address"
                                className="block font-medium 2xl:text-3xl"
                            >
                                Address
                            </label>
                            {accountInfo.errors.shipping_address &&
                                accountInfo.touched.shipping_address && (
                                    <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                        {accountInfo.errors.shipping_address}
                                    </span>
                                )}
                        </div>
                        <textarea
                            name="shipping_address"
                            value={accountInfo.values.shipping_address}
                            onChange={accountInfo.handleChange}
                            onBlur={accountInfo.handleBlur}
                            placeholder="Address"
                            className="w-full resize-none rounded-md border border-gray-400 px-2 py-1 outline-none 
                    ring-2 ring-transparent focus:border-transparent focus:ring-black"
                            rows={3}
                        ></textarea>
                    </div>
                    <button ref={ref} type="submit" className="hidden">
                        Submit
                    </button>
                </form>
            )}
        </>
    );
});

CustomerInfo.propTypes = {
    user: PropTypes.object,
    onSubmitForm: PropTypes.func,
    isAccountPage: PropTypes.bool,
};

export default CustomerInfo;
