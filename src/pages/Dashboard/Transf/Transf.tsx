import { useState, useContext } from 'react';
import { Button, Input } from '../../../components/atoms';
import Dashboard from '../../../components/atoms/Dashboard';
import Modal from '../../../components/atoms/Modal/Index';
import UserContext from '../../../providers/User';
import { getData } from '../../../service/getdata';

export const Transf = () => {
	const [userState, setUserState] = useContext(UserContext);
	const [isActive, setIsActive] = useState(false);
	const [amount, setAmount] = useState('');
	const [password, setPassword] = useState('');
	const [branch, setBranch] = useState('');
	const [account, setAccount] = useState('');

	const handleTransfer = () => {
		const data = {
			origin: {
				branch: userState[0].branch,
				account: userState[0].account_number,
			},
			destination: {
				branch,
				account,
			},
			amount,
			password,
		};

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ data }),
		};

		fetch('http://gcp.dudeful.com:5000/register-transfer', options)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);

				getData(userState[0].cpf).then((data) => {
					data[0].password = userState[0].password;
					setUserState(data);
				});
			})
			.catch((error) => console.error(error));

		setAmount('');
		setPassword('');
		setBranch('');
		setAccount('');
		handleCloseModal();
	};

	const handleCloseModal = () => {
		setIsActive((current) => !current);
	};

	return (
		<div className="bg-body-light-200 dark:bg-body-dark w-sm h-sm flex flex-col justify-start items-center mx-auto min-h-min my-[20px]">
			<Dashboard>Fulano</Dashboard>
			<div className="w-[280px] h-[384] py-[12px] px-[15px] rounded-[8px] bg-white flex flex-col dark:border dark:border-solid dark:border-btn-secondary-base dark:bg-body-dark">
				<div className="flex flex-row gap-[10px]">
					<img src="../src/assets/transj-gold.svg" alt="" />
					<p className="text-header-gold font-medium text-[16px]">
						Transferência
					</p>
				</div>
				<p className="font-normal text-[16px] text-paragraph-dark leading-none mt-[15px] dark:text-btn-text">
					Origem
				</p>
				<div className="flex flex-row mt-[10px] gap-[30px]">
					<div className="flex flex-col">
						<Input
							id="o_branch"
							value={userState[0].branch}
							className={'bg-input-readonly text-input-placeholder'}
						></Input>
						<p className="text-[11px] text-input-inactive font-normal leading-none p-[1px]">
							Agência
						</p>
					</div>
					<div>
						<Input
							id="o_account"
							value={userState[0].account_number}
							className={'bg-input-readonly text-input-placeholder'}
						></Input>
						<p className="text-[11px] text-input-inactive font-normal leading-none p-[1px]">
							Conta
						</p>
					</div>
				</div>
				<p className="font-normal text-[16px] text-paragraph-dark leading-none mt-[15px] dark:text-btn-text">
					Destino
				</p>
				<div className="flex flex-row mt-[10px] gap-[30px] justify-start">
					<div className="flex flex-col">
						<Input
							inputHandler={(e: React.FormEvent<HTMLInputElement>) =>
								setBranch(e.currentTarget.value)
							}
							className={'bg-input-base text-input-text w-[90px]'}
							type={'number'}
						></Input>
						<p className="text-[11px] text-input-inactive font-normal leading-none p-[1px]">
							Agência
						</p>
					</div>
					<div>
						<Input
							inputHandler={(e: React.FormEvent<HTMLInputElement>) =>
								setAccount(e.currentTarget.value)
							}
							className={'bg-input-base text-input-text w-[100px]'}
							type={'text'}
						></Input>
						<p className="text-[11px] text-input-inactive font-normal leading-none p-[1px]">
							Conta
						</p>
					</div>
				</div>
				<div className="mt-[15px]">
					<Input
						value={amount}
						inputHandler={(e: React.FormEvent<HTMLInputElement>) =>
							setAmount(e.currentTarget.value)
						}
						placeholder="Valor"
						type="number"
					></Input>
					<Input
						inputHandler={(e: React.FormEvent<HTMLInputElement>) =>
							setPassword(e.currentTarget.value)
						}
						value={password}
						placeholder="Senha"
						type="password"
						className="mt-[20px]"
					></Input>
					<Button
						className="mt-[15px] bg-btn-primary-base"
						onClick={handleCloseModal}
					>
						Transferir
					</Button>
				</div>
			</div>
			<Modal
				showModal={isActive}
				handleClose={handleCloseModal}
				handleConfirm={handleTransfer}
			></Modal>
		</div>
	);
};
