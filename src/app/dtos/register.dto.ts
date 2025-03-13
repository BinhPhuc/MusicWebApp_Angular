import { 
    IsNotEmpty,
    IsString,
    IsNumber,
    IsPhoneNumber,
    IsDate 
} from 'class-validator';

export class RegisterDTO {
	@IsNotEmpty()
	email: string
	@IsNotEmpty()
	username: string
	@IsNotEmpty()
	password: string
	@IsNotEmpty()
	retype_password: string
	constructor(data: any) {
		this.email = data.email;
		this.username = data.username;
		this.password = data.password;
		this.retype_password = data.retype_password;
	}
}