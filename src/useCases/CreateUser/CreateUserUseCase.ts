import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {

  constructor (
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {

  }

  async execute(data: ICreateUserRequestDTO) {
    console.log(data);
    
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if(userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = new User(data);

    await this.usersRepository.save(user);
    
    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'Aprendendo SOLID',
        email: 'SOLIDapi@email.com'
      },
      subject: 'Seja bem vind@!',
      body: '<p>Seu usuario foi criado com sucesso!</br>Você já pode fazer login na plataforma.</p>'
    })
  }
}