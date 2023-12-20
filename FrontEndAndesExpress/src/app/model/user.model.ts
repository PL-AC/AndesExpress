export class User{

	id:number = 0;
	username: string = '';
	password: string = '';
	constructor(
	){}

	getId(): number {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getUsername(): string {
        return this.username;
    }

    setUsername(username: string): void {
        this.username = username;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(password: string): void {
        this.password = password;
    }
}