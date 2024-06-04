import React, {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithPopup,
	UserCredential,
} from 'firebase/auth';
import {toast} from 'react-toastify';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Inputs} from './type';
import googleIcon from 'assets/icon/googleIcon.svg';
import styles from './RegisterPage.module.scss';
import {provider} from 'services/firebaseConfig';
import {useAppDispatch} from 'hooks/reduxHooks';
import {UserActions} from 'store/slices/UserSlice';

const RegisterPage: FC = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: {errors},
	} = useForm<Inputs>();
	const dispatch = useAppDispatch();
	const auth = getAuth();

	const authorize: SubmitHandler<Inputs> = async (data) => {
		await createUserWithEmailAndPassword(auth, data.email, data.password)
			.then(({user}: UserCredential) => {
				dispatch(
					UserActions.setUser({
						email: user.email,
						token: user.refreshToken,
						id: user.uid,
					}),
				);
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	const authorizeGoogle = async () => {
		await signInWithPopup(auth, provider)
			.then(({user}: UserCredential) => {
				dispatch(
					UserActions.setUser({
						email: user.email,
						token: user.refreshToken,
						id: user.uid,
					}),
				);
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	useEffect(() => {
		if (errors.password && errors.password.type === 'minLength') {
			toast.error('Password length must be greater than 5');
		}
	}, [errors]);

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.pageContainer}>
				<div className={styles.backgroundCover}></div>

				<div className={styles.contentContainer}>
					<div className={styles.heading}>
						<h1>Sign Up</h1>
						<p>Create your account within seconds</p>
					</div>

					<form
						className={styles.formContainer}
						onSubmit={handleSubmit(authorize)}>
						<label>Email</label>
						<input
							{...register('email', {required: true})}
							className={
								errors.email ? styles.errorInput : styles.input
							}
							type="email"
							placeholder="your@mail.com"
						/>
						<label>Password</label>
						<input
							{...register('password', {
								required: true,
								minLength: 5,
							})}
							className={
								errors.password
									? styles.errorInput
									: styles.input
							}
							type="password"
							placeholder="Enter your password"
						/>
						<button className={styles.submitButton} type="submit">
							Create an account
						</button>
					</form>

					<p className={styles.navigationLink}>
						Already have an account?
						<Link to="/login">Sign in</Link>
					</p>

					<div className={styles.servicesContainer}>
						<div className={styles.servicesHeading}>
							<div></div>
							<p>Or continue with</p>
							<div></div>
						</div>
						<div
							onClick={authorizeGoogle}
							className={styles.iconContainer}>
							<img src={googleIcon} alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
