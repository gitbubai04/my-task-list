import Swal, { SweetAlertIcon } from 'sweetalert2';

export class ToastService {
	public title!: string;
	public icon!: SweetAlertIcon;
	public toast: typeof Swal;

	constructor() {
		this.toast = Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 4000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer);
				toast.addEventListener('mouseleave', Swal.resumeTimer);
			}
		});
	}

	public showAlert(): void {
		this.toast.fire({
			icon: this.icon,
			title: this.title
		});
	}

	public static success(msg: string): void {
		const vm = new ToastService();
		vm.icon = 'success';
		vm.title = msg;
		vm.showAlert();
	}

	public static error(msg: string): void {
		const vm = new ToastService();
		vm.icon = 'error';
		vm.title = msg;
		vm.showAlert();
	}

	public static warning(msg: string): void {
		const vm = new ToastService();
		vm.icon = 'warning';
		vm.title = msg;
		vm.showAlert();
	}

	public static info(msg: string): void {
		const vm = new ToastService();
		vm.icon = 'info';
		vm.title = msg;
		vm.showAlert();
	}

	public static question(msg: string): void {
		const vm = new ToastService();
		vm.icon = 'question';
		vm.title = msg;
		vm.showAlert();
	}
}

export class Alert {
	public static confirm(title: string = '', desc: string = ''): Promise<boolean> {
		return new Promise((resolve) => {
			Swal.fire({
				title: title,
				text: desc,
				showCancelButton: true,
				confirmButtonText: 'Yes',
				cancelButtonColor: '#d5d5d5',
				confirmButtonColor: '#8DCBDA',
				icon: 'question'
			}).then((result) => {
				if (result.isConfirmed) {
					return resolve(true);
				} else {
					return resolve(false);
				}
			});
		});
	}

	public static success(title: string = '', desc: string = ''){
		return Swal.fire(title,desc,"success")
	}

	public static error(title: string = '', desc: string = ''){
		return Swal.fire(title,desc,"error")
	}

	public static warning(title: string = '', desc: string = ''){
		return Swal.fire(title,desc,"warning")
	}
}
